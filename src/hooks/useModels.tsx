'use client'

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Model, Framework, CreateModelData } from '@/types/models';

type FrameworkFilter = Framework | 'All';

interface ModelsContextType {
    models: Model[];
    filteredModels: Model[];
    selectedFramework: FrameworkFilter;
    setSelectedFramework: (framework: FrameworkFilter) => void;
    setModels: (models: Model[]) => void;
    registerModel: (model: CreateModelData) => Promise<void>;
    deleteModel: (modelId: string) => Promise<void>;
    fetchModels: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const ModelsContext = createContext<ModelsContextType>({
    models: [],
    filteredModels: [],
    selectedFramework: 'All',
    setSelectedFramework: () => {},
    setModels: () => {},
    registerModel: async () => {},
    deleteModel: async () => {},
    fetchModels: async () => {},
    isLoading: false,
    error: null
});

export function useModels() {
    const context = useContext(ModelsContext);
    if (!context) {
        throw new Error('useModels must be used within an ModelsProvider');
    }
    return context;
}

export function ModelsProvider({ children }: { children: React.ReactNode }) {
    const [models, setModelsState] = useState<Model[]>([]);
    const [selectedFramework, setSelectedFramework] = useState<FrameworkFilter>('All');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Memoize filtered models to prevent unnecessary recalculations
    const filteredModels = useMemo(() => {
        if (selectedFramework === 'All') return models;
        return models.filter(model => model.framework === selectedFramework);
    }, [models, selectedFramework]);

    const fetchModels = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/models');
            if (!res.ok) throw new Error('Failed to fetch models');
            const data = await res.json();
            setModelsState(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch models');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const registerModel = async (model: CreateModelData) => {
        setIsLoading(true);
        setError(null);
        
        // Create optimistic model with temporary ID
        const optimisticModel: Model = {
            ...model,
            id: 'temp-' + Date.now()
        };
        
        // Optimistically update the UI
        setModelsState(prevModels => [...prevModels, optimisticModel]);

        try {
            const res = await fetch('/api/models', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(model),
            });
            if (!res.ok) throw new Error('Failed to create model');
            const newModel = await res.json();
            
            // Replace optimistic model with real one
            setModelsState(prevModels => 
                prevModels.map(m => m.id === optimisticModel.id ? newModel : m)
            );
        } catch (err) {
            // Revert on error
            setModelsState(prevModels => 
                prevModels.filter(m => m.id !== optimisticModel.id)
            );
            setError(err instanceof Error ? err.message : 'Failed to create model');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteModel = async (modelId: string) => {
        setIsLoading(true);
        setError(null);
        
        // Store the model being deleted for potential rollback
        const modelToDelete = models.find(m => m.id === modelId);
        
        // Optimistically remove from UI
        setModelsState(prevModels => 
            prevModels.filter(model => model.id !== modelId)
        );

        try {
            const res = await fetch(`/api/models?id=${modelId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete model');
        } catch (err) {
            // Revert on error
            if (modelToDelete) {
                setModelsState(prevModels => [...prevModels, modelToDelete]);
            }
            setError(err instanceof Error ? err.message : 'Failed to delete model');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const value: ModelsContextType = {
        models,
        filteredModels,
        selectedFramework,
        setSelectedFramework,
        setModels: setModelsState,
        registerModel,
        deleteModel,
        fetchModels,
        isLoading,
        error
    };

    return (
        <ModelsContext.Provider value={value}>
            {children}
        </ModelsContext.Provider>
    );
}