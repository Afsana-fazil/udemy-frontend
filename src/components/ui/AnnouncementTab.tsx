import React, { useState } from 'react';
import announcements from '../data/Announcement.json';

export default function AnnouncementTab() {
  const [showAll, setShowAll] = useState(false);
  const visibleAnnouncements = showAll ? announcements : announcements.slice(0, 1);

  return (
    <div className="max-w-3xl mx-auto px-4 text-[#2a2b3f]">
      {visibleAnnouncements.map((a, idx) => (
        <div
          key={idx}
          className={
            "bg-white p-6 " +
            (idx !== visibleAnnouncements.length - 1 ? "border-b border-solid border-gray-200" : "")
          }
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/assets/Avatar.webp"
              alt={a.name}
              className="w-11 h-11 rounded-full border border-solid border-gray-300"
            />
            <div className='flex flex-col gap-1'>
              <span className="text-[#6d28d2] underline underline-offset-4 decoration-[#af72fd] cursor-pointer">{a.name}</span>
              <span className="text-sm">{a.message} ·</span>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h5 className="font-bold text-[#2a2b3f]">🙌 {a.title}</h5>
          </div>

          {/* Description */}
          <div className="mb-8">
            <div className="text-[#2a2b3f] ml-2">{a.description}</div>
          </div>

          {/* Small text */}
          {a.small && <div className="mb-8 text-[#2a2b3f]">{a.small}</div>}

          {/* Subtitle and link */}
          <div className="mb-4">
            <span className="font-bold">🎥{a.sub_title}</span>
          </div>
          <div>
            <a href={a.link} target="_blank" rel="noopener noreferrer" className="text-[#6d28d2] underline underline-offset-4 decoration-[#af72fd] text-sm break-all">{a.link}</a>
          </div>

          {/* Image */}
          <div className="mb-4">
            <img src={a.image} alt={a.title} className="w-full" />
          </div>

          <div className="mt-8 font-bold text-[#2a2b3f]">
            -{a.name},<br />
            {a.team}
          </div>
        </div>
      ))}

      {!showAll && (
        <div className='mt-6'>
          <button
            className='text-[#6d28d2] text-sm font-bold border border-solid border-[#6d28d2] p-1.5 w-full rounded hover:bg-purple-100'
            onClick={() => setShowAll(true)}
          >
            See More
          </button>
        </div>
      )}
      {showAll && (
        <div className='mt-6'>
          <button
            className='text-[#6d28d2] text-sm font-bold border border-solid border-[#6d28d2] p-1.5 w-full rounded hover:bg-purple-100'
            onClick={() => setShowAll(false)}
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
}
