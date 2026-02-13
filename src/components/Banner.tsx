'use client';

import { useEffect, useState } from 'react';

export default function Banner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1280);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const logos = [
    { src: 'assets/icons/volkswagen_logo.svg', alt: 'volkswagen_logo' },
    { src: 'assets/icons/samsung_logo.svg', alt: 'samsung_logo' },
    { src: 'assets/icons/cisco_logo.svg', alt: 'cisco_logo' },
    { src: 'assets/icons/vimeo_logo_resized-2.svg', alt: 'vimeo_logo' },
    { src: 'assets/icons/procter_gamble_logo.svg', alt: 'procter_gamble_logo' },
    { src: 'assets/icons/hewlett_packard_enterprise_logo.svg', alt: 'hp_logo' },
    { src: 'assets/icons/citi_logo.svg', alt: 'citi_logo' },
    { src: 'assets/icons/ericsson_logo.svg', alt: 'ericsson_logo' },
  ];

  const renderLogos = isMobile ? [...logos, ...logos] : logos;

  return (
    <section className="w-[90%] lg:w-[80%] mx-auto py-8 lg:py-16">
      <div className="flex flex-col justify-center items-center gap-8">
        <h4 className="text-[#595c73] text-md lg:text-lg text-center">
          Trusted by over 16,000 companies and millions of learners around the world
        </h4>

        <div className="overflow-hidden w-full">
          <ul
            className={`logo-carousel ${
              isMobile ? 'flex items-center animate-scroll gap-20 w-max' : 'grid grid-cols-4 md:grid-cols-8 gap-8 w-full'
            }`}
          >
            {renderLogos.map((logo, index) => (
              <li key={`${logo.alt}-${index}`} className="flex justify-center items-center">
                <img src={logo.src} alt={logo.alt} className="max-h-10 object-contain" />
              </li>
            ))}
          </ul>

          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .animate-scroll {
              animation: scroll 40s linear infinite;
            }

            .logo-carousel:hover {
              animation-play-state: paused;
            }

            @media (max-width: 1024px) {
              .animate-scroll {
                animation-duration: 20s;
              }
            }

            @media (max-width: 600px) {
              .animate-scroll {
                animation-duration: 12s;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
