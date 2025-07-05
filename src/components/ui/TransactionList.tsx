export default function TransactionList({ transactions }: any) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx: any) => (
          <li
            key={tx._id}
            className="border rounded px-3 py-2 flex justify-between items-center text-sm"
          >
            <span>₹{tx.amount}</span>
            <span>{tx.description}</span>
            <span>{tx.category}</span>
            <span>{new Date(tx.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
