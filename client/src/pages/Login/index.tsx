import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    // UI-only simulation for Phase 2: navigate to dashboard
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              ArthAI
            </span>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Financial clarity, made simple.
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-xs border-slate-200 dark:border-slate-800">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter your credentials to access the demo financial dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <div className="pt-2">
              <Button type="submit" fullWidth isLoading={isLoading}>
                Sign In
              </Button>
            </div>
          </form>

          {/* Prototype note */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Phase 2 Prototype: Submitting redirects to Dashboard demo without saving data.
            </p>
          </div>
        </Card>

        {/* Switch to Signup */}
        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don&apos;t have an account yet?{' '}
          <Link
            to="/signup"
            className="font-medium text-slate-900 hover:underline dark:text-white"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
