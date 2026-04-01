"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CourseCard from '@/components/ui/CourseCard';
import { Search, ArrowLeft } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query') || '';
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setCourses([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    fetch(`${API_BASE}/courses/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        const filtered = data.filter((c: any) => 
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()) ||
          c.created_by?.toLowerCase().includes(query.toLowerCase())
        );
        setCourses(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#6d28d2] hover:text-purple-700 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <Search size={24} className="text-[#6d28d2]" />
            <h1 className="text-3xl font-bold text-[#2a2b3f]">
              Search Results for "{query}"
            </h1>
          </div>
          
          <p className="text-gray-600">
            Found {courses.length} course{courses.length !== 1 ? 's' : ''} matching your search
          </p>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6d28d2] mb-4"></div>
            <p className="text-gray-600">Searching courses...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-red-600 mb-2">Error</h2>
              <p className="text-gray-500 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#6d28d2] hover:bg-purple-700 text-white font-bold text-base rounded-md py-3 px-8 focus:outline-none"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <Search size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No courses found</h2>
              <p className="text-gray-500 mb-6">
                We couldn't find any courses matching "{query}". Try different keywords or browse our course catalog.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push("/courses")}
                  className="bg-[#6d28d2] hover:bg-purple-700 text-white font-bold text-base rounded-md py-3 px-8 focus:outline-none"
                >
                  Browse All Courses
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base rounded-md py-3 px-8 focus:outline-none"
                >
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 