import React, { useEffect, useState, useRef } from "react";
import { ChevronDown } from 'lucide-react';
import States from '@/components/data/states.json';
import Banks from '@/components/data/banks.json';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';

interface Course {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface BuyNowProps {
  courseId: string;
  onPurchaseComplete: (purchasedCourseId: string) => void;
}

export default function BuyNow({ courseId, onPurchaseComplete }: BuyNowProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cards"); // Default to cards
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [upiMethod, setUpiMethod] = useState('qr');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  // New state variables for input errors
  const [cardError, setCardError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [cardNameError, setCardNameError] = useState("");
  const [upiIdError, setUpiIdError] = useState("");
  const [bankError, setBankError] = useState("");
  const [stateError, setStateError] = useState("");

  // Add refs for card number and expiry date inputs
  const cardNumberRef = useRef<HTMLInputElement>(null);
  const expiryDateRef = useRef<HTMLInputElement>(null);

  // Add refs for CVV and card name inputs
  const cvvRef = useRef<HTMLInputElement>(null);
  const cardNameRef = useRef<HTMLInputElement>(null);

  // Add ref for UPI ID input
  const upiIdRef = useRef<HTMLInputElement>(null);

  const { token } = useAuth();

  useEffect(() => {
    if (!courseId) {
      setError("No course ID provided");
      setLoading(false);
      return;
    }

    async function fetchCourse() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:8000/api/courses/${courseId}/`);

        if (!res.ok) {
          throw new Error(`Failed to fetch course: ${res.statusText}`);
        }

        const data = await res.json();
        setCourse(data);
      } catch (err: any) {
        console.error("Failed to fetch course:", err);
        setError("Oops! We couldn't load the course details. Please try again.");
        const mockCourse: Course = {
          id: parseInt(courseId),
          title: "The Complete AI Guide: Learn ChatGPT, Generative AI & More",
          price: 559,
          image: "https://img-c.udemycdn.com/course/240x135/5739438_7de6_3.jpg"
        };
        setCourse(mockCourse);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset all errors before validation
    setCardError("");
    setExpiryError("");
    setCvvError("");
    setCardNameError("");
    setUpiIdError("");
    setBankError("");
    setStateError("");

    let isValid = true;

    // Validate State
    if (!selectedState) {
      setStateError("Please select your State / Union Territory.");
      isValid = false;
    }

    // Validate based on selected payment method
    if (paymentMethod === 'cards') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
        setCardError("Please enter a valid 16-digit card number.");
        isValid = false;
      }
      if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
        setExpiryError("Please enter a valid expiry date (MM/YY).");
        isValid = false;
      } else {
        const [month, year] = expiryDate.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
        const currentMonth = new Date().getMonth() + 1; // Month is 0-indexed

        if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
          setExpiryError("Expiry date is in the past or invalid.");
          isValid = false;
        }
      }
      if (!cvv || cvv.length < 3) {
        setCvvError("Please enter a valid CVV (3 or 4 digits).");
        isValid = false;
      }
      if (!cardName.trim()) {
        setCardNameError("Please enter the name on the card.");
        isValid = false;
      }
    } else if (paymentMethod === 'upi') {
      if (upiMethod === 'id' && !upiId.trim()) {
        setUpiIdError("Please enter your UPI ID.");
        isValid = false;
      }
      // For QR, no input validation is needed here as it's a "proceed to generate QR" action
    } else if (paymentMethod === 'netbanking' || paymentMethod === 'mobile') {
      if (!selectedBank) {
        setBankError("Please select your bank.");
        isValid = false;
      }
    }

    if (isValid) {
      try {
        // Call backend to record purchase
        const res = await fetch(`http://localhost:8000/api/courses/${courseId}/purchase/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payment_method: paymentMethod,
            transaction_id: '' // You can add real transaction id if available
          })
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Purchase failed');
        }
        onPurchaseComplete(courseId);
        Swal.fire({
          title: 'Purchase Successful!',
          text: `You have successfully purchased "${course?.title}".`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          console.log(`Navigating to course page for ID: ${courseId}`);
        });
      } catch (err: any) {
        Swal.fire({
          title: 'Purchase Failed!',
          text: err.message || 'Could not complete purchase.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please fill in all required payment details correctly.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return v.length >= 2 ? v.substring(0, 2) + '/' + v.substring(2, 4) : v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const start = input.selectionStart || 0;
    const value = input.value;
    const formatted = formatCardNumber(value);
    
    if (formatted.length <= 19) {
      setCardNumber(formatted);
      setCardError("");
      
      // Maintain focus and cursor position
      requestAnimationFrame(() => {
        if (cardNumberRef.current) {
          cardNumberRef.current.focus();
          const newPosition = Math.min(start + (formatted.length - value.length), formatted.length);
          cardNumberRef.current.setSelectionRange(newPosition, newPosition);
        }
      });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const start = input.selectionStart || 0;
    const value = input.value;
    const formatted = formatExpiry(value);
    
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
      setExpiryError("");
      
      // Maintain focus and cursor position
      requestAnimationFrame(() => {
        if (expiryDateRef.current) {
          expiryDateRef.current.focus();
          const newPosition = Math.min(start + (formatted.length - value.length), formatted.length);
          expiryDateRef.current.setSelectionRange(newPosition, newPosition);
        }
      });
    }
  };

  // Add focus handlers to maintain focus
  const handleCardNumberFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleExpiryFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const start = input.selectionStart || 0;
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(value);
    setCvvError("");
    
    // Maintain focus and cursor position
    requestAnimationFrame(() => {
      if (cvvRef.current) {
        cvvRef.current.focus();
        const newPosition = Math.min(start, value.length);
        cvvRef.current.setSelectionRange(newPosition, newPosition);
      }
    });
  };

  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const start = input.selectionStart || 0;
    const value = e.target.value;
    setCardName(value);
    setCardNameError("");
    
    // Maintain focus and cursor position
    requestAnimationFrame(() => {
      if (cardNameRef.current) {
        cardNameRef.current.focus();
        const newPosition = Math.min(start, value.length);
        cardNameRef.current.setSelectionRange(newPosition, newPosition);
      }
    });
  };

