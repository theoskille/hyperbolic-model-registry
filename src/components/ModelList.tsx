'use client'

import { Model } from '@/types/models';
import { ModelCard } from './ModelCard';
import { CreateModelForm } from './CreateModelForm';
import { useState, useEffect, useContext, createContext } from 'react';

export function ModelList() {
  const [models, setModels] = useState<Model[]>([]);
  
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch('/api/models');
        if(!res.ok) {
          throw new Error('Failed to fetch models');
        }
        const data = await res.json();
        setModels(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchModels();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h2 className="text-base font-semibold leading-6 text-foreground">Models</h2>
          <p className="mt-2 text-sm text-foreground/70">
            A list of all models in the registry.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <CreateModelForm />
        </div>
      </div>
      <div className="mt-4 flex-1">
        <div className="h-[calc(100vh-18rem)] border-2 border-foreground">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="w-[30%] py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-foreground border-r-2 border-foreground">Name</th>
                  <th className="w-[30%] px-3 py-3.5 text-left text-sm font-semibold text-foreground border-r-2 border-foreground">Version</th>
                  <th className="w-[30%] px-3 py-3.5 text-left text-sm font-semibold text-foreground">Framework</th>
                  <th className="w-[10%]"></th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="overflow-y-auto h-[calc(100%-3.5rem)]">
            <table className="min-w-full">
              <tbody>
                {models.map((model, index) => (
                  <ModelCard key={model.id} model={model} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 