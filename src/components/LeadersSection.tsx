"use client";
import { useRouter } from "next/navigation";

export default function LeadersSection() {
    const router = useRouter();

    const handleStartLearning = () => {
        // Navigate to course ID 2 details page
        router.push('/courses/2');
    };

    return (
      <section className="w-[90%] lg:w-[75%] mx-auto">
          <div className="lg:flex justify-between items-center">
            <div className="pt-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-[#2a2b3f] mb-3 lg:mb-6">AI for Business Leaders</h2>
                <p className="text-base sm:text-lg text-[#2a2b3f]">Build an AI-habit for you and your team that builds hands-on skills to help you lead effectively.</p>
                <button 
                    onClick={handleStartLearning}
                    className="mt-6 text-[#6d28d2] font-bold text-sm flex items-center gap-2 border border-[#6d28d2] border-solid rounded p-3 hover:bg-purple-100"
                >
                    Start Learning
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" stroke="#6d28d2" strokeWidth="0.6" />
                    </svg>
                </button>
            </div>

            <div>
                <img src="assets/business_leaders.png" alt="business-leaders-image" />
            </div>
          </div>
      </section>
    )
  }
  