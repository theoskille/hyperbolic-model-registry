'use client';

import { useRouter } from 'next/navigation';
import { CreateModelData } from '@/types/models';

export function useModels() {
  const router = useRouter();

  const createModel = async (data: CreateModelData) => {
    try {
      const response = await fetch('/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create model');
      router.refresh();
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const deleteModel = async (id: string) => {
    try {
      const response = await fetch(`/api/models/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete model');
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  return { createModel, deleteModel };
} 