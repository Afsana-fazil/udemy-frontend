'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../contexts/AuthContext';

interface CartItem {
  id: number;
  course: {
    id: number;
    title: string;
    price: number;
    image: string;
    created_by: string;
    best_seller: string;
  };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Utility to get user-specific key
function getUserKey(base: string, user: any) {
  if (!user) return base + '_guest';
  return user.id ? `${base}_${user.id}` : `${base}_${user.email}`;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const { user, token } = useAuth();

  useEffect(() => {
    if (!token) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${API_BASE}/cart/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('Cart API response:', data); // Debug: log the response
        let items = [];
        if (Array.isArray(data)) {
          items = data;
        } else if (Array.isArray(data?.results)) {
          items = data.results;
        } else if (Array.isArray(data?.data)) {
          items = data.data;
        }
        setCartItems(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch cart:', err);
        setCartItems([]);
        setLoading(false);
      });
  }, [token]);

  const removeFromCart = async (cartId: number) => {
    if (!token) return;
    await fetch(`${API_BASE}/cart/${cartId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    setCartItems(items => items.filter(item => item.id !== cartId));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.course.price), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      // For now, we'll just redirect to the first item's buy page
      // In a real implementation, you'd want to handle multiple items
      router.push(`/buy/${cartItems[0].id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-[#2a2b3f] mb-8">Shopping Cart</h1>
        <div className="font-bold text-[#2a2b3f] mb-2">{cartItems.length} Courses in Cart</div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-sm shadow-sm flex flex-col items-center justify-center py-6 border border-solid border-gray-200" style={{ minHeight: 350 }}>
            <img src="/assets/empty-shopping-cart-v2.webp" alt="Empty cart" className="w-56 h-44 mb-6" />
            <p className="mb-6">Your cart is empty. Keep shopping to find a course!</p>
            <button
              onClick={() => router.push('/courses')}
              className="bg-[#6d28d2] text-sm text-white px-3 py-3 rounded-md font-bold hover:bg-purple-700 transition-colors"
            >
              Keep shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border-t border-solid border-gray-300">
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="py-4 border-b border-solid border-gray-300 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-32 h-16 relative">
                        <img
                          src={item.course.image || '/assets/empty-shopping-cart-v2.webp'}
                          alt={item.course.title || 'Course image'}
                          className="object-cover w-full h-full"
                          onError={e => { e.currentTarget.src = '/assets/empty-shopping-cart-v2.webp'; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-2">{item.course.title || 'Untitled Course'}</h3>
                        {/* Instructor name */}
                        {item.course.created_by ? (
                          <p className="text-sm text-gray-500 mb-2">
                            By {item.course.created_by}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-400 mb-2">By Unknown</p>
                        )}
                        {/* Best seller badge */}
                        {item.course.best_seller && (
                          <span className="text-[#0d5261] text-xs font-semibold bg-[#c2e9eb] py-1 px-2 rounded">
                            Bestseller
                          </span>
                        )}
                        <p className="font-bold text-[#2a2b3f] text-lg mt-1">
                          ₹{item.course.price?.toLocaleString('en-IN') || '0'}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="Remove from cart"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 pt-0 sticky top-8">
                <h2 className="text-lg font-bold text-[#595c73] mb-2">Total:</h2>
                <div>
                  <div className="text-3xl font-bold text-[#2a2b3f] mb-4">
                    <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full mb-2 bg-[#6d28d2] text-white py-3 px-4 rounded font-bold hover:bg-purple-700 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                  <span className="text-xs text-[#595c73]">You won't be charged yet</span>
                  <hr className="my-4 border-solid border-gray-300" />
                  {showCouponInput ? (
                    <div className="mb-4">
                      <div className="font-bold mb-2">Promotions</div>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Enter Coupon"
                          value={couponInput}
                          onChange={e => setCouponInput(e.target.value)}
                          className="border border-solid border-gray-400 rounded px-3 py-1.5 text-sm flex-1"
                        />
                        <button
                          className="bg-[#6d28d2] text-white px-4 py-2 rounded font-bold text-sm"
                          // TODO: Implement coupon logic here
                          onClick={() => {
                            if (cartItems.length > 0) {
                              router.push(`/buy/${cartItems[0].id}`);
                            }
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="w-full mb-2 bg-white text-[#6d28d2] border border-solid border-[#6d28d2] text-sm py-3 px-4 rounded font-bold hover:bg-purple-100 transition-colors"
                      onClick={() => setShowCouponInput(true)}
                    >
                      Apply Coupon
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
