import { Request, Response, NextFunction } from 'express';
import { AUTH_COOKIE_NAME, verifyToken, getUserById, SafeUser } from '../services/auth.service';

export interface AuthenticatedRequest extends Request {
  user?: SafeUser;
}

/**
 * Authentication Middleware
 * Reads the HTTP-only authentication cookie, verifies the JWT,
 * fetches the safe user identity, and attaches it to req.user.
 * Rejects unauthenticated or invalid requests with 401.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Authentication required. Please sign in.',
      });
      return;
    }

    const payload = verifyToken(token);
    if (!payload || !payload.userId) {
      res.status(401).json({
        success: false,
        error: 'Invalid or expired session. Please sign in again.',
      });
      return;
    }

    const user = await getUserById(payload.userId);
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'User account no longer exists.',
      });
      return;
    }

    // Attach safe user identity to the request
    (req as AuthenticatedRequest).user = user;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Internal authentication error.',
    });
  }
}
