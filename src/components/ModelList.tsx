import { Model } from '@/types/models';
import { ModelCard } from './ModelCard';
import { CreateModelForm } from './CreateModelForm';

interface ModelListProps {
  models: Model[];
}

export function ModelList({ models }: ModelListProps) {
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
        <div className="h-full border-2 border-foreground">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-foreground border-r-2 border-foreground">Name</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground border-r-2 border-foreground">Version</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Framework</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model, index) => (
                <ModelCard key={model.id} model={model} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 