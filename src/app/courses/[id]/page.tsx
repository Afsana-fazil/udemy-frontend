import { redirect } from 'next/navigation';
import CourseDetails from '@/components/pages/CourseDetails';

export const metadata = {
  title: 'The Complete AI Guide: Learn ChatGPT, Generative AI & More | Udemy',
};

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}/`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    redirect('/not-found');
  }

  const course = await res.json();

  return <CourseDetails course={course} />;
}