import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { useApiHealth } from '../../services/useApiHealth';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { status, message, refetch } = useApiHealth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/login');
    }
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'AJ';


  // Static demo metrics
  const netWorth = 142500;
  const assets = 165000;
  const liabilities = 22500;
  const investments = 94200;

  const demoGoals = [
    { id: '1', title: 'Emergency Reserve', current: 20000, target: 25000, percent: 80 },
    { id: '2', title: 'Home Down Payment', current: 42000, target: 70000, percent: 60 },
    { id: '3', title: 'Retirement Milestone', current: 65000, target: 100000, percent: 65 },
  ];

  const recentTransactions = [
    { id: 'tx-1', title: 'Monthly Salary Deposit', category: 'Income', date: 'Jun 01, 2026', amount: '+$5,200.00', isCredit: true },
    { id: 'tx-2', title: 'Broad Market Index ETF', category: 'Investment', date: 'Jun 02, 2026', amount: '-$1,250.00', isCredit: false },
    { id: 'tx-3', title: 'High-Yield Reserve Deposit', category: 'Savings', date: 'Jun 03, 2026', amount: '-$600.00', isCredit: false },
    { id: 'tx-4', title: 'Apartment Lease Payment', category: 'Housing', date: 'Jun 05, 2026', amount: '-$1,650.00', isCredit: false },
    { id: 'tx-5', title: 'Quarterly ETF Dividend', category: 'Dividends', date: 'Jun 08, 2026', amount: '+$94.40', isCredit: true },
  ];

  const navItems = [
    { id: 'overview', label: 'Overview', planned: false },
    { id: 'portfolio', label: 'Portfolio X-Ray', planned: true },
    { id: 'taxes', label: 'Tax Planning', planned: true },
    { id: 'goals', label: 'Financial Goals', planned: true },
    { id: 'mentor', label: 'Money Mentor', planned: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div>
          {/* Brand header */}
          <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link to="/" className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                ArthAI
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Dashboard Skeleton
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-500 hover:text-slate-700"
              aria-label="Close Sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-left transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {item.planned && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400">
                    Planned
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Backend health status card in sidebar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-500 font-medium">API Server</span>
              <button
                onClick={refetch}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[11px] underline cursor-pointer"
              >
                Check
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              {status === 'connected' && (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-700 dark:text-emerald-400">Online (/api/health)</span>
                </>
              )}
              {status === 'checking' && (
                <>
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-amber-700 dark:text-amber-400">Connecting...</span>
                </>
              )}
              {status === 'disconnected' && (
                <>
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span className="text-rose-700 dark:text-rose-400">Offline</span>
                </>
              )}
            </div>
            {status === 'connected' && message && (
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                {message}
              </p>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full text-center text-xs font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 py-1 transition cursor-pointer"
            >
              Sign Out
            </button>
            <Link
              to="/"
              className="block text-center text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              &larr; Return to Public Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Open Navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Financial Dashboard
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Welcome back, {user?.name || 'Alex'} &bull; Personal Workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live API indicator pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <span className={`h-1.5 w-1.5 rounded-full ${status === 'connected' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span>{status === 'connected' ? 'API Connected' : 'API Offline'}</span>
            </div>

            {/* User profile avatar badge */}
            <div
              title={user?.email || user?.name || ''}
              className="h-8 w-8 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center font-bold text-xs"
            >
              {initials}
            </div>

            {/* Sign out button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Demo disclaimer banner */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="font-semibold uppercase tracking-wider text-[11px] block sm:inline mr-2">
                Phase 2 UI Skeleton
              </span>
              <span>All metrics, portfolios, and insights shown below are mock demo values. Real database sync will be connected in future phases.</span>
            </div>
            <span className="shrink-0 font-mono text-[11px] bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded-sm">
              Demo Data
            </span>
          </div>

          {/* Primary Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Net Worth Card */}
            <Card>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>Net Worth</span>
                <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 px-1.5 py-0.5 rounded-sm">
                  +2.3%
                </span>
              </div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {formatCurrency(netWorth)}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Assets:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{formatCurrency(assets)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Liabilities:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{formatCurrency(liabilities)}</span>
                </div>
              </div>
            </Card>

            {/* Investment Card */}
            <Card>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>Investments</span>
                <span className="text-[10px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 px-1.5 py-0.5 rounded-sm">
                  Allocated
                </span>
              </div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {formatCurrency(investments)}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Equities (Index):</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">65%</span>
                </div>
                <div className="flex justify-between">
                  <span>Bonds & Cash:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">35%</span>
                </div>
              </div>
            </Card>

            {/* Money Health Card */}
            <Card>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>Money Health</span>
                <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 px-1.5 py-0.5 rounded-sm">
                  Strong
                </span>
              </div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-baseline gap-1">
                <span>82</span>
                <span className="text-sm font-normal text-slate-500">/ 100</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Emergency Fund:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">6.2 mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt Ratio:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">14% (Low)</span>
                </div>
              </div>
            </Card>

            {/* Goals Card */}
            <Card>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>Active Goals</span>
                <span className="text-[10px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-1.5 py-0.5 rounded-sm">
                  3 in progress
                </span>
              </div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {demoGoals.length}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Top Goal:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Emergency Fund</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">80% reached</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Portfolio Chart Placeholder & Goals Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio Chart Placeholder (2 Cols) */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Portfolio Trajectory</CardTitle>
                  <CardDescription>Demo Chart Placeholder &bull; Simulated 6-Month Growth</CardDescription>
                </div>
                <div className="flex gap-1 text-xs">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded font-medium text-slate-900 dark:text-white">
                    6M
                  </span>
                  <span className="px-2 py-1 text-slate-400 hover:text-slate-600 rounded">
                    1Y
                  </span>
                  <span className="px-2 py-1 text-slate-400 hover:text-slate-600 rounded">
                    ALL
                  </span>
                </div>
              </CardHeader>

              {/* Realistic SVG Line/Area Graph Representation */}
              <div className="h-64 w-full flex flex-col justify-end pt-4">
                <div className="h-44 w-full relative flex items-end justify-between px-2 border-b border-slate-200 dark:border-slate-800">
                  {/* Visual Bar Column Demonstrations with height percentages */}
                  {[
                    { month: 'Jan', val: '$128k', h: '55%' },
                    { month: 'Feb', val: '$131k', h: '62%' },
                    { month: 'Mar', val: '$133k', h: '67%' },
                    { month: 'Apr', val: '$137k', h: '75%' },
                    { month: 'May', val: '$139k', h: '82%' },
                    { month: 'Jun', val: '$142k', h: '92%' },
                  ].map((col) => (
                    <div key={col.month} className="flex flex-col items-center gap-2 group w-1/7">
                      <span className="text-[10px] text-slate-400 font-mono opacity-0 group-hover:opacity-100 transition">
                        {col.val}
                      </span>
                      <div
                        style={{ height: col.h }}
                        className="w-8 sm:w-12 bg-slate-200 group-hover:bg-slate-900 dark:bg-slate-800 dark:group-hover:bg-slate-100 rounded-t-md transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
                {/* Month labels */}
                <div className="flex justify-between px-2 pt-2 text-xs text-slate-400 font-mono">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <span>Chart engine integration planned for Phase 3.</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">+$14,500 (+11.3% YTD)</span>
              </div>
            </Card>

            {/* Financial Goals Detailed Card */}
            <Card>
              <CardHeader>
                <CardTitle>Milestone Goals</CardTitle>
                <CardDescription>Demo Progress Tracker</CardDescription>
              </CardHeader>

              <div className="space-y-4">
                {demoGoals.map((goal) => (
                  <div key={goal.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{goal.title}</span>
                      <span className="text-slate-500">{goal.percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                      <div
                        style={{ width: `${goal.percent}%` }}
                        className="h-full bg-slate-900 dark:bg-slate-100 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                      <span>{formatCurrency(goal.current)}</span>
                      <span>{formatCurrency(goal.target)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 text-center">
                  Goal calculations & automatic target pacing scheduled for Phase 4.
                </p>
              </div>
            </Card>
          </div>

          {/* Money Mentor Section & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Money Mentor Card (1 Col) */}
            <Card className="border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Money Mentor
                </span>
                <span className="text-[10px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  AI Advisory (Planned)
                </span>
              </div>
              <CardTitle className="text-base mb-2">Reserve Optimization Suggestion</CardTitle>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Your liquid emergency reserve currently covers 6.2 months of fixed obligations. With liquidity secured, you could redirect an extra $350/month into tax-advantaged retirement accounts to reduce taxable income.
              </p>

              <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-900/40">
                <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300 block mb-1">
                  Suggested Action
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Review tax-deductible contribution headroom in Phase 4 Tax Wizard.
                </p>
              </div>
            </Card>

            {/* Recent Activity Table (2 Cols) */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest simulated ledger events</CardDescription>
                </div>
                <span className="text-xs text-slate-400">Showing 5 demo entries</span>
              </CardHeader>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 font-semibold">Description</th>
                      <th className="py-2.5 font-semibold hidden sm:table-cell">Category</th>
                      <th className="py-2.5 font-semibold">Date</th>
                      <th className="py-2.5 font-semibold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                        <td className="py-3 font-medium text-slate-800 dark:text-slate-200">
                          {tx.title}
                        </td>
                        <td className="py-3 text-slate-500 hidden sm:table-cell">
                          {tx.category}
                        </td>
                        <td className="py-3 text-slate-400 text-xs font-mono">
                          {tx.date}
                        </td>
                        <td
                          className={`py-3 text-right font-mono font-medium ${
                            tx.isCredit
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {tx.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
