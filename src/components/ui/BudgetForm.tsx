'use client';
import { useState } from 'react';

const categories = ['Food', 'Transport', 'Shopping', 'Health', 'Other'];

export default function BudgetForm({ onAdd }: any) {
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // "YYYY-MM"

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/budgets', {
      method: 'POST',
      body: JSON.stringify({ category, amount: Number(amount), month }),
    });

    const data = await res.json();
    onAdd(data);

    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <div className="flex gap-3 flex-wrap">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save
        </button>
      </div>
    </form>
  );
}
