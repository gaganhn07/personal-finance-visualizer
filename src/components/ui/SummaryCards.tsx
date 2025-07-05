'use client';

type Transaction = {
  _id?: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

export default function SummaryCards({ transactions }: { transactions: Transaction[] }) {
  if (!transactions || transactions.length === 0) return null;

  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  // Calculate top spending category
  const categoryMap: Record<string, number> = {};
  transactions.forEach((tx) => {
    const cat = tx.category || 'Uncategorized';
    categoryMap[cat] = (categoryMap[cat] || 0) + tx.amount;
  });
  const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

  // Find most recent transaction
  const recentTx = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">Total Expenses</p>
        <h3 className="text-xl font-bold">₹{total}</h3>
      </div>
      <div className="bg-green-100 dark:bg-green-900/40 p-4 rounded-lg">
        <p className="text-sm text-green-800 dark:text-green-300">Top Category</p>
        <h3 className="text-xl font-bold">{topCategory[0]} — ₹{topCategory[1]}</h3>
      </div>
      <div className="bg-yellow-100 dark:bg-yellow-900/40 p-4 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-300">Recent Transaction</p>
        <h3 className="text-md font-medium">
          ₹{recentTx.amount} — {new Date(recentTx.date).toLocaleDateString()}
        </h3>
        <p className="text-xs text-gray-700 dark:text-gray-300">{recentTx.description}</p>
      </div>
    </div>
  );
}
