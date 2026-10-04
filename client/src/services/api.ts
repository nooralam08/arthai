import { checkBackendHealth } from '../api/health';
import type { HealthResponse } from '../api/health';
import { register, login, getMe, logout } from './auth';
import type { RegisterCredentials, LoginCredentials, AuthResponse, SafeUser } from './auth';

export { checkBackendHealth, register, login, getMe, logout };
export type { HealthResponse, RegisterCredentials, LoginCredentials, AuthResponse, SafeUser };

/**
 * Service to retrieve backend system health status.
 */
export async function getSystemHealth(): Promise<HealthResponse> {
  return checkBackendHealth();
}
