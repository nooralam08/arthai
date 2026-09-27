import { useState, useEffect } from 'react';
import { checkBackendHealth } from './api/health';

type ConnectionStatus = 'checking' | 'connected' | 'disconnected';

export default function App() {
  const [status, setStatus] = useState<ConnectionStatus>('checking');
  const [serverMessage, setServerMessage] = useState<string>('');

  const verifyConnection = async () => {
    setStatus('checking');
    try {
      const data = await checkBackendHealth();
      if (data.success) {
        setStatus('connected');
        setServerMessage(data.message);
      } else {
        setStatus('disconnected');
        setServerMessage('Unexpected response from server');
      }
    } catch (error) {
      setStatus('disconnected');
      setServerMessage(error instanceof Error ? error.message : 'Failed to connect');
    }
  };

  useEffect(() => {
    verifyConnection();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <main className="w-full max-w-md text-center space-y-6">
        {/* Brand Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            ArthAI
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Financial clarity, made simple.
          </p>
        </div>

        {/* Backend Connection Status Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Backend Status
            </span>
            {status === 'checking' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                Checking...
              </span>
            )}
            {status === 'connected' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Connected
              </span>
            )}
            {status === 'disconnected' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-950/50 dark:text-rose-400">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                Disconnected
              </span>
            )}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            {status === 'checking' && 'Connecting to /api/health...'}
            {status === 'connected' && (serverMessage || 'ArthAI API is running')}
            {status === 'disconnected' && (
              <span>Unable to reach backend: <span className="font-mono text-xs">{serverMessage}</span></span>
            )}
          </p>

          {status === 'disconnected' && (
            <button
              onClick={verifyConnection}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Retry Connection
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
