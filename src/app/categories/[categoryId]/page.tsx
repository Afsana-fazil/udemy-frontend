"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/ui/CourseCard";
import { FolderOpen } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating_point?: string;
  rating?: string;
  reviews?: string;
  created_by?: string;
  premium?: boolean;
  best_seller?: boolean;
  students_count?: number;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  subcategories: {
    id: number;
    name: string;
    slug: string;
    learners_count?: number;
  }[];
}

export default function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = React.use(params);
  const [courses, setCourses] = useState<Course[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Set initial subcategory from URL parameters
  useEffect(() => {
    const subcategoryFromUrl = searchParams.get('subcategory');
    if (subcategoryFromUrl) {
      setActiveSubcategory(subcategoryFromUrl);
    }
  }, [searchParams]);

  // Function to update subcategory and URL
  const handleSubcategoryChange = (subcategorySlug: string | null) => {
    setActiveSubcategory(subcategorySlug);
    
    // Update URL
    const url = new URL(window.location.href);
    if (subcategorySlug) {
      url.searchParams.set('subcategory', subcategorySlug);
    } else {
      url.searchParams.delete('subcategory');
    }
    router.push(url.pathname + url.search);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Fetch category details
    fetch(`${BASE_URL}/main-categories/${categoryId}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Category not found');
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error('Category not found');
        }
        setCategory(data);
        
        // After getting category, fetch courses
        return fetch(`${BASE_URL}/courses/?main_category=${categoryId}${activeSubcategory ? `&subcategory=${activeSubcategory}` : ''}`);
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch courses');
        }
        return res.json();
      })
      .then((data) => {
        setCourses(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [categoryId, activeSubcategory]);

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

  if (error || !category) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Category Not Found
            </h2>
            <p className="text-gray-500">
              The category you're looking for doesn't exist or is no longer available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-semibold text-[#2a2b3f] mb-4">
            {category.name} Courses
          </h1>
          {category.description && (
            <p className="text-gray-600 max-w-3xl">
              {category.description}
            </p>
          )}
        </div>

        {/* Subcategories Filter */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleSubcategoryChange(null)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                  ${!activeSubcategory 
                    ? 'bg-[#6d28d2] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All
              </button>
              {category.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSubcategoryChange(sub.slug)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                    ${activeSubcategory === sub.slug
                      ? 'bg-[#6d28d2] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {sub.name}
                  {sub.learners_count && (
                    <span className="ml-2 text-xs opacity-75">
                      ({sub.learners_count})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No Courses Available
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              {activeSubcategory ? (
                <>
                  There are currently no courses available in the selected subcategory.
                  <br />
                  <button 
                    onClick={() => handleSubcategoryChange(null)}
                    className="mt-4 text-[#6d28d2] hover:underline font-medium"
                  >
                    View all {category.name} courses
                  </button>
                </>
              ) : (
                <>
                  There are currently no courses available in the {category.name} category.
                  <br />
                  <span className="block mt-2">
                    We're working on adding new courses to this category.
                    Please check back later.
                  </span>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 