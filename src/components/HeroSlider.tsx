'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useRouter } from 'next/navigation';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useAuth } from '../contexts/AuthContext';

const HeroSlider = () => {
  const router = useRouter();
  const { user } = useAuth();
  const slides = [
    {
      id: 1,
      img: '/assets/hero-image.jpg',
      title: 'In-demand skills. Available on demand.',
      subtitle: 'Get the top skills that others are using to advance their careers.',
      btn1: 'Learn Python',
      btn2: 'Learn Excel'
    },
    {
      id: 2,
      img: '/assets/hero-image2.jpg',
      title: 'Skills that drive you forward',
      subtitle: "Technology and the world of work change fast — with us, you're faster. Get the skills to achieve goals and stay competitive.",
      btn1: 'View Plans',
      btn2: null
    }
  ]

  let swiperRef = null;

  // Helper to handle course navigation
  const handleCourseNav = async (courseName: string) => {
    try {
      // First, try to find courses by subcategory
      const categoriesRes = await fetch('/api/main-categories/');
      const categories = await categoriesRes.json();
      
      // Try to match course name with subcategory names
      let matchingSubcategory = null;
      for (const category of categories) {
        if (category.subcategories && Array.isArray(category.subcategories)) {
          matchingSubcategory = category.subcategories.find((sub: any) => 
            sub.name.toLowerCase().includes(courseName.toLowerCase()) ||
            courseName.toLowerCase().includes(sub.name.toLowerCase())
          );
          if (matchingSubcategory) break;
        }
      }
      
      if (matchingSubcategory) {
        // Fetch courses by subcategory
        const coursesRes = await fetch(`/api/courses/?subcategory=${matchingSubcategory.slug}`);
        const courses = await coursesRes.json();
        
        if (courses && courses.length > 0) {
          // Navigate to the first course found
          router.push(`/courses/${courses[0].id}`);
          return;
        }
      }
      
      // Fallback: search by title
      const res = await fetch('/api/courses/');
      const data = await res.json();
      const course = data.find((c: any) => c.title.toLowerCase().includes(courseName.toLowerCase()));
      if (course) {
        router.push(`/courses/${course.id}`);
      } else {
        router.push('/no-course');
      }
    } catch (err) {
      router.push('/no-course');
    }
  };

  let initials = 'U';
    if (user?.full_name) {
      const names = user.full_name.trim().split(' ');
      if (names.length === 1) {
        initials = names[0][0]?.toUpperCase() || 'U';
      } else if (names.length > 1) {
        initials = (names[0][0] || '') + (names[1][0] || '');
        initials = initials.toUpperCase();
      }
    }

  return (
    <>
      {user && (
        <>
          <div className="flex items-center gap-4 my-5">
            <a href="/profile" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#16161d] text-white font-bold text-2xl">
              {initials}
            </a>
            <span>
              <h2 className="text-xl lg:text-3xl font-bold text-[#2a2b3f] tracking-wide">
                Welcome, {user?.full_name}
              </h2>
              <a href="/courses" className="text-xs text-[#6d28d2] font-bold underline underline-offset-2">
                See Courses that Match your Passion
              </a>
            </span>
          </div>
        </>
      )}
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ prevEl: '.custom-prev', nextEl: '.custom-next' }}
        className="w-full"
        onSwiper={(swiper) => swiperRef = swiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative hidden sm:block">
              <img src={slide.img} alt="hero" className="w-full object-cover opacity-0 md:opacity-100" />
              <div className="bg-white md:block w-full p-4 2xl:p-9 max-w-[28rem] shadow-[0_2px_4px_rgba(6,17,118,0.08),_0_4px_12px_rgba(6,17,118,0.08)] absolute top-6 2xl:top-16 left-20 flex flex-col gap-2 rounded-md">
                <h2 className="text-2xl xl:text-4xl font-serif font-semibold text-[#2a2b3f] mb-2">{slide.title}</h2>
                <p className="font-sans text-sm xl:text-base leading-relaxed mb-1.5">{slide.subtitle}</p>
                <div className="flex gap-5 my-1">
                  {slide.btn1 && (
                    <button
                      className="border border-solid bg-purple-700 border-purple-700 px-4 py-2.5 rounded text-sm font-bold text-white hover:opacity-90"
                      onClick={async () => {
                        if (slide.btn1 === 'View Plans') {
                          router.push('/plans');
                        } else if (slide.btn1 === 'Learn Python') {
                          await handleCourseNav('Python');
                        } else if (slide.btn1 === 'Learn Excel') {
                          await handleCourseNav('Excel');
                        }
                      }}
                    >
                      {slide.btn1}
                    </button>
                  )}
                  {slide.btn2 && (
                    <button
                      className="border border-solid border-purple-700 px-4 py-2.5 rounded text-sm font-bold text-[#6d28d2] hover:bg-purple-100"
                      onClick={async () => {
                        if (slide.btn2 === 'View Plans') {
                          router.push('/plans');
                        } else if (slide.btn2 === 'Learn Python') {
                          await handleCourseNav('Python');
                        } else if (slide.btn2 === 'Learn Excel') {
                          await handleCourseNav('Excel');
                        }
                      }}
                    >
                      {slide.btn2}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button className="custom-prev absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-white p-[12px] rounded-full shadow hover:bg-gray-100">
          <FaChevronLeft className="text-sm text-gray-800" />
        </button>

        <button className="custom-next absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white p-[12px] rounded-full shadow hover:bg-gray-100">
          <FaChevronRight className="text-sm text-gray-800" />
        </button>
      </Swiper>
    </>
  )
}

export default HeroSlider
