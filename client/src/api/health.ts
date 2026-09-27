export interface HealthResponse {
  success: boolean;
  message: string;
}

/**
 * Checks backend health status by calling GET /api/health.
 * In development, Vite proxies this request to the Express backend (http://localhost:5000).
 */
export async function checkBackendHealth(): Promise<HealthResponse> {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }
  return response.json();
}
