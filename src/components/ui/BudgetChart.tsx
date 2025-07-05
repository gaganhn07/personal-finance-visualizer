'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BudgetChart({ budgets, transactions }: any) {
  const currentMonth = new Date().toISOString().slice(0, 7); // e.g., "2025-07"

  // Step 1: Actual Spent per Category (filtered by current month)
  const actualSpending: Record<string, number> = {};
  transactions.forEach((tx: any) => {
    const txMonth = tx.date.slice(0, 7);
    if (txMonth !== currentMonth) return;
    const cat = tx.category || 'Uncategorized';
    actualSpending[cat] = (actualSpending[cat] || 0) + tx.amount;
  });

  // Step 2: Combine Budgeted + Actual
  const categoryMap: Record<string, { category: string; Budgeted: number; Spent: number }> = {};

  // Fill from budgets
  budgets
    .filter((b: any) => b.month === currentMonth)
    .forEach((b: any) => {
      categoryMap[b.category] = {
        category: b.category,
        Budgeted: b.amount,
        Spent: actualSpending[b.category] || 0,
      };
    });

  // Fill remaining categories only in Spent
  for (const category in actualSpending) {
    if (!categoryMap[category]) {
      categoryMap[category] = {
        category,
        Budgeted: 0,
        Spent: actualSpending[category],
      };
    }
  }

  const chartData = Object.values(categoryMap);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budgeted" fill="#34D399" />
          <Bar dataKey="Spent" fill="#F87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
