// pages/index.js or app/page.js (depending on your Next.js version)
import React from 'react';

const Branding = () => {
  const logos = [
    { name: 'Mattel', image: '/assets/01-mattel-logo-gray.svg' },
    { name: 'Vimeo', image: '/assets/02-vimeo-logo-gray.svg' },
    { name: 'Fender', image: '/assets/03-fender-logo-gray.svg' },
    { name: 'Aflac', image: '/assets/04-aflac-logo-gray.svg' },
    { name: 'Volkswagen',  image: '/assets/05-vw-logo-gray.svg' },
    { name: 'TCS', image: '/assets/06-tcs-logo-gray.svg' },
    { name: 'Bosch', image: '/assets/07-bosch-logo-gray.svg' },
    { name: 'Cisco', image: '/assets/08-cisco-logo-gray.svg' },
    { name: 'Samsung', image: '/assets/10-samsung-logo-gray.svg' },
    { name: 'Citi-bank', image: '/assets/11-citi-bank-logo-gray.svg' },
    { name: 'Infosys', image: '/assets/12-infosys-logo-gray.svg' },
    { name: 'Ford', image: '/assets/13-ford-logo-gray.svg' }
  ];

  // Fallback for broken images
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width='112' height='40' xmlns='http://www.w3.org/2000/svg'>
        <rect width='112' height='40' fill='#f3f4f6' rx='8'/>
        <text x='56' y='25' text-anchor='middle' fill='#9ca3af' font-family='Arial, sans-serif' font-size='14'>${name}</text>
      </svg>
    `)}`;
  };

  return (
    <section className="bg-white w-full py-8 md:pt-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-base font-normal text-[#6A6F73]">
            Join over 17,200+ companies training teams with Udemy Business
          </h2>
        </div>

        {/* Logo Carousel with gradient mask */}
        <div className="relative">
          {/* Gradient mask left */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10" style={{background: 'linear-gradient(to right, white 70%, transparent)'}} />
          {/* Gradient mask right */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10" style={{background: 'linear-gradient(to left, white 70%, transparent)'}} />

          <div className="overflow-hidden">
            <div className="logo-carousel flex items-center animate-scroll">
              {/* Render logos twice for seamless loop */}
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="w-36 h-12 flex items-center justify-center"
                >
                  <img
                    src={logo.image}
                    alt={`${logo.name} logo`}
                    className="w-full h-full object-contain transition-all duration-300"
                    onError={e => handleImgError(e, logo.name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-carousel {
          width: max-content;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 100s linear infinite;
        }
        .logo-carousel:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 20s;
          }
        }
        @media (max-width: 480px) {
          .animate-scroll {
            animation-duration: 15s;
          }
        }
      `}</style>
    </section>
  );
};

export default Branding;