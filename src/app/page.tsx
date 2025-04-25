import { getModels } from '@/app/actions';
import { ModelList } from '@/components/ModelList';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { unstable_cache } from 'next/cache';

const getCachedModels = unstable_cache(
  async () => getModels(),
  ['models'],
  { tags: ['models'] }
);

export default async function Home() {
  const models = await getCachedModels();
  
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-1 p-4">
        <div className="flex items-end mb-8">
          <Image
            src="/hyperbolic_ascii_logo.png"
            alt="Model Registry Logo"
            width={400}
            height={100}
            className="w-auto h-auto"
            priority
          />
          <h1 className="text-x1 font-medium text-accent ml-2 mb-2">Model Registry</h1>
        </div>
        <ModelList models={models} />
      </div>
      <Footer />
    </div>
  );
} 