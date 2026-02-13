import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description?: string;
    image: string;
    price: number;
    rating_point?: string;
    rating?: string;
    reviews?: string;
    created_by?: string;
    premium?: boolean;
    best_seller?: boolean;
  };
  disableLink?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function CourseCard({ course, disableLink = false }: CourseCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistId, setWishlistId] = useState<string | null>(null);
  const { user, token } = useAuth();
  const router = useRouter();

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
      .catch(err => {
        setWishlisted(false);
        setWishlistId(null);
        // Optionally log or show error
      });
  }, [token, course.id]);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
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
        // Optionally show a user-facing error
      }
    }
  };

  const cardContent = (
    <div className="bg-white border border-solid border-[#d1d2e0] shadow rounded-lg group relative">
      <div className="relative">
        <img
          src={course.image}
          alt={`Course image for ${course.title}`}
          className="w-full h-40 object-cover mb-2 rounded-t-lg"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x240/6366f1/ffffff?text=Course+Image';
          }}
        />
        {/* Wishlist Icon on Hover */}
        <button
          className="absolute top-3 right-3 border-2 border-solid border-[#5022c3] bg-gray-100 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlistClick}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={wishlisted ? "#5022c3" : "none"}
            stroke="#5022c3"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div className="pt-1 pb-0 p-5 flex flex-col gap-1">
        <h3 className="text-base font-semibold line-clamp-2 text-[#2a2b3f]">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 truncate text-[#595c73]">
          {course.created_by?.slice(0, 60)}...
        </p>
        <div className="flex items-center gap-1 text-sm mt-1">
          {course.rating_point && (
            <span className="text-sm font-bold text-[#8b4309]">{course.rating_point}</span>
          )}
          {course.rating && (
            <img 
              src={course.rating} 
              alt="rating" 
              className="w-20" 
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/80x20/ffd700/000000?text=★★★★☆';
              }}
            />
          )}
          {course.reviews && (
            <small className="text-xs font-normal text-[#595c73]">({course.reviews})</small>
          )}
        </div>
        <p className="text-md text-[#2a2b3f] font-bold mt-1">₹{course.price}</p>
      </div>

      <div className="flex gap-2 items-center pt-1.5 p-5">
        {course.premium && (
          <span className="text-white text-xs font-semibold flex items-center gap-1 bg-[#5022c3] py-1 px-2 rounded">
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.78133 3.89027C10.3452 3.40974 10.6271 3.16948 10.9219 3.02859C11.6037 2.70271 12.3963 2.70271 13.0781 3.02859C13.3729 3.16948 13.6548 3.40974 14.2187 3.89027C14.4431 4.08152 14.5553 4.17715 14.6752 4.25747C14.9499 4.4416 15.2584 4.56939 15.5828 4.63344C15.7244 4.66139 15.8713 4.67312 16.1653 4.69657C16.9038 4.7555 17.273 4.78497 17.5811 4.89378C18.2936 5.14546 18.8541 5.70591 19.1058 6.41844C19.2146 6.72651 19.244 7.09576 19.303 7.83426C19.3264 8.12819 19.3381 8.27515 19.3661 8.41669C19.4301 8.74114 19.5579 9.04965 19.7421 9.32437C19.8224 9.44421 19.918 9.55642 20.1093 9.78084C20.5898 10.3447 20.8301 10.6267 20.971 10.9214C21.2968 11.6032 21.2968 12.3958 20.971 13.0776C20.8301 13.3724 20.5898 13.6543 20.1093 14.2182C19.918 14.4426 19.8224 14.5548 19.7421 14.6747C19.5579 14.9494 19.4301 15.2579 19.3661 15.5824C19.3381 15.7239 19.3264 15.8709 19.303 16.1648C19.244 16.9033 19.2146 17.2725 19.1058 17.5806C18.8541 18.2931 18.2936 18.8536 17.5811 19.1053C17.273 19.2141 16.9038 19.2435 16.1653 19.3025C15.8713 19.3259 15.7244 19.3377 15.5828 19.3656C15.2584 19.4297 14.9499 19.5574 14.6752 19.7416C14.5553 19.8219 14.4431 19.9175 14.2187 20.1088C13.6548 20.5893 13.3729 20.8296 13.0781 20.9705C12.3963 21.2963 11.6037 21.2963 10.9219 20.9705C10.6271 20.8296 10.3452 20.5893 9.78133 20.1088C9.55691 19.9175 9.44469 19.8219 9.32485 19.7416C9.05014 19.5574 8.74163 19.4297 8.41718 19.3656C8.27564 19.3377 8.12868 19.3259 7.83475 19.3025C7.09625 19.2435 6.72699 19.2141 6.41893 19.1053C5.7064 18.8536 5.14594 18.2931 4.89427 17.5806C4.78546 17.2725 4.75599 16.9033 4.69706 16.1648C4.6736 15.8709 4.66188 15.7239 4.63393 15.5824C4.56988 15.2579 4.44209 14.9494 4.25796 14.6747C4.17764 14.5548 4.08201 14.4426 3.89076 14.2182C3.41023 13.6543 3.16997 13.3724 3.02907 13.0776C2.7032 12.3958 2.7032 11.6032 3.02907 10.9214C3.16997 10.6266 3.41023 10.3447 3.89076 9.78084C4.08201 9.55642 4.17764 9.44421 4.25796 9.32437C4.44209 9.04965 4.56988 8.74114 4.63393 8.41669C4.66188 8.27515 4.6736 8.12819 4.69706 7.83426C4.75599 7.09576 4.78546 6.72651 4.89427 6.41844C5.14594 5.70591 5.7064 5.14546 6.41893 4.89378C6.72699 4.78497 7.09625 4.7555 7.83475 4.69657C8.12868 4.67312 8.27564 4.66139 8.41718 4.63344C8.74163 4.56939 9.05014 4.4416 9.32485 4.25747C9.4447 4.17715 9.55691 4.08152 9.78133 3.89027Z" stroke="#fff" strokeWidth="1.5"/>
                <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Premium
          </span>
        )}
        {course.best_seller && (
          <span className="text-[#0d5261] text-xs font-semibold bg-[#c2e9eb] py-1 px-2 rounded">
            Bestseller
          </span>
        )}
      </div>
    </div>
  );

  if (disableLink) {
    return cardContent;
  }

  return (
    <Link href={`/courses/${course.id}`} target="_blank" rel="noopener noreferrer">
      {cardContent}
    </Link>
  );
}
