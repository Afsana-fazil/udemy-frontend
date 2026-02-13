import Languages from "../ui/Languages"
import { useRouter } from 'next/navigation';

export default function Footer() {
    const router = useRouter();
    // Helper for clickable tags
    const handleTagClick = async (e: React.MouseEvent<HTMLAnchorElement>, tag: string) => {
        e.preventDefault();
        
        try {
            // First, try to find courses by subcategory
            const categoriesRes = await fetch('/api/main-categories/');
            const categories = await categoriesRes.json();
            
            // Try to match tag with subcategory names
            let matchingSubcategory = null;
            for (const category of categories) {
                if (category.subcategories && Array.isArray(category.subcategories)) {
                    matchingSubcategory = category.subcategories.find((sub: any) => 
                        sub.name.toLowerCase().includes(tag.toLowerCase()) ||
                        tag.toLowerCase().includes(sub.name.toLowerCase())
                    );
                    if (matchingSubcategory) break;
                }
            }
            
            if (matchingSubcategory) {
                // Fetch courses by subcategory
                const coursesRes = await fetch(`/api/courses/?subcategory=${matchingSubcategory.slug}`);
                const courses = await coursesRes.json();
                
                if (courses && courses.length > 0) {
                    // Navigate to the first course found
                    router.push(`/courses/${courses[0].id}`);
                    return;
                }
            }
            
            // Fallback: search by title
            const res = await fetch('/api/courses/');
            const data = await res.json();
            const course = data.find((c: any) => c.title.toLowerCase().includes(tag.toLowerCase()));
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
        <footer className="bg-[#1d1e27] text-white">
            <section className="flex-col flex lg:flex-row items-center justify-between px-14 py-5 border-b border-t border-solid border-[#b7b9cd]">
                <h5 className="text-base xs:text-lg font-bold mb-6 lg:mb-0 text-center lg:text-start">Top companies choose <a href="/business" target="_blank" className="text-base xs:text-lg font-bold text-[#c0c4fc]">Udemy Business</a> to build in-demand career skills.</h5>
                <ul className="flex items-center gap-10">
                    <li>
                        <img src="/assets/nasdaq-light.svg" alt="nasdaq-light" />
                    </li>
                    <li>
                        <img src="/assets/volkswagen-light.svg" alt="volkswagen-light" />

                    </li>
                    <li>
                        <img src="/assets/netapp-light.svg" alt="netapp-light" />

                    </li>
                    <li>
                        <img src="/assets/eventbrite-light.svg" alt="eventbrite-light" />

                    </li>
                </ul>
            </section>

            <section className="px-14 pt-10 pb-6">
                <h3 className="text-xl font-serif font-semibold tracking-wide mb-10">Explore top skills and certifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-10">
                    <div>
                        <h3 className="font-bold text-md mb-4">In-demand Careers</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Data Scientist')}>Data Scientist</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Full Stack Web Developer')}>Full Stack Web Developer</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Cloud Engineer')}>Cloud Engineer</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Project Manager')}>Project Manager</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Game Developer')}>Game Developer</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Career Accelerators')}>See all Career Accelerators</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-md mb-4">Web Development</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Web Development')}>Web Development</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'JavaScript')}>JavaScript</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'React JS')}>React JS</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Angular')}>Angular</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Java')}>Java</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-md mb-4">IT Certifications</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Amazon AWS')}>Amazon AWS</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'AWS Certified Cloud Practitioner')}>AWS Certified Cloud Practitioner</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'AZ-900: Microsoft Azure Fundamentals')}>AZ-900: Microsoft Azure Fundamentals</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'AWS Certified Solutions Architect - Associate')}>AWS Certified Solutions Architect - Associate</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Kubernetes')}>Kubernetes</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-md mb-4">Leadership</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Leadership')}>Leadership</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Management Skills')}>Management Skills</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Project Management')}>Project Management</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Personal Productivity')}>Personal Productivity</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Emotional Intelligence')}>Emotional Intelligence</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-md mb-4">Certifications by Skill</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Cybersecurity Certification')}>Cybersecurity Certification</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Project Management Certification')}>Project Management Certification</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Cloud Certification')}>Cloud Certification</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Data Analytics Certification')}>Data Analytics Certification</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'HR Management Certification')}>HR Management Certification</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Certifications')}>See all Certifications</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-md mb-4">Data Science</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Data Science')}>Data Science</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Python')}>Python</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Machine Learning')}>Machine Learning</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'ChatGPT')}>ChatGPT</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Deep Learning')}>Deep Learning</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-md mb-4">Communication</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Communication Skills')}>Communication Skills</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Presentation Skills')}>Presentation Skills</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Public Speaking')}>Public Speaking</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Writing')}>Writing</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'PowerPoint')}>PowerPoint</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-md mb-4">Business Analytics & Intelligence</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Microsoft Excel')}>Microsoft Excel</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'SQL')}>SQL</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Microsoft Power BI')}>Microsoft Power BI</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Data Analysis')}>Data Analysis</a></li>
                            <li><a href="" className="text-white text-sm hover:underline" onClick={e => handleTagClick(e, 'Business Analysis')}>Business Analysis</a></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-[#111116]">
                <div className="px-14 pt-10 pb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-10 border-b border-solid border-[#b7b9cd]">
                    <div>
                        <h3 className="font-bold text-md mb-3">About</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline">About us</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Careers</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Contact us</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Blog</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Investors</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-md mb-3">Discover Udemy</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline">Get the app</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Teach on Udemy</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Plans and Pricing</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Affiliate</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Help and Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-md mb-3">Udemy for Business</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="/business" target="_blank" className="text-white text-sm hover:underline">Udemy Business</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-md mb-3">Legal & Accessibility</h3>
                        <ul className="flex flex-col gap-0.5">
                            <li><a href="" className="text-white text-sm hover:underline">Accessibility statement</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Privacy policy</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Sitemap</a></li>
                            <li><a href="" className="text-white text-sm hover:underline">Terms</a></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-[#111116]">
                <div className="px-14 py-7 md:flex justify-between items-center">
                    <div className="xs:flex gap-4 items-center">
                        <h1>
                            <a href="/"><img src="/assets/logo-udemy-inverted.svg" alt="logo-udemy" className="w-24" /></a>
                        </h1>
                        <p className="text-sm mt-2 xs:mt-0">&copy; 2025 Udemy, Inc.</p>
                    </div>
                    <div className="flex items-center gap-3 xs:gap-6 justify-center mt-8 md:mt-0">
                        <button className="text-sm">Cookie settings</button>
                        <Languages />
                    </div>

                </div>
            </section>
        </footer>
    )
  }
  