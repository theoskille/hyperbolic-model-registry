'use client';

import { Model } from '@/types/models';
import { useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal';
import { DropdownMenu } from './DropdownMenu';

interface ModelCardProps {
  model: Model;
  index: number;
}

export function ModelCard({ model, index }: ModelCardProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/models?id=${model.id}`, {
        method: 'DELETE',
      });
      if(!res.ok) {
        throw new Error('Failed to delete model');
      }
      setIsConfirmOpen(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    }
  };

  return (
    <>
      <tr className={`hover:bg-foreground/5 group ${index % 2 === 0 ? 'bg-foreground/2' : ''}`}>
        <td className="w-[30%] whitespace-nowrap py-4 pl-6 pr-3 text-sm text-foreground group-hover:text-accent dashed-border border-r-0 border-b-0 border-t-0">
          {model.name}
        </td>
        <td className="w-[30%] whitespace-nowrap px-3 py-4 text-sm text-foreground/70 group-hover:text-accent dashed-border border-r-0 border-b-0 border-t-0">
          {model.version}
        </td>
        <td className="w-[30%] whitespace-nowrap px-3 py-4 text-sm text-foreground/70 group-hover:text-accent">
          {model.framework}
        </td>
        <td className="w-[10%] relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
          <DropdownMenu
            trigger={<span>•••</span>}
            items={[
              {
                label: 'Delete',
                onClick: () => setIsConfirmOpen(true),
                className: 'danger-button',
              },
            ]}
          />
        </td>
      </tr>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this model?"
        details={[
          { label: 'Name', value: model.name },
          { label: 'Version', value: model.version },
          { label: 'Framework', value: model.framework },
        ]}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </>
  );
} 