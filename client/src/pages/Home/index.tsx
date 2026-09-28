import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';

export const HomePage: React.FC = () => {
  const futureFeatures = [
    {
      title: 'Financial Dashboard',
      description: 'Unified visualization of net worth, liquidity, debt balances, and monthly cash flow trajectory in one intuitive view.',
      badge: 'Foundation',
    },
    {
      title: 'Tax Planning',
      description: 'Proactive deduction mapping, capital gains optimization, and simplified tax bracket projections.',
      badge: 'Planned',
    },
    {
      title: 'Portfolio Analysis',
      description: 'Asset allocation breakdown across equities, fixed income, real estate, and risk-adjusted diversification metrics.',
      badge: 'Planned',
    },
    {
      title: 'FIRE Planning',
      description: 'Financial Independence, Retire Early modeling with realistic safe withdrawal rates, inflation adjustments, and milestone timelines.',
      badge: 'Planned',
    },
    {
      title: 'Financial Health Score',
      description: 'Holistic assessment of emergency reserves, debt-to-income ratio, savings velocity, and net worth progress.',
      badge: 'Planned',
    },
    {
      title: 'Financial Goals',
      description: 'Targeted goal tracking with customized contribution paths for home down payments, education, and emergency funds.',
      badge: 'Planned',
    },
    {
      title: 'Money Mentor',
      description: 'Context-aware guidance delivering sensible next steps based on your real financial situation, minus marketing noise.',
      badge: 'Planned',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Map Your Fundamentals',
      description: 'Organize your income streams, ongoing expenses, current assets, and debts into an organized financial picture.',
    },
    {
      step: '02',
      title: 'Gauge Financial Health',
      description: 'Identify strengths and vulnerabilities using transparent benchmark scores rather than confusing banking jargon.',
    },
    {
      step: '03',
      title: 'Build Long-Term Wealth',
      description: 'Apply structured allocations toward tax-optimized savings, strategic debt elimination, and retirement milestones.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-medium text-slate-700 shadow-2xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>ArthAI Project Foundation &bull; Phase 2 UI</span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Financial clarity, made simple.
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              ArthAI is a modern personal finance platform built for beginners and thoughtful planners alike.
              Organize your net worth, benchmark your financial health, and navigate long-term wealth building with total confidence.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Dashboard Demo
              </Button>
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            <div className="border border-slate-200 bg-white/70 p-4 rounded-lg dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Design Priority</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">Beginner-Friendly</p>
            </div>
            <div className="border border-slate-200 bg-white/70 p-4 rounded-lg dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Architecture</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">Full-Stack TypeScript</p>
            </div>
            <div className="border border-slate-200 bg-white/70 p-4 rounded-lg col-span-2 sm:col-span-1 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Privacy First</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">No Secret Tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* How ArthAI Works Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Process
            </h2>
            <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              How ArthAI Works
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              A straightforward three-step path from financial ambiguity to calm, intentional control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-950/50 space-y-4"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-mono text-sm font-semibold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Future Capabilities Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Capabilities
            </h2>
            <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Tools Built for Financial Independence
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Explore the core modules planned for ArthAI. Current release showcases the UI foundation; future releases introduce active calculations and intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureFeatures.map((feat) => (
              <Card key={feat.title} hoverable className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Feature Module
                    </span>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        feat.badge === 'Foundation'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {feat.badge}
                    </span>
                  </div>
                  <CardHeader className="mb-2">
                    <CardTitle className="text-base">{feat.title}</CardTitle>
                  </CardHeader>
                  <CardDescription className="text-xs sm:text-sm leading-relaxed">
                    {feat.description}
                  </CardDescription>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Ready to experience financial clarity?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Take a look at the interactive dashboard skeleton to see how ArthAI organizes your net worth, health metrics, and future goals.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/dashboard">
              <Button size="lg">Open Dashboard Skeleton</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
