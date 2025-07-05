'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/ui/TransactionForm';
import TransactionList from '@/components/ui/TransactionList';
import MonthlyChart from '@/components/ui/BarChart';
import CategoryPieChart from '@/components/ui/CategoryPieChart';
import SummaryCards from '@/components/ui/SummaryCards';
import BudgetForm from '@/components/ui/BudgetForm';
import BudgetChart from '@/components/ui/BudgetChart';

type Transaction = {
  _id?: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type Budget = {
  _id?: string;
  category: string;
  amount: number;
  month: string;
};

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // ✅ Fetch transactions from MongoDB
  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // ✅ Fetch budgets from MongoDB
  const fetchBudgets = async () => {
    try {
      const res = await fetch('/api/budgets');
      if (!res.ok) throw new Error('Failed to fetch budgets');
      const data = await res.json();
      setBudgets(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  // ✅ Fetch data when component loads
  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  // ✅ Add new transaction to state
  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [...prev, newTx]);
  };

  // ✅ Add new budget to state
  const handleAddBudget = (newBudget: Budget) => {
    setBudgets((prev) => [...prev, newBudget]);
  };

  return (
    <div className="p-6 sm:p-12 max-w-4xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold text-center sm:text-left">💰 Personal Finance Visualizer</h1>

      {/* Add Transaction */}
      <TransactionForm onAdd={handleAddTransaction} />

      {/* All Transactions */}
      <TransactionList transactions={transactions} />

      {/* Monthly Bar Chart */}
      <MonthlyChart transactions={transactions} />

      {/* Category Summary */}
      <SummaryCards transactions={transactions} />

      {/* Pie Chart */}
      <CategoryPieChart transactions={transactions} />

      {/* Budget Form */}
      <BudgetForm onAdd={handleAddBudget} />

      {/* Budget vs Actual Chart */}
      <BudgetChart budgets={budgets} transactions={transactions} />
    </div>
  );
}
