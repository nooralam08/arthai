export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: SafeUser;
}

const AUTH_BASE_URL = '/api/auth';

/**
 * Register a new user account.
 * Communicates with POST /api/auth/register using credentials.
 */
export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: credentials.name.trim(),
        email: credentials.email.trim(),
        password: credentials.password,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || `Registration failed with status ${response.status}`);
    }

    return data;
  } catch (err: any) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to connect to the server. Please check your network or ensure the backend is running.');
    }
    throw err;
  }
}

/**
 * Authenticate an existing user and establish an HTTP-only session cookie.
 * Communicates with POST /api/auth/login using credentials.
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: credentials.email.trim(),
        password: credentials.password,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || `Login failed with status ${response.status}`);
    }

    return data;
  } catch (err: any) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to connect to the server. Please check your network or ensure the backend is running.');
    }
    throw err;
  }
}

/**
 * Retrieve the current authenticated user's profile.
 * Communicates with GET /api/auth/me using credentials.
 */
export async function getMe(): Promise<AuthResponse> {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || `Authentication required (status ${response.status})`);
    }

    return data;
  } catch (err: any) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to connect to the server. Please check your network or ensure the backend is running.');
    }
    throw err;
  }
}

/**
 * Log out the current user and clear the HTTP-only cookie.
 * Communicates with POST /api/auth/logout using credentials.
 */
export async function logout(): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || `Logout failed with status ${response.status}`);
    }

    return data;
  } catch (err: any) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to connect to the server. Please check your network or ensure the backend is running.');
    }
    throw err;
  }
}
