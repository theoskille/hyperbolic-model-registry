'use client';

import { ReactNode, useState } from 'react';

interface DropdownMenuProps {
  trigger: ReactNode;
  items: {
    label: string;
    onClick: () => void;
    className?: string;
  }[];
}

export function DropdownMenu({ trigger, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground/70 hover:text-accent"
      >
        {trigger}
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-32 origin-top-right border-2 border-foreground bg-background">
          {items.map((item, index) => (
            <div key={index} className="py-0.5">
              <button
                onClick={() => {
                  setIsOpen(false);
                  item.onClick();
                }}
                className={`block w-full px-2 py-1 text-left text-sm ${item.className || ''}`}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 