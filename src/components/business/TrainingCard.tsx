import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

// Types for the card props
interface TrainingCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  forceHover?: boolean;
}

const TrainingCard = ({ title, description, category, image, forceHover }: TrainingCardProps) => (
  <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[380px] group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer">
    {/* Image */}
    <img src={image} alt={title} className="object-cover w-full h-full rounded-t-2xl absolute top-0 left-0 h-[210px] z-0" />
    {/* Category Badge */}
    <div className="absolute top-10 left-5 z-10">
      <span className="border border-solid border-black rounded p-3 text-xs text-black">
        {category}
      </span>
    </div>
    {/* Content Overlay */}
    <div className="
      absolute left-0 right-0
      bottom-0
      bg-[#f7f9fa]
      px-5 sm:px-7 pt-5 sm:pt-7 pb-3 sm:pb-6
      rounded-2xl
      transition-all duration-300
      h-[140px] group-hover:h-[280px] group-[.force-hover]:h-[180px]
      flex flex-col justify-start
      z-20
    ">
      <h3 className="text-xl md:text-2xl text-black mb-3 leading-snug">{title}</h3>
      <p className="text-[#6A6F73] text-base leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-[.force-hover]:opacity-100 group-[.force-hover]:translate-y-0 transition-all duration-300">
        {description}
      </p>
    </div>
  </div>
);

interface PersonCardProps {
  title: string;
  description: string;
  category: string;
  image?: string;
  forceHover?: boolean;
}

const PersonCard = ({ title, description, category, image, forceHover }: PersonCardProps) => (
  <div className={`group rounded-xl shadow-md flex flex-col h-[300px] lg:h-[380px] w-full cursor-pointer min-w-[200px] sm:min-w-[250px] min-w-[300px] lg:min-w-[380px] ${forceHover ? 'force-hover' : ''}`}>
    {/* Image */}
    <div className="relative w-full flex items-center justify-center bg-gray-200 rounded-t-3xl">
      {image ? (
        <img src={image} alt={title} className="object-cover w-full h-full rounded-t-3xl" />
      ) : (
        <Users size={80} className="text-gray-400" />
      )}
      {/* Category Badge */}
      <div className="absolute bg-gray-200">
        <span className="bg-white border border-black rounded px-3 py-1 text-xs font-medium text-black">
          {category}
        </span>
      </div>
    </div>
    {/* Content - Title always, description on hover, straight top edge */}
    <div className=" flex-1 flex flex-col justify-start bg-gray-500 px-7 pt-7 pb-6 transition-all duration-300 h-[150px] group-hover:h-[200px] group-[.force-hover]:h-[200px]">
      <h3 className="text-xl font-bold text-black mb-3 leading-snug">{title}</h3>
      <p className="text-gray-500 text-base leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-[.force-hover]:opacity-100 group-[.force-hover]:translate-y-0 transition-all duration-300">
        {description}
      </p>
    </div>
  </div>
);

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}

const NavigationButton = ({ direction, onClick, disabled }: NavigationButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-12 h-12 rounded-full bg-white border border-solid flex items-center justify-center transition-colors shadow-md
      ${disabled ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-black text-black hover:bg-gray-100'}`}
  >
    {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </button>
);

// Slide card type
interface SlideCardBase {
  title: string;
  description: string;
  category: string;
  image?: string;
}
interface SlideTrainingCard extends SlideCardBase {
  image: string;
  type?: undefined;
}
interface SlidePersonCard extends SlideCardBase {
  type: 'person';
}
type SlideCard = SlideTrainingCard | SlidePersonCard;

export default function TrainingPlatform() {
  const cardList: SlideCard[] = [
    {
      title: "Upskill your entire organization",
      description: "Cultivate a learning culture that keeps every team engaged and growing.",
      category: "Enterprise-wide training",
      image: "/assets/wide-training.webp"
    },
    {
      title: "Develop and validate skills",
      description: "Grow employees skills with certfication prep courses and badges to share their accomplishments once they've passed their exams.",
      category: "Certification preparation",
      image: "/assets/slider-certification-preparation.webp"
    },
    {
      title: "Partner with us on your learning strategy",
      description: "Use AI Starter Paths to prepare all employees to use AI and develop AI skills related to their functional areas.",
      category: "AI Upskilling",
      image: "/assets/sllider-genai-upskilling.webp"
    },
    {
      title: "Identify and empower leaders",
      description: "Create an environment of trust and inclusion by offering tools to lead, motivate, and engage.",
      category: "Leadership development",
      image: "/assets/slider-leadership-development.webp"
    },
    {
      title: "Tech team training",
      description: "Close skills gaps, prep teams for certifications, and drive digital transformation.",
      category: "Certification preparation",
      image: "/assets/Tech-team-training.webp"
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scrollability on mount and on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const checkScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft + container.offsetWidth < container.scrollWidth - 1);
    };
    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollByCard = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector('div[data-card]');
    if (!card) return;
    const cardWidth = (card as HTMLElement).offsetWidth + 32; // 32px gap-8
    container.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  return (
    <div className="bg-white p-8">
      <div className="max-w-screen-2xl ml-auto pl-0 md:pl-12">
        {/* Navigation */}
        <div className="flex justify-start gap-4 mb-8">
          <NavigationButton direction="left" onClick={() => scrollByCard('left')} disabled={!canScrollLeft} />
          <NavigationButton direction="right" onClick={() => scrollByCard('right')} disabled={!canScrollRight} />
        </div>
        {/* Cards Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-hidden snap-x snap-mandatory gap-8 pb-4"
          style={{ scrollPaddingLeft: 0 }}
        >
          {cardList.map((card, index) => (
            <div
              key={index}
              data-card
              className="min-w-[200px] sm:min-w-[250px] min-w-[300px] lg:min-w-[380px]"
              style={{ width: 380 }}
            >
              {card.type === 'person' ? (
                <PersonCard {...card} forceHover={index === 0} />
              ) : (
                <TrainingCard {...card} forceHover={index === 0} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}