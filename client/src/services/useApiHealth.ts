import { useState, useEffect, useCallback } from 'react';
import { getSystemHealth } from './api';
import type { HealthResponse } from './api';
import type { ConnectionStatus } from '../types';

export function useApiHealth() {
  const [status, setStatus] = useState<ConnectionStatus>('checking');
  const [message, setMessage] = useState<string>('');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const check = useCallback(async () => {
    setStatus('checking');
    try {
      const data: HealthResponse = await getSystemHealth();
      if (data.success) {
        setStatus('connected');
        setMessage(data.message);
      } else {
        setStatus('disconnected');
        setMessage('Unexpected response format');
      }
    } catch (err) {
      setStatus('disconnected');
      setMessage(err instanceof Error ? err.message : 'API unreachable');
    } finally {
      setLastChecked(new Date());
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return { status, message, lastChecked, refetch: check };
}
