'use client';

import { useEffect, useState } from 'react';

interface Review {
  initials: string;
  name: string;
  time_ago: string;
  description?: string;
  rating?: number;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reactions, setReactions] = useState<{ [key: number]: 'like' | 'dislike' | null }>({});

  useEffect(() => {
    fetch('http://localhost:8000/api/reviews/')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, []);

  const getWeeksAgo = (dateString: string) => {
    const reviewDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - reviewDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffInDays / 7);
    if (weeks < 1) return "a week ago";
    if (weeks === 1) return "1 week ago";
    return `${weeks} weeks ago`;
  };

  const handleLike = (index: number) => {
    setReactions((prev) => ({
      ...prev,
      [index]: prev[index] === 'like' ? null : 'like',
    }));
  };

  const handleDislike = (index: number) => {
    setReactions((prev) => ({
      ...prev,
      [index]: prev[index] === 'dislike' ? null : 'dislike',
    }));
  };


  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

const toggleMenu = (index: number) => {
  setOpenMenuIndex(prev => (prev === index ? null : index));
};

const renderReviewCard = (review: Review, index: number) => {
  const userReaction = reactions[index];
  const isMenuOpen = openMenuIndex === index;

    return (
      <div key={index} className="pt-6 border-t border-solid border-[#d1d2e0]">
        <div className="flex items-center justify-between mb-4">
          <div className='flex items-center'>
            <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
              {review.initials}
            </div>
            <div>
              <p className="font-bold">{review.name}</p>
              <p className="text-xs font-bold text-[#595c73] flex items-center gap-2">
                <img src={review.rating} alt="rating" className="w-16" />
                {getWeeksAgo(review.time_ago)}
              </p>
            </div>
          </div>

          <div className="relative">
            <button onClick={() => toggleMenu(index)}>
              <svg
                fill="#2a2b3f"
                width="14px"
                height="14px"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M603 192q0-43-30-73t-73-30-73 30.5-30 73 30 72.5 72.5 30 73-30.5T603 192zm0 616q0-43-30-73t-73-30-73 30-30 73 30 73 72.5 30 73-30.5T603 808zm0-308q0-43-30-73t-73-30-73 30-30 73 30 73 72.5 30 73-30.5T603 500z" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute top-6 right-0 bg-white border border-solid border-[#d1d2e0] p-4 shadow rounded-lg z-10">
                <a href="#" className="font-bold">Report</a>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed">{review.description}</p>

        <div className="flex items-center text-xs text-[#595c73] mt-4 gap-2">
          <span>Helpful?</span>
          <span
            className={`cursor-pointer p-2 rounded hover:bg-purple-50 ${userReaction === 'like' ? 'bg-purple-100' : ''}`}
            onClick={() => handleLike(index)}
          >
            <svg width="22" height="22" fill={userReaction === 'like' ? '#2a2b3f' : 'none'} stroke="#2a2b3f" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M15.0501 7.04419C15.4673 5.79254 14.5357 4.5 13.2163 4.5C12.5921 4.5 12.0062 4.80147 11.6434 5.30944L8.47155 9.75H5.85748L5.10748 10.5V18L5.85748 18.75H16.8211L19.1247 14.1428C19.8088 12.7747 19.5406 11.1224 18.4591 10.0408C17.7926 9.37439 16.8888 9 15.9463 9H14.3981L15.0501 7.04419Z"/>
            </svg>
          </span>
          <span
            className={`cursor-pointer p-2 rounded hover:bg-purple-50 ${userReaction === 'dislike' ? 'bg-purple-100' : ''}`}
            onClick={() => handleDislike(index)}
          >
            <svg width="22" height="22" fill={userReaction === 'dislike' ? '#2a2b3f' : 'none'} stroke="#2a2b3f" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M15.0501 16.9558C15.4673 18.2075 14.5357 19.5 13.2164 19.5C12.5921 19.5 12.0063 19.1985 11.6435 18.6906L8.47164 14.25L5.85761 14.25L5.10761 13.5L5.10761 6L5.85761 5.25L16.8211 5.25L19.1247 9.85722C19.8088 11.2253 19.5407 12.8776 18.4591 13.9592C17.7927 14.6256 16.8888 15 15.9463 15L14.3982 15L15.0501 16.9558Z"/>
            </svg>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-8 my-10">
      <div className="lg:w-[63%] text-[#2a2b3f]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-yellow-500">
            <svg height="16px" width="16px" viewBox="0 0 47.94 47.94" fill="#c4710d">
              <path fill='#ED8A19' d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                C22.602,0.567,25.338,0.567,26.285,2.486z"/>
            </svg>
          </span>
          4.5 course rating • 48K ratings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.slice(0, 4).map(renderReviewCard)}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-8 border border-solid border-[#6d28d2] px-5 py-2 rounded-md text-[#6d28d2] text-sm font-bold hover:bg-purple-50 transition-colors"
        >
          Show all reviews
        </button>

        {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[70%] h-[90%] max-w-4xl rounded-xl shadow-lg relative flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>
                  <svg height="16px" width="16px" viewBox="0 0 47.94 47.94" fill="#c4710d">
                    <path fill='#ED8A19' d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                      c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                      c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                      c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                      c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                      C22.602,0.567,25.338,0.567,26.285,2.486z"/>
                  </svg>
                </span>
                4.5 course rating • 48K ratings
              </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-black text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="flex flex-grow overflow-hidden">
                <div className="w-[30%] p-6 pt-0 overflow-y-auto border-r border-gray-200">
                  {/* Rating Breakdown */}
                  <div className="mb-6">
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-3">
                          <div className="flex-1 bg-[#d1d2e0] h-2 overflow-hidden">
                            <div 
                              className="h-full bg-[#9194ac]" 
                              style={{ width: `${rating === 5 ? 58 : rating === 4 ? 32 : rating === 3 ? 8 : rating === 2 ? 1 : 1}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} height="10px" width="10px" viewBox="0 0 47.94 47.94" fill={star <= rating ? "#c4710d" : "#fff"} stroke='#c4710d' strokeWidth="5">
                                <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                                  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                                  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                                  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                                  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                                  C22.602,0.567,25.338,0.567,26.285,2.486z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-[#6d28d2] cursor-pointer underline min-w-8">
                            {rating === 5 ? '58%' : rating === 4 ? '32%' : rating === 3 ? '8%' : rating === 2 ? '1%' : '1%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Search Section */}
                  <div className="mb-6">
                    <div className="flex gap-1 w-full">
                      <input
                        type="text"
                        placeholder="Search reviews"
                        className="border border-solid w-44 px-3 py-2 border-[#9194ac] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <button className="p-2 border border-solid border-purple-600 rounded-md text-purple-600 hover:bg-purple-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill='none'  viewBox="0 0 50 50" width="16px" height="16px"><path fill='#6d28d2' stroke='#6d28d2' d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-[70%] p-6 pt-0 overflow-y-auto scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {reviews.map(renderReviewCard)}
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-8 border border-solid border-[#6d28d2] w-full px-5 py-2 rounded-md text-[#6d28d2] text-sm font-bold hover:bg-purple-50 transition-colors"
                  >
                    Show more reviews
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}