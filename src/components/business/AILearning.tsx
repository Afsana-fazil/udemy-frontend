import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AILearning = () => {
  const cards = [
    {
      id: 1,
      title: "How Prodapt Leveraged AI-Driven Learning",
      action: "Read case study",
      image: '/assets/prodapt-resource-image.webp',
      description: "Prodapt leveraged AI-driven learning to personalize employee training paths, improve engagement, and close skill gaps faster. By using AI to analyze learning behavior and performance, they delivered adaptive content, optimized learning outcomes, and supported continuous upskilling aligned with business goals.",
    },
    {
      id: 2,
      title: "Get a glimpse into the future of learning: Udemy AI",
      action: "Watch now",
      image: '/assets/live-demo-resource-image.webp',
      description:"Get a glimpse into the future of learning with Udemy AI — where personalized, intelligent, and adaptive learning experiences empower learners to grow faster, stay relevant, and achieve their goals with the help of cutting-edge AI technology."
    },
    {
      id: 3,
      title: "An L&D Leader's Cheat Sheet to Supercharge Learning With GenAI",
      action: "Download guide",
      image: '/assets/ld-leader-resource-image.webp'
    }
  ];

  const [modal, setModal] = useState<{ open: boolean, card?: any, form?: boolean, submitted?: boolean }>({ open: false });
  const [form, setForm] = useState({ first: '', last: '', email: '', company: '', job: '', size: '', offers: false });
  const [formError, setFormError] = useState('');
  const router = useRouter();

  const handleCardClick = (card: any) => {
    if (card.id === 3) {
      setModal({ open: true, card, form: true });
    } else {
      setModal({ open: true, card, form: false });
    }
  };

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
    // Simple validation
    if (!form.first || !form.last || !form.email || !form.company || !form.job || !form.size) {
      setFormError('Please fill all required fields.');
      return;
    }
    setFormError('');
    setModal((prev) => ({ ...prev, submitted: true }));
    setTimeout(() => {
      setModal({ open: false });
      router.push('/business');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white pt-8 pb-24">
      {/* Hero Section */}
      <div className="w-full text-left px-8 mb-16 flex justify-between items-start">
        <h1 className="text-4xl mb-4 leading-tight">
          Accelerate your skills<br />journey <span className="font-bold">with AI</span>
        </h1>
        <a href="/demo" className="bg-black text-white p-2.5 rounded font-bold hover:bg-[#4435bb] transition-all duration-200">
          Request a demo
        </a>
      </div>
      {/* Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Image with badge overlay */}
            <div className="relative h-56 w-full">
              <img src={card.image} alt={card.title} className="object-cover w-full h-full rounded-xl" />
            </div>
            {/* Content */}
            <div className="flex flex-col flex-1 justify-between pt-6">
              <div>
                <h3 className="text-lg font-bold text-black mb-2 leading-tight">
                  {card.title}
                </h3>
              </div>
              <button
                className="mt-2 text-[#4435bb] font-semibold hover:text-black w-fit text-sm underline"
                onClick={() => handleCardClick(card)}
              >
                {card.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 relative flex flex-col items-center">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setModal({ open: false })}
              aria-label="Close"
            >
              &times;
            </button>
            {/* Info Modal */}
            {!modal.form && modal.card && (
              <>
                <h2 className="text-xl font-bold text-center mb-4">{modal.card.title}</h2>
                <p className="text-center text-base text-[#22223b] mb-2">{modal.card.description}</p>
              </>
            )}
            {/* Form Modal */}
            {modal.form && !modal.submitted && (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">Download the free guide</h2>
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
                        className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${form.offers ? 'translate-x-8 left-2' : 'translate-x-0 l-0'}`}
                        style={{ position: 'absolute' }}
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
            )}
            {/* Success Message */}
            {modal.form && modal.submitted && (
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

export default AILearning;