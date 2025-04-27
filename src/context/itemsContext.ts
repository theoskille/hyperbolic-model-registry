import React, { createContext, useContext, useState } from 'react';
import { Model } from '@/types/models';

interface ModelsContextType {
    models: Model[];
    registerModel: (model: Model) => void;
    deleteModel: (modelId: string) => void;
}

const ModelsContext = createContext<ModelsContextType>({
    models: [],
    registerModel: () => {},
    deleteModel: () => {}
  });

export function useModels() {
    const context = useContext(ModelsContext);
    if (!context) {
        throw new Error('useModels must be used within an ModelsProvider');
    }
    return context;
}

export function ModelsProvider({ children }) {
    const [models, setModels] = useState<Model[]>([]);

    // Functions to manipulate the Models list
    const registerModel = (newModel: Model) => {
        setModels([...models, newModel]);
    };

    const deleteModel = (modelId: string) => {
        setModels(models.filter(model => model.id !== modelId));
    };

    // The value object contains the state and functions
    const value: ModelsContextType = {
        models,
        registerModel,
        deleteModel
    };

    return (
        <ModelsContext.Provider value={value}>
            {children}
        </ModelsContext.Provider>
    );
}