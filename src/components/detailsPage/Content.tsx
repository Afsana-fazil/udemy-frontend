'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

function formatDuration(duration: string): string {
  const parts = duration.split(':').map(Number);
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    if (hours) return `${hours}h ${minutes}m`;
    if (minutes) return `${minutes}min`;
    return `${seconds}s`;
  }
  return duration;
}

function displayDuration(duration: string): string {
  return duration.startsWith('00:') ? duration.slice(3) : duration;
}

interface Lecture {
  id: number;
  title: string;
  video_url: string | null;
  duration: string;
  is_preview: boolean;
}

interface Section {
  id: number;
  title: string;
  total_lectures: number;
  total_duration: string;
  lectures: Lecture[];
}

interface ContentProps {
  courseId: string;
  purchased?: boolean;
}

export default function Content({ courseId, purchased }: ContentProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [showMore, setShowMore] = useState(false);
  const [visibleSections, setVisibleSections] = useState(6);
  const [totalStats, setTotalStats] = useState({
    totalSections: 0,
    totalLectures: 0,
    totalDuration: '0:00:00'
  });
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:8000/api/sections/')
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        // Calculate totals
        const totalLectures = data.reduce((sum: number, section: Section) => sum + section.total_lectures, 0);
        const totalDuration = data.reduce((total: string, section: Section) => {
          const [hours, minutes, seconds] = section.total_duration.split(':').map(Number);
          const [totalHours, totalMinutes, totalSeconds] = total.split(':').map(Number);
          const newSeconds = (totalSeconds + seconds) % 60;
          const newMinutes = (totalMinutes + minutes + Math.floor((totalSeconds + seconds) / 60)) % 60;
          const newHours = totalHours + hours + Math.floor((totalMinutes + minutes + Math.floor((totalSeconds + seconds) / 60)) / 60);
          return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        }, '00:00:00');
        
        setTotalStats({
          totalSections: data.length,
          totalLectures,
          totalDuration
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleSection = (sectionId: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleExpandCollapseAll = () => {
    if (showMore) {
      // Collapse all
      setExpandedSections(new Set());
    } else {
      // Expand all
      const allSectionIds = new Set(sections.map((section) => section.id));
      setExpandedSections(allSectionIds);
    }
    setShowMore(!showMore);
  };

  const handleShowMoreSections = () => {
    setVisibleSections(10);
  };

  const handleShowLessSections = () => {
    setVisibleSections(6);
  };

  const visibleSectionsList = sections.slice(0, visibleSections);
  const remainingSections = sections.length - visibleSections;

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className='lg:w-[63%]'>
        <h2 className="text-2xl font-bold mb-4">Course content</h2>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            {totalStats.totalSections} sections • {totalStats.totalLectures} lectures • {formatDuration(totalStats.totalDuration)} total length
          </p>
          <button
            onClick={handleExpandCollapseAll}
            className="flex items-center gap-2 hover:bg-purple-100 p-2 rounded text-[#6d28d2] hover:text-purple-800 text-sm font-semibold transition-colors duration-200"
          >
            {showMore ? 'Collapse all sections' : 'Expand all sections'}
          </button>
        </div>

        <div className="border border-solid border-gray-200 mb-2">
          {visibleSectionsList.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex justify-between items-center p-4 text-left bg-[#f6f7f9] transition-colors border-b border-solid border-gray-200"
              >
                <div className="flex items-start w-9/12">
                  <svg 
                    className={`w-5 h-5 mr-2 text-gray-500 transition-transform ${expandedSections.has(section.id) ? 'transform rotate-180' : ''}`}
                    viewBox="0 0 24 24" 
                    fill="none"
                    stroke="currentColor" 
                    strokeWidth="2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  <h2 className="text-[#2a2b3f] font-bold w-full">{section.title}</h2>
                </div>
                <span className="text-sm text-[#2a2b3f] w-1/5 text-end">
                  {section.total_lectures} lectures • {formatDuration(section.total_duration)}
                </span>
              </button>

              {expandedSections.has(section.id) && (
                <div className="border-t border-gray-200">
                  <ul className="space-y-0 p-4">
                    {section.lectures.map((lecture) => (
                      <li
                        key={lecture.id}
                        className="flex justify-between items-center border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                      >
                        <div className="flex items-start gap-4">
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 256 256"
                            className="h-5 w-4"
                            fill="none"
                            stroke="#2a2b3f"
                          >
                            <g>
                              <path stroke="#2a2b3f" strokeWidth="10"
                                d="M27.1,37.5c-8.1,1.6-15.2,9.1-16.5,17.5c-0.3,2-0.5,21.5-0.5,57.4c0,59,0,57.8,2.5,62.9c1.5,3,5.3,7.1,7.8,8.6
                                c5,2.9,1.2,2.7,54.6,3l48.6,0.2l0.1,11.6l0.1,11.7l-23.6,0.1l-23.6,0.1l-0.1,4.2l-0.1,4.3H128h51.7l-0.1-4.3l-0.1-4.2l-23.6-0.1
                                l-23.6-0.1l0.1-11.7l0.1-11.6l48.6-0.2c53.4-0.2,49.6,0,54.6-3c2.6-1.5,6.4-5.6,7.8-8.6c2.6-5.1,2.5-3.9,2.5-62.9
                                c0-35.9-0.2-55.4-0.5-57.4c-1.3-8.3-7.6-15.1-15.9-17.3C227.2,37,215.5,36.9,128,37C73.3,37,28.2,37.2,27.1,37.5z M229.2,46.4
                                c2.9,1.2,5.1,3.4,6.6,6.3l1.4,2.8v56.1c0,63.7,0.3,58.8-3.9,62.9c-4.3,4.3,6,3.9-105.3,3.9c-108.5,0-100.8,0.2-104.6-3
                                c-1.1-0.9-2.5-2.6-3.2-3.8l-1.2-2.2l-0.1-56.9l-0.1-56.9l1.4-2.9c1.5-3.1,4-5.4,6.8-6.4c1.4-0.5,20.3-0.6,101.2-0.6
                                C215.1,45.7,227.8,45.8,229.2,46.4z"
                              />
                              <path stroke="#2a2b3f" strokeWidth="10" fill="#2a2b3f"
                                d="M106.3,111.2c0,17.2,0,31.3,0.1,31.3s11.9-6.8,26.2-15c14.3-8.2,26.5-15.3,27.1-15.6c1-0.6-0.2-1.3-17.7-11.4
                                c-10.3-6-22.6-13-27.2-15.7l-8.4-4.9V111.2z"
                              />
                            </g>
                          </svg>
                          <div>
                            <p
                              className={`text-sm mb-4 ${lecture.is_preview || purchased ? 'text-[#6d28d2] underline cursor-pointer' : 'text-[#2a2b3f]'}`}
                              onClick={() => {
                                if (!user) {
                                  router.push('/signup');
                                } else if (purchased || lecture.is_preview) {
                                  router.push(`/course-videos?courseId=${courseId}`);
                                } else {
                                  router.push(`/buy/${courseId}`);
                                }
                              }}
                            >
                              {lecture.title}
                            </p>
                          </div>
                        </div>

                        <span className="text-sm text-gray-600 flex items-center gap-8">
                          {lecture.is_preview && (
                            <span className="text-sm text-[#6d28d2] underline cursor-pointer">Preview</span>
                          )}
                          {displayDuration(lecture.duration)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center my-6">
          {remainingSections > 0 ? (
            <button 
              onClick={handleShowMoreSections}
              className="text-[#6d28d2] text-sm font-bold border border-solid border-[#6d28d2] p-1.5 w-full rounded hover:bg-purple-100"
            >
              {remainingSections} more sections
            </button>
          ) : visibleSections > 6 && (
            <button 
              onClick={handleShowLessSections}
              className="text-[#6d28d2] text-sm font-bold border border-solid border-[#6d28d2] p-1.5 w-full rounded hover:bg-purple-100"
            >
              Show less
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
