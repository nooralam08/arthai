import { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  AUTH_COOKIE_NAME,
  getCookieOptions,
} from '../services/auth.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

/**
 * POST /api/auth/register
 * Registers a new user account.
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = req.body || {};

    const user = await registerUser(name, email, password);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    const status = err.status || 500;
    const message = err.message || 'An unexpected error occurred during registration';
    res.status(status).json({
      success: false,
      error: message,
    });
  }
}

/**
 * POST /api/auth/login
 * Verifies credentials and sets a secure HTTP-only authentication cookie.
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body || {};

    const { user, token } = await loginUser(email, password);

    // Set secure HTTP-only cookie
    res.cookie(AUTH_COOKIE_NAME, token, getCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Signed in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    const status = err.status || 500;
    const message = err.message || 'An unexpected error occurred during login';
    res.status(status).json({
      success: false,
      error: message,
    });
  }
}

/**
 * POST /api/auth/logout
 * Clears the HTTP-only authentication cookie.
 */
export async function logout(_req: Request, res: Response): Promise<void> {
  try {
    res.clearCookie(AUTH_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.status(200).json({
      success: true,
      message: 'Signed out successfully',
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to sign out',
    });
  }
}

/**
 * GET /api/auth/me
 * Returns current authenticated user's profile details.
 */
export async function me(req: Request, res: Response): Promise<void> {
  const user = (req as AuthenticatedRequest).user;

  if (!user) {
    res.status(401).json({
      success: false,
      error: 'Unauthenticated',
    });
    return;
  }

  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
}
