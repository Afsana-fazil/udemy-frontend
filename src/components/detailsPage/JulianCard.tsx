"use client";

import React, { useEffect, useState } from "react";
import CourseCard from "@/components/ui/CourseCard";

const JulianCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/?created_by=Julian&limit=3`);
        const data = await res.json();
        setCourses(data.results || data);
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
          More Courses by <span className="text-[#6d28d2]">Julian Melanson</span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading courses...</p>
        ) : courses.length > 0 ? (
            <div
            className="flex overflow-hidden gap-4 pt-4 pb-7 scrollbar-hide scroll-smooth w-full"
          >
            {courses.map((course) => (
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
      </div>
    </div>
  );
};

export default JulianCourses;
