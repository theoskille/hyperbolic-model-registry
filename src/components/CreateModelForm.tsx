'use client';

import { useState } from 'react';
import { createModel } from '@/app/actions';
import { Framework } from '@/types/models';

export function CreateModelForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as { name: string; version: string; framework: Framework };
      await createModel(data);
      setError(null);
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
            <div className="fixed inset-0 bg-foreground/75 transition-opacity" onClick={() => setIsOpen(false)} />
            
            <div className="relative transform overflow-hidden rounded-lg bg-background px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
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
                          className="mt-1 block w-full rounded-md border-foreground/20 bg-background text-foreground shadow-sm focus:border-foreground/50 focus:ring-foreground/50 sm:text-sm"
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
                          className="mt-1 block w-full rounded-md border-foreground/20 bg-background text-foreground shadow-sm focus:border-foreground/50 focus:ring-foreground/50 sm:text-sm"
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
                          className="mt-1 block w-full rounded-md border-foreground/20 bg-background text-foreground shadow-sm focus:border-foreground/50 focus:ring-foreground/50 sm:text-sm"
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
                          className="inline-flex w-full justify-center rounded-md bg-foreground/10 px-3 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-foreground/20 sm:ml-3 sm:w-auto"
                        >
                          Register
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-inset ring-foreground/20 hover:bg-foreground/5 sm:mt-0 sm:w-auto"
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