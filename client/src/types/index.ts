export interface HealthResponse {
  success: boolean;
  message: string;
}

export type ConnectionStatus = 'checking' | 'connected' | 'disconnected';

export interface UserDemo {
  name: string;
  email: string;
}

export interface FinancialMetric {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  caption?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: string;
  type: 'credit' | 'debit';
}

export interface GoalItem {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
}
