import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface TokenPayload {
  userId: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'arthai_default_secret_key_change_in_production';
export const AUTH_COOKIE_NAME = 'auth_token';

export const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

// Helper: validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Service: Register a new user
export async function registerUser(name?: string, email?: string, password?: string): Promise<SafeUser> {
  // 1. Validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    const error: any = new Error('Name is required');
    error.status = 400;
    throw error;
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
    const error: any = new Error('A valid email address is required');
    error.status = 400;
    throw error;
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    const error: any = new Error('Password must be at least 6 characters long');
    error.status = 400;
    throw error;
  }

  // 2. Normalize email
  const normalizedEmail = email.trim().toLowerCase();

  // 3. Check for duplicate email
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    const error: any = new Error('An account with this email already exists');
    error.status = 409;
    throw error;
  }

  // 4. Hash password securely
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // 5. Create user in database
  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}

// Service: Authenticate an existing user
export async function loginUser(email?: string, password?: string): Promise<{ user: SafeUser; token: string }> {
  // 1. Validation
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    const error: any = new Error('Email and password are required');
    error.status = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // 2. Find user by email
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    const error: any = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // 3. Verify password against passwordHash
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const error: any = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // 4. Generate JWT token
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  const safeUser: SafeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };

  return { user: safeUser, token };
}

// Service: Find user by ID for session validation
export async function getUserById(userId: string): Promise<SafeUser | null> {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
}

// Helper: verify JWT token
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}
