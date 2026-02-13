"use client";

import React, { useState } from 'react';

const testimonials = [
  {
    image: '/assets/frank-1x-v2.jpg',
    text: `"I'm proud to wake up knowing my work is helping people around the world improve their careers and build great things. While being a full-time instructor is hard work, it lets you work when, where, and how you want."`,
    name: 'Frank Kane',
    title: 'Data Science & IT Certifications',
  },
  {
    image: '/assets/paulo-1x.webp',
    text: `"Udemy has changed my life. It's allowed me to follow my passion and become a teacher I love to see my students succeed and hear them say they've learned more, quicker, from my courses than they did in college. It's so humbling."`,
    name: 'Paulo Dichone',
    title: 'Developer (Android Speciality)',
  },
  {
    image: '/assets/deborah-1x.webp',
    text: `"Teaching on Udemy has provided me with two important elements: the opportunity to reach more learners than I ever would be able to on my own and a steady stream of extra income."`,
    name: 'Deborah Grayson Riege',
    title: 'Leadership, Communication',
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="w-full bg-[#f8f9fa] flex items-center justify-center md:px-0 text-[#2a2b3f]">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl relative">
        {/* Left navigation button (only if not first slide) */}
        {testimonials.length > 1 && current > 0 && (
          <button
            aria-label="Previous"
            onClick={prev}
            className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition border border-gray-100 z-10"
            style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.06)' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {/* Image */}
        <div className="flex-shrink-0 flex items-center justify-center w-full md:w-[420px] bg-[#f8f9fa] relative">
          {/* Show left arrow on left of image if not first slide (for mobile, absolute for desktop) */}
          {testimonials.length > 1 && current > 0 && (
            <button
              aria-label="Previous"
              onClick={prev}
              className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition border border-gray-100 z-10"
              style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.06)' }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <img
            src={testimonials[current].image}
            alt={testimonials[current].name}
            className="object-cover rounded-none shadow-none"
            style={{ boxShadow: 'none', borderRadius: 0 }}
          />
        </div>
        {/* Testimonial */}
        <div className="relative flex-1 flex flex-col justify-center h-[350px] bg-[#f8f9fa] px-8">
          <p className="text-xl font-normal leading-relaxed mb-4">{testimonials[current].text}</p>
          <div className="font-bold text-md mb-1">{testimonials[current].name}</div>
          <div className="text-sm text-[#595c73] mb-0">{testimonials[current].title}</div>
          {/* Navigation button (right side, vertically centered) */}
          {testimonials.length > 1 && (
            <button
              aria-label="Next"
              onClick={next}
              className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition border border-gray-100"
              style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.06)' }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
