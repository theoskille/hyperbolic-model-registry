'use server';

import { dbOperations } from '@/lib/db';
import { CreateModelData, Model } from '@/types/models';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function createModel(data: CreateModelData): Promise<Model> {
  console.log('createModel called');
  try {
    const model = dbOperations.createModel(data);
    revalidatePath('/');
    return model;
  } catch (error) {
    throw new Error('Failed to create model');
  }
}

export async function getModels(): Promise<Model[]> {
  console.log('getModels called');
  try {
    const models = dbOperations.getAllModels();
    return models;
  } catch (error) {
    throw new Error('Failed to fetch models');
  }
}

export async function deleteModel(id: string): Promise<void> {
  console.log('deleteModel called');
  try {
    dbOperations.deleteModel(id);
    revalidateTag('models');
  } catch (error) {
    throw new Error('Failed to delete model');
  }
} 