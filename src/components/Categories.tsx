"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./ui/CourseCard";
import { useRouter } from "next/navigation";

interface MainCategory {
  id: number;
  name: string;
  subcategories: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  learners_count?: number;
}

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
}

export default function Categories() {
  const router = useRouter();
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [selectedMain, setSelectedMain] = useState<MainCategory | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const subcategoryRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const courseScrollRef = useRef<HTMLDivElement>(null);
  const [canCourseScrollLeft, setCanCourseScrollLeft] = useState(false);
  const [canCourseScrollRight, setCanCourseScrollRight] = useState(false);

  const mainCategoryRef = useRef<HTMLDivElement>(null);
  const [canMainScrollLeft, setCanMainScrollLeft] = useState(false);
  const [canMainScrollRight, setCanMainScrollRight] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  // Fetch main categories
  useEffect(() => {
    fetch(`${API_BASE}/main-categories/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched main categories:", data);
        setMainCategories(data);
        if (data.length > 0) {
          setSelectedMain(data[0]);
          if (Array.isArray(data[0]?.subcategories) && data[0].subcategories.length > 0) {
            setSelectedSub(data[0].subcategories[0]);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching main categories:", err);
        setLoading(false);
      });
  }, []);

  // Fetch courses
  useEffect(() => {
    if (!selectedSub) return;
    fetch(`${API_BASE}/courses/?subcategory=${selectedSub.slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched courses:", data);
        setCourses(data);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, [selectedSub]);

  const checkScroll = () => {
    const el = subcategoryRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const checkCourseScroll = () => {
    const el = courseScrollRef.current;
    if (!el) return;
    setCanCourseScrollLeft(el.scrollLeft > 0);
    setCanCourseScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const checkMainScroll = () => {
    const el = mainCategoryRef.current;
    if (!el) return;
    setCanMainScrollLeft(el.scrollLeft > 0);
    setCanMainScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    const el = subcategoryRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [selectedMain]);

  useEffect(() => {
    checkCourseScroll();
    const el = courseScrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkCourseScroll);
    window.addEventListener("resize", checkCourseScroll);
    return () => {
      el.removeEventListener("scroll", checkCourseScroll);
      window.removeEventListener("resize", checkCourseScroll);
    };
  }, [courses]);

  useEffect(() => {
    checkMainScroll();
    const el = mainCategoryRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkMainScroll);
    window.addEventListener("resize", checkMainScroll);
    return () => {
      el.removeEventListener("scroll", checkMainScroll);
      window.removeEventListener("resize", checkMainScroll);
    };
  }, [mainCategories]);

  const scrollBy = (distance: number) => {
    if (subcategoryRef.current) {
      subcategoryRef.current.scrollBy({ left: distance, behavior: "smooth" });
      setTimeout(checkScroll, 200);
    }
  };

  const scrollCourses = (direction: "left" | "right") => {
    const el = courseScrollRef.current;
    if (!el) return;
    const scrollAmount = el.offsetWidth || 1000;
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    setTimeout(checkCourseScroll, 200);
  };

  const scrollMainBy = (distance: number) => {
    if (mainCategoryRef.current) {
      mainCategoryRef.current.scrollBy({ left: distance, behavior: "smooth" });
      setTimeout(checkMainScroll, 200);
    }
  };

  const handleCourseClick = (courseId: number) => {
    window.open(`/courses/${courseId}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading categories...</p>;
  }

  return (
    <div>
      <div className="w-[90%] xl:w-[80%] mx-auto xl:px-8">
        <div className="my-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#2a2b3f] my-1.5">
            All the skills you need in one place
          </h2>
          <p className="font-sans text-sm md:text-base text-[#595c73]">
            From critical skills to technical topics, Udemy supports your professional development.
          </p>
        </div>

        {/* === Main Categories === */}
        <div className="relative">
          {canMainScrollLeft && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow lg:hidden"
              aria-label="Scroll left"
              onClick={() => {
                // Scroll by the width of the first main category button (if available)
                const el = mainCategoryRef.current;
                if (el && el.firstElementChild) {
                  const btn = el.firstElementChild as HTMLElement;
                  scrollMainBy(-(btn.offsetWidth + 16)); 
                } else {
                  scrollMainBy(-200);
                }
              }}
            >
              <FaChevronLeft className="text-md text-gray-800" />
            </button>
          )}
          <div
            ref={mainCategoryRef}
            className="flex gap-4 border-b border-solid border-gray-300 w-full overflow-x-auto no-scrollbar lg:overflow-visible"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {mainCategories.map((main) => (
              <button
                key={main.id}
                onClick={() => {
                  setSelectedMain(main);
                  if (Array.isArray(main.subcategories) && main.subcategories.length > 0) {
                    setSelectedSub(main.subcategories[0]);
                  } else {
                    setSelectedSub(null);
                  }
                }}
                className={`pb-2 text-md font-bold whitespace-nowrap flex-shrink-0 ${
                  selectedMain?.id === main.id
                    ? "text-[#2a2b3f] border-gray-800 border-solid border-b-2"
                    : "text-[#595c73] hover:text-[#2a2b3f]"
                }`}
              >
                {main.name}
              </button>
            ))}
          </div>
          {canMainScrollRight && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow lg:hidden"
              aria-label="Scroll right"
              onClick={() => {
                // Scroll by the width of the first main category button (if available)
                const el = mainCategoryRef.current;
                if (el && el.firstElementChild) {
                  const btn = el.firstElementChild as HTMLElement;
                  scrollMainBy(btn.offsetWidth + 16); // 16px gap-4
                } else {
                  scrollMainBy(200);
                }
              }}
            >
              <FaChevronRight className="text-md text-gray-800" />
            </button>
          )}
        </div>
      </div>

      {/* === Subcategories === */}
      <div className="bg-gray-100 py-6">
        <div className="w-[90%] xl:w-[80%] mx-auto xl:px-8 py-8">
          <div className="relative mb-6 w-full">
            {canScrollLeft && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow"
                onClick={(event) => scrollBy(-1100)}
              >
                <FaChevronLeft className="text-sm text-gray-800" />
              </button>
            )}

            <div
              ref={subcategoryRef}
              className="flex gap-2 overflow-x-auto no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {Array.isArray(selectedMain?.subcategories) &&
                selectedMain.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSub(sub)}
                    className={`rounded-full border whitespace-nowrap text-md font-bold px-8 py-3.5 flex flex-col ${
                      selectedSub?.id === sub.id
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <span>{sub.name}</span>
                    {sub.learners_count && (
                      <span className="text-xs font-normal mt-1">
                        {sub.learners_count}
                      </span>
                    )}
                  </button>
                ))}
            </div>

            {canScrollRight && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow"
                onClick={(event) => scrollBy(1100)}
              >
                <FaChevronRight className="text-sm text-gray-800" />
              </button>
            )}
          </div>

          {/* === Courses === */}
          {Array.isArray(courses) && courses.length > 0 ? (
            <div className="relative">
              {canCourseScrollLeft && (
                <button
                  onClick={(event) => scrollCourses("left")}
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
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="w-[338px] flex-shrink-0 cursor-pointer"
                    style={{ scrollSnapAlign: "start" }}
                    onClick={() => handleCourseClick(course.id)}
                  >
                    <CourseCard course={course} disableLink={true} />
                  </div>
                ))}
              </div>

              {canCourseScrollRight && (
                <button
                  onClick={(event) => scrollCourses("right")}
                  className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full hover:bg-gray-200"
                >
                  <ChevronRight />
                </button>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">No courses available.</p>
          )}
        </div>

        <div className="w-[90%] lg:w-[80%] mx-auto px-0 lg:px-8 pb-6">
          <button 
            onClick={() => selectedMain?.id && router.push(`/categories/${selectedMain.id}`)}
            className="border border-solid border-[#6d28d2] text-[#6d28d2] text-sm font-bold py-2.5 px-4 rounded-md hover:bg-[#6d28d2] hover:text-white transition-colors"
          >
            Show all {selectedMain?.name} courses
          </button>
        </div>
      </div>
    </div>
  );
}
