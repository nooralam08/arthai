/**
 * Backend Authentication Verification Test Suite
 * Tests register, login, me, logout, and health endpoints.
 */

const BASE_URL = 'http://localhost:5000';

interface FetchResult {
  status: number;
  data: any;
  cookieHeader: string | null;
}

async function request(path: string, options: RequestInit = {}): Promise<FetchResult> {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const cookieHeader = response.headers.get('set-cookie');
  let data: any;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return {
    status: response.status,
    data,
    cookieHeader,
  };
}

async function runTests() {
  console.log('--- STARTING AUTHENTICATION BACKEND TESTS ---');
  let passed = 0;
  let failed = 0;

  function assert(description: string, condition: boolean, extraInfo?: any) {
    if (condition) {
      console.log(`[PASS] ${description}`);
      passed++;
    } else {
      console.error(`[FAIL] ${description}`, extraInfo ?? '');
      failed++;
    }
  }

  // 1. Health check
  const healthRes = await request('/api/health');
  assert(
    'GET /api/health returns 200 and healthy status',
    healthRes.status === 200 && healthRes.data?.success === true && healthRes.data?.message === 'ArthAI API is running'
  );

  // 2. Register: Missing name
  const regMissingName = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
  });
  assert('REGISTER: missing name returns 400', regMissingName.status === 400 && regMissingName.data?.error?.includes('Name is required'));

  // 3. Register: Invalid email
  const regInvalidEmail = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Test User', email: 'not-an-email', password: 'password123' }),
  });
  assert('REGISTER: invalid email returns 400', regInvalidEmail.status === 400 && regInvalidEmail.data?.error?.includes('valid email'));

  // 4. Register: Short password
  const regShortPass = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Test User', email: 'valid@example.com', password: '123' }),
  });
  assert('REGISTER: password shorter than 6 characters returns 400', regShortPass.status === 400 && regShortPass.data?.error?.includes('at least 6 characters'));

  // 5. Register: Valid registration
  const uniqueEmail = `user_${Date.now()}@example.com`;
  const validPassword = 'SecurePassword123!';
  const regValid = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Alex Johnson', email: uniqueEmail, password: validPassword }),
  });

  assert(
    'REGISTER: valid registration returns 201 with safe user and no passwordHash',
    regValid.status === 201 &&
      regValid.data?.success === true &&
      regValid.data?.user?.email === uniqueEmail &&
      regValid.data?.user?.id &&
      regValid.data?.user?.passwordHash === undefined,
    regValid.data
  );

  // 6. Register: Duplicate email
  const regDuplicate = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Another User', email: uniqueEmail, password: 'differentpassword' }),
  });
  assert(
    'REGISTER: duplicate email returns 409 conflict',
    regDuplicate.status === 409 && regDuplicate.data?.error?.includes('already exists')
  );

  // 7. Login: Unknown email
  const loginUnknown = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'nonexistent_user_999@example.com', password: validPassword }),
  });
  assert(
    'LOGIN: unknown email returns 401 invalid credentials',
    loginUnknown.status === 401 && loginUnknown.data?.error?.includes('Invalid email or password')
  );

  // 8. Login: Wrong password
  const loginWrongPass = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: uniqueEmail, password: 'WrongPassword999!' }),
  });
  assert(
    'LOGIN: wrong password returns 401 invalid credentials',
    loginWrongPass.status === 401 && loginWrongPass.data?.error?.includes('Invalid email or password')
  );

  // 9. Login: Valid credentials
  const loginValid = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: uniqueEmail, password: validPassword }),
  });

  const authCookie = loginValid.cookieHeader;
  assert(
    'LOGIN: valid credentials returns 200, safe user, and HTTP-only cookie',
    loginValid.status === 200 &&
      loginValid.data?.success === true &&
      loginValid.data?.user?.email === uniqueEmail &&
      loginValid.data?.user?.passwordHash === undefined &&
      authCookie !== null &&
      authCookie.includes('auth_token=') &&
      authCookie.includes('HttpOnly'),
    { data: loginValid.data, cookie: authCookie }
  );

  // Extract auth_token cookie string for subsequent requests
  const tokenMatch = authCookie ? authCookie.match(/auth_token=[^;]+/) : null;
  const cookieToSend = tokenMatch ? tokenMatch[0] : '';

  // 10. Me: Unauthenticated request (no cookie)
  const meUnauth = await request('/api/auth/me');
  assert(
    'ME: unauthenticated request (without cookie) returns 401',
    meUnauth.status === 401 && meUnauth.data?.success === false
  );

  // 11. Me: Authenticated request (with cookie)
  const meAuth = await request('/api/auth/me', {
    headers: {
      Cookie: cookieToSend,
    },
  });

  assert(
    'ME: authenticated request (with cookie) returns 200 and safe user identity',
    meAuth.status === 200 &&
      meAuth.data?.success === true &&
      meAuth.data?.user?.email === uniqueEmail &&
      meAuth.data?.user?.name === 'Alex Johnson' &&
      meAuth.data?.user?.id &&
      meAuth.data?.user?.createdAt &&
      meAuth.data?.user?.passwordHash === undefined,
    meAuth.data
  );

  // 12. Logout: Clears cookie
  const logoutRes = await request('/api/auth/logout', {
    method: 'POST',
    headers: {
      Cookie: cookieToSend,
    },
  });

  const logoutCookie = logoutRes.cookieHeader;
  assert(
    'LOGOUT: returns 200 and clears authentication cookie',
    logoutRes.status === 200 &&
      logoutRes.data?.success === true &&
      logoutCookie !== null &&
      (logoutCookie.includes('auth_token=;') || logoutCookie.includes('Expires=') || logoutCookie.includes('Max-Age=0')),
    logoutCookie
  );

  // 13. Me: Request after logout with cleared cookie
  const meAfterLogout = await request('/api/auth/me', {
    headers: {
      Cookie: 'auth_token=;',
    },
  });

  assert(
    'ME: request after logout with cleared cookie returns 401',
    meAfterLogout.status === 401 && meAfterLogout.data?.success === false
  );

  console.log(`\n--- TEST RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
