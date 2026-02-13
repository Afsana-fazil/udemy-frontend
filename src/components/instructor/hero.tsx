"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const bgUrl = "/assets/billboard-desktop-v4.webp";

export default function InstructorHero() {
  const router = useRouter();
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center mx-4"
      style={{
        backgroundColor: "#f7f7fa",
        backgroundImage: `url(${bgUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16 gap-8">
        <div className="flex-1 flex flex-col items-start justify-center max-w-lg">
          <h1 className="text-6xl font-serif font-bold text-[#2a2b3f] mb-2">
            Come<br />teach with<br />us
          </h1>
          <p className="text-lg text-[#2a2b3f] mb-4">
            Become an instructor and change lives <br /> — including your own
          </p>
          <button
            className="bg-[#6d28d2] hover:bg-[#5126b5] text-white font-bold text-sm rounded-md py-3 px-32"
            onClick={() => router.push("/demo")}
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
