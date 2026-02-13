import { ReactNode } from "react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/courses/${resolvedParams.id}/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Not found');
    const course = await res.json();
    return {
      title: `${course.title} | Udemy`,
    };
  } catch {
    return {
      title: 'Course | Udemy',
    };
  }
}

export default function CourseLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 