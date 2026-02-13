import React from 'react';

interface Course {
  rating_point: number;
  rating: string;
}

const ReviewsTab = ({ course }: { course: Course | null }) => {
  if (!course) {
    return null; // Or a loading/error state
  }

  const ratingPercentages = [57, 32, 9, 1, 1];

  return (
    <div className="py-8 px-4 md:px-8 max-w-4xl mx-auto text-[#2a2b3f]">
      <h2 className="text-2xl font-bold mb-8">Student feedback</h2>
      <div className="flex gap-8 items-center">
        {/* Left Side: Overall Rating */}
        <div className="flex flex-col items-center flex-shrink-0">
          <span className="text-7xl font-bold text-[#c4710d] leading-none">{course.rating_point}</span>
          <img src={course.rating} alt={`${course.rating_point} stars`} className="w-28 my-2" />
          <span className="text-sm text-[#c4710d] font-bold">Course Rating</span>
        </div>

        {/* Right Side: Rating Bars */}
        <div className="w-full">
          <div className="space-y-3">
            {ratingPercentages.map((percentage, index) => {
              const starValue = 5 - index;
              return (
                <div key={starValue} className="flex items-center gap-3">
                  <div className="flex-1 bg-[#d1d2e0] h-2">
                    <div 
                      className="h-full bg-[#9194ac]" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < starValue ? 'text-[#c4710d]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <a href="#" className="text-sm text-[#5624d0] underline min-w-[3rem]">
                    {percentage}%
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab; 