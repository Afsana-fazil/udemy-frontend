import React from 'react';

const CustomerSection = () => {
  return (
    <section className="max-w-6xl mx-auto min-h-[70vh] flex flex-col justify-center bg-white py-24">
      <h2 className="text-5xl mb-24 text-left">Don't just take it from us</h2>
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-12">
          <span className="w-24 h-24 rounded-full bg-[#1e1e1e] flex items-center justify-center shadow-md mr-[-16px] z-10 border border-white">
            <img
              src="/assets/icons/logo-genpact-quote-module.svg"
              alt="Genpact logo"
              className="w-18 h-18 object-contain"
            />
          </span>
          <span className="w-24 h-24 rounded-full border-2 border-solid border-[#199fa3] flex items-center justify-center overflow-hidden">
            <img
              src="/assets/Thaiyal-Nayak.webp"
              alt="Thaiyal Nayaki Sathyamoorthy"
              className="w-full h-full object-cover"
            />
          </span>
        </div>
        <blockquote className="text-xl text-center max-w-2xl text-[#1C1D1F] mb-12">
          "We wanted a holistic, easy- to-use, cloud-based platform where we could curate our own GenAI program — all from a partner who understood the industry landscape. We chose Udemy."
        </blockquote>
        <div className="text-center">
          <div className="font-bold text-lg text-[#1C1D1F]">Thaiyal Nayaki Sathyamoorthy</div>
          <div className="text-lg text-[#6a6f73]">Assistant Manager of L&D for Data and AI, Genpact</div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSection;
