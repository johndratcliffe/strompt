// api/stripe/create-portal-session.js
import Stripe from 'stripe';
import { withSessionRoute } from '../../lib/session.js'; // Adjust path
import allowCors from '../../lib/cors.js';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const APP_BASE_URL = process.env.APP_BASE_URL;
const REACT_URL = process.env.REACT_URL;

if (!STRIPE_SECRET_KEY || !APP_BASE_URL) {
    console.error("Missing Stripe Secret Key or App Base URL environment variables");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

async function handler(req, res) {
    if (!STRIPE_SECRET_KEY || !APP_BASE_URL) {
       return res.status(500).json({ error: "Stripe/App URL not configured" });
     }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const user = req.session.user;

    // 1. Check if user is logged in and has a Stripe Customer ID
    if (!user || !user.id || !user.stripeCustomerId) {
        return res.status(401).json({ error: 'Not authenticated or missing Stripe Customer ID' });
    }

    try {
        // 2. Create a Stripe Billing Portal Session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${REACT_URL}/profile`,
        });
        // 3. Return the portal session URL to the frontend
        res.status(200).json({ url: portalSession.url });

    } catch (error) {
        console.error('Stripe Portal Session Error:', error);
        res.status(500).json({ error: `Failed to create portal session: ${error.message}` });
    }
}

export default allowCors(withSessionRoute(handler));