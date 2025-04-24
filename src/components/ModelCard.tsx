import { Model } from '@/types/models';

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <tr className="border-b-2 dashed-border border-foreground last:border-b-0 hover:bg-foreground/5 group">
      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-foreground border-r-2 dashed-border border-foreground group-hover:text-accent">
        {model.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-foreground/70 border-r-2 dashed-border border-foreground group-hover:text-accent">
        {model.version}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-foreground/70 group-hover:text-accent">
        {model.framework}
      </td>
    </tr>
  );
} 