import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              ArthAI
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Financial clarity, made simple. Designed for individuals seeking transparency, mindful planning, and long-term financial freedom.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span>Phase 2: UI Foundation</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition">
                  Dashboard Demo
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-slate-900 dark:hover:text-white transition">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-slate-900 dark:hover:text-white transition">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Planned Modules
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>Tax Planning (Phase 4+)</li>
              <li>Portfolio Analysis</li>
              <li>FIRE Projection</li>
              <li>AI Money Mentor</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} ArthAI. All rights reserved.</p>
          <p className="text-center sm:text-right">
            For demonstration and educational planning purposes. Not certified investment or tax advice.
          </p>
        </div>
      </div>
    </footer>
  );
};
