import { NextResponse } from 'next/server';
import { dbOperations } from '@/lib/db';
import { CreateModelData, Model } from '@/types/models';


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
    const model = dbOperations.createModel(data);
    return NextResponse.json(model, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create model' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Model ID is required' },
        { status: 400 }
      );
    }
    dbOperations.deleteModel(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete model' },
      { status: 500 }
    );
  }
}