  // Add focus handlers for CVV and card name
  const handleCvvFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleCardNameFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleUpiIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const start = input.selectionStart || 0;
    const value = e.target.value;
    setUpiId(value);
    setUpiIdError("");
    
    // Maintain focus and cursor position
    requestAnimationFrame(() => {
      if (upiIdRef.current) {
        upiIdRef.current.focus();
        const newPosition = Math.min(start, value.length);
        upiIdRef.current.setSelectionRange(newPosition, newPosition);
      }
    });
  };

  const handleUpiIdFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading course info...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-lg text-red-600 mb-4">{error || "Course not found."}</p>
          <button 
            onClick={() => window.history.back()} 
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const discount = 0;

  const PaymentOption = ({ id, icon: Icon, title, isSelected, onClick, children }: any) => (
    <div className="border-b border-solid border-[#d1d2e0] last:border-none">
      <div 
        className={`flex items-center p-2 cursor-pointer bg-[#f6f7f9] rounded-lg`}
        onClick={onClick}
      >
        <input
          type="radio"
          name="paymentOption" 
          value={id}
          checked={isSelected}
          onChange={() => {}}
          className="mr-3 w-4 h-4 accent-[#33364a]"
        />
        <Icon className="w-5 h-5 mr-3 text-gray-600" />
        <span className="font-bold">{title}</span>

        {id === 'cards' && !isSelected && (
          <div className="ml-auto flex space-x-1">
            <img src="/assets/card-visa.svg" alt="Visa" className="h-7 bg-white border border-solid border-[#d1d2e0] rounded" />
            <img src="/assets/card-mastercard.svg" alt="Mastercard" className="h-7 bg-white border border-solid border-[#d1d2e0] rounded" />
            <img src="/assets/card-amex.svg" alt="Amex" className="h-7 bg-white border border-solid border-[#d1d2e0] rounded" />
            <img src="/assets/card-dinersclub.svg" alt="Diners" className="h-7 bg-white border border-solid border-[#d1d2e0] rounded" />
            <img src="/assets/card-rupay.svg" alt="RuPay" className="h-7 bg-white border border-solid border-[#d1d2e0] rounded" />
          </div>
        )}
      </div>
      
      <div className={`border-t border-solid border-[#d1d2e0] ${isSelected ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  ); 


  return (
    <div className="min-h-screen text-[#2a2b3f]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Column - Checkout Form */}
          <div className="flex-1">
            <h1 className="text-lg font-serif font-extrabold mb-6">Checkout</h1>

            <div className="space-y-8">
              {/* Billing Address */}
              <div>
                <h2 className="font-bold mb-4">Billing address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Country</label>
                    <div className="relative flex items-center gap-2 border border-[#9194ac] border-solid p-3 rounded">
                      <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Navigation / Globe">
                          <path id="Vector" d="M3 12H8M3 12C3 16.9706 7.02944 21 12 21M3 12C3 7.02944 7.02944 3 12 3M8 12H16M8 12C8 16.9706 9.79086 21 12 21M8 12C8 7.02944 9.79086 3 12 3M16 12H21M16 12C16 7.02944 14.2091 3 12 3M16 12C16 16.9706 14.2091 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12C21 16.9706 16.9706 21 12 21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                      </svg>
                      <select className="w-full bg-white outline-none text-sm" value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        <option value="" disabled>Please select...</option>
                        <option value="India">India</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">State / Union Territory</label>
                    <div className="relative flex items-center gap-2 border border-[#9194ac] border-solid p-3 rounded">
                      <select name="state" id="state" value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setStateError(""); }} className="w-full bg-white outline-none text-sm"
                      >
                        <option value="">Please select...</option>
                        {States.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                    {stateError && <p className="text-red-500 text-xs mt-1">{stateError}</p>}
                  </div>
                </div>

                <p className="text-xs text-[#595c73] tracking-wider mt-2">
                  Udemy is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.
                </p>
              </div>

              {/* Payment Method */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold">Payment method</h2>
                  <div className="flex items-center gap-2 text-sm text-[#595c73] underline decoration-dotted">
                    Secure and encrypted
                    <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  
                      width="18px" height="16px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                      <path fill="#595c73" d="M52,24h-4v-8c0-8.836-7.164-16-16-16S16,7.164,16,16v8h-4c-2.211,0-4,1.789-4,4v32c0,2.211,1.789,4,4,4h40
                        c2.211,0,4-1.789,4-4V28C56,25.789,54.211,24,52,24z M32,48c-2.211,0-4-1.789-4-4s1.789-4,4-4s4,1.789,4,4S34.211,48,32,48z M40,24
                        H24v-8c0-4.418,3.582-8,8-8s8,3.582,8,8V24z"/>
                    </svg>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="border border-solid border-[#d1d2e0]"> 
                  {/* Cards */}
                  <PaymentOption key="payment-cards-option"  id="cards"
                    icon={() => (
                      <div className="mr-2">
                        <svg viewBox="0 0 40 26" xmlns="http://www.w3.org/2000/svg" className="bg-white border border-solid border-[#d1d2e0] rounded h-8 w-10">
                          <path d="m30.19 21.18h-20.19a1.87 1.87 0 0 1 -1.9-1.85v-12.33a1.88 1.88 0 0 1 1.9-1.82h20.2a1.88 1.88 0 0 1 1.89 1.82v12.3a1.88 1.88 0 0 1 -1.9 1.88z" fill="#212121" fillRule="evenodd"/><g fill="#fff"><rect height="2" rx=".5" width="5" x="25.09" y="17.18"/><path d="m8.09 12.18h24v-3h-24z" fillRule="evenodd"/></g>
                        </svg>
                      </div>
                    )} title="Cards" isSelected={paymentMethod === 'cards'} onClick={() => setPaymentMethod('cards')}
                  >
                    {paymentMethod === 'cards' && ( 
                      <div className="space-y-4 p-5">
                        <div>
                          <label className="block text-sm font-bold mb-2">
                            Card number
                          </label>
                          <div className="relative">
                            <input 
                              type="text" 
                              value={cardNumber} 
                              onChange={handleCardNumberChange}
                              onFocus={handleCardNumberFocus}
                              placeholder="1234 5678 9012 3456"
                              className={`w-full py-2 px-4 border border-solid rounded placeholder:text-gray-300 ${cardError ? 'border-red-500' : 'border-[#9194ac]'}`}
                              maxLength={19}
                              ref={cardNumberRef}
                            />
                            <div className="absolute right-3 top-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="18" fill="none" viewBox="0 0 27 18"><path fill="#E6E9EB" d="M0 3a3 3 0 0 1 3-3h21a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3z"/><path fill="#B9C4C9" d="M4 12h19v2H4z"/><rect width="4" height="4" x="4" y="4" fill="#fff" rx="1"/></svg>
                            </div>
                          </div>
                          {cardError && <p className="text-red-500 text-xs mt-1">{cardError}</p>}
                          <div className="flex space-x-2 mt-3">
                            <img src="/assets/visa.svg" alt="Visa" className="h-4 w-6 bg-white border border-solid border-[#d1d2e0] rounded" />
                            <img src="/assets/mc.svg" alt="Mastercard" className="h-4 w-6 bg-white border border-solid border-[#d1d2e0] rounded" />
                            <img src="/assets/amex.svg" alt="Amex" className="h-4 w-6 bg-white border border-solid border-[#d1d2e0] rounded" />
                            <img src="/assets/diners.svg" alt="Diners" className="h-4 w-6 bg-white border border-solid border-[#d1d2e0] rounded" />
                            <img src="/assets/rupay.svg" alt="RuPay" className="h-4 w-6 bg-white border border-solid border-[#d1d2e0] rounded" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold mb-2">
                              Expiry date
                            </label>
                            <input 
                              type="text" 
                              value={expiryDate} 
                              onChange={handleExpiryChange}
                              onFocus={handleExpiryFocus}
                              placeholder="MM/YY"
                              className={`w-full py-2 px-4 border border-solid rounded placeholder:text-gray-300 ${expiryError ? 'border-red-500' : 'border-[#9194ac]'}`}
                              maxLength={5}
                              ref={expiryDateRef}
                            />
                            {expiryError && <p className="text-red-500 text-xs mt-1">{expiryError}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-bold mb-2">
                              CVC / CVV
                            </label>
                            <input 
                              type="text" 
                              value={cvv} 
                              onChange={handleCvvChange}
                              onFocus={handleCvvFocus}
                              placeholder="CVC"
                              className={`w-full py-2 px-4 border border-solid rounded placeholder:text-gray-300 ${cvvError ? 'border-red-500' : 'border-[#9194ac]'}`}
                              maxLength={4}
                              ref={cvvRef}
                            />
                            {cvvError && <p className="text-red-500 text-xs mt-1">{cvvError}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold mb-2">
                            Name on card
                          </label>
                          <input 
                            type="text" 
                            value={cardName} 
                            onChange={handleCardNameChange}
                            onFocus={handleCardNameFocus}
                            placeholder="Name on card"
                            className={`w-full py-2 px-4 border border-solid rounded placeholder:text-gray-300 ${cardNameError ? 'border-red-500' : 'border-[#9194ac]'}`}
                            ref={cardNameRef}
                          />
                          {cardNameError && <p className="text-red-500 text-xs mt-1">{cardNameError}</p>}
                        </div>

                        <div className="flex items-center">
                          <label className="flex gap-2 items-center text-sm cursor-pointer text-[#2a2b3f]">
                            <input type="checkbox" className="peer hidden" 
                            />
                            <span className="w-4 h-4 inline-block border-solid border-2 border-[#33364a] rounded peer-checked:bg-[#6d28d2] peer-checked:border-[#6d28d2] relative flex-shrink-0 
                            ">
                              <svg 
                                className="absolute top-0 left-0 w-3 h-3 stroke-white stroke-[1.5px]"
                                viewBox="0 0 24 24" fill="#fff" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            Securely save this card for my later purchase
                          </label>
                        </div>

                      </div>
                    )}
                  </PaymentOption>

                  {/* UPI */}
                  <PaymentOption key="payment-upi-option"  id="upi"
                    icon={() => (
                      <div className="mr-2">
                        <svg viewBox="0 0 40 26" xmlns="http://www.w3.org/2000/svg" className="bg-white border border-solid border-[#d1d2e0] rounded h-8 w-10">
                          <g fillRule="evenodd"><path d="m32.5 17.19 5-4.58-2.36-4.74z" fill="#097939"/><path d="m30.81 17.19 5-4.58-2.36-4.74z" fill="#ed752e"/><path d="m6.83 7.93-2.11 7.52 7.5.05 2.06-7.57h1.9l-2.47 8.8a.87.87 0 0 1 -.8.61h-9.62a.76.76 0 0 1 -.77-1l2.36-8.4zm23.17-.06h1.9l-2.64 9.47h-2zm-13.63 4 9.51-.05.63-2h-9.64l.58-1.84 10.3-.1a.83.83 0 0 1 .85 1.11l-1 3.55a1.61 1.61 0 0 1 -1.47 1.12h-8.5l-1 3.89h-1.82z" fill="#747474"/></g>
                        </svg>
                      </div>
                    )}
                    title="UPI" isSelected={paymentMethod === 'upi'} onClick={() => setPaymentMethod('upi')}
                  >
                    {paymentMethod === 'upi' && ( // Only render content if this is the selected method
                      <div className="space-y-4 p-5">
                        <div>
                          <p className="text-sm mb-3">How would you like to use UPI?</p>
                          <div className="grid grid-cols-2 gap-3 border border-solid rounded-md border-[#b9c4c9] p-1">
                            <button
                              onClick={() => { setUpiMethod('qr'); setUpiIdError(""); }}
                              className={`p-2 text-[#0075ff] text-center text-sm ${
                                upiMethod === 'qr' 
                                  ? 'border-[#0075ff] border border-solid rounded-md bg-[#e5f1ff] font-bold' 
                                  : ''
                              }`}
                            >
                              QR code
                            </button>
                            <button
                              onClick={() => { setUpiMethod('id'); setUpiIdError(""); }}
                              className={`p-2 text-[#0075ff] text-center text-sm ${
                                upiMethod === 'id' 
                                  ? 'border-[#0075ff] border border-solid rounded-md bg-[#e5f1ff] font-bold' 
                                  : ''
                              }`}
                            >
                              Enter UPI ID
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-center mt-4 mb-8">
                            <hr className="flex-grow border-t border-solid border-[#e6e9eb]" />
                            <span className="mx-2 text-xs text-[#687282]">Complete your payment</span>
                            <hr className="flex-grow border-t border-solid border-[#e6e9eb]" />
                          </div>
                          {upiMethod === 'qr' && (
                            <p>
                              Click the "Proceed" button to generate a QR code for UPI payment.
                            </p>
                          )}
                        </div>

                        {upiMethod === 'id' && (
                          <div className="focus-within:text-[#0075ff]">
                            <label className="text-sm font-bold transition-colors duration-200">
                              Enter UPI ID / VPA
                            </label>
                            <input 
                              type="text" 
                              value={upiId} 
                              onChange={handleUpiIdChange}
                              onFocus={handleUpiIdFocus}
                              className={`w-full mt-2 p-2 border border-solid rounded-md focus:ring-2 focus:ring-[#6d28d2] focus:border-[#6d28d2] outline-none ${upiIdError ? 'border-red-500' : 'border-[#9194ac]'}`}
                              ref={upiIdRef}
                            />
                            {upiIdError && <p className="text-red-500 text-xs mt-1">{upiIdError}</p>}
                            <p className="mt-4 w-5/6">
                            Enter your UPI ID / VPA and click "Proceed" to initiate the transaction.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </PaymentOption>

                  {/* Net Banking */}
                  <PaymentOption key="payment-netbanking-option" id="netbanking"
                    icon={() => (
                      <div className="mr-2">
                        <svg viewBox="0 0 40 26" xmlns="http://www.w3.org/2000/svg" className="border border-solid border-[#d1d2e0] rounded w-10">
                          <path d="m0 0h40v26h-40z" fill="#1e71b9"/><path d="m26.7 11.8v6.8h-1.8v-7.2h1.3c.1 0 .2 0 .3.1s.2.2.2.3zm1.3 7.6c.1 0 .2 0 .3.1s-.1.2-.1.3v.4h-15.7c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3v-.4zm-13.9-1.2v-6.8h1.8v7.2h-1.3c-.1 0-.2 0-.3-.1-.2-.1-.2-.2-.2-.3zm5.4.4v-7.2h1.8v7.2zm-2.7-7.2h1.8v7.2h-1.8zm7.2 7.2h-1.8v-7.2h1.8zm-11.3-8c-.1 0-.1 0-.2 0s-.1-.1-.1-.1-.1-.1-.1-.1 0-.1 0-.2v-.6l8.1-3.8 7.9 3.7c.1 0 .1.1.2.1 0 .1.1.1.1.2v.7h-15.9zm15.8.8c.2 0 .5-.1.6-.2.2-.2.3-.4.3-.6v-1c0-.1 0-.3-.1-.4-.2-.1-.3-.2-.4-.3l-8.1-3.8c-.2-.1-.3-.1-.4-.1s-.3 0-.4.1l-8.1 3.8c-.1.1-.3.2-.4.3s-.1.3-.1.4v1c0 .2.1.4.3.6s.4.2.6.2h.9v7.2h-.9c-.2 0-.5.1-.6.2-.2.2-.3.4-.3.6v.8c0 .1 0 .2.1.3 0 .1.1.2.2.3s.2.1.3.2.2.1.3.1h16.2c.1 0 .2 0 .3-.1.1 0 .2-.1.3-.2s-.1-.2-.2-.3c0-.1.1-.2.1-.3v-.8c0-.2-.1-.4-.3-.6s-.4-.2-.6-.2h-.9v-7.2z" fill="#fff"/>
                        </svg>
                      </div>
                    )}
                    title="Net Banking" isSelected={paymentMethod === 'netbanking'} onClick={() => setPaymentMethod('netbanking')}
                  >
                    {paymentMethod === 'netbanking' && ( // Only render content if this is the selected method
                      <div className="space-y-4 p-5">
                        <p className="w-11/12">
                          In order to complete your transaction, we will transfer you over to Adyen's secure servers.
                        </p>
                        <div className={`px-3 border border-solid rounded-md focus-within:ring-2 focus-within:ring-[#0075ff] focus-within:border-[#0075ff] hover:bg-[#f6f7f9] flex items-center ${bankError ? 'border-red-500' : 'border-[#9194ac]'}`}>
                          <select name="bank" id="bank" value={selectedBank} onChange={(e) => { setSelectedBank(e.target.value); setBankError(""); }} className="w-full py-2 outline-none appearance-none bg-white"
                          >
                            <option value="">Select your bank</option>
                            {Banks.map((bank) => (
                              <option key={bank} value={bank}>
                                {bank}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="right-3 top-3 w-8 h-5 text-gray-400 pl-2" />
                        </div>
                        {bankError && <p className="text-red-500 text-xs mt-1">{bankError}</p>}
                      </div>
                    )}
                  </PaymentOption>

                  {/* Mobile Wallets */}
                  <PaymentOption key="payment-mobile-option" id="mobile"
                    icon={() => (
                      <div className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 26" className="bg-white border border-solid border-[#d1d2e0] rounded w-10">
                          <path fill="#4d4d4f" d="M0 0h40v26H0z"/><path fill="#bcbcbc" d="M11.28 8.48L25.49 4.6v11.63H11.28z"/><path fill="#fff" d="M11.28 8.48h17.45V21.4H11.28z"/><circle cx="25.49" cy="14.94" r="1.29" fill="#008500"/>
                        </svg>
                      </div>
                    )} title="Mobile Wallets" isSelected={paymentMethod === 'mobile'} onClick={() => setPaymentMethod('mobile')}
                  >
                    {paymentMethod === 'mobile' && (
                      <div className="space-y-4 p-5">
                        <p className="w-11/12">
                        In order to complete your transaction, we will transfer you over to Adyen's secure servers.
                        </p>
                        <div className={`px-3 border border-solid rounded-md focus-within:ring-2 focus-within:ring-[#0075ff] focus-within:border-[#0075ff] hover:bg-[#f6f7f9] flex items-center ${bankError ? 'border-red-500' : 'border-[#9194ac]'}`}>
                          <select value={selectedBank} onChange={(e) => { setSelectedBank(e.target.value); setBankError(""); }} className="w-full py-2 outline-none appearance-none bg-white"
                          >
                            <option value="">Select your wallet</option>
                            <option value="airtel">Airtel Money</option>
                            <option value="amazon">Amazon Pay</option>
                            <option value="ebixcash">EbixCash</option>
                            <option value="freecharge">FreeCharge Wallet</option>
                            <option value="phonepe">PhonePe Wallet</option>
                          </select>
                          <ChevronDown className="right-3 top-3 w-8 h-5 text-gray-400 pl-2" />
                        </div>
                        {bankError && <p className="text-red-500 text-xs mt-1">{bankError}</p>}
                      </div>
                    )}
                  </PaymentOption>
                </div>
              </div>

              {/* Order Details */}
              <div>
                <span className="flex gap-1">
                  <h2 className="font-bold mb-4">Order details</h2>
                  <span>(1 course)</span>
                </span>
                <div className="flex items-start gap-4 pt-2">
                  <img src={course.image} alt={course.title} className="w-12 h-12 object-cover" onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/80x60/6366f1/ffffff?text=Course';
                    }}
                  />
                  <div className="flex justify-between items-start w-full">
                    <h3 className="text-sm font-bold mb-1 w-9/12">{course.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="">₹{course.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-5/12 pl-28">
            <div className="p-6 sticky top-8 mt-10">
              <h2 className="text-xl font-bold mb-4">Order summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Price:</span>
                  <span>₹{course.price.toLocaleString('en-IN')}</span>
                </div>
                <hr className="border-[#d1d2e0] border-solid" />
                <div className="flex justify-between text-sm font-bold">
                  <div>
                    <span>Total</span>
                    <span className="font-normal">(1 course):</span>
                  </div>
                  <span>₹{course.price}</span>
                </div>
              </div>

              <div className="my-8">
                <p className="text-xs mb-2">
                  By completing your purchase, you agree to these{' '}
                  <a href="#" className="text-xs text-[#6d28d2]">Terms of Use</a>.
                </p>
                
                <button
                  onClick={handlePurchase}
                  className="w-full bg-[#6d28d2] flex gap-2 text-white py-3 rounded font-bold hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  
                    width="18px" height="16px" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
                    <path fill="#fff" d="M52,24h-4v-8c0-8.836-7.164-16-16-16S16,7.164,16,16v8h-4c-2.211,0-4,1.789-4,4v32c0,2.211,1.789,4,4,4h40
                      c2.211,0,4-1.789,4-4V28C56,25.789,54.211,24,52,24z M32,48c-2.211,0-4-1.789-4-4s1.789-4,4-4s4,1.789,4,4S34.211,48,32,48z M40,24
                      H24v-8c0-4.418,3.582-8,8-8s8,3.582,8,8V24z"/>
                  </svg>
                  <span>Pay ₹{course.price}</span>
                </button>
              </div>

              <div className="text-center mb-14">
                <h3 className="font-bold mb-2">30-Day Money-Back Guarantee</h3>
                <p className="text-sm">
                  Not satisfied? Get a full refund within 30 days.
                  <br />
                  Simple and straightforward!
                </p>
              </div>

              <div className="bg-white border border-solid border-[#d1d2e0] rounded-md p-5">
                <div className="flex gap-2 items-center">
                  <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1]">
                    <path d="M20 13.1111C20 20.2222 13.9556 22 10.9333 22C8.28889 22 3 20.2222 3 13.1111C3 10.3295 4.46147 8.46138 5.85996 7.39454C6.63841 6.80069 7.6304 7.39197 7.73017 8.36598L7.816 9.20382C7.92052 10.2241 8.84932 11.0606 9.70932 10.5017C11.3938 9.40705 12 6.7752 12 5.33334V5.00971C12 3.58 13.4438 2.65985 14.6023 3.49767C17.1653 5.35127 20 8.58427 20 13.1111Z" stroke="#c4710d" strokeWidth="2"/>
                    <path opacity="0.5" d="M8 18.4445C8 21.2889 10.4889 22 11.7333 22C12.8222 22 15 21.2889 15 18.4445C15 17.3435 14.4107 16.6002 13.8404 16.1713C13.4424 15.872 12.8828 16.1408 12.7459 16.6196C12.5675 17.2437 11.9228 17.636 11.5944 17.0759C11.2941 16.5638 11.2941 15.7957 11.2941 15.3334C11.2941 14.6968 10.6539 14.2847 10.1389 14.6589C9.10649 15.4091 8 16.6815 8 18.4445Z" stroke="#c4710d" strokeWidth="2"/>
                  </svg>
                  <h4 className="font-bold">Tap into Success Now</h4>
                </div>
                <p className="mt-4">Join <b>50+</b> people in your country who've recently enrolled in this course within last 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}