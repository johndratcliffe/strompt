import Stripe from 'stripe'
import { buffer } from 'micro'
import { MongoClient } from 'mongodb'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET
const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME
const STRIPE_BASIC_PLAN_PRICE_ID = process.env.STRIPE_BASIC_PLAN_PRICE_ID
const STRIPE_PRO_PLAN_PRICE_ID = process.env.STRIPE_PRO_PLAN_PRICE_ID

if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !MONGODB_URI) {
  console.error("Missing required environment variables.");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// MongoDB Client
let cachedClient = null;
async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

// Disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).setHeader('Allow', 'POST').json({ message: 'Method Not Allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf.toString(), sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    const client = await getMongoClient();
    const db = client.db(DB_NAME);
    const users = db.collection('users');

    let subscription;
    let customerId;
    let planId;
    let status;

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        if (session.mode === 'subscription' && session.subscription) {
          customerId = session.customer;
          subscription = await stripe.subscriptions.retrieve(session.subscription);
          planId = subscription.items.data[0]?.price?.id;
          status = subscription.status;

          await users.updateOne(
            { stripeCustomerId: customerId },
            {
              $set: {
                'subscription.plan': planId === STRIPE_PRO_PLAN_PRICE_ID ? 'pro' : planId === STRIPE_BASIC_PLAN_PRICE_ID ? 'basic' : 'free',
                'subscription.planId': planId,
                'subscription.status': status,
                'subscription.subscriptionId': subscription.id,
                'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
              },
            }
          );
        }
        break;

      case 'invoice.paid':
        const invoicePaid = event.data.object;
        customerId = invoicePaid.customer;
        subscription = invoicePaid.subscription;
        if (subscription && customerId) {
          const subDetails = await stripe.subscriptions.retrieve(subscription);
          await users.updateOne(
            { stripeCustomerId: customerId },
            {
              $set: {
                'subscription.status': subDetails.status,
                'subscription.currentPeriodEnd': new Date(subDetails.current_period_end * 1000),
              },
            }
          );
        }
        break;

      case 'invoice.payment_failed':
        const invoiceFailed = event.data.object;
        customerId = invoiceFailed.customer;
        subscription = invoiceFailed.subscription;
        if (subscription && customerId) {
          const subDetails = await stripe.subscriptions.retrieve(subscription);
          await users.updateOne(
            { stripeCustomerId: customerId },
            {
              $set: { 'subscription.status': subDetails.status },
            }
          );
        }
        break;

      case 'customer.subscription.updated':
        subscription = event.data.object;
        customerId = subscription.customer;
        planId = subscription.items.data[0]?.price?.id;
        status = subscription.status;

        await users.updateOne(
          { stripeCustomerId: customerId },
          {
            $set: {
              'subscription.plan': planId === STRIPE_PRO_PLAN_PRICE_ID ? 'pro' : planId === STRIPE_BASIC_PLAN_PRICE_ID ? 'basic' : 'free',
              'subscription.planId': planId,
              'subscription.status': status,
              'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
              'subscription.canceledAt': subscription.canceled_at
                ? new Date(subscription.canceled_at * 1000)
                : null,
            },
          }
        );
        break;

      case 'customer.subscription.deleted':
        subscription = event.data.object;
        customerId = subscription.customer;

        await users.updateOne(
          { stripeCustomerId: customerId },
          {
            $set: {
              'subscription.status': 'canceled',
              'subscription.plan': 'free',
              'subscription.planId': null,
            },
          }
        );
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error(`Webhook handler error: ${error}`);
    res.status(500).json({ error: `Webhook handler failed: ${error.message}` });
  }
}
