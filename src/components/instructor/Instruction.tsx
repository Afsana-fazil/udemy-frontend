"use client";

import React, { useState } from 'react';

const tabData = [
  {
    label: 'Plan your curriculum',
    image: '/assets/plan-your-curriculum-v3.jpg',
    imageAlt: 'plan your curriculum',
    content: (
      <>
        <p className="mb-2">You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.</p>
        <p className="mb-6">The way that you teach — what you bring to it — is up to you.</p>
        <h5 className="block mb-4 font-bold text-lg">How we help you</h5>
        <p>We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.</p>
      </>
    ),
  },
  {
    label: 'Record your video',
    image: '/assets/record-your-video-v3.webp',
    imageAlt: 'record your video',
    content: (
      <>
        <p className="mb-2">Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start.</p>
        <p className="mb-6">If you don't like being on camera, just capture your screen. Either way, we recommend two hours or more of video for a paid course.</p>
        <h5 className="block mb-4 font-bold text-lg">How we help you</h5>
        <p>Our support team is available to help you throughout the process and provide feedback on test videos.</p>
      </>
    ),
  },
  {
    label: 'Launch your course',
    image: '/assets/launch-your-course-v3.webp',
    imageAlt: 'launch your course',
    content: (
      <>
        <p className="mb-2">Gather your first ratings and reviews by promoting your course through social media and your professional networks.</p>
        <p className="mb-6">Your course will be discoverable in our marketplace where you earn revenue from each paid enrollment.</p>
        <h5 className="block mb-4 font-bold text-lg">How we help you</h5>
        <p>Our custom coupon tool lets you offer enrollment incentives while our global promotions drive traffic to courses. There’s even more opportunity for courses chosen for Udemy Business.</p>
      </>
    ),
  },
];

const Instruction: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-5xl mx-auto mt-16 font-sans text-[#2a2b3f]">
      <h1 className="text-center text-5xl font-serif font-bold mb-12">How to begin</h1>
      <div className="flex justify-between border-b border-solid border-gray-200 mb-8 max-w-3xl mx-auto">
        {tabData.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`font-bold text-2xl pb-2 border-b-2 border-solid transition-colors duration-200 focus:outline-none ${
              activeTab === idx
                ? 'border-gray-900'
                : 'border-transparent text-[#595c73] hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-10 pt-4">
        <div className="flex-1 text-md leading-relaxed mx-16">{tabData[activeTab].content}</div>
        <img
          src={tabData[activeTab].image}
          alt={tabData[activeTab].imageAlt}
        />
      </div>
    </div>
  );
};

export default Instruction;
