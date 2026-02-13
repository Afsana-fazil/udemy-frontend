import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const floatingImages = [
  {
    id: 1,
    src: '/assets/animated-cta-person-1.webp',
    alt: 'Person 1',
    position: 'left-48',
    size: 'w-48 h-48',
    side: 'left',
    delay: 0,
  },
  {
    id: 2,
    src: '/assets/animated-cta-person-2.webp',
    alt: 'Person 2',
    position: 'top-16 right-32',
    size: 'w-48 h-48',
    side: 'right',
    delay: 100,
  },
  {
    id: 3,
    src: '/assets/animated-cta-person-3.webp',
    alt: 'Person 3',
    position: 'bottom-1/4 left-16',
    size: 'w-44 h-64',
    side: 'left',
    delay: 200,
  },
  {
    id: 4,
    src: '/assets/animated-cta-person-4.webp',
    alt: 'Person 4',
    position: 'bottom-1/4 right-4',
    size: 'w-44 h-64',
    side: 'right',
    delay: 300,
  },
  {
    id: 5,
    src: '/assets/animated-cta-person-5.webp',
    alt: 'Person 5',
    position: 'top-2/3 left-48',
    size: 'w-44 h-64',
    side: 'left',
    delay: 400,
  },
  {
    id: 6,
    src: '/assets/animated-cta-person-6.webp',
    alt: 'Person 6',
    position: 'top-2/3 right-32',
    size: 'w-64 h-64',
    side: 'right',
    delay: 500,
  },
];

const AnimationPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ first: '', last: '', email: '', company: '', job: '', size: '', offers: false });
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first || !form.last || !form.email || !form.company || !form.job || !form.size) {
      setFormError('Please fill all required fields.');
      return;
    }
    setFormError('');
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      router.push('/business');
    }, 1500);
  };

  return (
    <div className="bg-[#F7F9FA] py-16">
        <div className='h-screen w-11/12 mx-auto relative overflow-hidden'>
      {floatingImages.map((img, idx) => {
        const isLeft = img.side === 'left';
        return (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            className={`absolute ${img.position} ${img.size} rounded-2xl shadow-lg object-cover transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : isLeft
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
            } ${
              hoveredImage === img.id ? 'scale-110 shadow-2xl z-20' : 'hover:scale-105'
            }`}
            style={{ zIndex: 10, transitionDelay: `${img.delay}ms` }}
            onMouseEnter={() => setHoveredImage(img.id)}
            onMouseLeave={() => setHoveredImage(null)}
          />
        );
      })}
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-5xl font-bold font-serif mb-6 leading-tight">
              What will learning do
              <br />
              for your organization?
            </h1>
            <p className="text-lg leading-relaxed mb-12">
              See the impact of online learning for businesses. Let's start
              <br />
              on a plan that supports your goals.
            </p>
            <a href="/demo" className="bg-black text-white px-2.5 py-2 rounded font-bold text-sm hover:bg-[#4435bb]">
              Request a demo
            </a>
            <div className="mt-32 mb-4">
              <p className="text-lg">
                Small team? <span className="font-bold underline decoration-[#4435bb] hover:decoration-2 underline-offset-4 cursor-pointer" onClick={() => setShowModal(true)}>Start with Team Plan.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* Modal for Team Plan */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 relative flex flex-col items-center">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            {!submitted ? (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">Start with Team Plan</h2>
                <form className="w-full flex flex-col gap-4" onSubmit={handleFormSubmit}>
                  <input name="first" value={form.first} onChange={handleFormChange} placeholder="First Name *" className="w-full border border-solid border-black rounded p-3 font-semibold" />
                  <input name="last" value={form.last} onChange={handleFormChange} placeholder="Last Name *" className="w-full border border-solid border-black rounded p-3 font-semibold" />
                  <input name="email" value={form.email} onChange={handleFormChange} placeholder="Work Email *" className="w-full border border-solid border-black rounded p-3 font-semibold" />
                  <input name="company" value={form.company} onChange={handleFormChange} placeholder="Company Name *" className="w-full border border-solid border-black rounded p-3 font-semibold" />
                  <input name="job" value={form.job} onChange={handleFormChange} placeholder="Job Title *" className="w-full border border-solid border-black rounded p-3 font-semibold" />
                  <select name="size" value={form.size} onChange={handleFormChange} className="w-full border border-solid border-black rounded p-3 font-semibold bg-white focus:ring-2 focus:ring-[#4435bb] appearance-none">
                    <option value="">Company Size *</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1001-5000">1001-5000</option>
                    <option value="5001-10000">5001-10000</option>
                    <option value="10000+">10000+</option>
                  </select>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs">Send me special offers, event updates, and learning tips.</span>
                    <button
                      type="button"
                      className={`ml-auto w-16 h-6 flex items-center rounded-full border border-solid border-gray-300 transition-colors duration-200 relative overflow-hidden ${form.offers ? 'bg-black' : 'bg-gray-200'}`}
                      onClick={() => setForm((prev) => ({ ...prev, offers: !prev.offers }))}
                      aria-pressed={form.offers}
                    >
                      {form.offers ? (
                        <span className="absolute left-3 top-1 text-[10px] font-bold select-none z-10 text-white">YES</span>
                      ) : (
                        <span className="absolute right-3 top-1 text-[10px] font-bold select-none z-10 text-black">NO</span>
                      )}
                      <span
                        className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${form.offers ? 'translate-x-8' : 'translate-x-0'}`}
                        style={{ position: 'absolute', top: '2px', left: '2px' }}
                      />
                    </button>
                  </div>
                  {formError && <div className="text-red-500 text-xs mt-1">{formError}</div>}
                  <button type="submit" className="w-full bg-black text-white py-3 rounded font-bold text-lg hover:bg-[#4435bb] transition-colors mt-2">
                    Submit
                  </button>
                  <div className="text-xs text-gray-500 text-center mt-2">
                    By signing up, you agree to our <a href="#" className="text-[#693BDD] text-xs">Terms of Use</a> and <a href="#" className="text-[#693BDD] text-xs">Privacy Policy</a>.
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-2xl font-bold mb-4">Submitted successfully!</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationPage;