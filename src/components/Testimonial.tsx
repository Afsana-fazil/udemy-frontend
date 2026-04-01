'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Testimonial {
  id: number;
  content: string;
  name: string;
  profile: string;
  course: {
    id: number;
    name: string;
  };
}

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log('Fetched testimonials:', data)
        setTestimonials(data)
      })
      .catch(error => console.error('Error fetching testimonials:', error))
  }, [])

  const handleCourseNav = async (courseName: string) => {
    try {
      // First, try to find the main category that contains this course
      const categoriesRes = await fetch('/api/main-categories/');
      const categories = await categoriesRes.json();
      
      // Try to match course name with subcategory names to find the main category
      let matchingMainCategory = null;
      for (const category of categories) {
        if (category.subcategories && Array.isArray(category.subcategories)) {
          const matchingSubcategory = category.subcategories.find((sub: any) => 
            sub.name.toLowerCase().includes(courseName.toLowerCase()) ||
            courseName.toLowerCase().includes(sub.name.toLowerCase())
          );
          if (matchingSubcategory) {
            matchingMainCategory = category;
            break;
          }
        }
      }
      
      if (matchingMainCategory) {
        // Navigate to the main category courses page
        router.push(`/categories/${matchingMainCategory.id}`);
        return;
      }
      
      // Fallback: search by course title to find the main category
      const coursesRes = await fetch('/api/courses/');
      const courses = await coursesRes.json();
      const course = courses.find((c: any) => c.title.toLowerCase().includes(courseName.toLowerCase()));
      
      if (course && course.sub_category && course.sub_category.main_category) {
        // Navigate to the main category courses page
        router.push(`/categories/${course.sub_category.main_category.id}`);
      } else {
        // If no match found, navigate to all courses page
        router.push('/courses');
      }
    } catch (err) {
      console.error('Error navigating to course:', err);
      // Fallback to all courses page
      router.push('/courses');
    }
  };

  return (
    <section className="bg-gray-100">
      <section className="w-[90%] lg:w-[80%] mx-auto py-16">
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-[#2a2b3f] mb-10'>
          See what others are achieving through learning
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-solid border-[#d1d2e0] transition flex flex-col justify-between">
              <div className='flex flex-col justify-between'>
                <img src="/assets/icons/quote.svg" alt="quotes-icon" className='w-5 mb-4' />
                <p className="text-[#2a2b3f] text-sm mb-4 leading-normal">{item.content}</p>
              </div>

              <div className='flex items-start gap-3 mt-5'>
                <img
                  src={item.profile}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h4 className="text-xs text-[#595c73] font-medium mt-2">{item.name}</h4>
              </div>

              <div className='mt-4 flex gap-1 items-center'>
                  <button 
                    onClick={() => handleCourseNav(item.course.name)}
                    className="text-xs text-[#6d28d2] hover:underline cursor-pointer"
                  >
                      View this {item.course.name} course
                  </button>
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
