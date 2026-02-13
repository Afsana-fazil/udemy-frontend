"use client";

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Utility to get user-specific key
function getUserKey(base: string, user: any) {
  if (!user) return base + '_guest';
  return user.id ? `${base}_${user.id}` : `${base}_${user.email}`;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const btnRefs = useRef<Record<string, React.RefObject<HTMLButtonElement>>>({});

  useEffect(() => {
    if (!token) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${API_BASE}/wishlist/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        // Ensure wishlistItems is always an array
        let items = Array.isArray(data) ? data : (data.results || data.data || []);
        console.log('Wishlist API response:', data, 'Parsed items:', items);
        setWishlistItems(items);
        setLoading(false);
      })
      .catch(() => {
        setWishlistItems([]);
        setLoading(false);
      });
  }, [token]);

  const removeFromWishlist = async (wishlistId: string) => {
    if (!token) return;
    await fetch(`${API_BASE}/wishlist/${wishlistId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    setWishlistItems(items => items.filter(item => item.id !== wishlistId));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  function getBtnRef(id: string | number) {
    if (!btnRefs.current[id]) {
      btnRefs.current[id] = useRef<HTMLButtonElement>(null);
    }
    return btnRefs.current[id];
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
          <hr className='border-t border-solid border-gray-200  ' />
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses in wishlist</h3>
              <p className="mt-1 text-sm text-gray-500">Start adding courses to your wishlist to see them here.</p>
              <div className="mt-6">
                <a
                  href="/courses"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Browse Courses
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {wishlistItems.map((course, idx) => (
                <>
                  <div key={course.id} className="rounded-lg overflow-hidden flex items-center relative bg-white group transition-shadow">
                    <button
                      onClick={() => removeFromWishlist(course.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-10"
                      title="Remove from wishlist"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="4" x2="16" y2="16" />
                        <line x1="16" y1="4" x2="4" y2="16" />
                      </svg>
                    </button>
                    <div className="flex-shrink-0">
                      {course.course.image && (
                        <img
                          src={course.course.image}
                          alt={course.course.title}
                          className="w-24 h-24 object-cover rounded-lg m-3"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 p-2">
                      <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">{course.course.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">By {course.course.created_by || course.course.instructor}</p>
                      <div className="flex items-center gap-2 mb-2">
                        {course.course.best_seller && (
                          <span className="bg-[#c2e9eb] text-[#0d5261] text-xs font-semibold px-2 py-1 rounded">Bestseller</span>
                        )}
                      </div>
                      <span className="text-lg font-bold text-gray-900">₹{course.course.price}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full">
                      <button
                        className="inline-flex items-center px-5 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#5022c3] hover:bg-[#6d28d2] transition-colors whitespace-nowrap"
                        onClick={() => window.location.href = `/buy/${course.course.id}`}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                  {idx < wishlistItems.length - 1 && (
                    <hr className="border-t border-solid border-gray-200 my-2" />
                  )}
                </>
              ))}
            </div>
          )}
          <hr className='border-t border-solid border-gray-200' />
        </div>
      </div>
    </div>
  );
} 