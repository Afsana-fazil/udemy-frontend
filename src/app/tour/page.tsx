"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AlternativeNavbar from "@/components/layouts/Navbar";
import AlternativeFooter from "@/components/layouts/Footer";

export default function TourPage() {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  return (
    <>
        <AlternativeNavbar />
        <div className="min-h-screen w-full pt-14 pb-44 relative" style={{ background: '#199fa3' }}>
        <img src="/assets/product-tour-scribble.webp" alt="bg-image" className="absolute right-64 bottom-16 object-cover z-0 w-3/12" />
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-white text-5xl mb-10 text-center">Interactive Product Tour</h1>
            <div className="flex flex-col items-center justify-center w-full">
            <div className="bg-white rounded-2xl shadow-lg max-w-5xl w-full mx-auto flex flex-col items-center p-0 overflow-hidden">
                <a href="https://capture.navattic.com/cm2xq600s000203js3k0e1jxh?utm_source=aff-campaign&utm_medium=udemyads&utm_type=mx&ref=logged-in-nav&user_type=mx&current_url=https%3A%2F%2Fbusiness.udemy.com%2Fproduct-tour%2F&country_code=IN" target="_blank">
                    <img src="/assets/tour.png" alt="Product Tour" className="w-full h-auto object-contain z-10 relative" />
                </a>
            </div>
            </div>
        </div>

        {/* Modal */}
        {showModal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div className="bg-white border border-solid border-[#ededed] border-t-8 rounded-lg shadow-2xl mx-4 p-8 pb-1.5 relative flex flex-col items-center">
                <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowModal(false)}
                aria-label="Close"
                >
                &times;
                </button>
                <h2 className="text-2xl font-bold text-center mb-5 mt-2">Welcome to</h2>
                <div className="flex items-center justify-center mb-4">
                <a href="/business"><img src="/assets/logo-ub.svg" alt="logo-udemy-business" className="w-56" /></a>

                </div>
                <p className="text-center mb-4 text-[#22223b]">
                See Udemy in action - take this <span className="font-semibold">interactive tour</span> of our enterprise <br /> learning platform.
                </p>
                <button
                className="bg-[#a435f0] text-white font-bold px-2.5 py-1.5 rounded text-sm hover:bg-[#8431c9] transition-colors mb-8 border border-solid border-[#693BDD]"
                onClick={() => router.push('/demo')}
                >
                Get started
                </button>
                <a href="https://www.navattic.com/" target="_blank" className="text-xs text-[#9ca3af]">Powered by Navattic</a>
            </div>
            </div>
        )}
        </div>
        <AlternativeFooter />
    </>
  );
}
