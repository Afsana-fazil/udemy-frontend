// /app/courses/[id]/page.tsx
import { redirect } from 'next/navigation';
import CourseDetails from '@/components/pages/CourseDetails';

export const metadata = {
  title: 'The Complete AI Guide: Learn ChatGPT, Generative AI & More | Udemy',
};

export default async function CourseDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch course data from API
  const res = await fetch(`http://localhost:8000/api/courses/${id}/`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    redirect('/not-found');
  }

  const course = await res.json();

  return <CourseDetails course={course} />;
}