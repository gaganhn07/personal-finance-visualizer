import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find({});
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to load transactions' }, { status: 500 });
  }
}
