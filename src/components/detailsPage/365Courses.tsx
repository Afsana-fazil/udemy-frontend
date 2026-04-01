"use client";

import React, { useEffect, useState } from "react";
import CourseCard from "@/components/ui/CourseCard";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  rating?: string;
  image: string;
  image_url?: string;
  created_by: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/?created_by=365&limit=3`);
        const data = await res.json();
        // Map to ensure 'image' property exists for CourseCard
        const normalized = (data.results || data).map((course: any) => ({
          ...course,
          image: course.image || course.image_url || "/assets/empty-shopping-cart-v2.webp",
          rating: course.rating ? String(course.rating) : undefined
        }));
        setCourses(normalized);
      } catch (error) {
        console.error("Error fetching courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="lg:w-[63%]">
        <h2 className="text-2xl font-semibold mb-2">
          More Courses by <span className="text-[#6d28d2]">365 Careers</span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading courses...</p>
        ) : courses.length > 0 ? (
            <div
            className="flex overflow-hidden gap-4 pt-4 pb-7 scrollbar-hide scroll-smooth w-full"
          >
            {courses.slice(0, 2).map((course) => (
              <div
                key={course.id}
                className="w-[266px] flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No courses available.</p>
        )}

        <div className="text-center my-6 relative">
          <button 
            onClick={() => {
              setShowPopup(true);
              setTimeout(() => setShowPopup(false), 2000);
            }}
            className="text-[#6d28d2] text-sm font-bold border border-solid border-[#6d28d2] p-1.5 w-full rounded hover:bg-purple-100"
          >
            Report Abuse
          </button>

          {showPopup && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white shadow-lg rounded-lg p-3 border border-gray-200 animate-fade-in-out">
              <p className="text-gray-800 font-medium text-sm whitespace-nowrap">Report submitted successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
