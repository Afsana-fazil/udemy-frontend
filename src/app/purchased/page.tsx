"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import CourseCard from "@/components/ui/CourseCard";
import { BookOpen, PlayCircle, BarChart3 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  students_count?: number;
  best_seller?: string;
  created_by?: string;
  purchased?: boolean;
  progress?: number;
  total_videos?: number;
  completed_videos?: number;
}

export default function PurchasedCoursesPage() {
  const { token, loading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalProgress: 0,
    completedCourses: 0
  });

  useEffect(() => {
    if (!token) return;
    setLoading(true);

    fetch(`${API_BASE}/my-courses/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(async (purchases) => {
        // Fetch full course details for each purchase
        const coursePromises = purchases.map((purchase: any) =>
          fetch(`${API_BASE}/courses/${purchase.course}/`).then(res => res.json())
        );
        const courses = await Promise.all(coursePromises);
        setCourses(courses);

        // Calculate stats
        const totalCourses = courses.length;
        const totalProgress = courses.reduce((sum: number, course: Course) => sum + (course.progress || 0), 0);
        const completedCourses = courses.filter((course: Course) => (course.progress || 0) >= 100).length;

        setStats({
          totalCourses,
          totalProgress: totalCourses ? Math.round(totalProgress / totalCourses) : 0,
          completedCourses
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching purchased courses:', error);
        setLoading(false);
      });
  }, [token]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6d28d2] mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-[#2a2b3f]">My Learning Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-[#2a2b3f]">{stats.totalCourses}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart3 size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Progress</p>
              <p className="text-2xl font-bold text-[#2a2b3f]">{stats.totalProgress}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <PlayCircle size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-[#2a2b3f]">{stats.completedCourses}</p>
            </div>
          </div>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No courses purchased yet</h2>
            <p className="text-gray-500 mb-6">Start your learning journey by exploring our course catalog</p>
            <a
              href="/courses"
              className="bg-[#6d28d2] text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors"
            >
              Browse Courses
            </a>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-6 text-[#2a2b3f]">My Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={{ 
                  ...course, 
                  rating: course.rating ? String(course.rating) : undefined,
                  best_seller: Boolean(course.best_seller)
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 