'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function MonthlyChart({ transactions }: any) {
  const monthly = Array(12).fill(0);

  transactions.forEach((tx: any) => {
    const month = new Date(tx.date).getMonth(); // 0 to 11
    monthly[month] += tx.amount;
  });

  const data = monthly.map((value, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    value,
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 mt-6">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
