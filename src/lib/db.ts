import Database from 'better-sqlite3';
import { join } from 'path';
import { Model, CreateModelData } from '@/types/models';

// Initialize the database
const db = new Database(join(process.cwd(), 'models.db'));

// Create the models table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS models (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    framework TEXT NOT NULL CHECK (framework IN ('PyTorch', 'TensorFlow', 'JAX', 'Other'))
  )
`);

// Helper function to generate UUID
function generateId(): string {
  return crypto.randomUUID();
}

// Database operations
export const dbOperations = {
  getAllModels: (): Model[] => {
    return db.prepare('SELECT * FROM models').all() as Model[];
  },

  createModel: (data: CreateModelData): Model => {
    const id = generateId();
    db.prepare(
      'INSERT INTO models (id, name, version, framework) VALUES (?, ?, ?, ?)'
    ).run(id, data.name, data.version, data.framework);
    return { id, ...data };
  },
};

export default db; 