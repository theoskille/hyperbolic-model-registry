'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 128, // 128px is the width of the dropdown (w-32)
      });
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground/70 hover:text-accent"
      >
        {trigger}
      </button>
      {isOpen && createPortal(
        <div 
          className="fixed z-50 w-32 border-2 border-foreground bg-background shadow-lg"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
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
        </div>,
        document.body
      )}
    </div>
  );
} 