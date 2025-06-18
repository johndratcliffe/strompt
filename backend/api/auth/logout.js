// api/auth/logout.js
import { withSessionRoute } from '../../lib/session.js'; // Adjust path
import allowCors from '../../lib/cors.js';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        req.session.destroy()
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: 'Failed to logout' });
    }
}

export default allowCors(withSessionRoute(handler))