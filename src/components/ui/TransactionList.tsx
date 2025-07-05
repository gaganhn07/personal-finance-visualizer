
'use client';

import React from 'react';

export type Transaction = {
  amount: number;
  date: string;
  description: string;
  category: string;
};

type Props = {
  transactions: Transaction[];
};

export default function TransactionList({ transactions }: Props) {
  if (!Array.isArray(transactions)) {
    return <p className="text-red-500">Transactions data is invalid.</p>;
  }

  if (transactions.length === 0) {
    return <p className="text-gray-500">No transactions available.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="p-2 border">{tx.description}</td>
                <td className="p-2 border">{tx.category || 'Uncategorized'}</td>
                <td className="p-2 border">₹{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
