// api/stripe/create-checkout-session.js
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
     /* console.log(req.method)
    if (req.method !== 'POST' || req.method === 'OPTIONS') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    } */

    const user = req.session.user;
    // 1. Check if user is logged in
    if (!user || !user.id || !user.stripeCustomerId) {
        return res.status(401).json({ error: 'Not authenticated or missing Stripe Customer ID' });
    }

    const { name } = req.body;

    // 2. Validate priceId (ensure it's one of your valid Stripe Price IDs)
    const priceId = name === 'Pro' ? process.env.STRIPE_PRO_PLAN_PRICE_ID : process.env.STRIPE_BASIC_PLAN_PRICE_ID

    if (name !== 'Pro' && name !== 'Basic') {
        return res.status(400).json({ error: 'Invalid Price ID provided' });
    }

    try {
        // 3. Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            customer: user.stripeCustomerId,
            success_url: `${REACT_URL}/profile`,
            cancel_url: `${REACT_URL}/pricing`,
             allow_promotion_codes: true,
        });

        // 4. Return the session ID to the frontend
        res.status(200).json({ sessionId: session.id });

    } catch (error) {
        console.error('Stripe Checkout Session Error:', error);
        res.status(500).json({ error: `Failed to create checkout session: ${error.message}` });
    }
}

export default allowCors(withSessionRoute(handler))