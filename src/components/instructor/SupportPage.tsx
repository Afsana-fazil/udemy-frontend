import React from 'react';

const SupportPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white text-[#2a2b3f]">
      <div className="w-full mx-20 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Illustration */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <img 
            src="/assets/support-1-v3.webp" 
            alt="Support1" 
          />
        </div>

        {/* Center Content */}
        <div className="flex-1 text-center max-w-2xl flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            You won't have to do it alone
          </h1>
          <div className="text-lg leading-relaxed space-y-4 mb-4">
            <p>
              Our <span className="font-bold">Instructor Support Team</span> is here to answer your questions and review your test video, while our <span className="font-bold">Teaching Center</span> gives you plenty of resources to help you through the process. Plus, get the support of experienced instructors in our <span className="font-bold">online community</span>.
            </p>
          </div>
          <a 
            href="#" 
            className="text-[#6d28d2] text-sm hover:text-purple-700 hover:bg-purple-100 px-4 py-2.5 rounded font-semibold underline underline-offset-4"
          >
            Need more details before you start? Learn more.
          </a>
        </div>

        {/* Right Illustration */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <img 
            src="/assets/support-2-v3.webp" 
            alt="Support2" 
          />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;