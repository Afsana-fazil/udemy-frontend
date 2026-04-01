import { Suspense } from 'react';
import CourseVideos from '@/components/pages/CourseVideos';

export default function CourseVideosPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseVideos />
    </Suspense>
  );
}