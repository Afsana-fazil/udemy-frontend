"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CourseCard from "@/components/ui/CourseCard";
import { FolderOpen, ChevronLeft, ChevronRight } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  students_count?: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("category");
  const pageParam = searchParams.get("page");

  const COURSES_PER_PAGE = 8;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    // Set current page from URL parameter
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    } else {
      setCurrentPage(1);
    }
  }, [pageParam]);

  useEffect(() => {
    setLoading(true);
    
    if (categoryId) {
      // Fetch courses for a specific category
      // Fetch category name
      fetch(`${BASE_URL}/api/main-categories/${categoryId}/`)
        .then((res) => res.json())
        .then((data) => {
          setCategoryName(data.name);
        })
        .catch((err) => console.error("Error fetching category:", err));

      // Fetch courses for the category
      fetch(`${BASE_URL}/api/courses/?main_category=${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          setCourses(data);
          setTotalPages(Math.ceil(data.length / COURSES_PER_PAGE));
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching courses:", err);
          setLoading(false);
        });
    } else {
      // Fetch all courses from every category
      fetch(`${BASE_URL}/api/courses/`)
        .then((res) => res.json())
        .then((data) => {
          setCourses(data);
          setTotalPages(Math.ceil(data.length / COURSES_PER_PAGE));
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching courses:", err);
          setLoading(false);
        });
    }
  }, [categoryId, BASE_URL]);

  useEffect(() => {
    document.title = categoryName
      ? `${categoryName} Courses | Udemy`
      : "All Courses | Udemy";
  }, [categoryName]);

  // Get current page courses
  const getCurrentPageCourses = () => {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    const endIndex = startIndex + COURSES_PER_PAGE;
    return courses.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`?${params.toString()}`);
    }
  };

  // Generate page numbers for navigation
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6d28d2]"></div>
            <p className="text-gray-500 mt-4">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentPageCourses = getCurrentPageCourses();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-semibold text-[#2a2b3f] mb-4">
            {categoryName ? `${categoryName} Courses` : "All Courses"}
          </h1>
        </div>
        
        {currentPageCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {currentPageCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={{
                    ...course,
                    rating: course.rating !== undefined ? String(course.rating) : undefined,
                  }}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    disabled={page === "..."}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      page === currentPage
                        ? "bg-[#6d28d2] text-white"
                        : page === "..."
                        ? "text-gray-400 cursor-default"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No Courses Available
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              {categoryName 
                ? `There are currently no courses available in the ${categoryName} category. Please check back later or explore other categories.`
                : "There are currently no courses available. Please check back later."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 