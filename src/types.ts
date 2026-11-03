import { Dispatch, SetStateAction } from "react";

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export type AddTransactionProps = {
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
};

export const INCOME_CATEGORIES:string[] = [
  'Salary',
  'Freelance',
  'Investment',
  'Gift',
  'Other',
];

export const EXPENSE_CATEGORIES:string[] = [
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Shopping',
  'Health',
  'Other',
];

export const STORAGE_KEY = 'expense-tracker-transactions';



