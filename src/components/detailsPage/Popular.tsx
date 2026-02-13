"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import extraData from "../data/extraCourseData.json";
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

// Define types for the API response and extra data
interface ApiCourse {
  id: string | number;
  image: string;
  title: string;
  best_seller: boolean;
  updated_at: string;
  rating_point: number;
  price: number | string;
}

interface ExtraData {
  id: string | number;
  total_hours: string | number;
  students: number;
}

// Define a Course type for better type safety
interface Course {
  id: string | number;
  image: string;
  title: string;
  best_seller: boolean;
  total_hours: string | number;
  students: number;
  updated_at: string;
  rating_point: number;
  price: number | string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Utility to get user-specific key
function getUserKey(base: string, user: any) {
  if (!user) return base + '_guest';
  return user.id ? `${base}_${user.id}` : `${base}_${user.email}`;
}

export default function Popular() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [visibleCourses, setVisibleCourses] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const [wishlistMap, setWishlistMap] = useState<{ [key: string]: string }>({}); // courseId -> wishlistId
  const router = useRouter();
  const { user, token } = useAuth();

  useEffect(() => {
    fetch("http://localhost:8000/api/courses/")
      .then((res) => res.json())
      .then((apiCourses: ApiCourse[]) => {
        const selected = apiCourses.slice(0, 10);
        const mergedCourses = selected.map((course: ApiCourse) => {
          const extra = (extraData as ExtraData[]).find(
            (item) => String(item.id) === String(course.id)
          );

          if (!extra) {
            console.warn(`No extra data found for course ID ${course.id}`);
          }

          return {
            ...course,
            total_hours: extra?.total_hours ?? "—",
            students: extra?.students ?? 0,
          };
        });

        setCourses(mergedCourses);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!token) {
      setLiked({});
      setWishlistMap({});
      return;
    }
    fetch(`${API_BASE}/wishlist/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        // Defensive: always get the array
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : Array.isArray(data?.data)
              ? data.data
              : [];
        const likedObj: { [key: string]: boolean } = {};
        const map: { [key: string]: string } = {};
        items.forEach((item: any) => {
          likedObj[String(item.course.id)] = true;
          map[String(item.course.id)] = String(item.id);
        });
        setLiked(likedObj);
        setWishlistMap(map);
      });
  }, [token, courses]);

  const handleShowMore = () => setVisibleCourses(10);
  const handleShowLess = () => {
    setVisibleCourses(6);
    const h2 = document.querySelector("h2");
    if (h2) {
      window.scrollTo({
        top: h2.offsetTop - 20,
        behavior: "smooth",
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  const toggleWishlist = async (course: Course) => {
    if (!token) {
      router.push('/signup');
      return;
    }
    const courseId = String(course.id);
    if (liked[courseId]) {
      // Remove from wishlist
      const wishlistId = wishlistMap[courseId];
      await fetch(`${API_BASE}/wishlist/${wishlistId}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setLiked(prev => ({ ...prev, [courseId]: false }));
      setWishlistMap(prev => { const copy = { ...prev }; delete copy[courseId]; return copy; });
      window.dispatchEvent(new Event('wishlist-updated'));
    } else {
      // Add to wishlist
      const res = await fetch(`${API_BASE}/wishlist/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course_id: course.id }),
      });
      if (res.ok) {
        const data = await res.json();
        setLiked(prev => ({ ...prev, [courseId]: true }));
        setWishlistMap(prev => ({ ...prev, [courseId]: String(data.id) }));
        window.dispatchEvent(new Event('wishlist-updated'));
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-8 my-10">
      <div className="lg:w-[63.4%] text-[#2a2b3f]">
        <h2 className="text-2xl font-bold mb-6">Students also bought</h2>

        {isLoading ? (
          <div className="text-center py-10">Loading courses...</div>
        ) : (
          <>
            <div className="space-y-6">
              {courses.slice(0, visibleCourses).map((course) => (
                <div className="flex items-start gap-4 border-b border-solid border-[#d1d2e0] pb-3 hover:bg-gray-50 transition-all" key={course.id}>
                  <Link
                    href={`/courses/${course.id}`}
                    className="block"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-20 h-16 object-cover"
                    />
                  </Link>
                  <div className="flex items-start justify-between gap-6 w-full">
                    <div>
                      <h3 className="font-bold text-[#303141]">{course.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs mt-1">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-xs ${
                            course.best_seller
                              ? "text-[#0d5261] bg-[#c2e9eb]"
                              : "text-white bg-[#5022c3]"
                          }`}
                        >
                          {course.best_seller ? "Bestseller" : "Premium"}
                        </span>

                        <span className="text-[#206241] font-bold text-sm">
                          {course.total_hours} total hours
                        </span>
                        <span className="text-gray-900">•</span>
                        <span className="text-sm">
                          Updated {formatDate(course.updated_at)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 text-sm">
                      <span className="font-bold text-[#8b4309] flex gap-1 items-center">
                        {course.rating_point}
                        <svg
                          height="12px"
                          width="12px"
                          viewBox="0 0 47.94 47.94"
                          fill="#c4710d"
                        >
                          <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                          c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                          c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                          c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                          c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                          C22.602,0.567,25.338,0.567,26.285,2.486z"/>
                        </svg>
                      </span>
                      <span className="text-sm flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-people"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                        </svg>
                        {course.students.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm ml-4 flex items-start gap-2">
                    <p className="font-bold text-[#2a2b3f]">₹{course.price}</p>
                    <button
                      className="border border-solid rounded-full p-2 border-[#6d28d2] hover:bg-purple-100"
                      onClick={() => toggleWishlist(course)}
                    >
                      <svg width="18px" height="18px" viewBox="0 0 24 24" fill={liked[String(course.id)] ? "#6d28d2" : "none"}>
                        <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                          stroke="#6d28d2" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 flex justify-center gap-4">
              {visibleCourses < 10 && (
                <button
                  className="text-[#6d28d2] text-sm font-bold border border-solid border-[#6d28d2] p-1.5 w-full rounded hover:bg-purple-100"
                  onClick={handleShowMore}
                >
                  Show more
                </button>
              )}
              {visibleCourses > 6 && (
                <button
                  className="text-[#6d28d2] text-sm font-bold border border-solid border-[#6d28d2] p-1.5 w-full rounded hover:bg-purple-100"
                  onClick={handleShowLess}
                >
                  Show less
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
