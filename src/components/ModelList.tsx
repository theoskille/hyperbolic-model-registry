'use client'

import { ModelCard } from './ModelCard';
import { CreateModelForm } from './CreateModelForm';
import { FrameworkFilter } from './FrameworkFilter';
import { useEffect } from 'react';
import { useModels } from '@/hooks/useModels';

export function ModelList() {
  const { filteredModels, fetchModels, isLoading, error } = useModels();
  
  useEffect(() => {
    fetchModels();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <div className="text-foreground">Loading models...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h2 className="text-base font-semibold leading-6 text-foreground">Models</h2>
          <p className="mt-2 text-sm text-foreground/70">
            A list of all models in the registry.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-4">
          <FrameworkFilter />
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
                {filteredModels.map((model, index) => (
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