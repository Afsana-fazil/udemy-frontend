"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight, ExternalLink } from 'lucide-react';
import LanguageSelector from '../ui/Languages';

export default function AlternativeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHowDropdown, setShowHowDropdown] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showPlansDropdown, setShowPlansDropdown] = useState(false);
  const [showAiDropdown, setShowAiDropdown] = useState(false);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b border-solid border-[#d1d7dc]">
      <div className="max-w-6xl mx-auto px-6 ">
        <div className="flex justify-between h-16 items-center text-black">
          {/* Logo and Main Nav */}
          <div className="flex items-center gap-2">
            <a href="/business"><img src="/assets/logo-ub.svg" alt="logo-udemy-business" className="w-40" /></a>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center md:ml-6 md:space-x-1">
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Link 
                  href="#" 
                  className="hover:text-purple-700 hover:bg-purple-100 px-4 py-2 rounded text-sm"
                >
                  What we do
                </Link>
                {showDropdown && (
                  <div className="absolute left-0 top-full mt-5 z-30 bg-white rounded-xl shadow-lg border border-solid border-gray-200 p-6 flex gap-12 min-w-[700px]">
                    {/* By need */}
                    <div>
                      <div className="font-bold text-sm text-[#6A6F73] mb-4">By need</div>
                      <ul className="space-y-3 text-xs text-[#2a2b3f]">
                        <li>Enterprise-Wide Training</li>
                        <li>Small Team Training</li>
                        <li>Tech Team Training</li>
                        <li>Leadership Development</li>
                        <li>Dedicated Customer Success Team</li>
                        <li>Remote & Hybrid Team Training</li>
                        <li>Certification Prep & Badges</li>
                        <li>AI Upskilling</li>
                      </ul>
                    </div>
                    {/* By team */}
                    <div>
                      <div className="font-bold text-sm text-[#6A6F73] mb-4">By team</div>
                      <ul className="space-y-3 text-xs text-[#2a2b3f]">
                        <li>Leaders & Executives</li>
                        <li>Learning & Development</li>
                        <li>Human Resources</li>
                        <li>Engineering</li>
                        <li>IT Operations</li>
                        <li>Data Science</li>
                      </ul>
                    </div>
                    {/* By industry */}
                    <div>
                      <div className="font-bold text-sm text-[#6A6F73] mb-4">By industry</div>
                      <ul className="space-y-3 text-xs text-[#2a2b3f]">
                        <li>Technology</li>
                        <li>Professional Services</li>
                        <li>Financial Services</li>
                        <li>Manufacturing</li>
                        <li>Government</li>
                        <li>Higher Ed</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => setShowHowDropdown(true)}
                onMouseLeave={() => setShowHowDropdown(false)}
              >
                <Link 
                  href="#" 
                  className="hover:text-purple-700 hover:bg-purple-100 px-4 py-2 rounded text-sm"
                >
                  How we do it
                </Link>
                {showHowDropdown && (
                  <div className="absolute left-0 top-full mt-5 z-30 bg-white rounded-xl shadow-lg border border-solid border-gray-200 p-4 min-w-[260px]">
                    <ul className="space-y-2 text-[#2a2b3f] text-xs">
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Learning Ecosystem</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                        On-Demand Learning
                      </li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Immersive Learning</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                        Cohort Learning 
                      </li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Professional Services</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">AI-Enabled Learning</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Case Studies</li>
                    </ul>
                  </div>
                )}
              </div>
              <div
                className="relative hidden xl:block"
                onMouseEnter={() => setShowResourcesDropdown(true)}
                onMouseLeave={() => setShowResourcesDropdown(false)}
              >
                <Link 
                  href="#" 
                  className="hover:text-purple-700 hover:bg-purple-100 px-4 py-2 rounded text-sm"
                >
                  Resources
                </Link>
                {showResourcesDropdown && (
                  <div className="absolute left-0 top-full mt-5 z-30 bg-white rounded-xl shadow-lg border border-solid border-gray-200 p-4 min-w-[260px]">
                    <ul className="space-y-2 text-[#2a2b3f] text-xs">
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">All Resources</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                        Our Product
                      </li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                        Resources by Topic 
                      </li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Podcast: Leading Up</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Small Business Hub</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Events</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Partners & Integrations</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Partner with Udemy</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer flex items-center gap-1">
                        Blog <ExternalLink className="w-4 h-4 ml-1" />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div
                className="relative hidden xl:block"
                onMouseEnter={() => setShowPlansDropdown(true)}
                onMouseLeave={() => setShowPlansDropdown(false)}
              >
                <Link 
                  href="#" 
                  className="hover:text-purple-700 hover:bg-purple-100 px-4 py-2 rounded text-sm"
                >
                  Plans
                </Link>
                {showPlansDropdown && (
                  <div className="absolute left-0 top-full mt-5 z-30 bg-white rounded-xl shadow-lg border border-solid border-gray-200 p-4 min-w-[260px]">
                    <ul className="space-y-2 text-[#2a2b3f] text-xs">
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Compare Plans</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Team (2-20 learners)</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Enterprise (21+ learners)</li>
                    </ul>
                  </div>
                )}
              </div>
              <div
                className="relative hidden lg:block"
                onMouseEnter={() => setShowAiDropdown(true)}
                onMouseLeave={() => setShowAiDropdown(false)}
              >
                <Link 
                  href="#" 
                  className="group hover:text-[#0d5261] hover:bg-[#e4f5f6] px-4 py-2 rounded text-sm flex items-center gap-1"
                >
                  AI Transformation
                  <svg
                    width="20px"
                    height="15px"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-colors duration-300"
                  >
                    <path
                      d="M22.625 2c0 15.834-8.557 30-20.625 30c12.068 0 20.625 14.167 20.625 30c0-15.833 8.557-30 20.625-30c-12.068 0-20.625-14.166-20.625-30"
                      className="fill-black group-hover:fill-[#0d5261]"
                    />
                    <path
                      d="M47 32c0 7.918-4.277 15-10.313 15C42.723 47 47 54.084 47 62c0-7.916 4.277-15 10.313-15C51.277 47 47 39.918 47 32z"
                      className="fill-black group-hover:fill-[#0d5261]"
                    />
                    <path
                      d="M51.688 2c0 7.917-4.277 15-10.313 15c6.035 0 10.313 7.084 10.313 15c0-7.916 4.277-15 10.313-15c-6.036 0-10.313-7.083-10.313-15"
                      className="fill-black group-hover:fill-[#0d5261]"
                    />
                  </svg>
                </Link>
                {showAiDropdown && (
                  <div className="absolute left-0 top-full mt-5 z-30 bg-white rounded-xl shadow-lg border border-solid border-gray-200 p-4 min-w-[260px]">
                    <ul className="space-y-2 text-[#2a2b3f] text-xs">
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">AI Upskilling</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">AI Starter Paths</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">AI-Enabled Learning</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">AI for Business Leaders</li>
                      <li className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">AI Resources</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2.5 rounded text-sm font-bold hover:bg-purple-100"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="border border-solid bg-black border-black px-4 py-2.5 rounded text-sm font-bold text-white hover:bg-[#4435bb] hover:border-[#4435bb]"
            >
              Get started
            </Link>
            <div className="border border-solid border-black rounded hover:bg-gray-100">
              <LanguageSelector icon={<img src="/assets/icons/globe.png" alt="globe" className="w-5 h-5" />} showLabel={false} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:text-[#6d28d2]"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6">
          <div className="pt-2 pb-3 space-y-1">
            {/* Mobile Accordion Menu */}
            {[
              {
                label: 'What we do',
                key: 'what',
                content: (
                  <div className="pl-6 py-2">
                    <div className="font-bold text-xs text-[#6A6F73] mb-2">By need</div>
                    <ul className="space-y-2 text-xs text-[#2a2b3f] mb-3">
                      <li>Enterprise-Wide Training</li>
                      <li>Small Team Training</li>
                      <li>Tech Team Training</li>
                      <li>Leadership Development</li>
                      <li>Dedicated Customer Success Team</li>
                      <li>Remote & Hybrid Team Training</li>
                      <li>Certification Prep & Badges</li>
                      <li>AI Upskilling</li>
                    </ul>
                    <div className="font-bold text-xs text-[#6A6F73] mb-2">By team</div>
                    <ul className="space-y-2 text-xs text-[#2a2b3f] mb-3">
                      <li>Leaders & Executives</li>
                      <li>Learning & Development</li>
                      <li>Human Resources</li>
                      <li>Engineering</li>
                      <li>IT Operations</li>
                      <li>Data Science</li>
                    </ul>
                    <div className="font-bold text-xs text-[#6A6F73] mb-2">By industry</div>
                    <ul className="space-y-2 text-xs text-[#2a2b3f]">
                      <li>Technology</li>
                      <li>Professional Services</li>
                      <li>Financial Services</li>
                      <li>Manufacturing</li>
                      <li>Government</li>
                      <li>Higher Ed</li>
                    </ul>
                  </div>
                ),
              },
              {
                label: 'How we do it',
                key: 'how',
                content: (
                  <ul className="pl-6 py-2 space-y-2 text-xs text-[#2a2b3f]">
                    <li>Learning Ecosystem</li>
                    <li>On-Demand Learning</li>
                    <li>Immersive Learning</li>
                    <li>Cohort Learning</li>
                    <li>Professional Services</li>
                    <li>AI-Enabled Learning</li>
                    <li>Case Studies</li>
                  </ul>
                ),
              },
              {
                label: 'Resources',
                key: 'resources',
                content: (
                  <ul className="pl-6 py-2 space-y-2 text-xs text-[#2a2b3f]">
                    <li>All Resources</li>
                    <li>Our Product</li>
                    <li>Resources by Topic</li>
                    <li>Podcast: Leading Up</li>
                    <li>Small Business Hub</li>
                    <li>Events</li>
                    <li>Partners & Integrations</li>
                    <li>Partner with Udemy</li>
                    <li className="flex items-center gap-1">Blog <ExternalLink className="w-4 h-4 ml-1" /></li>
                  </ul>
                ),
              },
              {
                label: 'Plans',
                key: 'plans',
                content: (
                  <ul className="pl-6 py-2 space-y-2 text-xs text-[#2a2b3f]">
                    <li>Compare Plans</li>
                    <li>Team (2-20 learners)</li>
                    <li>Enterprise (21+ learners)</li>
                  </ul>
                ),
              },
              {
                label: 'AI Transformation',
                key: 'ai',
                content: (
                  <ul className="pl-6 py-2 space-y-2 text-xs text-[#2a2b3f]">
                    <li>AI Upskilling</li>
                    <li>AI Starter Paths</li>
                    <li>AI-Enabled Learning</li>
                    <li>AI for Business Leaders</li>
                    <li>AI Resources</li>
                  </ul>
                ),
                icon: (
                  <svg
                    width="20px"
                    height="15px"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline ml-1 align-middle"
                  >
                    <path
                      d="M22.625 2c0 15.834-8.557 30-20.625 30c12.068 0 20.625 14.167 20.625 30c0-15.833 8.557-30 20.625-30c-12.068 0-20.625-14.166-20.625-30"
                      className="fill-black"
                    />
                    <path
                      d="M47 32c0 7.918-4.277 15-10.313 15C42.723 47 47 54.084 47 62c0-7.916 4.277-15 10.313-15C51.277 47 47 39.918 47 32z"
                      className="fill-black"
                    />
                    <path
                      d="M51.688 2c0 7.917-4.277 15-10.313 15c6.035 0 10.313 7.084 10.313 15c0-7.916 4.277-15 10.313-15c-6.036 0-10.313-7.083-10.313-15"
                      className="fill-black"
                    />
                  </svg>
                ),
              },
            ].map(({ label, key, content, icon }) => (
              <div key={key}>
                <button
                  className="w-full flex items-center justify-between pl-3 pr-4 py-2.5 text-base font-medium hover:text-purple-700 hover:bg-purple-100 rounded focus:outline-none"
                  onClick={() => setMobileOpenSection(mobileOpenSection === key ? null : key)}
                >
                  <span>{label} {icon}</span>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${mobileOpenSection === key ? 'rotate-90' : ''}`} />
                </button>
                {mobileOpenSection === key && (
                  <div className="bg-gray-50 rounded-b mb-2">{content}</div>
                )}
              </div>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-4">
              <Link
                href="/login"
                className="flex-1 px-4 py-2.5 text-center text-sm font-bold text-[#6d28d2] border border-solid border-purple-700 rounded hover:bg-purple-100"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="flex-1 px-4 py-2.5 text-center text-sm font-bold text-white bg-purple-700 border border-solid border-purple-700 rounded hover:opacity-90"
              >
                Get started
              </Link>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="border border-solid border-black px-2 py-1.5 rounded hover:bg-gray-100">
                <LanguageSelector icon={<img src="/assets/icons/globe.png" alt="globe" className="w-5 h-5" />} showLabel={false} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 