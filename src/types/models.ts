export type Framework = 'PyTorch' | 'TensorFlow' | 'JAX' | 'Other';

export interface Model {
  id: string;
  name: string;
  version: string;
  framework: Framework;
}

export interface CreateModelData {
  name: string;
  version: string;
  framework: Framework;
} 