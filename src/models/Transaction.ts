import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Shopping', 'Health', 'Other'],
    default: 'Other',
  },
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
export default Transaction;
