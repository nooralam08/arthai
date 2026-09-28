import { checkBackendHealth } from '../api/health';
import type { HealthResponse } from '../api/health';

export { checkBackendHealth };
export type { HealthResponse };

/**
 * Service to retrieve backend system health status.
 */
export async function getSystemHealth(): Promise<HealthResponse> {
  return checkBackendHealth();
}
