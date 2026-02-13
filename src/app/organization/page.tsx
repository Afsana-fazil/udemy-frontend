"use client"

import { useState, MouseEvent, ChangeEvent } from 'react';

export default function OrganizationLoginPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError('Please enter your work email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    console.log('Organization login with:', email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen to-green-100 relative overflow-hidden" style={{ backgroundImage: "url('/assets/placeholder.jpg')" }}>
      <div className="absolute inset-0">
        
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white shadow-xl p-6 w-full max-w-md">
          <div className="flex justify-center mb-8">
              <img src="/assets/logo-ub.svg" alt="logo-business" className='w-52 h-10' />
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your work email address"
                value={email}
                onChange={handleEmailChange}
                className={`w-full py-5 px-4 border border-solid border-[#9194ac] rounded placeholder-[#2a2b3f] text-sm font-bold ${
                  emailError 
                    ? 'border-red-500 bg-red-50 placeholder-red-500' 
                    : 'border-gray-300'
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  {emailError}
                </p>
              )}
            </div>

            <button 
              onClick={handleEmailSubmit}
              className="w-full bg-[#6d28d2] text-white p-3 rounded text-sm font-bold hover:bg-purple-700 focus:outline-none"
            >
              Continue
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="">
              <a href="https://business-support.udemy.com/hc/en-us/requests/new?ticket_form_id=644288" className="hover:text-purple-800 text-sm text-[#6d28d2]">
                Need help with logging in or signing up?
              </a>
            </p>
            <p className="mt-6">
              <a href="https://www.udemy.com/terms/ub-privacy/" className="text-[#595c73] text-xs">
                Read our Privacy Statement
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

