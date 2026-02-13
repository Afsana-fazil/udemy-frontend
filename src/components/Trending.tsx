"use client";
import StoriesSlider from '@/components/ui/StoriesSlider'
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Trending() {
    const router = useRouter();

    // Helper to handle skill/course navigation
    const handleSkillClick = async (e: React.MouseEvent<HTMLAnchorElement>, skill: string) => {
        e.preventDefault();
        try {
            // Try to find courses by subcategory first
            const categoriesRes = await fetch(`${BASE_URL}/api/main-categories/`);
            const categories = await categoriesRes.json();
            let matchingSubcategory = null;
            for (const category of categories) {
                if (category.subcategories && Array.isArray(category.subcategories)) {
                    matchingSubcategory = category.subcategories.find((sub: any) => 
                        sub.name.toLowerCase().includes(skill.toLowerCase()) ||
                        skill.toLowerCase().includes(sub.name.toLowerCase())
                    );
                    if (matchingSubcategory) break;
                }
            }
            if (matchingSubcategory) {
                const coursesRes = await fetch(`${BASE_URL}/api/courses/?subcategory=${matchingSubcategory.slug}`);
                const courses = await coursesRes.json();
                if (courses && courses.length > 0) {
                    router.push(`/courses/${courses[0].id}`);
                    return;
                }
            }
            // Fallback: search by title
            const res = await fetch(`${BASE_URL}/api/courses/`);
            const data = await res.json();
            const course = data.find((c: any) => c.title.toLowerCase().includes(skill.toLowerCase()));
            if (course) {
                router.push(`/courses/${course.id}`);
            } else {
                router.push('/no-course');
            }
        } catch (err) {
            router.push('/no-course');
        }
    };

    return (
        <section className="bg-gray-50">
            <section className="w-[90%] lg:w-[75%] mx-auto py-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-[#2a2b3f] border-b border-solid border-[#d1d2e0] pb-6">Trending Now</h2>
                <div className="lg:flex justify-between items-center w-full gap-10 mt-8">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#2a2b3f] ">ChatGPT is a top <br /> skill</h3>
                        <p className="flex items-center mt-2">
                            <a href="" className="text-[#6d28d2] font-semibold text-lg lg:text-xl" onClick={e => handleSkillClick(e, 'ChatGPT')}>See ChatGPT courses</a>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </p>
                        <span className="text-[#9194ac] text-sm">4,480,795 learners</span>

                        <button 
                            className="mt-6 mb-6 lg:mb-0 text-[#6d28d2] font-bold text-sm flex justify-center items-center gap-2 border border-[#6d28d2] border-solid rounded p-3 hover:bg-purple-100"
                            onClick={() => router.push('/courses')}
                        >
                            Show all trending skills
                            <svg
                                fill="#6d28d2" 
                                height="20"
                                width="20"
                                viewBox="0 0 230.453 230.453"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <polygon points="177.169,43.534 177.169,58.534 204.845,58.534 135.896,127.479 92.36,83.947 0,176.312 10.606,186.918 
                                92.361,105.16 135.896,148.691 215.453,69.14 215.453,96.784 230.453,96.784 230.453,43.534 " />
                            </svg>
                        </button>
                    </div>

                    <div className="sm:flex lg:items-center justify-between gap-10">
                        <div className='mb-8 sm:mb-0'>
                            <h3 className="font-bold text-xl lg:text-2xl mb-4">Development</h3>
                            <ul className="flex flex-col gap-5">
                                <li>
                                    <a href="" className="flex items-center font-bold text-base lg:text-lg text-[#6d28d2]" onClick={e => handleSkillClick(e, 'Python')}>Python 
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                    <span className="text-[#9194ac] text-sm">48,124,672 learners</span>
                                </li>
                                <li>
                                    <a href="" className="flex items-center font-bold text-base lg:text-lg text-[#6d28d2]" onClick={e => handleSkillClick(e, 'Web Development')}>Web Development
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                    <span className="text-[#9194ac] text-sm">14,074,507 learners</span>
                                </li>
                                <li>
                                    <a href="" className="flex items-center font-bold text-base lg:text-lg text-[#6d28d2]" onClick={e => handleSkillClick(e, 'Data Science')}>Data Science
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                    <span className="text-[#9194ac] text-sm">7,850,187 learners</span>
                                </li>
                            </ul>
                        </div>

                        <div className='mb-8 sm:mb-0'>
                            <h3 className="font-bold text-xl lg:text-2xl mb-4">Design</h3>
                            <ul className="flex flex-col gap-5">
                                <li>
                                    <a href="" className="flex items-center font-bold text-base lg:text-lg text-[#6d28d2]" onClick={e => handleSkillClick(e, 'Blender')}>Blender
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                    <span className="text-[#9194ac] text-sm">2,934,591 learners</span>
                                </li>
                                <li>
                                    <a href="" className="flex items-center font-bold text-base lg:text-lg text-[#6d28d2]" onClick={e => handleSkillClick(e, 'Graphic Design')}>Graphic Design
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                    <span className="text-[#9194ac] text-sm">4,519,785 learners</span>
                                </li>
                                <li>
                                    <a href="" className="flex items-center font-bold text-base lg:text-lg text-[#6d28d2]" onClick={e => handleSkillClick(e, 'User Experience (UX) Design')}>User Experience (UX) Design
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                    <span className="text-[#9194ac] text-sm">2,081,758 learners</span>
                                </li>
                            </ul>
                        </div>

                        <div className='mb-8 sm:mb-0'>
                            <h3 className="font-bold text-xl lg:text-2xl mb-4">Business</h3>
                            <ul className="flex flex-col gap-5">
                                <li>
                                    <a href="" className="flex items-center font-bold text-base lg:text-lg text-[#6d28d2]" onClick={e => handleSkillClick(e, 'PMI Project Management Professional (PMP)')}>PMI Project Management Professional (PMP)
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                    <span className="text-[#9194ac] text-sm">2,606,012 learners</span>
                                </li>
                                <li>
                                    <a href="" className="flex items-center font-bold text-base lg:text-lg text-[#6d28d2]" onClick={e => handleSkillClick(e, 'Microsoft Power BI Courses')}>Microsoft Power BI Courses
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                    <span className="text-[#9194ac] text-sm">4,698,618 learners</span>
                                </li>
                                <li>
                                    <a href="" className="flex items-center font-bold text-base lg:text-lg text-[#6d28d2]" onClick={e => handleSkillClick(e, 'Project Management')}>Project Management
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 7L15 12L10 17" stroke="#6d28d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                    <span className="text-[#9194ac] text-sm">4,031,434 learners</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <StoriesSlider />    
        </section>
    )
}
  