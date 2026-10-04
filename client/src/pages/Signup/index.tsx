import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

import { useAuth } from '../../context/AuthContext';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill out all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setIsLoading(true);

      // 1. Call backend registration endpoint
      const registerRes = await register({
        name: fullName.trim(),
        email: email.trim(),
        password,
      });

      if (!registerRes.success) {
        setError(registerRes.error || 'Registration failed. Please try again.');
        return;
      }

      // 2. Automatically log in to establish the session cookie
      try {
        await login({
          email: email.trim(),
          password,
        });
      } catch {
        // Fallback: If auto-login fails, redirect will still proceed to dashboard
      }

      navigate('/dashboard');
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Unable to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

        {/* Signup Card */}
        <Card className="p-8 shadow-xs border-slate-200 dark:border-slate-800">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Create your ArthAI account
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Start your journey toward structured financial freedom.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Alex Johnson"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
              required
              autoComplete="name"
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
              autoComplete="new-password"
            />

            <div className="pt-2">
              <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
                Create Account
              </Button>
            </div>
          </form>
        </Card>

        {/* Switch to Login */}
        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-slate-900 hover:underline dark:text-white"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
