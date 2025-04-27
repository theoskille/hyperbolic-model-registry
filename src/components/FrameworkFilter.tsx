'use client';

import { useModels } from '@/hooks/useModels';

export function FrameworkFilter() {
    const { selectedFramework, setSelectedFramework } = useModels();

    return (
        <select
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value as typeof selectedFramework)}
            className="terminal-button"
        >
            <option value="All">All Frameworks</option>
            <option value="PyTorch">PyTorch</option>
            <option value="TensorFlow">TensorFlow</option>
            <option value="JAX">JAX</option>
            <option value="Other">Other</option>
        </select>
    );
} 