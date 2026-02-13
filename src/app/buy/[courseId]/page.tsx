"use client";

import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BuyNow from '@/components/pages/BuyNow';
import { useAuth } from "@/contexts/AuthContext";

type BuyPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default function BuyPage({ params }: BuyPageProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const unwrappedParams = use(params);
  const { courseId } = unwrappedParams;

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signup");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const handlePurchaseComplete = (purchasedCourseId: string) => {
    router.push(`/courses/${purchasedCourseId}?bought=true`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-10 lg:bg-gradient-to-r from-white from-[60%] to-gray-100 to-[40%]">
      <BuyNow courseId={courseId} onPurchaseComplete={handlePurchaseComplete} />
    </div>
  );
}
