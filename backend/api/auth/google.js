// api/auth/google.js
import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// Construct the redirect URI based on your deployment URL
const REDIRECT_URI = `${process.env.APP_BASE_URL}/api/auth/google/callback`;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !process.env.APP_BASE_URL) {
    console.error("Missing Google OAuth environment variables or APP_BASE_URL");
}

const oAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

export default function handler(req, res) {
  console.log('google.js')
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !process.env.APP_BASE_URL) {
    return res.status(500).json({ error: "Google Auth not configured" });
  }

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // 'offline' gets refresh_token (optional)
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'openid' // Standard OIDC scope
    ],
    prompt: 'consent' // Optional: Forces consent screen every time
  });

  res.redirect(authorizeUrl);
}