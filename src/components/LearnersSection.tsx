"use client";

import { useEffect, useRef, useState } from "react";
import CourseCard from "../components/ui/CourseCard"; 
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import { useSearch } from "../contexts/SearchContext";

interface Course {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  created_by: string;
  [key: string]: any;
}

export default function LearnersSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [canCourseScrollLeft, setCanCourseScrollLeft] = useState(false);
  const [canCourseScrollRight, setCanCourseScrollRight] = useState(false);
  const courseScrollRef = useRef<HTMLDivElement>(null);
  const { searchQuery, isSearching } = useSearch();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/`); 
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();

        const shuffled = data.sort(() => Math.random() - 0.5);

        setCourses(shuffled);
        setFilteredCourses(shuffled);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = courses.filter((course) => {
        const title = course.title?.toLowerCase() || '';
        const description = course.description?.toLowerCase() || '';
        const instructor = course.created_by?.toLowerCase() || '';
        const searchLower = searchQuery.toLowerCase();
        
        return title.includes(searchLower) || 
               description.includes(searchLower) || 
               instructor.includes(searchLower);
      });
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  }, [searchQuery, courses]);

  const updateScrollButtons = () => {
    const scrollEl = courseScrollRef.current;
    if (scrollEl) {
      setCanCourseScrollLeft(scrollEl.scrollLeft > 0);
      setCanCourseScrollRight(scrollEl.scrollLeft + scrollEl.clientWidth < scrollEl.scrollWidth);
    }
  };

  useEffect(() => {
    const scrollEl = courseScrollRef.current;
    if (!scrollEl) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScrollButtons, 100);
    };

    scrollEl.addEventListener("scroll", handleScroll);
    updateScrollButtons(); // initial check

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [filteredCourses]);

  const scrollCourses = (direction: 'left' | 'right') => {
    const scrollEl = courseScrollRef.current;
    if (!scrollEl) return;

    // Scroll by one card width + gap (266px card + 16px gap)
    const scrollAmount = 266 + 16;

    scrollEl.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    // Delay updateScrollButtons to let scroll finish smoothly
    setTimeout(updateScrollButtons, 500); 
  };

  // If searching and no results, show message
  if (isSearching && filteredCourses.length === 0 && !loading) {
    return (
      <section className="w-[90%] lg:w-[80%] mx-auto pt-16 pb-8 px-8">
        <div>
          <h2 className="text-4xl font-serif font-semibold text-[#2a2b3f] tracking-wide my-1.5">
            Search Results
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            No courses found for "{searchQuery}"
          </p>
        </div>
      </section>
    );
  }

  // If searching and has results, show filtered results
  if (isSearching && filteredCourses.length > 0) {
    return (
      <section className="w-[90%] lg:w-[80%] mx-auto pt-16 pb-8 lg:px-8">
        <div>
          <h2 className="text-4xl font-serif font-semibold text-[#2a2b3f] tracking-wide my-1.5">
            Search Results for "{searchQuery}"
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="relative">
          {canCourseScrollLeft && (
            <button
              onClick={() => scrollCourses("left")}
              className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full hover:bg-gray-200"
            >
              <ChevronLeft />
            </button>
          )}

          <div
            ref={courseScrollRef}
            className="flex overflow-hidden gap-4 py-4 scrollbar-hide scroll-smooth w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="w-[266px] flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          {canCourseScrollRight && (
            <button
              onClick={() => scrollCourses("right")}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full hover:bg-gray-200"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </section>
    );
  }

  // If not searching, show original "Learners are viewing" section
  return (
    <section className="w-[90%] xl:w-[80%] mx-auto pt-16 pb-8 px-8">
        <div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#2a2b3f] tracking-wide my-1.5">
                Learners are viewing
            </h2>
        </div>
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading courses...</p>
      ) : filteredCourses.length > 0 ? (
        <div className="relative">
          {canCourseScrollLeft && (
            <button
              onClick={() => scrollCourses("left")}
              className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full hover:bg-gray-200"
            >
              <ChevronLeft />
            </button>
          )}

          <div
            ref={courseScrollRef}
            className="flex overflow-hidden gap-4 py-4 scrollbar-hide scroll-smooth w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="w-[266px] flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          {canCourseScrollRight && (
            <button
              onClick={() => scrollCourses("right")}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full hover:bg-gray-200"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No courses available.</p>
      )}
    </section>
  );
}
