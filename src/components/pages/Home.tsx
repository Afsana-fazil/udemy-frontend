"use client";

import { useSearch } from '../../contexts/SearchContext';
import HeroSlider from '../HeroSlider';
import Categories from "../Categories";
import Banner from "../Banner";
import LearnersSection from "../LearnersSection";
import Goals from "../Goals";
import Plans from "../ui/Plans";
import Testimonial from '../Testimonial';
import LeadersSection from '../LeadersSection';
import Trending from '../Trending';

export const metadata = {
  title: 'Online Courses - Learn Anything, On Your Schedule | Udemy',
  icons: {
    icon: '/favicon.png',
  },
}

export default function Home() {
  const { isSearching } = useSearch();

  return (
    <main>
      <section className="w-[90%] xl:w-[75%] mx-auto">
        <HeroSlider />
      </section>

      {!isSearching && (
        <>
          <Categories />
          <Banner />
        </>
      )}

      <LearnersSection />

      {!isSearching && (
        <>
          <Goals />
          <Plans />
          <Testimonial />
          <LeadersSection />
          <Trending />
        </>
      )}
    </main>
  )
}
