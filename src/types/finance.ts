export type TransactionType = 'income' | 'outcome';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

export interface FinancialSummary {
  balance: number;
  income: number;
  outcome: number;
}
