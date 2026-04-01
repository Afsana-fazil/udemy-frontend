"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


export default function StoryContent() {
  const [stories, setStories] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch(`${BASE_URL}/stories/`)
      .then(res => res.json())
      .then(data => {
        setStories(data);
        setLoading(false);
        // Set currentIndex based on id param if present
        const idParam = searchParams.get('id');
        if (idParam) {
          const idx = data.findIndex((story: any) => String(story.id) === String(idParam));
          if (idx !== -1) setCurrentIndex(idx);
        }
      })
      .catch(() => setLoading(false));
  }, [searchParams]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
  }

  if (!stories.length) {
    return <div className="min-h-screen flex items-center justify-center text-lg">No stories found.</div>;
  }

  const story = stories[currentIndex];

  return (
      <div className="bg-white pt-12">
        <div className="max-w-3xl mx-auto pb-12">
          <img src={story.company_icon} alt="company icon" className="h-12 w-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-[#2a2b3f] mb-6">{story.title}</h1>
          <p className="text-base md:text-lg text-[#2a2b3f] whitespace-pre-line mb-8">{story.description}</p>
        </div>

        <div className="bg-[#5022c3] text-white py-24">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-4xl font-serif font-bold mb-6 leading-tight">We're your strategic learning partner. <br />
            Let's move skills forward together.</h3>
            <a href="/demo" className="bg-black text-sm font-bold text-white p-2 rounded">
              Request a demo today
            </a>
          </div>
        </div>
      </div>
  );
}
