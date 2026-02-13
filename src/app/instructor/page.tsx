'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '@/components/layout/Footer';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function InstructorPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [showStudentTooltip, setShowStudentTooltip] = useState(false);
  const [activeSection, setActiveSection] = useState('courses');

  // Avatar initials logic
  let initials = 'U';
  if (user?.full_name) {
    const names = user.full_name.trim().split(' ');
    if (names.length === 1) {
      initials = names[0][0]?.toUpperCase() || 'U';
    } else if (names.length > 1) {
      initials = (names[0][0] || '') + (names[1][0] || '');
      initials = initials.toUpperCase();
    }
  }

  useEffect(() => {
    const fetchCartCount = () => {
      if (!token) {
        setCartCount(0);
        return;
      }
      fetch(`${API_BASE}/cart/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          let items = Array.isArray(data) ? data : (data.results || data.data || []);
          setCartCount(items.length);
        })
        .catch(() => setCartCount(0));
    };
    fetchCartCount();
    window.addEventListener('cart-updated', fetchCartCount);
    return () => {
      window.removeEventListener('cart-updated', fetchCartCount);
    };
  }, [token]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (avatarRef.current && event.target instanceof Node && !avatarRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <aside
          className="
            group/sidebar
            bg-[#18181c]
            flex flex-col
            items-start
            z-40
            shadow-lg
            transition-all
            duration-300
            ease-in-out
            w-14
            hover:w-56
            relative
          "
        >
          {/* Logo */}
          <div className="flex items-center px-4 mb-8 mt-2 group/sidebar overflow-hidden transition-all duration-300 ease-in-out">
            <a href="/instructor" className='flex items-center'>
              <img src="/assets/udemynew.png" alt="Udemy" className="h-10 transition-all duration-300 ease-in-out" />
              <h2 className="text-white text-4xl mt-2.5 opacity-0 w-0 group-hover/sidebar:opacity-100 group-hover/sidebar:w-auto transition-all duration-300 ease-in-out">demy</h2>
            </a>
          </div>
          {/* Sidebar Buttons */}
          <div className="flex flex-col w-full transition-all duration-300 ease-in-out">
            {/* Courses (active if activeSection === 'courses') */}
            <button
              className={`flex p-4 items-center transition-all duration-300 ease-in-out ${activeSection === 'courses' ? 'border-l-4 border-solid border-[#a435f0] hover:bg-[#595c73]' : ''}`}
              onClick={() => setActiveSection('courses')}
            >
              <svg width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 254 256" className="transition-all duration-300 ease-in-out">
                <path fill="#fff" d="M27.1,37.5c-8.1,1.6-15.2,9.1-16.5,17.5c-0.3,2-0.5,21.5-0.5,57.4c0,59,0,57.8,2.5,62.9c1.5,3,5.3,7.1,7.8,8.6c5,2.9,1.2,2.7,54.6,3l48.6,0.2l0.1,11.6l0.1,11.7l-23.6,0.1l-23.6,0.1l-0.1,4.2l-0.1,4.3H128h51.7l-0.1-4.3l-0.1-4.2l-23.6-0.1l-23.6-0.1l0.1-11.7l0.1-11.6l48.6-0.2c53.4-0.2,49.6,0,54.6-3c2.6-1.5,6.4-5.6,7.8-8.6c2.6-5.1,2.5-3.9,2.5-62.9c0-35.9-0.2-55.4-0.5-57.4c-1.3-8.3-7.6-15.1-15.9-17.3C227.2,37,215.5,36.9,128,37C73.3,37,28.2,37.2,27.1,37.5z M229.2,46.4c2.9,1.2,5.1,3.4,6.6,6.3l1.4,2.8v56.1c0,63.7,0.3,58.8-3.9,62.9c-4.3,4.3,6,3.9-105.3,3.9c-108.5,0-100.8,0.2-104.6-3c-1.1-0.9-2.5-2.6-3.2-3.8l-1.2-2.2l-0.1-56.9l-0.1-56.9l1.4-2.9c1.5-3.1,4-5.4,6.8-6.4c1.4-0.5,20.3-0.6,101.2-0.6C215.1,45.7,227.8,45.8,229.2,46.4z" stroke='#fff' strokeWidth="4" />
                <path fill="#fff" d="M106.3,111.2c0,17.2,0,31.3,0.1,31.3s11.9-6.8,26.2-15c14.3-8.2,26.5-15.3,27.1-15.6c1-0.6-0.2-1.3-17.7-11.4c-10.3-6-22.6-13-27.2-15.7l-8.4-4.9V111.2z"/>
              </svg>
              <span className="ml-6 text-white text-sm font-semibold hidden transform translate-x-2 group-hover/sidebar:block group-hover/sidebar:translate-x-0 transition-transform duration-300 ease-in-out">
                Courses
              </span>
            </button>
            {/* Communication */}
            <button
              className={`flex p-4 items-center transition-all duration-300 ease-in-out ${activeSection === 'communication' ? 'border-l-4 border-solid border-[#a435f0] hover:bg-[#595c73]' : ''}`}
              onClick={() => setActiveSection('communication')}
            >
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 ease-in-out">
                <path d="M7 12L17 12" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 8L13 8" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 20.2895V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H7.96125C7.35368 17 6.77906 17.2762 6.39951 17.7506L4.06852 20.6643C3.71421 21.1072 3 20.8567 3 20.2895Z" stroke="#fff" stroke-width="1.5"/>
              </svg>
              <span className="ml-6 text-white text-sm font-semibold hidden transform translate-x-2 group-hover/sidebar:block group-hover/sidebar:translate-x-0 transition-transform duration-300 ease-in-out">
                Communication
              </span>
            </button>
            {/* Performance */}
            <button
              className={`flex p-4 items-center transition-all duration-300 ease-in-out ${activeSection === 'performance' ? 'border-l-4 border-solid border-[#a435f0] hover:bg-[#595c73]' : ''}`}
              onClick={() => setActiveSection('performance')}
            >
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" className="transition-all duration-300 ease-in-out">
                <rect x="10" y="29" fill="#fff" stroke="#fff" stroke-width="2" stroke-miterlimit="10" width="6" height="34"/>
                <rect x="42" y="39" fill="#fff" stroke="#fff" stroke-width="2" stroke-miterlimit="10" width="6" height="24"/>
                <rect x="26" y="1" fill="#fff" stroke="#fff" stroke-width="2" stroke-miterlimit="10" width="6" height="62"/>
              </svg>
              <span className="ml-6 text-white text-sm font-semibold hidden transform translate-x-2 group-hover/sidebar:block group-hover/sidebar:translate-x-0 transition-transform duration-300 ease-in-out">
                Performance
              </span>
            </button>
            {/* Tools */}
            <button
              className={`flex p-4 items-center transition-all duration-300 ease-in-out ${activeSection === 'tools' ? 'border-l-4 border-solid border-[#a435f0] hover:bg-[#595c73]' : ''}`}
              onClick={() => setActiveSection('tools')}
            >
              <svg fill="none" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 ease-in-out">
                <path id="primary" d="M20.5,20.5h0a2,2,0,0,1-2.83,0l-5.21-5.21A6.59,6.59,0,0,1,8,15.84a6.5,6.5,0,0,1-5-5.76,6.42,6.42,0,0,1,.65-3.47L8,11l2.5-.5L11,8,6.61,3.68A6.42,6.42,0,0,1,10.08,3a6.5,6.5,0,0,1,5.76,5,6.59,6.59,0,0,1-.55,4.42l5.21,5.21A2,2,0,0,1,20.5,20.5Z" stroke='#fff' strokeWidth="1.5"></path>
              </svg>
              <span className="ml-6 text-white text-sm font-semibold hidden transform translate-x-2 group-hover/sidebar:block group-hover/sidebar:translate-x-0 transition-transform duration-300 ease-in-out">
                Tools
              </span>
            </button>
            {/* Resources */}
            <button
              className={`flex p-4 items-center transition-all duration-300 ease-in-out ${activeSection === 'resources' ? 'border-l-4 border-solid border-[#a435f0] hover:bg-[#595c73]' : ''}`}
              onClick={() => setActiveSection('resources')}
            >
              <svg fill="#fff" width="22px" height="22px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 ease-in-out">
                <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16.001-7.163 16.001-16s-7.163-16-16.001-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14.001 6.28 14.001 14-6.281 14.032-14.001 14.032zM14.53 25.015h2.516v-2.539h-2.516zM15.97 6.985c-1.465 0-2.672 0.395-3.62 1.184s-1.409 2.37-1.386 3.68l0.037 0.073h2.295c0-0.781 0.261-1.904 0.781-2.308s1.152-0.604 1.893-0.604c0.854 0 1.511 0.232 1.971 0.696s0.689 1.127 0.689 1.989c0 0.725-0.17 1.343-0.512 1.855-0.343 0.512-0.916 1.245-1.721 2.198-0.831 0.749-1.344 1.351-1.538 1.806s-0.297 1.274-0.305 2.454h2.405c0-0.74 0.047-1.285 0.14-1.636s0.36-0.744 0.799-1.184c0.945-0.911 1.703-1.802 2.277-2.674 0.573-0.87 0.86-1.831 0.86-2.881 0-1.465-0.443-2.607-1.331-3.424s-2.134-1.226-3.736-1.226z"></path>
              </svg>
              <span className="ml-6 text-white text-sm font-semibold hidden transform translate-x-2 group-hover/sidebar:block group-hover/sidebar:translate-x-0 transition-transform duration-300 ease-in-out">
                Resources
              </span>
            </button>
          </div>
        </aside>
        <main className="flex-1">
          <div className="py-4 flex flex-col gap-2 mx-12">
            <header className='flex justify-end'>
              <ul className='flex items-center gap-5'>
                <li className="relative flex items-center">
                  <a
                    href="/"
                    className='hover:bg-purple-100 p-3 hover:text-[#6d28d2] hover:rounded cursor-pointer transition'
                    onMouseEnter={() => setShowStudentTooltip(true)}
                    onMouseLeave={() => setShowStudentTooltip(false)}
                    onFocus={() => setShowStudentTooltip(true)}
                    onBlur={() => setShowStudentTooltip(false)}
                  >
                    Student
                  </a>
                  {/* Tooltip */}
                  <div
                    className={`
                      absolute right-0 top-12 mt-2 z-50
                      bg-white text-gray-700 rounded-xl shadow-lg px-10 py-3 text-center text-sm
                      border border-solid border-gray-200
                      transition-opacity duration-200
                      ${showStudentTooltip ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                    `}
                    style={{ minWidth: '350px' }}
                  >
                    Switch to the student view here - get back to the courses you're taking.
                  </div>
                </li>
                <li>
                  <div
                    ref={avatarRef}
                    className="relative inline-block"
                    onMouseEnter={() => setShowUserDropdown(true)}
                    onMouseLeave={() => setShowUserDropdown(false)}
                  >
                    <div
                      className="w-9 h-9 text-center p-2 rounded-full bg-[#16161d] text-white font-bold text-sm cursor-pointer"
                      onClick={() => setShowUserDropdown((v) => !v)}
                    >
                      {initials}
                    </div>
                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 border border-solid border-gray-200">
                        <div className="flex flex-col items-center p-4">
                          <a href="/profile" className="w-14 h-14 flex items-center justify-center rounded-full bg-[#16161d] text-white font-bold text-2xl mb-2">
                            {initials}
                          </a>
                          <div className="font-bold text-lg mb-1">{user?.full_name}</div>
                        </div>
                        <hr className='border-t border-solid border-gray-300' />
                        <div className="flex flex-col p-2">
                          <Link href="/purchased" className="py-2 px-4 hover:bg-gray-100 rounded">My learning</Link>
                          <Link href="/cart" className="py-2 px-4 hover:bg-gray-100 rounded flex items-center justify-between">
                            My cart {cartCount > 0 && (<span className="ml-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>)}
                          </Link>
                          <Link href="/wishlist" className="py-2 px-4 hover:bg-gray-100 rounded">Wishlist</Link>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </header>

            {/* Courses section: DO NOT CHANGE, always visible when activeSection === 'courses' */}
            {activeSection === 'courses' && (
              <>
                <div style={{ boxShadow: '0 2px 4px rgba(6, 17, 118, 0.08), 0 4px 12px rgba(6, 17, 118, 0.08)' }} className="w-full max-w-screen-xl mx-auto bg-white border border-solid border-[#d1d2e0] flex items-center justify-between px-12 py-12">
                  <span className="text-[#2a2b3f]">Jump Into Course Creation</span>
                  <button
                    className="bg-[#6d28d2] text-white font-bold text-sm px-16 py-2.5 rounded hover:bg-purple-700 transition-colors"
                    onClick={() => router.push('/create-course')}
                  >
                    Create Your Course
                  </button>
                </div>
                <div className="w-full max-w-screen-xl mx-auto flex flex-col items-center mt-12">
                  <div className="w-full flex flex-wrap justify-center gap-12 mb-24">
                    {/* Test Video */}
                    <div className="flex flex-col items-center w-48">
                      <img className='w-16 h-16' src="/assets/relevance-1.webp" alt="relevance-1" />
                      <h4 className="mt-4 font-bold text-[#6d28d2] underline underline-offset-4">Test Video</h4>
                      <p className="text-center text-sm mt-6 text-[#2a2b3f]">Send us a sample video and get expert feedback.</p>
                    </div>
                    {/* Instructor Community */}
                    <div className="flex flex-col items-center w-48">
                      <img className='w-16 h-16' src="/assets/communication.webp" alt="communication" />
                      <h4 className="mt-4 font-bold text-[#6d28d2] underline underline-offset-4">Instructor Community</h4>
                      <p className="text-center text-sm mt-6 text-[#2a2b3f]">Connect with experienced instructors. Ask questions, browse discussions, and more.</p>
                    </div>
                    {/* Teaching Center */}
                    <div className="flex flex-col items-center w-48">
                      <img className='w-16 h-16' src="/assets/instructor.webp" alt="instructor" />
                      <h4 className="mt-4 font-bold text-[#6d28d2] underline underline-offset-4">Teaching Center</h4>
                      <p className="text-center text-sm mt-6 text-[#2a2b3f]">Learn about best practices for teaching on Udemy.</p>
                    </div>
                    {/* Marketplace Insights */}
                    <div className="flex flex-col items-center w-48">
                      <img className='w-16 h-16' src="/assets/impact-measurement.webp" alt="impact-measurement" />
                      <h4 className="mt-4 font-bold text-[#6d28d2] underline underline-offset-4">Marketplace Insights</h4>
                      <p className="text-center text-sm mt-6 text-[#2a2b3f]">Validate your course topic by exploring our marketplace supply and demand.</p>
                    </div>
                    {/* Help and Support */}
                    <div className="flex flex-col items-center w-48">
                      <img className='w-16 h-16' src="/assets/soft-skills.webp" alt="soft-skills" />
                      <h4 className="mt-4 font-bold text-[#6d28d2] underline underline-offset-4">Help and Support</h4>
                      <p className="text-center text-sm mt-6 text-[#2a2b3f]">Browse our Help Center or contact our support team.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-[#2a2b3f] mb-8">
                    <p className="mb-8">Are You Ready to Begin?</p>
                    <button
                      className="bg-[#6d28d2] text-white font-bold text-sm px-20 py-2.5 rounded hover:bg-purple-700 transition-colors"
                      onClick={() => router.push('/create-course')}
                    >
                      Create Your Course
                    </button>
                  </div>
                </div>
              </>
            )}
            {/* Other sections: render only when active */}
            {activeSection === 'communication' && (
              <div className="flex flex-col items-center w-full h-[60vh] mb-8">
                <h1 className="text-4xl font-bold font-serif text-[#23232b] mb-8 w-full text-left pl-16">Q&amp;A</h1>
                <div className="flex flex-col items-center justify-center w-full">
                  <img src="/assets/empty-mailbox-v2.webp" alt="No questions" className="mb-4" />
                  <h2 className="text-lg font-bold text-[#2a2b3f] mb-2">No questions yet</h2>
                  <p className="text-center text-[#595c73] max-w-xl">Q&amp;A is a forum where your students can ask questions, hear <br /> your responses, and respond to one another. Here's where <br /> you'll see your courses' Q&amp;A threads</p>
                </div>
              </div>
            )}
            {activeSection === 'performance' && (
              <div className="flex flex-col items-start justify-start w-full mb-6 pl-16 h-[60vh]">
                <h1 className="text-4xl font-serif font-bold text-[#2a2b3f] mb-4">Overview</h1>
                <a href="#" className="text-[#6d28d2] mb-8 flex items-center">Revenue Report 
                  <span className="ml-1">
                    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 7L15 12L10 17" stroke="#6d28d2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </a>
              </div>
            )}
            {activeSection === 'tools' && (
              <div className="flex flex-col w-7xl mx-auto mb-6 h-[60vh]">
                <h1 className="text-4xl font-serif font-bold text-[#2a2b3f] mb-12">Tools</h1>
                <div className="flex flex-row gap-12 w-full justify-center">
                  {/* Tool 1 */}
                  <div className="flex flex-col items-center border border-solid border-gray-300 p-8 w-96 bg-white">
                    <svg width="48px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 254 256" className="transition-all duration-300 ease-in-out">
                      <path fill="#2a2b3f" d="M27.1,37.5c-8.1,1.6-15.2,9.1-16.5,17.5c-0.3,2-0.5,21.5-0.5,57.4c0,59,0,57.8,2.5,62.9c1.5,3,5.3,7.1,7.8,8.6c5,2.9,1.2,2.7,54.6,3l48.6,0.2l0.1,11.6l0.1,11.7l-23.6,0.1l-23.6,0.1l-0.1,4.2l-0.1,4.3H128h51.7l-0.1-4.3l-0.1-4.2l-23.6-0.1l-23.6-0.1l0.1-11.7l0.1-11.6l48.6-0.2c53.4-0.2,49.6,0,54.6-3c2.6-1.5,6.4-5.6,7.8-8.6c2.6-5.1,2.5-3.9,2.5-62.9c0-35.9-0.2-55.4-0.5-57.4c-1.3-8.3-7.6-15.1-15.9-17.3C227.2,37,215.5,36.9,128,37C73.3,37,28.2,37.2,27.1,37.5z M229.2,46.4c2.9,1.2,5.1,3.4,6.6,6.3l1.4,2.8v56.1c0,63.7,0.3,58.8-3.9,62.9c-4.3,4.3,6,3.9-105.3,3.9c-108.5,0-100.8,0.2-104.6-3c-1.1-0.9-2.5-2.6-3.2-3.8l-1.2-2.2l-0.1-56.9l-0.1-56.9l1.4-2.9c1.5-3.1,4-5.4,6.8-6.4c1.4-0.5,20.3-0.6,101.2-0.6C215.1,45.7,227.8,45.8,229.2,46.4z" stroke='#2a2b3f' strokeWidth="4" />
                      <path fill="#2a2b3f" d="M106.3,111.2c0,17.2,0,31.3,0.1,31.3s11.9-6.8,26.2-15c14.3-8.2,26.5-15.3,27.1-15.6c1-0.6-0.2-1.3-17.7-11.4c-10.3-6-22.6-13-27.2-15.7l-8.4-4.9V111.2z"/>
                    </svg>
                    <h2 className="font-bold text-[#2a2b3f] mt-6 mb-4">Test Video</h2>
                    <p className="text-center text-[#2a2b3f] text-sm">Get free feedback from Udemy video experts on your audio, video, and delivery.</p>
                  </div>
                  {/* Tool 2 */}
                  <div className="flex flex-col items-center border border-solid border-gray-300 p-8 w-96 bg-white">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M4 20v-6m4 6V10m4 10v-4m4 4v-8" stroke="#23232b" strokeWidth="2"/></svg>
                    <h2 className="font-bold text-[#2a2b3f] mt-6 mb-4">Marketplace Insights</h2>
                    <p className="text-center text-[#2a2b3f] text-sm">Get Udemy-wide market data to create successful courses.</p>
                  </div>
                  {/* Tool 3 */}
                  <div className="flex flex-col items-center border border-solid border-gray-300 p-8 w-96 bg-white">
                    <svg width="36px" height="36px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2959.000000)" fill="#000000">
                              <g id="icons" transform="translate(56.000000, 160.000000)">
                                  <path d="M129.020148,2805.2265 C128.444271,2805.2265 127.976892,2804.76459 127.976892,2804.19545 C127.976892,2803.62631 128.444271,2803.1644 129.020148,2803.1644 C129.596025,2803.1644 130.063404,2803.62631 130.063404,2804.19545 C130.063404,2804.76459 129.596025,2805.2265 129.020148,2805.2265 M143.388913,2809.64763 L139.933649,2806.2328 L139.933649,2806.2328 C134.061161,2800.42903 135.435129,2801.81888 133.157701,2799.41861 C132.961569,2799.22477 132.696582,2799 132.420119,2799 L126.085469,2799 C124.933714,2799 124,2800.15684 124,2801.29511 L124,2807.5546 C124,2807.82886 124.109542,2808.09075 124.304631,2808.28458 C128.396281,2812.32732 125.450126,2809.41564 134.536886,2818.39606 C135.351669,2819.20131 136.672431,2819.20131 137.487214,2818.39606 L137.487214,2818.39606 C142.018074,2813.91926 141.012376,2814.91215 143.388913,2812.56343 C144.203696,2811.75818 144.203696,2810.45287 143.388913,2809.64763" id="tag_fill_round-[#1176]">
                                </path>
                              </g>
                          </g>
                      </g>
                    </svg>
                    <h2 className="font-bold text-[#2a2b3f] mt-6 mb-4">Bulk coupon creation</h2>
                    <p className="text-center text-[#2a2b3f] text-sm">Create multiple coupons at once via CSV upload.</p>
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'resources' && (
              <div className="flex flex-col w-7xl mx-auto mb-6 h-[60vh]">
                <h1 className="text-4xl font-serif font-bold text-[#2a2b3f] mb-12">Resources</h1>
                <div className="flex flex-row gap-12 w-full justify-center">
                  {/* Resource 1 */}
                  <div className="flex flex-col items-center border border-solid border-gray-300 p-8 w-96 bg-white">
                    <img src="/assets/instructor.webp" alt="Teaching Center" className="w-16 h-16" />
                    <h2 className="font-bold text-[#2a2b3f] mt-6 mb-4">Teaching Center</h2>
                    <p className="text-center text-[#2a2b3f] text-sm">Find articles on Udemy teaching — from course creation to marketing.</p>
                  </div>
                  {/* Resource 2 */}
                  <div className="flex flex-col items-center border border-solid border-gray-300 p-8 w-96 bg-white">
                    <img src="/assets/communication.webp" alt="Instructor Community" className="w-16 h-16" />
                    <h2 className="font-bold text-[#2a2b3f] mt-6 mb-4">Instructor Community</h2>
                    <p className="text-center text-[#2a2b3f] text-sm">Share your progress and ask other instructors questions in our community.</p>
                  </div>
                  {/* Resource 3 */}
                  <div className="flex flex-col items-center border border-solid border-gray-300 p-8 w-96 bg-white">
                    <img src="/assets/soft-skills.webp" alt="Help and Support" className="w-16 h-16" />
                    <h2 className="font-bold text-[#2a2b3f] mt-6 mb-4">Help and Support</h2>
                    <p className="text-center text-[#2a2b3f] text-sm">Can't find what you need? Our support team is happy to help.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
