'use client';
import { useState } from 'react';

const categories = ['Food', 'Transport', 'Shopping', 'Health', 'Other'];

export default function TransactionForm({ onAdd }: any) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) {
      alert('All fields are required');
      return;
    }

    const res = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({
        amount: Number(amount),
        date,
        description,
        category,
      }),
    });

    if (!res.ok) {
      alert('Failed to add transaction');
      return;
    }

    const newTx = await res.json();
    onAdd(newTx);
    setAmount('');
    setDate('');
    setDescription('');
    setCategory('Other');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border px-3 py-2 rounded w-full"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border px-3 py-2 rounded w-full"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
}
