'use client';

import { createPortal } from 'react-dom';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  details: {
    label: string;
    value: string;
  }[];
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  details,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-md border-2 border-foreground bg-background p-6">
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-foreground/70">{message}</p>
          <div className="mt-2 space-y-1 text-sm">
            {details.map((detail, index) => (
              <p key={index}>
                <span className="text-foreground/70">{detail.label}:</span> {detail.value}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="terminal-button">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="danger-button">
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
} 