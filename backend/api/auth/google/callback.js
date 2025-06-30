// api/auth/google/callback.js
import { OAuth2Client } from 'google-auth-library';
import { withSessionRoute } from '../../../lib/session.js'; // Adjust path if needed
import { getDb } from '../../../lib/mongodb.js'; // adjusted path

import Stripe from 'stripe';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.APP_BASE_URL}/api/auth/google/callback`;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const REACT_URL = process.env.REACT_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !STRIPE_SECRET_KEY || !process.env.APP_BASE_URL) {
    console.error("Missing Google OAuth/Stripe environment variables or APP_BASE_URL");
}

const oAuth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
);

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16', // Use a specific API version
});


async function handler(req, res) {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !STRIPE_SECRET_KEY || !process.env.APP_BASE_URL) {
        return res.status(500).json({ error: "Auth/Stripe not configured" });
      }

    const code = req.query.code;

    if (typeof code !== 'string') {
        return res.status(400).json({ error: 'Invalid authorization code' });
    }

    try {
        // Exchange code for tokens
        const { tokens } = await oAuth2Client.getToken(code);
        // oAuth2Client.setCredentials(tokens); // Set credentials for future API calls if needed

        // Get user info from ID token
        const idToken = tokens.id_token;
        if (!idToken) {
            throw new Error('ID token not received from Google');
        }
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: idToken,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        if (!payload || !payload.email || !payload.sub) {
             throw new Error('Invalid user payload received from Google');
        }

        const googleId = payload.sub;
        const email = payload.email;
        const name = payload.name || ''; // Google might not always provide name
        const givenName = payload.given_name || ''
        const familyName = payload.family_name || ''
        const picture = payload.picture || ''; // Profile picture URL

        // --- DATABASE INTERACTION ---
        let user;
        let stripeCustomerId;

        const db = await getDb();
        const usersCollection = db.collection('users');

        // Try to find user by Google ID or email
        user = await usersCollection.findOne({ googleId });
        if (!user) {
          user = await usersCollection.findOne({ email });
        }

        if (user) {
            // User exists, update details if necessary (e.g., name, picture, ensure googleId is linked if they logged in via email before)
             stripeCustomerId = user.stripeCustomerId;
             // Optional: Update user name/picture/googleId if changed/missing
             // await db.updateUser(user.id, { name: name, picture: picture, googleId: googleId });
             console.log("DB: User found, potentially update details for ID:", user._id);
        } else {
            // User does not exist, create new user

            // 2a. Create Stripe Customer
            try {
                 const customer = await stripe.customers.create({
                    email: email,
                    name: name,
                    metadata: {
                        // Link Stripe customer to your internal user ID if possible *after* creating the user
                        // googleId: googleId // Or store googleId here
                    }
                 });
                 stripeCustomerId = customer.id;
                 console.log("Stripe Customer created:", stripeCustomerId);
            } catch (stripeError) {
                 console.error("Failed to create Stripe customer:", stripeError);
                 // Decide how to handle this - maybe proceed without Stripe ID, maybe fail login?
                 // For simplicity, we'll throw an error here. Consider retry logic or alternative flows.
                 throw new Error(`Failed to create Stripe customer: ${stripeError.message}`);
            }

            const newUser = {
              googleId,
              email,
              name,
              given_name: givenName,
              family_name: familyName,
              picture,
              stripeCustomerId,
              createdAt: new Date()
            };
            
            const result = await usersCollection.insertOne(newUser);
            user = { ...newUser, _id: result.insertedId };            

            console.log("DB: User created with ID:", user._id);
        }

        // --- End DATABASE INTERACTION ---


        if (!user) {
            throw new Error('Failed to find or create user record.');
        }


        // 3. Store user info in session
        // Only store necessary, non-sensitive info
        req.session.user = {
            id: user._id, // Your internal database user ID
            email: user.email,
            name: user.name,
            given_name: user.given_name,
            family_name: user.family_name,
            stripeCustomerId: stripeCustomerId // Needed for payments/portal
            // DO NOT store tokens or sensitive data here
        };
        await req.session.save();
        console.log("Session saved for user:", user);

        // 4. Redirect to the frontend profile page (or intended destination)
        res.redirect(`${REACT_URL}/profile`); // Adjust path as needed

    } catch (error) {
        console.error('Google Callback Error:', error);
        // Redirect to an error page or login page with an error message
        res.redirect(`${REACT_URL}`);
    }
}

// Wrap the handler with session capabilities
export default withSessionRoute(handler);