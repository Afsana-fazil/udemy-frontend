"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, TrendingUp, Users, Target, BarChart, Award } from 'lucide-react';
import CourseCard from '@/components/ui/CourseCard';
import AlternativeNavbar from '@/components/layouts/Navbar';
import AlternativeFooter from '@/components/layouts/Footer';
import TrainingCard from '@/components/business/TrainingCard';
import Branding from '@/components/business/Branding';
import Overview from '@/components/business/Overview';
import Services from '@/components/business/Services';
import Tour from '@/components/business/Tour';
import CustomerSection from '@/components/business/CustomerSection';
import AILearning from '@/components/business/AILearning';
import AnimationPage from '@/components/business/AnimationPage';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  students_count?: number;
}

export default function BusinessPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    // Fetch courses for the Business category (ID: 3)
    fetch(`${BASE_URL}/api/courses/?main_category=3`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  const businessTopics = [
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Management",
      description: "Learn essential management skills and leadership techniques"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Entrepreneurship",
      description: "Start and grow your own successful business"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Human Resources",
      description: "Master HR practices and organizational development"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Strategy",
      description: "Develop strategic thinking and planning skills"
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Finance",
      description: "Understand business finance and accounting"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Leadership",
      description: "Develop your leadership and team management skills"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col text-black">
      <AlternativeNavbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row items-center gap-5 lg:gap-10">
              <h1 className="text-3xl md:text-4xl lg:text-6xl text-center md:text-start font-serif font-bold mb-6 md:w-4/5">
                The AI-powered skills development platform that accelerates transformation
              </h1>
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg text-center md:text-start text-[#1C1D1F]">
                  Whatever your goal, the path starts here
                </p>
                <span className='flex gap-4'>
                  <button 
                    onClick={() => router.push('/plans')}
                    className="bg-black text-white px-3 py-3 rounded text-sm font-bold hover:bg-[#4435bb] transition-colors"
                  >
                    Compare Plans
                  </button>
                  <a href="/demo" className="border border-solid px-3 py-3 rounded text-sm text-center font-bold hover:bg-[#4435bb] hover:border-[#4435bb] hover:text-white transition-colors">
                    Request a demo
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <TrainingCard />
        <Branding />
        <Overview />
        <Services />
        <Tour />
        <CustomerSection />
        <AILearning />
        <AnimationPage />
      </main>

      <AlternativeFooter />
    </div>
  );
} 