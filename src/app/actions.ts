'use server';

import { dbOperations } from '@/lib/db';
import { CreateModelData, Model } from '@/types/models';
import { revalidatePath } from 'next/cache';

export async function createModel(data: CreateModelData): Promise<Model> {
  try {
    const model = dbOperations.createModel(data);
    revalidatePath('/models');
    return model;
  } catch (error) {
    throw new Error('Failed to create model');
  }
}

export async function getModels(): Promise<Model[]> {
  try {
    return dbOperations.getAllModels();
  } catch (error) {
    throw new Error('Failed to fetch models');
  }
} 