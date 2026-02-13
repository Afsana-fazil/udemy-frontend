"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const goalsData = [
  {
    id: 1,
    title: "Hands-on training",
    desc: "Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.",
    icon: '/assets/icons/hands-on-practice.png',
    mainImage: "/assets/hands-on-learning.png",
  },
  {
    id: 2,
    title: "Certification prep",
    desc: "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.",
    icon: "/assets/icons/certificate.png",
    mainImage: "/assets/certification-prep.png",
    explore: "Explore Courses",
  },
  {
    id: 3,
    title: "Insights and analytics",
    desc: "Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.",
    icon: "/assets/icons/empty-state.png",
    mainImage: "/assets/insights-and-analytics.png",
    explore: "Find out more",
  },
  {
    id: 4,
    title: "Customizable content",
    desc: "Create tailored learning paths for team and organization goals and even host your own content and resources.",
    icon: "/assets/icons/organizations.png",
    mainImage: "/assets/customizable.png",
    explore: "Find out more",
  }
];

export default function Goals() {
  const [activeGoal, setActiveGoal] = useState(goalsData[0]);
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const goalCount = goalsData.length;
  const goLeft = () => setCurrent((prev) => (prev - 1 + goalCount) % goalCount);
  const goRight = () => setCurrent((prev) => (prev + 1) % goalCount);

  return (
    <section className="bg-gray-100 py-6 px-8">
        <section className="w-[90%] xl:w-[80%] mx-auto py-16">
            <div>
                <h2 className="text-2xl md:text-4xl font-serif font-semibold text-[#2a2b3f] mb-8">Learning focused on your goals</h2>
            </div>

            <div className="lg:flex gap-20 items-start w-full">
              <div className="flex lg:flex-col gap-6 lg:w-[33rem] w-full overflow-hidden relative">
                {/* Mobile slider arrows */}
                {goalCount > 1 && (
                  <>
                    <button
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg lg:hidden"
                      onClick={goLeft}
                      aria-label="Previous goal"
                    >
                      <FaChevronLeft className="text-lg text-gray-800" />
                    </button>
                    <button
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg lg:hidden"
                      onClick={goRight}
                      aria-label="Next goal"
                    >
                      <FaChevronRight className="text-lg text-gray-800" />
                    </button>
                  </>
                )}
                {/* Mobile: show only one goal, Desktop: show all */}
                {goalCount > 0 && (
                  <>
                    <div className="flex w-full lg:hidden transition-all duration-300" style={{transform: `translateX(-${current * 100}%)`}}>
                      {goalsData.map((goal, idx) => {
                        const isActive = activeGoal.id === goal.id;
                        return (
                          <div
                            key={goal.id}
                            onClick={() => setActiveGoal(goal)}
                            className={`flex-shrink-0 w-full flex justify-between items-center gap-4 px-2 lg:px-5 py-3 lg:py-8 bg-white rounded-lg cursor-pointer transition border hover:bg-[#eeeffc] ${isActive ? "border-solid border-l-8 border-[#a435f0] hover:border-[#d1d2e0] hover:border-l" : "bg-white border-solid border-[#d1d2e0]"}`}
                          >
                            <div className="flex items-start gap-4 w-full">
                              <img src={goal.icon} alt={goal.title} className="w-16 h-16" />
                              <span>
                                <h4 className="text-base sm:text-lg font-bold mb-2">{goal.title}</h4>
                                <p className="text-sm text-gray-600 tracking-wide">{goal.desc}</p>
                                {goal.explore && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      router.push("/courses");
                                    }}
                                    className="text-sm sm:text-md font-bold text-[#6d28d2] mt-2 flex items-center gap-2"
                                  >
                                    {goal.explore}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" stroke="#6d28d2"/>
                                    </svg>
                                  </button>
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="hidden lg:flex flex-col gap-6 w-full">
                      {goalsData.map((goal) => {
                        const isActive = activeGoal.id === goal.id;
                        return (
                          <div
                            key={goal.id}
                            onClick={() => setActiveGoal(goal)}
                            className={`flex justify-between items-center gap-4 px-2 lg:px-5 py-3 lg:py-8 bg-white rounded-lg cursor-pointer transition border hover:bg-[#eeeffc] ${isActive ? "border-solid border-l-8 border-[#a435f0] hover:border-[#d1d2e0] hover:border-l" : "bg-white border-solid border-[#d1d2e0]"}`}
                          >
                            <div className="flex items-start gap-4 w-full">
                              <img src={goal.icon} alt={goal.title} className="w-16 h-16" />
                              <span>
                                <h4 className="text-base sm:text-lg font-bold mb-2">{goal.title}</h4>
                                <p className="text-sm text-gray-600 tracking-wide">{goal.desc}</p>
                                {goal.explore && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      router.push("/courses");
                                    }}
                                    className="text-sm sm:text-md font-bold text-[#6d28d2] mt-2 flex items-center gap-2"
                                  >
                                    {goal.explore}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" stroke="#6d28d2"/>
                                    </svg>
                                  </button>
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Main Image */}
              <div className="w-full lg:w-[45rem]">
                  <img
                      src={activeGoal.mainImage}
                      alt={activeGoal.title}
                      className="w-full h-auto "
                  />
              </div>
            </div>
        </section>
    </section>
  );
}
