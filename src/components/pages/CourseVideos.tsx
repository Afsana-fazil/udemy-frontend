"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiPlayCircle, FiChevronDown, FiChevronUp, FiChevronRight, FiCheckSquare, FiSquare } from 'react-icons/fi';
import Description from '../detailsPage/Description';
import extraCourseData from '../data/extraCourseData.json';
import NotesTab from '../ui/NotesTab';
import ReviewsTab from '../ui/ReviewsTab';
import LearningToolsTab from '../ui/LearningToolsTab';
import AnnouncementTab from '../ui/AnnouncementTab';


interface Course {
  id: number;
  title: string;
  description: string;
  video: string;
  image: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  rating_point: number;
  rating: string;
  students: number;
  total_hours?: string | number;
}

interface ExtraData {
  id: string | number;
  total_hours: string | number;
  students: number;
}


const Section = ({ section }: { section: any }) => {
    const [isOpen, setIsOpen] = useState(true);
  
    return (
      <div className="border border-gray-200 mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-50 p-4 text-left font-semibold flex justify-between items-center"
        >
          <div className='flex flex-col'>
            <span className='font-bold text-sm'>{section.title}</span>
            <span className='text-xs font-normal'>{section.totalLectures} lectures • {section.totalDuration}</span>
          </div>
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {isOpen && (
          <ul>
            {section.lectures.map((lecture: any, index: number) => (
              <li key={index} className="flex items-center p-4 border-t border-gray-200 hover:bg-gray-100 cursor-pointer">
                {lecture.is_completed ? <FiCheckSquare className="mr-3 text-purple-600" /> : <FiSquare className="mr-3 text-gray-400" />}
                <span className="text-sm flex-grow">{lecture.title}</span>
                <span className="text-sm text-gray-500">{lecture.duration}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
};

export default function CourseVideos() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [otherCourses, setOtherCourses] = useState<Course[]>([]);
  const [openOther, setOpenOther] = useState<{[id: number]: boolean}>({});
  const [activeTab, setActiveTab] = useState('overview');

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!courseId) {
      setError("No course ID provided");
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${BASE_URL}/api/courses/${courseId}/`);
        
        if (!response.ok) {
          throw new Error('Course not found');
        }
        
        const courseData = await response.json();
        setCourse(courseData);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Course not found or unavailable');
      } finally {
        setLoading(false);
      }
    };

    // Fetch all courses for 'Other Courses' section
    const fetchOtherCourses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/courses/`);
        if (!response.ok) return;
        const allCourses = await response.json();
        // Exclude current course
        const filtered = allCourses.filter((c: Course) => c.id !== Number(courseId));
        // Shuffle and pick 4
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setOtherCourses(shuffled.slice(0, 4));
      } catch (err) {
        // ignore
      }
    };

    fetchCourse();
    fetchOtherCourses();
  }, [courseId, BASE_URL]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Find extra data for the current course
  const extraDataForCourse = extraCourseData.find((item: ExtraData) => Number(item.id) === Number(course?.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg">Loading course content...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Error: {error || 'Course Not Found'}</h1>
        <p className="text-lg mb-6">Please ensure you have access to this course or a valid course ID is provided.</p>
        <button
          onClick={() => router.back()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#2a2b3f]">
      <div className="">
        <div className="flex flex-col lg:flex-row">

          {/* Main content */}
          <div className="w-full">
            <div className="bg-black shadow-lg overflow-hidden">
              {course.video ? (
                <video controls className="w-11/12 mx-auto h-auto">
                  <source src={course.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-96 bg-gray-800 flex items-center justify-center">
                  <FiPlayCircle className="text-white text-6xl" />
                </div>
              )}
            </div>
            
            <div className="bg-white p-6 max-w-6xl mx-auto ">
                {/* Tabs */}
                <div className="border-b border-solid border-gray-200 px-8">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                          onClick={() => setActiveTab('overview')}
                          className={`whitespace-nowrap py-2 px-1 border-b-2 border-solid font-bold ${
                            activeTab === 'overview'
                              ? 'border-[#2a2b3f] text-[#2a2b3f] font-bold'
                              : 'border-transparent text-[#595c73]'
                          }`}
                        >
                        Overview
                        </button>
                        <button
                          onClick={() => setActiveTab('notes')}
                          className={`whitespace-nowrap py-2 px-1 border-b-2 border-solid font-bold ${
                            activeTab === 'notes'
                              ? 'border-[#2a2b3f] text-[#2a2b3f] font-bold'
                              : 'border-transparent text-[#595c73]'
                          }`}
                        >
                        Notes
                        </button>
                        <button
                           onClick={() => setActiveTab('announcements')}
                           className={`whitespace-nowrap py-2 px-1 border-b-2 border-solid font-bold ${
                             activeTab === 'announcements'
                               ? 'border-[#2a2b3f] text-[#2a2b3f] font-bold'
                               : 'border-transparent text-[#595c73]'
                           }`}
                        >
                        Announcements
                        </button>
                        <button
                           onClick={() => setActiveTab('reviews')}
                           className={`whitespace-nowrap py-2 px-1 border-b-2 border-solid font-bold ${
                             activeTab === 'reviews'
                               ? 'border-[#2a2b3f] text-[#2a2b3f] font-bold'
                               : 'border-transparent text-[#595c73]'
                           }`}
                        >
                        Reviews
                        </button>
                         <button
                           onClick={() => setActiveTab('learning-tools')}
                           className={`whitespace-nowrap py-2 px-1 border-b-2 border-solid font-bold ${
                             activeTab === 'learning-tools'
                               ? 'border-[#2a2b3f] text-[#2a2b3f] font-bold'
                               : 'border-transparent text-[#595c73]'
                           }`}
                         >
                        Learning tools
                        </button>
                    </nav>
                </div>

                <div className="bg-white p-6 max-w-6xl mx-auto ">
                  {activeTab === 'overview' && (
                    <>
                      <h1 className="text-xl mb-6 px-8">{course.title}</h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4 px-8">
                        <div className="flex items-center gap-8 text-sm">
                          <div className='flex flex-col gap-1'>
                            <span className="font-bold text-[#8b4309] flex gap-1 items-center">
                              {course.rating_point}
                              <svg
                                height="12px"
                                width="12px"
                                viewBox="0 0 47.94 47.94"
                                fill="#c4710d"
                              >
                                <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                                c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                                c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                                c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                                c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                                C22.602,0.567,25.338,0.567,26.285,2.486z"/>
                              </svg>
                            </span>
                            <small className='text-[#595c73] text-xs'>4,522 ratings</small>
                          </div>
                          <span className="text-sm flex flex-col gap-1">
                            <span className='font-bold text-[#2a2b3f]'>{typeof extraDataForCourse?.students === 'number' ? extraDataForCourse.students.toLocaleString() : (typeof course.students === 'number' ? course.students.toLocaleString() : '0')}</span>
                            <small className='text-[#595c73] text-xs'>students</small>
                          </span>
                          <span className="text-sm flex flex-col gap-1">
                            <span className='font-bold text-[#2a2b3f]'>{extraDataForCourse?.total_hours ?? course.total_hours ?? '0'} min</span>
                            <small className='text-[#595c73] text-xs'>Total</small>
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm flex items-center gap-2 px-8 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 490 490"
                          width="14"
                          height="14"
                          fill="#000"
                        >
                          <path d="M67.375,291.55l-33.687,71.739l84.219,9.157l4.594,85.505l78.094-36.643L252.656,490l45.937-68.692l71.969,35.111l6.125-85.49l84.219-1.531l-30.625-70.223L490,245.766l-64.313-51.894l41.344-71.739l-87.281-7.626l-7.656-83.958l-73.5,35.112L248.063,0l-47.469,67.161l-76.563-39.69l-4.594,87.021l-85.75,4.578l32.156,82.427L0,241.187L67.375,291.55z M94.371,190.365l-16.767-42.982l43.457-2.327l27.501-1.47l1.455-27.501l2.082-39.567l34.392,17.824l23.704,12.281l15.404-21.805l23.52-33.274l25.204,32.754l15.113,19.631l22.356-10.673l33.795-16.139l3.66,40.134l2.328,25.495l25.511,2.236l39.43,3.445l-17.364,30.135l-13.077,22.678l20.381,16.446l36.275,29.262l-32.861,29.4l-16.507,14.761l8.851,20.304l12.296,28.19l-38.373,0.689l-27.991,0.505l-2.006,27.93l-2.879,40.272l-31.238-15.236l-24.025-11.714l-14.853,22.218l-22.035,32.953l-26.092-34.438l-14.976-19.753l-22.448,10.535l-36.949,17.334l-2.159-40.103l-1.393-25.985l-25.878-2.818l-41.573-4.502l15.45-32.922l10.612-22.601l-19.998-14.945l-30.916-23.122l26.858-16.185l22.096-13.322L94.371,190.365z"/>
                          <polygon points="261.078,275.916 267.234,149.205 222.766,149.205 229.197,275.916"/>
                          <path d="M245.138,340.795c15.098,0,24.898-10.918,24.898-25.449c-0.291-14.838-10.076-25.449-24.898-25.449
                          s-25.174,10.612-25.174,25.449C219.964,329.877,230.024,340.795,245.138,340.795z"/>
                        </svg>
                        Last updated {formatDate(course.updated_at)}
                      </p>
                      <div className='flex items-center gap-2 px-8 mb-4'>
                        <small className="flex items-center gap-2 text-sm">
                          <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Navigation / Globe">
                            <path id="Vector" d="M3 12H8M3 12C3 16.9706 7.02944 21 12 21M3 12C3 7.02944 7.02944 3 12 3M8 12H16M8 12C8 16.9706 9.79086 21 12 21M8 12C8 7.02944 9.79086 3 12 3M16 12H21M16 12C16 7.02944 14.2091 3 12 3M21 12C21 7.02944 16.9706 3 12 3M21 12C21 16.9706 16.9706 21 12 21" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                          </svg>
                          English
                        </small>
                        <small className="flex items-center text-sm">
                          <svg width="18px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 4H16.5C17.12 4 17.67 4.02 18.16 4.09C20.79 4.38 21.5 5.62 21.5 9V15C21.5 18.38 20.79 19.62 18.16 19.91C17.67 19.98 17.12 20 16.5 20H7.5C6.88 20 6.33 19.98 5.84 19.91C3.21 19.62 2.5 18.38 2.5 15V9C2.5 5.62 3.21 4.38 5.84 4.09C6.33 4.02 6.88 4 7.5 4Z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.5 10H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 15.5H7.02H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.0946 10H10.1036" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.0946 10H7.10359" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          English [Auto]
                        </small>
                      </div>

                      {/* By the numbers */}
                      <div className="border-b border-t border-solid border-gray-200 flex gap-40 py-6 px-8">
                        <h6>By the numbers</h6>
                        <ul className="space-y-1">
                            <li>Skill level: All Levels</li>
                            <li>Students: {typeof extraDataForCourse?.students === 'number' ? extraDataForCourse.students.toLocaleString() : (typeof course.students === 'number' ? course.students.toLocaleString() : '0')}</li>
                            <li>Languages: English</li>
                            <li>Video: {extraDataForCourse?.total_hours ?? course.total_hours ?? '0'} total min</li>
                        </ul>
                      </div>

                      {/* Features */}
                      <div className="border-b border-solid border-gray-200 px-8 py-6 flex gap-52">
                        <h2>Features</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>Available on <a href="/" className='text-[#6d28d2] font-bold underline underline-offset-4'>IOS</a> and <a href="/" className='text-[#6d28d2] font-bold underline underline-offset-4'>Android</a></li>
                        </ul>
                      </div>

                      {/* Description */}
                      <div className="mt-6">
                        <Description />
                      </div>
                    </>
                  )}
                  {activeTab === 'notes' && <NotesTab />}
                  {activeTab === 'reviews' && <ReviewsTab course={course} />}
                  {activeTab === 'learning-tools' && <LearningToolsTab course={course} />}
                  {activeTab === 'announcements' && <AnnouncementTab />}
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 text-[#2a2b3f]">
            <div className="bg-white">
              <h2 className="font-bold px-4 py-3 border-b border-solid border-gray-200">Course content</h2>
              <div className='flex flex-col gap-2 p-4 bg-[#f6f7f9] border-b border-solid border-gray-200'>
                <button
                  className='flex items-center gap-2 font-bold w-[90%] cursor-pointer p-0 text-left'
                  onClick={() => setShowDescription((prev) => !prev)}
                  type="button"
                >
                  {showDescription ? (
                    <FiChevronDown className='text-lg' />
                  ) : (
                    <FiChevronRight className='text-lg' />
                  )}
                  <span className=''>{course.title}</span>
                </button>
              </div>
              {showDescription && (
                <p className='text-sm py-4 px-8'>{course.description}.</p>
              )}
            </div>

            <div className='bg-white'>
              <h2 className='font-bold px-4 py-3 border-b border-solid border-gray-200'>Other Courses</h2>
               <div>
                 {otherCourses.map((oc) => (
                   <div key={oc.id} className='flex flex-col gap-0 p-0 border-b border-solid border-gray-200'>
                     <button
                       className='flex items-center gap-2 font-bold w-full cursor-pointer select-none focus:outline-none bg-[#f6f7f9] border-none p-4 text-left rounded-t-lg'
                       onClick={() => setOpenOther((prev) => ({...prev, [oc.id]: !prev[oc.id]}))}
                       type="button"
                     >
                       {openOther[oc.id] ? (
                         <FiChevronDown className='text-lg' />
                       ) : (
                         <FiChevronRight className='text-lg' />
                       )}
                       <span>{oc.title}</span>
                     </button>
                     {openOther[oc.id] && (
                       <div className='bg-white '>
                         <img
                           src={oc.image}
                           alt={oc.title}
                           className='w-full h-48 object-cover cursor-pointer'
                           onClick={() => router.push(`/courses/${oc.id}`)}
                         />
                         <p className='text-sm font-semibold py-4 px-10'>{oc.description}</p>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}