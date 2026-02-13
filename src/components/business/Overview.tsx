import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';

const Overview = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  // Close modal on ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsVideoOpen(false);
  }, []);

  useEffect(() => {
    if (isVideoOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoOpen, handleKeyDown]);

  useEffect(() => {
    if (previewVideoRef.current) {
      if (isButtonHovered) {
        previewVideoRef.current.play();
      } else {
        previewVideoRef.current.pause();
        previewVideoRef.current.currentTime = 0;
      }
    }
  }, [isButtonHovered]);

  const learningOptions = [
    {
      id: 'on-demand',
      title: 'On-Demand Learning',
      description: 'Provide anytime access to the latest business, tech, leadership, and soft skills courses all in one learning platform.',
      icon: '↗',
      color: 'purple',
    },
    {
      id: 'hands-on',
      title: 'Hands-On Learning',
      description: 'Boost tech skills faster with Udemy Business Pro learn-by-doing technical projects.',
      icon: '↗',
      color: 'gray'
    },
    {
      id: 'cohort',
      title: 'Cohort Learning',
      description: 'Grow your leaders with the Udemy Business Leadership Academy guided, self-paced programs.',
      icon: '↗',
      color: 'gray'
    },
    {
      id: 'professional',
      title: 'Professional Services',
      description: 'Get the expertise and support you need to achieve your goals faster.',
      icon: '↗',
      color: 'gray'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fa] pt-24 pb-16 mx-5">
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-28 items-center mb-16 ">
          <div>
            <h1 className="text-4xl xl:text-5xl mb-0 text-center lg:text-start leading-tight">
              Modern skills need a modern<br />
              learning approach
            </h1>
          </div>
          <div className="flex justify-end max-w-3xl lg:w-auto">
            <p className="text-[#1C1D1F] text-center lg:text-start leading-relaxed mt-2">
              Learning solutions shouldn't be one-size-fits-all.<br className='hidden lg:block' />
              For effective training, you need the right skills and<br className='hidden lg:block' />
              the right modalities. That's where we come in.
            </p>
          </div>
        </div>

        {/* Video Hero Section */}
        <div className='bg-[#f7f9fa] lg:bg-white rounded-3xl'>
            <div className="relative">
            <div className="lg:bg-[url('/assets/learning-ecosystem-var-c.webp')] bg-contain bg-no-repeat lg:h-[220px] rounded-t-3xl lg:p-8 pb-0">
                {/* Video Thumbnail */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4 z-10">
                      <div className=' border border-solid border-white p-1 rounded-full'>
                          <button 
                          className="w-16 h-16 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors shadow-lg group cursor-pointer relative overflow-hidden"
                          tabIndex={0}
                          aria-label="Play video"
                          onClick={() => setIsVideoOpen(true)}
                          onMouseEnter={() => setIsButtonHovered(true)}
                          onMouseLeave={() => setIsButtonHovered(false)}
                          onFocus={() => setIsButtonHovered(true)}
                          onBlur={() => setIsButtonHovered(false)}
                          >
                            {/* Video background, only plays on hover */}
                            <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none select-none z-0">
                              <video
                                ref={previewVideoRef}
                                src="/assets/videos/video.mp4"
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover blur-sm scale-110"
                                tabIndex={-1}
                                aria-hidden="true"
                                preload="metadata"
                              />
                            </span>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className='group-hover:scale-110 transition-transform relative z-20'>
                              <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#fff"/>
                            </svg>
                          </button>
                      </div>
                      <div className="lg:text-white">
                        <h3 className="text-lg">AI at Udemy: Product <br /> overview</h3>
                        <p className="lg:text-[#D1D1D1]">1:38</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-5 p-8 mb-8 rounded-b-3xl rounded-t-3xl overflow-hidden bg-[#65b] lg:bg-white">
              {learningOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`
                    group
                    p-4 bg-white text-gray-900 flex flex-col h-full rounded-3xl lg:rounded-none hover:border hover:border-solid hover:border-[#e2e2e2] hover:rounded-3xl 
                    transition-transform ease-in-out duration-[300ms] hover:scale-105
                    ${index !== 0 ? 'lg:border-l border-solid border-[#e2e2e2]' : ''}
                  `}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full border border-solid border-gray-400 flex items-center justify-center mb-6 group-hover:bg-[#5624D0]">
                    <ArrowUpRight className="w-6 h-6 group-hover:text-white" />
                  </div>
                  {/* Content */}
                  <h3 className="text-2xl mb-6 text-left w-3/5 group-hover:text-[#5624D0]">
                    {option.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6a6f73] text-left w-4/5">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
            
        </div>
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity"
          onClick={() => setIsVideoOpen(false)}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <div
            className="relative w-[100vw] max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: '16/9' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 focus:outline-none"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <video
              src="/assets/videos/video.mp4"
              controls
              autoPlay
              className="w-full h-full object-contain bg-black rounded-2xl"
              tabIndex={0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;