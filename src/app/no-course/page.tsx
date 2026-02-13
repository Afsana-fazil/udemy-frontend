"use client";
import { useRouter } from 'next/navigation';

export default function NoCoursePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-[#2a2b3f] px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">No Course Available</h1>
      <p className="text-lg mb-8 text-center">There is no course available for this.</p>
      <button
        className="bg-[#6d28d2] hover:bg-purple-700 text-white font-bold text-base rounded-md py-3 px-8 focus:outline-none"
        onClick={() => router.push("/")}
      >
        Go to Home
      </button>
    </div>
  );
} 