'use client';

import { Model } from '@/types/models';
import { useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal';
import { DropdownMenu } from './DropdownMenu';
import { deleteModel } from '@/app/actions';

interface ModelCardProps {
  model: Model;
  index: number;
}

export function ModelCard({ model, index }: ModelCardProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = async () => {
    console.log('handle delete called');
    try {
      await deleteModel(model.id);
      setIsConfirmOpen(false);
    } catch (error) {
      console.error('Failed to delete model:', error);
      // TODO: Add error handling UI
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
      />
    </>
  );
} 