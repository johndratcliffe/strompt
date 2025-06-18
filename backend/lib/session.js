import { getIronSession } from "iron-session"

const sessionOptions = {
  cookieName: "magi_paste_session",
  password: process.env.SESSION_SECRET,
  cookieOptions: {
    secure: true,
    sameSite: 'None',
    maxAge: 60 * 60 * 24 * 30
  }
}

export function withSessionRoute(handler) {
  return async function(req, res) {
    req.session = await getIronSession(req, res, sessionOptions)
    const now = Date.now()
    const REFRESH_THRESHOLD = 60 * 60 * 24 * 1000 * 15
    if (req.session.user) {
      const createdAt = req.session.createdAt || now;
      if (now - createdAt > REFRESH_THRESHOLD) {
        req.session.createdAt = now
        await req.session.save()
      }
    }
    return handler(req, res)
  }
}
