import { checkBackendHealth } from '../api/health';
import type { HealthResponse } from '../api/health';
import { register, login } from './auth';
import type { RegisterCredentials, LoginCredentials, AuthResponse } from './auth';

export { checkBackendHealth, register, login };
export type { HealthResponse, RegisterCredentials, LoginCredentials, AuthResponse };

/**
 * Service to retrieve backend system health status.
 */
export async function getSystemHealth(): Promise<HealthResponse> {
  return checkBackendHealth();
}
