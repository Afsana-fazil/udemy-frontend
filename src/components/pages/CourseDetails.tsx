"use client"

import React, { useState, useEffect } from "react";
import Learning from "@/components/detailsPage/Learning";
import Explore from "@/components/detailsPage/Explore";
import Content from "@/components/detailsPage/Content";
import Description from "@/components/detailsPage/Description";
import Popular from "@/components/detailsPage/Popular";
import Instructor from "@/components/detailsPage/Instructors";
import Reviews from "@/components/detailsPage/Reviews";
import JulianCard from "@/components/detailsPage/JulianCard";
import JosePortillaCourses from "@/components/detailsPage/365Courses"
import { useRouter, useSearchParams } from 'next/navigation'; 
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';


interface CourseDetailsProps {
  course: any;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function CourseDetails({ course }: CourseDetailsProps) {
  console.log('Course prop:', course);
  if (!course) {
    return <p className="min-h-screen flex items-center justify-center text-xl text-gray-700">Loading course details...</p>;
  }

  const router = useRouter(); 
  const searchParams = useSearchParams(); 
  const { user, token } = useAuth();

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [couponCode, setCouponCode] = useState('CP130525'); 
  const [couponInput, setCouponInput] = useState('');
  const [showBuyPopup, setShowBuyPopup] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const [courseData, setCourseData] = useState(course);
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistId, setWishlistId] = useState<string | null>(null);
  console.log('Course data state:', courseData);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/courses/${course.id}/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCourseData(data));
  }, [token, course.id]);

  useEffect(() => {
    if (!token) {
      setInCart(false);
      setCartId(null);
      return;
    }
    fetch(`${API_BASE}/cart/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        // Defensive: always get the array
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : Array.isArray(data?.data)
              ? data.data
              : [];
        const found = items.find((item: any) => item.course.id === course.id);
        setInCart(!!found);
        setCartId(found ? String(found.id) : null);
      });
  }, [token, course.id]);

  useEffect(() => {
    if (!token) {
      setWishlisted(false);
      setWishlistId(null);
      return;
    }
    fetch(`${API_BASE}/wishlist/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data) ? data : (data.results || data.data || []);
        const found = items.find((item: any) => item.course.id === course.id);
        setWishlisted(!!found);
        setWishlistId(found ? String(found.id) : null);
      })
      .catch(() => {
        setWishlisted(false);
        setWishlistId(null);
      });
  }, [token, course.id]);

  const handleBuyNow = () => {
    if (user) {
      router.push(`/buy/${course.id}`);
    } else {
      router.push('/signup');
    }
  };

  const handleViewCourseVideos = () => {
    router.push(`/course-videos?courseId=${course.id}`);
  };

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/signup');
      return;
    }
    if (inCart) {
      Swal.fire({
        title: 'Already in Cart',
        text: 'This course is already in your cart.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      return;
    }
    const res = await fetch(`${API_BASE}/cart/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course_id: course.id }),
    });
    if (res.ok) {
      const data = await res.json();
      setInCart(true);
      setCartId(String(data.id));
      window.dispatchEvent(new Event('cart-updated'));
      Swal.fire({
        title: 'Added to Cart!',
        text: 'Course has been added to your cart.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleWishlistClick = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!user) {
      router.push('/signup');
      return;
    }
    if (wishlisted && wishlistId) {
      await fetch(`${API_BASE}/wishlist/${wishlistId}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setWishlisted(false);
      setWishlistId(null);
      window.dispatchEvent(new Event('wishlist-updated'));
    } else {
      const res = await fetch(`${API_BASE}/wishlist/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course_id: course.id }),
      });
      if (res.ok) {
        const data = await res.json();
        setWishlisted(true);
        setWishlistId(String(data.id));
        window.dispatchEvent(new Event('wishlist-updated'));
      } else {
        const text = await res.text();
        console.error('Wishlist add failed:', res.status, text);
      }
    }
  };

  const handlePreviewCourse = () => {
    if (courseData.purchased) {
      router.push(`/course-videos?courseId=${courseData.id}`);
    } else {
      setShowBuyPopup(true);
    }
  };

  const handlePurchaseComplete = (purchasedCourseId: string) => {
    router.push(`/course-videos?courseId=${purchasedCourseId}`);
  };

  return (
    <section className="bg-white">
      <div className={`bg-[#16161d] ${showAllLanguages ? 'h-auto pb-8' : 'h-fit'} text-white pt-8 pb-14`}>
        <div className="max-w-6xl mx-auto px-8">
          <nav className="text-sm flex gap-3 items-center mb-6">
            <span>
              <a href="" className="text-[#c0c4fc] font-bold">
                {courseData?.main_category}
              </a>
            </span>
            &gt;{" "}
            <span>
              <a href="" className="text-[#c0c4fc] font-bold">
                {courseData?.sub_category_name}
              </a>
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 relative">
            <div className="lg:w-2/3">
              <h1 className="text-[32px] leading-tight font-bold">{courseData.title || 'N/A'}</h1>
              <p className="mt-3 text-lg font-normal">{courseData.description || 'No description available.'}</p>

              <div className="mt-6">
                {courseData.best_seller && (
                  <span className="text-[#0d5261] text-xs font-semibold bg-[#c2e9eb] py-1 px-2 rounded">
                    Bestseller
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm">
                Created by{" "}
                <a href="#" className="underline text-[#c0c4fc]">
                  {courseData.created_by || 'Unknown'}
                </a>
              </p>

              <div className={`mt-4 flex items-start gap-2 ${showAllLanguages ? 'flex-col gap-5 items-start' : 'flex-row'}`}>
                <div className="flex items-center gap-2">
                  <p className="text-sm flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 490 490"
                      width="14"
                      height="14"
                      fill="#fff"
                    >
                      <path d="M67.375,291.55l-33.687,71.739l84.219,9.157l4.594,85.505l78.094-36.643L252.656,490l45.937-68.692l71.969,35.111l6.125-85.49l84.219-1.531l-30.625-70.223L490,245.766l-64.313-51.894l41.344-71.739l-87.281-7.626l-7.656-83.958l-73.5,35.112L248.063,0l-47.469,67.161l-76.563-39.69l-4.594,87.021l-85.75,4.578l32.156,82.427L0,241.187L67.375,291.55z M94.371,190.365l-16.767-42.982l43.457-2.327l27.501-1.47l1.455-27.501l2.082-39.567l34.392,17.824l23.704,12.281l15.404-21.805l23.52-33.274l25.204,32.754l15.113,19.631l22.356-10.673l33.795-16.139l3.66,40.134l2.328,25.495l25.511,2.236l39.43,3.445l-17.364,30.135l-13.077,22.678l20.381,16.446l36.275,29.262l-32.861,29.4l-16.507,14.761l8.851,20.304l12.296,28.19l-38.373,0.689l-27.991,0.505l-2.006,27.93l-2.879,40.272l-31.238-15.236l-24.025-11.714l-14.853,22.218l-22.035,32.953l-26.092-34.438l-14.976-19.753l-22.448,10.535l-36.949,17.334l-2.159-40.103l-1.393-25.985l-25.878-2.818l-41.573-4.502l15.45-32.922l10.612-22.601l-19.998-14.945l-30.916-23.122l26.858-16.185l22.096-13.322L94.371,190.365z"/>
                      <polygon points="261.078,275.916 267.234,149.205 222.766,149.205 229.197,275.916"/>
                      <path d="M245.138,340.795c15.098,0,24.898-10.918,24.898-25.449c-0.291-14.838-10.076-25.449-24.898-25.449
                      s-25.174,10.612-25.174,25.449C219.964,329.877,230.024,340.795,245.138,340.795z"/>
                    </svg>
                    Last updated {formatDate(courseData.updated_at)}
                  </p>

                  <small className="flex items-center gap-2">
                    <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Navigation / Globe">
                      <path id="Vector" d="M3 12H8M3 12C3 16.9706 7.02944 21 12 21M3 12C3 7.02944 7.02944 3 12 3M8 12H16M8 12C8 16.9706 9.79086 21 12 21M8 12C8 7.02944 9.79086 3 12 3M16 12H21M16 12C16 7.02944 14.2091 3 12 3M21 12C21 7.02944 16.9706 3 12 3M21 12C21 16.9706 16.9706 21 12 21" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                    </svg>
                    English
                  </small>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <small className="flex items-center gap-2">
                    <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 4H16.5C17.12 4 17.67 4.02 18.16 4.09C20.79 4.38 21.5 5.62 21.5 9V15C21.5 18.38 20.79 19.62 18.16 19.91C17.67 19.98 17.12 20 16.5 20H7.5C6.88 20 6.33 19.98 5.84 19.91C3.21 19.62 2.5 18.38 2.5 15V9C2.5 5.62 3.21 4.38 5.84 4.09C6.33 4.02 6.88 4 7.5 4Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.5 10H17" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 15.5H7.02H17" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.0946 10H10.1036" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.0946 10H7.10359" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    English [CC], Arabic [Auto]
                  </small>

                  <small>
                    <button
                      className="text-purple-400 hover:text-purple-300"
                      onClick={() => setShowAllLanguages(!showAllLanguages)}
                    >
                      {showAllLanguages ? "Show less" : "25 more"}
                    </button>
                  </small>

                  {showAllLanguages && (
                    <div className="w-full text-sm text-gray-300 max-w-xl ">
                      Czech [Auto], Danish [Auto], Dutch [Auto], Estonian [Auto], Finnish [Auto],
                      French [Auto], German [Auto], Greek [Auto], Hungarian [Auto], Indonesian [Auto],
                      Italian [Auto], Japanese [Auto], Korean [Auto], Latvian [Auto], Lithuanian [Auto],
                      Polish [Auto], Portuguese [Auto], Romanian [Auto], Simplified Chinese [Auto],
                      Slovak [Auto], Spanish [Auto], Swedish [Auto], Turkish [Auto], Ukrainian [Auto],
                      Vietnamese [Auto]
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute flex items-center gap-2 mt-4 bg-white border border-solid border-[#d1d2e0] rounded-lg w-fit">
                <div className="bg-[#5022c3] px-5 py-6 rounded-l-lg">
                  {courseData.premium && (
                    <span className="text-md font-bold flex flex-col items-center gap-2">
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.78133 3.89027C10.3452 3.40974 10.6271 3.16948 10.9219 3.02859C11.6037 2.70271 12.3963 2.70271 13.0781 3.02859C13.3729 3.16948 13.6548 3.40974 14.2187 3.89027C14.4431 4.08152 14.5553 4.17715 14.6752 4.25747C14.9499 4.4416 15.2584 4.56939 15.5828 4.63344C15.7244 4.66139 15.8713 4.67312 16.1653 4.69657C16.9038 4.7555 17.273 4.78497 17.5811 4.89378C18.2936 5.14546 18.8541 5.70591 19.1058 6.41844C19.2146 6.72651 19.244 7.09576 19.303 7.83426C19.3264 8.12819 19.3381 8.27515 19.3661 8.41669C19.4301 8.74114 19.5579 9.04965 19.7421 9.32437C19.8224 9.44421 19.918 9.55642 20.1093 9.78084C20.5898 10.3447 20.8301 10.6267 20.971 10.9214C21.2968 11.6032 21.2968 12.3958 20.971 13.0776C20.8301 13.3724 20.5898 13.6543 20.1093 14.2182C19.918 14.4426 19.8224 14.5548 19.7421 14.6747C19.5579 14.9494 19.4301 15.2579 19.3661 15.5824C19.3381 15.7239 19.3264 15.8709 19.303 16.1648C19.244 16.9033 19.2146 17.2725 19.1058 17.5806C18.8541 18.2931 18.2936 18.8536 17.5811 19.1053C17.273 19.2141 16.9038 19.2435 16.1653 19.3025C15.8713 19.3259 15.7244 19.3377 15.5828 19.3656C15.2584 19.4297 14.9499 19.5574 14.6752 19.7416C14.5553 19.8219 14.4431 19.9175 14.2187 20.1088C13.6548 20.5893 13.3729 20.8296 13.0781 20.9705C12.3963 21.2963 11.6037 21.2963 10.9219 20.9705C10.6271 20.8296 10.3452 20.5893 9.78133 20.1088C9.55691 19.9175 9.44469 19.8219 9.32485 19.7416C9.05014 19.5574 8.74163 19.4297 8.41718 19.3656C8.27564 19.3377 8.12868 19.3259 7.83475 19.3025C7.09625 19.2435 6.72699 19.2141 6.41893 19.1053C5.7064 18.8536 5.14594 18.2931 4.89427 17.5806C4.78546 17.2725 4.75599 16.9033 4.69706 16.1648C4.6736 15.8709 4.66188 15.7239 4.63393 15.5824C4.56988 15.2579 4.44209 14.9494 4.25796 14.6747C4.17764 14.5548 4.08201 14.4426 3.89076 14.2182C3.41023 13.6543 3.16997 13.3724 3.02907 13.0776C2.7032 12.3958 2.7032 11.6032 3.02907 10.9214C3.16997 10.6266 3.41023 10.3447 3.89076 9.78084C4.08201 9.55642 4.17764 9.44421 4.25796 9.32437C4.44209 9.04965 4.56988 8.74114 4.63393 8.41669C4.66188 8.27515 4.6736 8.12819 4.69706 7.83426C4.75599 7.09576 4.78546 6.72651 4.89427 6.41844C5.14594 5.70591 5.7064 5.14546 6.41893 4.89378C6.72699 4.78497 7.09625 4.7555 7.83475 4.69657C8.12868 4.67312 8.27564 4.66139 8.41718 4.63344C8.74163 4.56939 9.05014 4.4416 9.32485 4.25747C9.4447 4.17715 9.55691 4.08152 9.78133 3.89027Z"
                          stroke="#fff"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8.5 12.5L10.5 14.5L15.5 9.5"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Premium
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 p-3">
                  <p className="text-[#2a2b3f] text-sm font-normal">Access this top-rated course, plus <br /> 13,000+ more top-rated courses, with a <br /> Udemy plan.
                  <a href="/plans" className="text-sm text-[#6d28d2] font-bold underline">See Plans & Pricing</a></p>
                  <div className="flex flex-col items-center gap-1 text-2xl font-bold text-[#2a2b3f] border-l border-r px-6 border-solid border-[#d1d2e0]">
                    <span className="text-sm text-[#595c73] font-normal underline mt-1">{courseData.reviews} ratings</span>
                  </div>
                  <div className="flex flex-col gap-1 items-center text-sm text-gray-300 px-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" id="mdi-account-multiple-outline" viewBox="0 0 24 24" fill="none">
                      <path d="M13.07 10.41A5 5 0 0 0 13.07 4.59A3.39 3.39 0 0 1 15 4A3.5 3.5 0 0 1 15 11A3.39 3.39 0 0 1 13.07 10.41M5.5 7.5A3.5 3.5 0 1 1 9 11A3.5 3.5 0 0 1 5.5 7.5M7.5 7.5A1.5 1.5 0 1 0 9 6A1.5 1.5 0 0 0 7.5 7.5M16 17V19H2V17S2 13 9 13 16 17 16 17M14 17C13.86 16.22 12.67 15 9 15S4.07 16.31 4 17M15.95 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13Z" fill="#2a2b3f" />
                    </svg>
                    <span className="text-sm text-[#2a2b3f] font-bold">270,355</span>
                    <small className="text-sm text-[#595c73] mt-1">learners</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 absolute right-0 -top-10">
              <div className="bg-white text-black border-b border-solid border-[#d1d2e0] overflow-hidden shadow-[0_2px_4px_rgba(6,17,118,0.08),_0_4px_12px_rgba(6,17,118,0.08)]">
                <div className="relative border border-solid border-[#d1d2e0]">
                    <div 
                      onClick={handlePreviewCourse}
                      className="cursor-pointer"
                    >
                      <img
                        src={courseData.image}
                        alt="Course Preview"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x240/6366f1/ffffff?text=Course+Preview';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end">
                        <button className="bg-white rounded-full p-3 mb-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="38"
                            height="38"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                              fill="#6B7280"
                            />
                          </svg>
                        </button>
                        <p className="text-white font-bold mb-4">Preview this course</p>
                      </div>
                    </div>
                </div>

                <div>
                  <div className="border-b border-solid border-gray-200">
                    <div className="flex">
                      <button
                        onClick={() => setActiveTab('personal')}
                        className={`flex-1 py-3 px-4 text-center text-md font-bold hover:text-[#2a2b3f] ${
                          activeTab === 'personal'
                            ? 'text-[#2a2b3f] border-solid border-b-2 border-[#2a2b3f] bg-white'
                            : 'text-gray-500'
                        }`}
                      >
                        Personal
                      </button>
                      <button
                        onClick={() => setActiveTab('teams')}
                        className={`flex-1 py-3 px-4 text-center text-md font-bold hover:text-[#2a2b3f] ${
                          activeTab === 'teams'
                            ? 'text-[#2a2b3f] border-solid border-b-2 border-[#2a2b3f] bg-white'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Teams
                      </button>
                    </div>
                  </div>

                  <div className="p-6 pt-4">
                    {activeTab === 'personal' ? (
                      <>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.78133 3.89027C10.3452 3.40974 10.6271 3.16948 10.9219 3.02859C11.6037 2.70271 12.3963 2.70271 13.0781 3.02859C13.3729 3.16948 13.6548 3.40974 14.2187 3.89027C14.4431 4.08152 14.5553 4.17715 14.6752 4.25747C14.9499 4.4416 15.2584 4.56939 15.5828 4.63344C15.7244 4.66139 15.8713 4.67312 16.1653 4.69657C16.9038 4.7555 17.273 4.78497 17.5811 4.89378C18.2936 5.14546 18.8541 5.70591 19.1058 6.41844C19.2146 6.72651 19.244 7.09576 19.303 7.83426C19.3264 8.12819 19.3381 8.27515 19.3661 8.41669C19.4301 8.74114 19.5579 9.04965 19.7421 9.32437C19.8224 9.44421 19.918 9.55642 20.1093 9.78084C20.5898 10.3447 20.8301 10.6267 20.971 10.9214C21.2968 11.6032 21.2968 12.3958 20.971 13.0776C20.8301 13.3724 20.5898 13.6543 20.1093 14.2182C19.918 14.4426 19.8224 14.5548 19.7421 14.6747C19.5579 14.9494 19.4301 15.2579 19.3661 15.5824C19.3381 15.7239 19.3264 15.8709 19.303 16.1648C19.244 16.9033 19.2146 17.2725 19.1058 17.5806C18.8541 18.2931 18.2936 18.8536 17.5811 19.1053C17.273 19.2141 16.9038 19.2435 16.1653 19.3025C15.8713 19.3259 15.7244 19.3377 15.5828 19.3656C15.2584 19.4297 14.9499 19.5574 14.6752 19.7416C14.5553 19.8219 14.4431 19.9175 14.2187 20.1088C13.6548 20.5893 13.3729 20.8296 13.0781 20.9705C12.3963 21.2963 11.6037 21.2963 10.9219 20.9705C10.6271 20.8296 10.3452 20.5893 9.78133 20.1088C9.55691 19.9175 9.44469 19.8219 9.32485 19.7416C9.05014 19.5574 8.74163 19.4297 8.41718 19.3656C8.27564 19.3377 8.12868 19.3259 7.83475 19.3025C7.09625 19.2435 6.72699 19.2141 6.41893 19.1053C5.7064 18.8536 5.14594 18.2931 4.89427 17.5806C4.78546 17.2725 4.75599 16.9033 4.69706 16.1648C4.6736 15.8709 4.66188 15.7239 4.63393 15.5824C4.56988 15.2579 4.44209 14.9494 4.25796 14.6747C4.17764 14.5548 4.08201 14.4426 3.89076 14.2182C3.41023 13.6543 3.16997 13.3724 3.02907 13.0776C2.7032 12.3958 2.7032 11.6032 3.02907 10.9214C3.16997 10.6266 3.41023 10.3447 3.89076 9.78084C4.08201 9.55642 4.17764 9.44421 4.25796 9.32437C4.44209 9.04965 4.56988 8.74114 4.63393 8.41669C4.66188 8.27515 4.6736 8.12819 4.69706 7.83426C4.75599 7.09576 4.78546 6.72651 4.89427 6.41844C5.14594 5.70591 5.7064 5.14546 6.41893 4.89378C6.72699 4.78497 7.09625 4.7555 7.83475 4.69657C8.12868 4.67312 8.27564 4.66139 8.41718 4.63344C8.74163 4.56939 9.05014 4.4416 9.32485 4.25747C9.4447 4.17715 9.55691 4.08152 9.78133 3.89027Z"
                              stroke="#6d28d2"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M8.5 12.5L10.5 14.5L15.5 9.5"
                              stroke="#6d28d2"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          This Premium course is included in plans
                        </div>

                        <div className="mb-4">
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-[#2a2b3f]">₹{courseData.price ?? 'N/A'}</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <button 
                            onClick={handleAddToCart}
                            className="w-full bg-[#6d28d2] text-white py-3 px-4 rounded-md font-bold hover:bg-purple-700 transition-colors"
                          >
                            Add to cart
                          </button>

                          {courseData.purchased ? (
                            <button
                              onClick={handleViewCourseVideos}
                              className="w-full border border-solid border-[#6d28d2] text-[#6d28d2] py-3 px-4 rounded-md font-semibold hover:bg-[#6d28d2] hover:text-white transition-colors"
                            >
                              View Course Videos
                            </button>
                          ) : (
                            <button
                              onClick={handleBuyNow}
                              className="w-full border border-solid border-[#6d28d2] text-[#6d28d2] py-3 px-4 rounded-md font-semibold hover:bg-[#6d28d2] hover:text-white transition-colors"
                            >
                              Buy now
                            </button>
                          )}
                        </div>

                        <div className="text-center text-xs text-[#2a2b3f] mb-3">
                          <div>30-Day Money-Back Guarantee</div>
                          <div className="mt-3">Full Lifetime Access</div>
                        </div>

                        <div className="flex justify-between text-sm mb-6">
                          <button className="text-[#2a2b3f] font-bold underline-offset-4 decoration-purple-600 underline">Share</button>
                          <button className="text-[#2a2b3f] font-bold underline-offset-4 decoration-purple-600 underline">Gift this course</button>
                          <button className="text-[#2a2b3f] font-bold underline-offset-4 decoration-purple-600 underline">Apply Coupon</button>
                        </div>

                        <div className="">
                          <div className="border border-dashed border-[#d1d2e0] py-1 px-2 text-sm text-[#9194ac] mb-2">
                            <span className="font-mono font-bold text-[#9194ac]">{couponCode}</span>
                            <small className="ml-2">is applied</small>
                            <div className="text-xs">Udemy coupon</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Enter Coupon"
                              className="flex-1 border border-solid border-[#9194ac] placeholder-[#2a2b3f] rounded px-3 py-2 text-sm"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value)} 
                            />
                            <button 
                              onClick={() => {
                                if (couponInput.trim()) {
                                  setCouponCode(couponInput);
                                  setCouponInput('');
                                }
                              }}
                              className="bg-[#6d28d2] text-white px-4 py-2 rounded text-sm font-bold hover:bg-purple-700"
                            >
                              Apply
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mb-0">
                          <hr className="flex-grow border-t border-solid border-gray-300" />
                          <span className="mx-2 text-xs text-gray-600">or</span>
                          <hr className="flex-grow border-t border-solid border-gray-300" />
                        </div>

                        <div className="pt-4 pb-2">
                          <h4 className="font-bold font-serif text-xl leading-snug text-[#2a2b3f]">Subscribe to Udemy's top <br /> courses</h4>
                          <p className="text-sm text-[#2a2b3f] mb-4">
                            Get this course, plus 13,000+ of our top-rated courses, with Personal Plan.{' '}
                            <button 
                              onClick={() => router.push('/plans')}
                              className="text-[#6d28d2] text-sm font-semibold underline underline-offset-4"
                            >
                              Learn more
                            </button>
                          </p>
                          <button 
                            onClick={() => router.push('/plans')}
                            className="w-full border border-solid border-[#6d28d2] text-[#6d28d2] py-3 px-4 rounded font-semibold hover:bg-[#6d28d2] hover:text-white transition-colors"
                          >
                            Start subscription
                          </button>
                        </div>

                        <div className="text-center text-xs text-[#595c73] mb-3">
                          <div>Starting at ₹850 per month</div>
                          <div className="mt-2">Cancel anytime</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <div className="w-4 h-4 rounded-full border-2 border-purple-600 mr-2"></div>
                          This Premium course is included in plans
                        </div>

                        <div className="mb-6">
                          <div className="flex items-center mb-4">
                            <span className="text-2xl font-bold text-gray-900">Udemy</span>
                            <span className="text-2xl font-bold text-purple-600 ml-1">business</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            Subscribe to this course and 30,000+ top-rated Udemy courses for your organization.
                          </p>
                          <button 
                            onClick={() => window.open('/business', '_blank')}
                            className="w-full bg-[#6d28d2] text-white py-3 px-4 rounded-md font-semibold hover:bg-purple-700 transition-colors"
                          >
                            Try Udemy Business
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-700">
                            <div className="w-5 h-5 text-green-600 mr-3">✓</div>
                            For teams of 2 or more users
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <div className="w-5 h-5 text-green-600 mr-3">✓</div>
                            30,000+ fresh & in-demand courses
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <div className="w-5 h-5 text-green-600 mr-3">✓</div>
                            Learning Engagement tools
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <div className="w-5 h-5 text-green-600 mr-3">✓</div>
                            SSO and LMS Integrations
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Learning />
      <Explore />
      <Content courseId={courseData.id} />
      <Description />
      <Popular />
      <Instructor />
      <Reviews />
      <JulianCard />
      <JosePortillaCourses />

      {showBuyPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
            <p className="text-lg font-bold mb-4 text-[#2a2b3f] text-center">Buy the course to watch the videos!</p>
            <button
              className="bg-[#6d28d2] text-white px-6 py-2 rounded font-bold hover:bg-purple-700 transition-colors mb-2 w-full"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="text-[#6d28d2] mt-2 underline text-sm"
              onClick={() => setShowBuyPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </section>
  );
}


