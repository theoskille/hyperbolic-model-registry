import { NextResponse } from 'next/server';
import { dbOperations } from '@/lib/db';
import { CreateModelData } from '@/types/models';

export async function GET() {
  try {
    const models = dbOperations.getAllModels();
    return NextResponse.json(models);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: CreateModelData = await request.json();
    
    // Basic validation
    if (!data.name || !data.version || !data.framework) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const model = dbOperations.createModel(data);
    return NextResponse.json(model, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create model' },
      { status: 500 }
    );
  }
} 