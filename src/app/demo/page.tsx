"use client";

import { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import AlternativeNavbar from '@/components/layouts/Navbar';
import AlternativeFooter from '@/components/layouts/Footer';

interface DemoForm {
  first_name: string;
  last_name: string;
  work_email: string;
  phone_number: string;
  location: string;
  company_name: string;
  company_size: string;
  num_people_to_train: string;
  job_title: string;
  job_level: string;
  training_needs: string;
}

type Touched = Partial<Record<keyof DemoForm, boolean>>;

const initialState: DemoForm = {
  first_name: "",
  last_name: "",
  work_email: "",
  phone_number: "",
  location: "",
  company_name: "",
  company_size: "",
  num_people_to_train: "",
  job_title: "",
  job_level: "",
  training_needs: "",
};

const companySizes = [
  "1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10000+"
];
const numPeopleOptions = [
  "1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10000+"
];
const jobLevels = ["Entry", "Mid", "Senior", "Manager", "Director", "Executive"];

export default function DemoPage() {
  const [form, setForm] = useState<DemoForm>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Touched>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const validate = () => {
    const errors: Partial<Record<keyof DemoForm, string>> = {};
    if (!form.first_name) errors.first_name = "Required";
    if (!form.last_name) errors.last_name = "Required";
    if (!form.work_email) errors.work_email = "Required";
    if (!form.phone_number) errors.phone_number = "Required";
    if (!form.location) errors.location = "Required";
    if (!form.company_name) errors.company_name = "Required";
    if (!form.company_size) errors.company_size = "Required";
    if (!form.num_people_to_train) errors.num_people_to_train = "Required";
    if (!form.job_title) errors.job_title = "Required";
    if (!form.job_level) errors.job_level = "Required";
    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({});
    if (!isValid) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/demo/submit/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm(initialState);
      } else {
        const data = await res.json();
        setError(data.message || "Submission failed");
      }
    } catch (err) {
      setError("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Thank you!</h2>
        <p className="mb-8">Your demo request has been submitted. We'll be in touch soon.</p>
        <a href="/business" className="bg-black text-white px-6 py-2 rounded">
          Go to Business page
        </a>
      </div>
    );
  }

  return (
    <>
        <AlternativeNavbar />
        <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Left: Info */}
                <div className="w-9/12">
                    <h1 className="text-[40px] font-serif font-bold mb-4">Get your demo</h1>
                    <p className="text-md text-[#6a6f73]">Tell us your needs and we'll start on a custom plan to drive results.</p>
                    <div className="mb-10 mt-11">
                        <div className="font-semibold text-lg mb-4">With Udemy as your learning partner, you can:</div>
                        <ul className="space-y-4 text-sm leading-relaxed text-[#1c1d1f]">
                            <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span>Train your entire workforce with over 30,000+ courses in 16 languages</li>
                            <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span>Prep employees for over 200 industry-recognized certification exams</li>
                            <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span>Develop highly skilled tech teams in risk-free practice environments</li>
                            <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span>Identify emerging skills gaps, learning trends, and industry benchmarks</li>
                            <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span>Integrate content with your existing learning management system</li>
                        </ul>
                    </div>
                    <div className="mb-6">
                        <div className="font-semibold mb-8">Trusted by</div>
                        <div className="grid grid-cols-4 gap-10 items-center">
                            <img src="/assets/icons/volkswagen_logo.svg" alt="VW" className="w-10" />
                            <img src="/assets/icons/samsung_logo.svg" alt="Samsung" className="w-20" />
                            <img src="/assets/icons/cisco_logo.svg" alt="Cisco" className="w-16" />
                            <img src="/assets/icons/att-logo.webp" alt="AT&T" className="w-20" />
                            <img src="/assets/icons/procter_gamble_logo.svg" alt="P&G" className="w-10" />
                            <img src="/assets/icons/vimeo_logo_resized-2.svg" alt="Vimeo" className="w-20" />
                            <img src="/assets/icons/citi_logo.svg" alt="Citi" className="w-12" />
                            <img src="/assets/icons/ericsson_logo.svg" alt="Ericsson" className="w-10" />
                        </div>
                    </div>
                </div>
                {/* Right: Form */}
                <form className="flex flex-col gap-4 pb-10" onSubmit={handleSubmit}>
                  {/* First Name & Last Name side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input name="first_name" value={form.first_name} onChange={handleChange} onBlur={handleBlur} placeholder="First Name *" className="w-full border border-solid placeholder:text-[#333] text-sm font-bold rounded p-3.5" />
                      {touched.first_name && errors.first_name && (
                        <div className="absolute left-0 mt-1 z-10">
                          <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                            This field is required.
                            <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input name="last_name" value={form.last_name} onChange={handleChange} onBlur={handleBlur} placeholder="Last Name *" className="w-full border border-solid placeholder:text-[#333] text-sm font-bold rounded p-3.5" />
                      {touched.last_name && errors.last_name && (
                        <div className="absolute left-0 mt-1 z-10">
                          <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                            This field is required.
                            <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Work Email */}
                  <div className="relative">
                    <input name="work_email" type="email" value={form.work_email} placeholder="Work Email *" onChange={handleChange} onBlur={handleBlur} className="w-full border border-solid placeholder:text-[#333] text-sm font-bold rounded p-3.5" />
                    {touched.work_email && errors.work_email && (
                      <div className="absolute left-0 mt-1 z-10">
                        <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                          This field is required.
                          <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Phone Number */}
                  <div className="relative">
                    <input name="phone_number" value={form.phone_number} placeholder="Phone Number *" onChange={handleChange} onBlur={handleBlur} className="w-full border border-solid placeholder:text-[#333] text-sm font-bold rounded p-3.5" />
                    {touched.phone_number && errors.phone_number && (
                      <div className="absolute left-0 mt-1 z-10">
                        <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                          This field is required.
                          <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Location (full width) */}
                  <div className="border border-solid rounded px-3.5 pt-1 pb-3 bg-white relative">
                    <label htmlFor="location" className="block text-xs font-bold text-[#999]">Where are you located? *</label>
                    <select name="location" value={form.location} onChange={handleChange} onBlur={handleBlur} className="w-full text-[#333] text-sm font-bold bg-white outline-none">
                      <option value="">Select...</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia">Asia</option>
                      <option value="Other">Other</option>
                    </select>
                    {touched.location && errors.location && (
                      <div className="absolute left-0 mt-1 z-10">
                        <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                          This field is required.
                          <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Company Name (full width) */}
                  <div className="relative">
                    <input name="company_name" value={form.company_name} placeholder="Company Name *" onChange={handleChange} onBlur={handleBlur} className="w-full border border-solid placeholder:text-[#333] text-sm font-bold rounded p-3.5" />
                    {touched.company_name && errors.company_name && (
                      <div className="absolute left-0 mt-1 z-10">
                        <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                          This field is required.
                          <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Company Size & Number of people to train side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`border border-solid rounded px-3.5 pt-1 pb-3 bg-white relative ${touched.company_size && errors.company_size ? 'border-red-500' : ''}`}> 
                      <label htmlFor="company_size" className="block text-xs font-bold text-[#999]">Company Size *</label>
                      <select name="company_size" value={form.company_size} onChange={handleChange} onBlur={handleBlur} className="w-full text-[#333] text-sm font-bold bg-white outline-none">
                        <option value="">Select...</option>
                        {companySizes.map((size) => <option key={size} value={size}>{size}</option>)}
                      </select>
                      {touched.company_size && errors.company_size && (
                        <div className="absolute left-0 mt-1 z-10">
                          <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                            This field is required.
                            <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="border border-solid rounded px-3.5 pt-1 pb-3 bg-white">
                      <label htmlFor="num_people_to_train" className="block text-xs font-bold text-[#999]">Number of people to train *</label>
                      <select name="num_people_to_train" value={form.num_people_to_train} onChange={handleChange} onBlur={handleBlur} className="w-full text-[#333] text-sm font-bold bg-white outline-none">
                        <option value="">Select...</option>
                        {numPeopleOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      {touched.num_people_to_train && errors.num_people_to_train && (
                        <div className="absolute left-0 mt-1 z-10">
                          <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                            This field is required.
                            <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Job Title & Job Level side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input name="job_title" value={form.job_title} placeholder="Job Title *" onChange={handleChange} onBlur={handleBlur} className="w-full border border-solid placeholder:text-[#333] text-sm font-bold rounded p-3.5" />
                      {touched.job_title && errors.job_title && (
                        <div className="absolute left-0 mt-1 z-10">
                          <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                            This field is required.
                            <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`border border-solid rounded px-3.5 pt-1 pb-2 bg-white relative ${touched.job_level && errors.job_level ? 'border-red-500' : ''}`}> 
                      <label htmlFor="job_level" className="block text-xs font-bold text-[#999]">Job Level *</label>
                      <select name="job_level" value={form.job_level} onChange={handleChange} onBlur={handleBlur} className="w-full text-[#333] text-sm font-bold bg-white outline-none">
                        <option value="">Select...</option>
                        {jobLevels.map((level) => <option key={level} value={level}>{level}</option>)}
                      </select>
                      {touched.job_level && errors.job_level && (
                        <div className="absolute left-0 mt-1 z-10">
                          <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                            This field is required.
                            <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Training Needs (full width) */}
                  <div className="relative">
                    <textarea name="training_needs" value={form.training_needs} placeholder="What are your organization's training needs? (Optional)" onChange={handleChange} className="w-full border border-solid placeholder:text-[#333] text-sm font-bold rounded p-3.5 min-h-[60px]" />
                    {touched.training_needs && errors.training_needs && (
                      <div className="absolute left-0 mt-1 z-10">
                        <div className="bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg relative" style={{width: 'max-content'}}>
                          This field is required.
                          <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-red-600" style={{zIndex: 1}}></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                  <button type="submit" className="w-full border border-solid border-black bg-black text-white py-3 rounded font-bold text-sm hover:bg-[#fff] hover:text-black transition-colors mt-6" disabled={loading || !isValid}>
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                  <div className="text-[11px] leading-[1.5] mt-2 text-left transition-opacity duration-300 visible opacity-100">
                    By signing up, you agree to our <a href="#" className="underline text-[11px] text-[#4435bb]">Terms of Use</a> and <a href="#" className="underline text-[11px] text-[#4435bb]">Privacy Policy</a>.
                  </div>
                </form>
            </div>
        </div>
        <AlternativeFooter />
    </>
  );
}
