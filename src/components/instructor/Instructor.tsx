"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Instructor: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center bg-[#f6f7f9] text-[#2a2b3f] px-4 py-20">
      <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-center">
        Become an instructor today
      </h1>
      <p className="text-xl mb-6 text-center">
        Join one of the world's largest online learning <br /> marketplaces.
      </p>
      <button
        className="bg-[#6d28d2] hover:bg-purple-700 text-white font-bold text-sm rounded-md py-2.5 px-24 focus:outline-none"
        onClick={() => router.push("/demo")}
      >
        Get started
      </button>
    </div>
  );
};

export default Instructor;
