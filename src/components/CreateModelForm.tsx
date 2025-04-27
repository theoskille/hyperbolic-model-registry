'use client';

import { useState } from 'react';
import { Framework } from '@/types/models';

export function CreateModelForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as { name: string; version: string; framework: Framework };
      const res = await fetch('/api/models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setError(null);
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="terminal-button"
      >
        Register Model
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setIsOpen(false)} />
            
            <div className="relative transform overflow-hidden border-2 border-foreground bg-background px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-background text-foreground/70 hover:text-foreground focus:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-base font-semibold leading-6 text-foreground">Register New Model</h3>
                  <div className="mt-4">
                    <form action={handleSubmit} className="space-y-4">
                      {error && <div className="text-red-500 text-sm">{error}</div>}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground">
                          Model Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          className="mt-1 block w-full border-2 border-foreground bg-background text-foreground shadow-sm focus:border-accent focus:outline-none sm:text-sm"
                          placeholder="Enter model name"
                        />
                      </div>
                      <div>
                        <label htmlFor="version" className="block text-sm font-medium text-foreground">
                          Version
                        </label>
                        <input
                          type="text"
                          name="version"
                          id="version"
                          required
                          className="mt-1 block w-full border-2 border-foreground bg-background text-foreground shadow-sm focus:border-accent focus:outline-none sm:text-sm"
                          placeholder="Enter version"
                        />
                      </div>
                      <div>
                        <label htmlFor="framework" className="block text-sm font-medium text-foreground">
                          Framework
                        </label>
                        <select
                          id="framework"
                          name="framework"
                          required
                          className="mt-1 block w-full border-2 border-foreground bg-background text-foreground shadow-sm focus:border-accent focus:outline-none sm:text-sm"
                        >
                          <option value="">Select a framework</option>
                          <option value="PyTorch">PyTorch</option>
                          <option value="TensorFlow">TensorFlow</option>
                          <option value="JAX">JAX</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="terminal-button"
                        >
                          Register
                        </button>
                        <button
                          type="button"
                          className="terminal-button mt-3 sm:mt-0 sm:ml-3"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 