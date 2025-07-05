'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#4F46E5', '#059669', '#F59E0B', '#EF4444', '#6B7280'];

export default function CategoryPieChart({ transactions }: any) {
  const categoryData: { [key: string]: number } = {};

  transactions.forEach((tx: any) => {
    const category = tx.category || 'Uncategorized'; // ✅ fallback if undefined

    if (!categoryData[category]) {
      categoryData[category] = 0;
    }
    categoryData[category] += tx.amount;
  });

  const data = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 mt-6">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
