"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Define the Story type
interface Story {
  company_icon: string;
  title: string;
  stat_1_percent: string;
  stat_1_text: string;
  stat_2_percent: string;
  stat_2_text: string;
  image: string;
  id: string;
}

export default function StoriesSlider() {
  const [stories, setStories] = useState<Story[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next') 
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:8000/api/stories/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log('Fetched stories:', data)
        setStories(data)
      })
      .catch(error => console.error('Error fetching stories:', error))
  }, [])

  const nextSlide = () => {
    if (isTransitioning) return 
    
    setDirection('next')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500) 
    }, 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return 
    
    setDirection('prev')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500) 
    }, 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning) return 
    
    setDirection(index > currentIndex ? 'next' : 'prev')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500) 
    }, 500) 
  }

  if (stories.length === 0) return <div>Loading...</div>

  const item: Story = stories[currentIndex]

  const getContentTransform = () => {
    if (!isTransitioning) return 'translateX(0)'
    return direction === 'next' ? 'translateX(-100px)' : 'translateX(100px)'
  }

  const getImageTransform = () => {
    if (!isTransitioning) return 'translateX(0)'
    return direction === 'next' ? 'translateX(-100px)' : 'translateX(100px)'
  }

  const getOpacity = () => {
    return isTransitioning ? '0' : '1'
  }

  return (
    <div className="w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Left content section */}
        <div className="w-full lg:w-1/2 pt-16 pr-20 flex flex-col justify-center">
          <div 
            className="mb-6 transition-all duration-1000 ease-in-out"
            style={{
              transform: getContentTransform(),
              opacity: getOpacity(),
            }}
          >
            <img src={item.company_icon} alt="company_icon" className="h-12 w-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#2a2b3f] mb-8">{item.title}</h2>

            <div className="flex flex-col md:flex-row gap-12 my-8">
              <div>
                <p className="text-5xl font-bold text-[#2a2b3f]">{item.stat_1_percent}</p>
                <p className="text-sm text-[#2a2b3f] mt-2 max-w-xs border-b border-solid border-[#d1d2e0] pb-6">{item.stat_1_text}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-[#2a2b3f]">{item.stat_2_percent}</p>
                <p className="text-sm text-[#2a2b3f] mt-2 max-w-xs border-b border-solid border-[#d1d2e0] pb-6">{item.stat_2_text}</p>
              </div>
            </div>

            <div className="mt-8">
              <button
                className="bg-[#6d28d2] hover:bg-purple-700 text-white text-sm font-bold p-3 rounded-md flex items-center gap-2"
                onClick={() => router.push(`/story?id=${item.id}`)}
              >
                Read full story
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" stroke="#fff" strokeWidth="0.6" />
                </svg>
              </button>
            </div>
          </div>

            {/* Navigation dots and arrows */}
            <div className="flex justify-start items-center gap-3 py-6 relative">
                {/* Left arrow */}
                <button
                    onClick={prevSlide}
                    className="h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition"
                    disabled={isTransitioning}
                >
                    <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                    {stories.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-100 ${
                        index === currentIndex ? 'w-8 bg-purple-500' : 'w-2 bg-gray-300'
                        }`}
                        disabled={isTransitioning}
                    ></button>
                    ))}
                </div>

                {/* Right arrow */}
                <button
                    onClick={nextSlide}
                    className="h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition"
                    disabled={isTransitioning}
                >
                    <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        {/* Right image section */}
        <div className="w-full lg:w-1/2 relative">
          <div className="h-full bg-gray-200 overflow-hidden">
            <img
              src={item.image}
              alt={item.title || "Story image"}
              className="w-full h-full object-cover"
              style={{
                transition: 'transform 1000ms ease-in-out, opacity 1000ms ease-in-out',
                transform: getImageTransform(),
                opacity: getOpacity(),
              }}
            />
          </div>
        </div>
        
      </div>
    </div>
  )
}