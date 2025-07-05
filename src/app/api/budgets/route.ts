import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Budget from '@/models/Budget';

export async function GET() {
  await connectToDatabase();
  const budgets = await Budget.find({});
  return NextResponse.json(budgets);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newBudget = await Budget.create(body);
  return NextResponse.json(newBudget);
}
