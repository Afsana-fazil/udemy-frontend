'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import LanguageSelector from '../ui/Languages';
import { useSearch } from '../../contexts/SearchContext';
import { useAuth } from '../../contexts/AuthContext';

interface MainCategory {
    id: number;
    name: string;
    slug: string;
    subcategories: {
        id: number;
        name: string;
        slug: string;
    }[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating?: string;
  students_count?: number;
  best_seller?: string;
  created_by?: string;
  purchased?: boolean;
  progress?: number;
  total_videos?: number;
  completed_videos?: number;
}

// Utility to get user-specific key
function getUserKey(base: string, user: any) {
  if (!user) return base + '_guest';
  return user.id ? `${base}_${user.id}` : `${base}_${user.email}`;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [categories, setCategories] = useState<MainCategory[]>([]);
    const [showExploreDropdown, setShowExploreDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<MainCategory | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const { setSearchQuery, setIsSearching } = useSearch();
    const { user, logout, token } = useAuth();
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const avatarRef = useRef<HTMLDivElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

    useEffect(() => {
        const fetchCounts = () => {
            if (!token) {
                setCartCount(0);
                setWishlistCount(0);
                return;
            }
            // Debug logging
            console.log('API_BASE:', API_BASE);
            console.log('Token:', token);
            fetch(`${API_BASE}/cart/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    let items = Array.isArray(data) ? data : (data.results || data.data || []);
                    setCartCount(items.length);
                })
                .catch(err => {
                    console.error('Cart fetch error:', err);
                    setCartCount(0);
                });
            fetch(`${API_BASE}/wishlist/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    let items = Array.isArray(data) ? data : (data.results || data.data || []);
                    setWishlistCount(items.length);
                })
                .catch(err => {
                    console.error('Wishlist fetch error:', err);
                    setWishlistCount(0);
                });
        };
        fetchCounts();
        window.addEventListener('cart-updated', fetchCounts);
        window.addEventListener('wishlist-updated', fetchCounts);
        return () => {
            window.removeEventListener('cart-updated', fetchCounts);
            window.removeEventListener('wishlist-updated', fetchCounts);
        };
    }, [token]);

    // Fetch categories when dropdown is shown
    useEffect(() => {
        if (showExploreDropdown && categories.length === 0 && !loading) {
            setLoading(true);
            fetch(`${API_BASE}/main-categories/`)
                .then((res) => res.json())
                .then((data) => {
                    setCategories(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching categories:", err);
                    setLoading(false);
                });
        }
    }, [showExploreDropdown, categories.length, loading, API_BASE]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (avatarRef.current && event.target instanceof Node && !avatarRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Mobile menu close on ESC
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') setMobileMenuOpen(false);
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent background scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setSearchQuery(searchInput.trim());
            setIsSearching(true);
        } else {
            setSearchQuery('');
            setIsSearching(false);
        }
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);
        
        // If search input is cleared, reset search state
        if (!value.trim()) {
            setSearchQuery('');
            setIsSearching(false);
        }
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

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

    return (
        <header className="py-1 px-0 shadow-custom-blue relative z-10">
            {/* Mobile Navbar */}
            <nav className="flex items-center justify-between md:hidden px-2 py-2 bg-white">
                {/* Hamburger */}
                <button
                    className="p-2 focus:outline-none"
                    aria-label="Open menu"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <svg className="w-7 h-7 text-[#2a2b3f]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {/* Logo Centered */}
                <a href="/" className="flex-1 flex justify-center">
                    <img src="/assets/logo-udemy.png" alt="logo-udemy" className="w-24" />
                </a>
                {/* Search and Cart on Right */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setMobileSearchOpen((v) => !v)}
                        aria-label="Open search"
                        className="focus:outline-none"
                    >
                        <svg className="w-6 h-6 text-[#2a2b3f]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                    <Link href="/cart" className="relative">
                        <svg className="w-6 h-6 text-[#303141]" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
                            <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#6d28d2] text-xs rounded-full w-5 h-5 flex items-center text-white justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
            {/* Mobile Search Input */}
            {mobileSearchOpen && (
                <form onSubmit={handleSearch} className="md:hidden flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200">
                    <input
                        type="text"
                        placeholder="Search for courses..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-700"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        autoFocus
                    />
                    <button type="button" onClick={() => setMobileSearchOpen(false)} aria-label="Close search" className="ml-2">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button type="submit" className="ml-2 text-white bg-purple-700 px-3 py-2 rounded-lg text-sm font-semibold">Search</button>
                </form>
            )}
            {/* Mobile Drawer */}
            {mobileMenuOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Close menu overlay"
                    />
                    {/* Drawer */}
                    <aside className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 animate-slide-in">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                            <a href="/" className="flex items-center">
                                <img src="/assets/logo-udemy.png" alt="logo-udemy" className="w-24" />
                            </a>
                            <button
                                className="p-2 focus:outline-none"
                                aria-label="Close menu"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                            {/* Explore Accordion */}
                            <button
                                type="button"
                                className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold text-[#2a2b3f] hover:bg-purple-50 transition focus:outline-none"
                                onClick={() => setMobileExploreOpen((v) => !v)}
                                aria-expanded={mobileExploreOpen}
                                aria-controls="mobile-explore-panel"
                            >
                                <span>Explore</span>
                                <svg className={`w-5 h-5 ml-2 transition-transform ${mobileExploreOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            {mobileExploreOpen && (
                                <div id="mobile-explore-panel" className="pl-4 pb-2">
                                    {loading ? (
                                        <div className="flex items-center justify-center py-4">
                                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-700"></div>
                                            <span className="ml-2 text-gray-600">Loading categories...</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {categories.map((category) => (
                                                <div key={category.id} className="group">
                                                    <Link
                                                        href={`/categories/${category.id}`}
                                                        className="block p-2 text-sm rounded hover:bg-purple-100 transition-colors font-medium text-[#2a2b3f]"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                    {/* Subcategories */}
                                                    {category.subcategories && category.subcategories.length > 0 && (
                                                        <div className="pl-4 space-y-1">
                                                            {category.subcategories.map((subcategory) => (
                                                                <Link
                                                                    key={subcategory.id}
                                                                    href={`/categories/${category.id}?subcategory=${subcategory.slug}`}
                                                                    className="block p-2 text-xs rounded hover:bg-purple-50 transition-colors text-[#595c73]"
                                                                >
                                                                    {subcategory.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            <div className="mt-2 pt-2 border-t border-gray-200">
                                                <Link
                                                    href="/courses"
                                                    className="text-purple-700 hover:text-purple-800 font-medium text-sm"
                                                >
                                                    View all courses →
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {/* Other nav items */}
                            {user ? (
                                <>
                                    <Link href="/business" className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-[#2a2b3f] hover:bg-purple-50 transition">Udemy Business</Link>
                                    <Link href="/instructor" className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-[#2a2b3f] hover:bg-purple-50 transition">Instructor</Link>
                                    <Link href="/purchased" className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-[#2a2b3f] hover:bg-purple-50 transition">My learning</Link>
                                    <Link href="/wishlist" className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-[#2a2b3f] hover:bg-purple-50 transition">Wishlist</Link>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-[#6d28d2] border border-purple-700 mt-2 hover:bg-purple-50 transition">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link href="/plans" className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-[#2a2b3f] hover:bg-purple-50 transition">Plans & Pricing</Link>
                                    <Link href="/business" className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-[#2a2b3f] hover:bg-purple-50 transition">Udemy Business</Link>
                                    <Link href="/teach" className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-[#2a2b3f] hover:bg-purple-50 transition">Teach on Udemy</Link>
                                    <Link href="/login" className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-[#6d28d2] border border-purple-700 mt-2 hover:bg-purple-50 transition">Log in</Link>
                                    <Link href="/signup" className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-white bg-purple-700 border border-purple-700 mt-2 hover:opacity-90 transition">Sign up</Link>
                                </>
                            )}
                        </nav>
                        <div className="px-4 pb-6">
                            <div className="border border-solid border-purple-700 p-2 rounded hover:bg-purple-100 w-fit mx-auto">
                                <LanguageSelector icon={<img src="/assets/icons/globe.png" alt="globe" className="w-5 h-5" />} showLabel={false} />
                            </div>
                        </div>
                    </aside>
                </>
            )}
            {/* Desktop Navbar */}
            <nav className="hidden md:flex justify-between items-center px-6">
                <div className="flex items-center gap-2">
                    <a href="/"><img src="/assets/logo-udemy.png" alt="logo-udemy" className="w-24" /></a>
                    <div 
                        className="relative"
                        data-explore-container
                        onMouseEnter={() => setShowExploreDropdown(true)}
                        onMouseLeave={(e) => {
                            // Only close if we're not moving to the dropdown
                            const relatedTarget = e.relatedTarget as HTMLElement;
                            if (!relatedTarget || !relatedTarget.closest('.explore-dropdown')) {
                                setShowExploreDropdown(false);
                                setHoveredCategory(null);
                            }
                        }}
                    >
                        <a 
                            href="#" 
                            className={`px-4 py-2.5 rounded block transition-colors ${
                                showExploreDropdown 
                                    ? 'text-purple-700 bg-purple-100' 
                                    : 'hover:text-purple-700 hover:bg-purple-100'
                            }`}
                        >
                            Explore
                        </a>
                        
                        {/* Explore Dropdown */}
                        {showExploreDropdown && (
                            <div 
                                className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex explore-dropdown"
                                onMouseEnter={() => setShowExploreDropdown(true)}
                                onMouseLeave={(e) => {
                                    // Only close if we're not moving back to the explore button
                                    const relatedTarget = e.relatedTarget as HTMLElement;
                                    if (!relatedTarget || !relatedTarget.closest('[data-explore-container]')) {
                                        setShowExploreDropdown(false);
                                        setHoveredCategory(null);
                                    }
                                }}
                            >
                                {/* Main Categories */}
                                <div 
                                    className="w-80 p-4 border-r border-gray-200 main-categories-panel"
                                    onMouseLeave={(e) => {
                                        // Only clear hovered category if we're not moving to the subcategory panel
                                        const relatedTarget = e.relatedTarget as HTMLElement;
                                        if (!relatedTarget || !relatedTarget.closest('.subcategory-panel')) {
                                            setHoveredCategory(null);
                                        }
                                    }}
                                >
                                    <h3 className="text-sm font-bold text-[#595c73] mb-3">Explore by Goals</h3>
                                    {loading ? (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-700"></div>
                                            <span className="ml-2 text-gray-600">Loading categories...</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {categories.map((category) => (
                                                <div 
                                                    key={category.id} 
                                                    className="group"
                                                    onMouseEnter={() => setHoveredCategory(category)}
                                                >
                                                    <Link 
                                                        href={`/categories/${category.id}`}
                                                        className="block p-2 text-sm rounded hover:bg-purple-50 transition-colors"
                                                    >
                                                        <div className="font-medium text-sm text-[#2a2b3f] group-hover:text-purple-700">
                                                            {category.name}
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-4 pt-3 border-t border-gray-200">
                                        <Link 
                                            href="/courses" 
                                            className="text-purple-700 hover:text-purple-800 font-medium text-sm"
                                        >
                                            View all courses →
                                        </Link>
                                    </div>
                                </div>

                                {/* Subcategories Panel */}
                                {hoveredCategory && hoveredCategory.subcategories && hoveredCategory.subcategories.length > 0 && (
                                    <div 
                                        className="w-80 p-4 subcategory-panel"
                                        onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                                        onMouseLeave={(e) => {
                                            // Only clear hovered category if we're not moving back to the main categories panel
                                            const relatedTarget = e.relatedTarget as HTMLElement;
                                            if (!relatedTarget || !relatedTarget.closest('.main-categories-panel')) {
                                                setHoveredCategory(null);
                                            }
                                        }}
                                    >
                                        <div className="space-y-2">
                                            {hoveredCategory.subcategories.map((subcategory) => (
                                                <Link 
                                                    key={subcategory.id}
                                                    href={`/categories/${hoveredCategory.id}?subcategory=${subcategory.slug}`}
                                                    className="block p-2 text-sm rounded hover:bg-purple-50 transition-colors"
                                                >
                                                    <div className="font-medium text-sm text-[#2a2b3f] hover:text-purple-700">
                                                        {subcategory.name}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSearch} className="group border border-solid border-[#9194ac] rounded-3xl flex items-center hover:bg-gray-100 px-2 focus-within:border-purple-700 flex-1 m-2">
                    <button type="submit"><img src="/assets/icons/search-icon.svg" alt="search" className="w-5"/></button>
                    <input 
                        type="text" 
                        placeholder="Find your next course by skill, topic, or instructor" 
                        id="SearchInput" 
                        className="w-full text-xs p-3.5 text-gray-800 bg-white border-none outline-none group-hover:bg-gray-100 rounded-3xl"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                </form>

                <div className="space-x-4">
                    <ul className="flex justify-between items-center tracking-tight">
                        {user ? (
                            <>
                              <li><a href="/business" target="_blank" className="hover:text-purple-700 hover:bg-purple-100 px-4 py-2.5 rounded">Udemy Business</a></li>
                              <li><a href="/instructor" className="hover:text-purple-700 hover:bg-purple-100 px-4 py-2.5 rounded">Instructor</a></li>
                              <li><a href="/purchased" className="hover:text-purple-700 hover:bg-purple-100 px-4 py-2.5 rounded">My learning</a></li>
                            </>
                        ) : 
                            <>
                                <li className='hidden xl:block'><a href="/plans" className="hover:text-purple-700 hover:bg-purple-100 px-4 py-2.5 rounded">Plans & Pricing</a></li>
                                <li><a href="/business" target="_blank" className="hover:text-purple-700 hover:bg-purple-100 px-4 py-2.5 rounded">Udemy Business</a></li>
                                <li className='hidden xl:block'><a href="/teach" className="hover:text-purple-700 hover:bg-purple-100 px-4 py-2.5 rounded">Teach on Udemy</a></li>
                            </>
                        }
                        
                        {/* Cart Icon */}
                        <li className="group rounded hover:bg-purple-100 p-1 lg:px-3 py-2 relative mr-2">
                            <Link href="/cart">
                                <svg className="w-6 h-6 group-hover:text-purple-700 fill-current text-[#303141]" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#6d28d2] text-xs rounded-full w-5 h-5 flex items-center text-white justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>

                        {/* Authentication Buttons */}
                        <li>
                            <div className="button flex justify-between items-center gap-4">
                                {user ? (
                                    <>
                                        {/* Wishlist Icon for logged in users */}
                                        <div className="group rounded hover:bg-purple-100 p-2 relative ml-2">
                                            <Link href="/wishlist">
                                                <svg className="w-5 h-5 group-hover:text-purple-700" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke='#2a2b3f' strokeWidth='2' className='group-hover:stroke-[#6d28d2]' />
                                                </svg>
                                                {wishlistCount > 0 && (
                                                    <span className="absolute -top-1 -right-1 bg-[#6d28d2] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                        {wishlistCount}
                                                    </span>
                                                )}
                                            </Link>
                                        </div>
                                        {/* Logged in user - show logout button */}
                                        <button 
                                            onClick={handleLogout}
                                            className="border border-solid border-purple-700 px-1.5 lg:px-4 py-2.5 rounded text-sm font-bold text-[#6d28d2] hover:bg-purple-100"
                                        >
                                            Logout
                                        </button>

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
                                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
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
                                    </>
                                ) : (
                                    // Not logged in - show login and signup buttons
                                    <>
                                        <Link href="/login">
                                            <button className="border border-solid border-purple-700 px-2.5 lg:px-4 py-1.5 lg:py-2.5 rounded text-sm font-bold text-[#6d28d2] hover:bg-purple-100">
                                                Log in
                                            </button>
                                        </Link>
                                        <Link href="/signup">
                                            <button className="border border-solid bg-purple-700 border-purple-700 px-2.5 lg:px-4 py-1.5 lg:py-2.5 rounded text-sm font-bold text-white hover:opacity-90">Sign up</button>
                                        </Link>

                                        <div className="border border-solid border-purple-700 lg:p-1 rounded hover:bg-purple-100">
                                            <LanguageSelector icon={<img src="/assets/icons/globe.png" alt="globe" className="w-5 h-5" />} showLabel={false} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
  



