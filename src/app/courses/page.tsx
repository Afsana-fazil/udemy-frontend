import { Suspense } from 'react';
import CoursesContent from './CoursesContent';

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6d28d2]"></div>
      </div>
    }>
      <CoursesContent />
    </Suspense>
  );
}