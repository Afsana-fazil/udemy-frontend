import { Suspense } from 'react';
import ExploreContent from './ExploreContent';

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6d28d2]"></div></div>}>
      <ExploreContent />
    </Suspense>
  );
}