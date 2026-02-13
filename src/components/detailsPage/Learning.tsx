import React, { useState } from 'react';

export default function Learning() {
  const [showMore, setShowMore] = useState(false);

  const learningItems = [
    {
      title: "Generative AI",
      description: "Create content, synthesize information, and learn faster than ever with effective prompt engineering!"
    },
    {
      title: "ChatGPT",
      description: "Turn your creativity into paid work, generate fresh ideas, reach new audiences, and scale your projects!"
    },
    {
      title: "Productivity",
      description: "Achieve goals faster with artificial intelligence, manage time, prioritize tasks, and create an optimized daily schedule!"
    },
    {
      title: "Marketing",
      description: "Generate targeted content with generative AI, capitalize on trends, create ads, newsletters, specialized content, and media campaigns!"
    },
    {
      title: "Soft Skills",
      description: "Improve your communication, leadership, problem-solving, and social skills with personalized ChatGPT feedback!"
    },
    {
      title: "AI Voice Tools",
      description: "Easily create AI-generated speech for any use case and even clone your own voice entirely!"
    },
    {
      title: "AI Video Tools",
      description: "Create an AI avatar that transforms scripts into presentations and quickly generate social media content!"
    },
    {
      title: "AI Photo Tools",
      description: "Add motion to images, dynamically enhance image aesthetics, and create custom images in bulk!"
    },
    {
      title: "AI Writing Tools",
      description: "Automate writing tasks, generate effective copy, and integrate with Google Sheets/Excel!"
    },
    {
      title: "AI Music Tools",
      description: "Create unique compositions for any types of video and save time with a streamlined creative process."
    },
    {
      title: "Branding",
      description: "Develop a visual identity, design logos, and generate content to establish a strong online presence!"
    },
    {
      title: "AI Art Generation",
      description: "Create photos from prompts, fill in or remove elements of images using inpainting and outpainting techniques!"
    },
    {
      title: "Business",
      description: "Streamline your AI workflow, automate repetitive tasks, and gain insights that help you make data-driven decisions for your business!"
    },
    {
      title: "Multimodal",
      description: "Combine multiple AI tools to create immersive and engaging content that would have previously taken an entire team to create!"
    },
    {
      title: "Midjourney",
      description: "Use prompts, parameters, and modifiers to create amazing images that showcase your personal style and creativity!"
    },
    {
      title: "Coding",
      description: "Combine the power of ChatGPT with programming fundamentals, algorithms, debugging, and documentation!"
    },
    {
      title: "Custom GPTs & AI Assistants",
      description: "Build and optimize your workflows for business and personal use, tailoring AI to specific needs!"
    },
    {
      title: "AI Automation",
      description: "Task automating with Zapier, Make, and OpenAI APIs, integrating AI in efficient and scalable ways!"
    }
  ];

  const visibleItems = showMore ? learningItems : learningItems.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-8 pt-20 pb-8">
      <div className="lg:w-[63%] border border-solid border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            {learningItems.map((item, index) => {
              const isVisible = showMore || index < 6;
              const shouldFade = !showMore && index >= 4; 
              
              return (
                <div 
                  key={index}
                  className={`flex gap-2 transition-opacity duration-300 ${
                    !isVisible ? 'hidden' : shouldFade ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  <svg width="32" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                  </svg>
                  <p className="text-sm text-[#2a2b3f] leading-relaxed">
                    <span>{item.title}:</span> {item.description}
                  </p>
                </div>
              );
            })}
          </div>
          
          {!showMore && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-2 hover:bg-purple-100 p-2 rounded text-[#6d28d2] hover:text-purple-800 text-sm font-semibold transition-colors duration-200"
        >
          {showMore ? 'Show less' : 'Show more'}
          <svg
            className={`transform transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}