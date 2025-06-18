import { withSessionRoute } from '../../lib/session.js';
import { MongoClient, ObjectId } from 'mongodb';
import allowCors from '../../lib/cors.js';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

async function handler(req, res) {
  const userSession = req.session.user;
  //console.log(req)
  if (userSession) {
    try {
      const client = await getMongoClient();
      const db = client.db(DB_NAME);
      const users = db.collection('users');

      const userFromDb = await users.findOne({ _id: new ObjectId(userSession.id) });
      if (userFromDb) {
        res.status(200).json({
          isLoggedIn: true,
          _id: userFromDb._id,
          email: userFromDb.email,
          name: userFromDb.name,
          subscription: userFromDb.subscription || { plan: 'free', status: 'inactive' },
        });
      } else {
        await req.session.destroy();
        res.status(404).json({ isLoggedIn: false, error: 'User not found' });
      }
    } catch (err) {
      console.error('DB error:', err);
      res.status(500).json({ isLoggedIn: false, error: 'Database error' });
    }
  } else {
    res.status(404).json({ isLoggedIn: false });
  }
}

export default allowCors(withSessionRoute(handler));
