"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Link from 'next/link';


interface ServiceCategory {
  id: number;
  title: string;
}

interface Service {
  id: number;
  service_category: number;
  title: string;
  stat_1_percent: string;
  stat_1_text: string;
  brand_1: string;
  stat_2_percent: string;
  stat_2_text: string;
  brand_2: string;
  image: string; 
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export default function Services() {

  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingService, setLoadingService] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchJson = async <T,>(url: string): Promise<T> => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} – ${res.statusText}`);
    }
    return res.json();
  };

  useEffect(() => {
    (async () => {
      try {

        const data = await fetchJson<ServiceCategory[]>(
          `${API_BASE}/api/service-categories/`
        );
        setCategories(data);
        if (data.length) {
          setActiveCategory(data[0].id);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load service categories.");
      } finally {
        setLoadingCategories(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (activeCategory === null) return;

    (async () => {
      setLoadingService(true);
      try {
        const data = await fetchJson<Service[]>(
          `${API_BASE}/api/services/?service_category=${activeCategory}`
        );
        setService(data[0] ?? null);
      } catch (err) {
        console.error(err);
        setError("Unable to load category content.");
      } finally {
        setLoadingService(false);
      }
    })();
  }, [activeCategory]);


  const StatBlock = ({ percent, text, brand }: { percent: string; text: string; brand: string }) => (
    <div className="space-y-3">
      <div className="text-5xl font-bold text-gray-900">{percent}</div>
      <div className="text-gray-700 text-lg leading-relaxed">{text}</div>
      <a href="#" className="text-blue-600 text-sm font-medium underline hover:text-blue-800 transition-colors">
        {brand}
      </a>
    </div>
  );


  if (loadingCategories) {
    return (
      <section className="min-h-60 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </section>
    );
  }

  if (error && !categories.length) {
    return (
      <section className="min-h-60 flex flex-col items-center justify-center text-center gap-4">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={() => {
            setLoadingCategories(true);
            setError(null);
            setCategories([]);
            setActiveCategory(null);
          }}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
        >
          Retry
        </button>
      </section>
    );
  }


  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl leading-tight mb-14">
          Transforming organizations <br /> in every industry
        </h1>

        {/* Category Tabs */}
        <nav className="mb-12 overflow-x-auto">
          <ul className="flex border-b border-solid border-gray-200 whitespace-nowrap">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={`px-6 py-4 text-base font-medium transition-all duration-200 border-b border-solid ${
                    activeCategory === cat.id
                      ? "border-solid border-gray-900"
                      : "text-[#6a6f73] border-solid border-transparent hover:text-gray-700"
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Card */}
        <div className="bg-[#f7f9fa] rounded-3xl shadow-sm flex flex-col lg:flex-row items-stretch gap-0 lg:gap-0">
          {/* Left */}
          <div className="flex-1 flex flex-col justify-center pt-[72px] pr-[104px] pb-[72px] pl-[64px]
">
            {loadingService || !service ? (
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4" />
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="h-24 bg-gray-300 rounded"></div>
                  <div className="h-24 bg-gray-300 rounded"></div>
                </div>
                <div className="h-12 bg-gray-300 rounded w-64" />
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold leading-tight mb-16">
                  {service.title}
                </h2>
                <div className="grid grid-cols-2 gap-8 mb-20 items-start">
                  {[{
                    percent: service.stat_1_percent,
                    text: service.stat_1_text,
                    brand: service.brand_1,
                  }, {
                    percent: service.stat_2_percent,
                    text: service.stat_2_text,
                    brand: service.brand_2,
                  }].map((stat, idx) => (
                    <div key={idx} className="flex flex-col h-full justify-between gap-0 flex-1">
                      <div>
                        <div className="text-4xl font-bold mb-3">{stat.percent}</div>
                        <div className="text-[#1C1D1F] text-lg leading-snug mb-6">{stat.text}</div>
                      </div>
                      <div className="mt-auto">
                        <hr className="border-t border-solid border-[#E5E5E5] mb-3" />
                        <a href="#" className="text-[#5624D0] underline text-sm hover:text-[#1C1D1F]">
                          {stat.brand}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/courses" className="mt-2 p-3 bg-black text-white text-sm font-bold rounded w-fit hover:bg-[#4435bb]">
                  Explore {categories.find((c) => c.id === service.service_category)?.title.toLowerCase()} solutions
                </Link>
              </>
            )}
          </div>
          {/* Right - Image */}
          <div className="flex-1 flex items-center justify-center">
            {loadingService || !service ? (
              <div className="bg-gray-200 rounded-2xl animate-pulse w-full h-full" />
            ) : (
              <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
