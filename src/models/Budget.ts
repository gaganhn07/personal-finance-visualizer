import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Shopping', 'Health', 'Other'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // Format: "2025-07"
    required: true,
  },
});

const Budget = mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
export default Budget;
