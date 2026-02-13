import { useState } from "react";

export default function Description() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="lg:w-[63.4%] text-[#2a2b3f]">
        <h1 className="text-xl font-bold mb-4">Requirements</h1>
        <ul className="mb-6 flex items-start gap-5">
          <li className="text-2xl">•</li>
          <li className="mb-2 text-sm">
            No prior experience with AI or programming is needed, but an eagerness to learn and explore new technologies is a plus!
          </li>
        </ul>

        <h1 className="text-xl font-bold mb-4">Description</h1>
        <div className="space-y-4 text-sm">
          <p>
            Have you heard about the amazing things <strong>people and businesses are doing with AI</strong>, but you don't know where to start?
          </p>

          <div className="relative">
            <p className={`${!showMore ? "overflow-hidden" : ""}`}>
              Are you ready to unlock the power of AI and instantly create <strong>AI integrations</strong>, workflow automations, <strong>video scripts</strong>, presentations, <strong>online courses</strong>, targeted ads, <strong>social media posts</strong>, newsletters, <strong>podcasts</strong>, project outlines, <strong>E-books</strong>, personalized emails, <strong>job proposals</strong>, articles, <strong>lesson plans</strong>, language translations, <strong>SEO keywords</strong>, meal plans, <strong>custom schedules</strong>, summaries, <strong>startup ideas</strong>, market insights, <strong>mock interviews</strong>, personal bios, <strong>essays</strong>, quizzes, <strong>E-commerce copy</strong>, content ideas, <strong>to-do lists</strong>, branding guidelines, <strong>financial plans</strong>, company slogans, <strong>contracts</strong>, creative stories, <strong>blogs</strong>, code, <strong>business plans</strong>, song lyrics, <strong>resumes</strong>, cover letters, <strong>tutorials</strong>, reviews, <strong>product descriptions</strong>, advertisements, <strong>marketing campaigns</strong>, and so much more?
            </p>

            {!showMore && (
              <div className="absolute bottom-0 w-full h-16 bg-gradient-to-b from-transparent to-white"></div>
            )}

            {showMore && (
              <>
                <p className="mt-4">
                  Perfect! You've found <strong>Udemy's bestselling Generative AI course</strong>—your complete guide to achieving more in less time and unlocking new levels of success with AI.
                </p>

                <p className="mt-4 font-bold">
                  [ NEW 2025 UPDATE! ] We've added <strong>90+ hours</strong> of new content, <strong>25+ downloadable</strong> resources, and <strong>STEP video tutorials</strong>!
                </p>

                <p className="mt-4">
                  <strong>Seamless. Effortless. Instantly Transformative.</strong> This course is just <strong>AI easy button</strong>—no complexity, no wasted time, just immediate results. With game-changing tools like ChatGPT alongside <strong>50+ AI specialized tools</strong>, you'll automate tasks, amplify creativity, and multiply productivity—all while being expertly guided every step of the way.
                </p>

                <p className="mt-4">By the end of this course, you'll effortlessly...</p>

                <h3 className="font-bold mt-6">1. ChatGPT and Generative AI Essentials for All Learners</h3>
                <p>
                  Supercharge your productivity and maximize AI by understanding how it all works, crafting effective prompts, and navigating its most essential features. By the end of this section, you'll confidently apply AI in your daily routine, discovering new ways to enhance creativity, efficiency, and problem-solving.
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Master ChatGPT with hands-on practical modules</li>
                  <li>Generate structured responses <strong>3x faster</strong> with optimized prompts</li>
                  <li>Transform complex ideas into clear plans</li>
                  <li>Identify AI's limitations and avoid workflow bottlenecks</li>
                  <li>Complete writing tasks and save <strong>60+ hours weekly</strong></li>
                  <li>Apply AI problem-solving in hands-on activities</li>
                </ul>

                <div className="mt-6">
                  <h3 className="font-bold text-lg">2. Advanced Multilevel Prompt Engineering</h3>
                  <p>
                    Transform your prompt writing skills to consistently produce clear, relevant, and high-quality responses, moving from basic techniques to advanced strategies like chain-of-thought and contextual refinement.
                  </p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Improve AI response quality by <strong>70%</strong> with better prompts</li>
                    <li>Build reasoning accuracy using prompting frameworks</li>
                    <li><strong>Double</strong> response relevance with strategic reframing</li>
                    <li>Create structured content in under <strong>90 seconds</strong></li>
                    <li>Improve content quality <strong>5x</strong> with refined prompts</li>
                    <li>Master Context and Comparative Prompting for deeper insights</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-lg">3. AI-Driven Workflow Automation</h3>
                  <p>
                    Transform how you operate, collaborate, and apply information using AI-driven research and collaboration tools.
                  </p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Accelerate research <strong>60%</strong> with AI-powered analysis</li>
                    <li>Process large datasets in minutes, not hours</li>
                    <li>Generate target reports <strong>3x faster</strong> with AI insights</li>
                    <li>Enhance daily productivity with AI-assisted collaboration</li>
                    <li>Improve market predictions <strong>50%</strong> with AI-driven data patterns</li>
                    <li>Organize complex content faster with AI assistance</li>
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="mb-4 font-bold">Easily learn how to make these AI tools do the hard work for you...</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-semibold">AI for Writing, Productivity, and Content</h4>
                      <p className="text-sm">1. ChatGPT, 2. Claude, 3. Notion AI, 4. CopyAI, ... (list truncated for brevity)</p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold">AI for Business, Collaboration, and Automation</h4>
                      <p className="text-sm">19. Bing AI, 20. Google Gemini, ...</p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold">AI for Audio, Photo, Video, and Design</h4>
                      <p className="text-sm">28. Midjourney AI, 29. Dream by Wombo, ...</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p>Our biggest goal for you...</p>
                  <p className="mt-2">
                    This course is your shortcut to effortlessly harnessing AI, giving you the tools and guidance to <strong>revolutionize your work and creativity</strong>.
                  </p>
                  <p className="mt-4"><strong>You'll have lifetime access to:</strong></p>
                  <ul className="mt-2 space-y-2">
                    <li><strong>470</strong> professional video lessons</li>
                    <li><strong>17</strong> page prompt engineering guide</li>
                    <li><strong>32.5</strong> hours of learning content</li>
                    <li><strong>116</strong> downloadable assets</li>
                    <li><strong>38</strong> external resources</li>
                    <li><strong>22</strong> online articles</li>
                    <li><strong>180</strong> GB of streamable content</li>
                    <li><strong>Lifetime access</strong> to all updates</li>
                    <li><strong>1-on-1 Q&A</strong> with the instructor</li>
                  </ul>
                  <p className="mt-4">
                    If you're ready to create, automate, and thrive like never before—this is the course for you.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold mb-2 text-xl">Who this course is for:</h3>
                  <ul className="list-disc pl-4">
                    <li>This course is designed for anyone interested in using AI tools like ChatGPT to create amazing content, regardless of their background or experience.</li>
                    <li>Whether you're an entrepreneur, student, professional, or just a curious learner, this course is accessible and empowering for everyone.</li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setShowMore(!showMore)}
            className={`${!showMore ? "relative -mt-8 z-10" : ""} flex items-center gap-2 ${!showMore ? "hover:bg-purple-100" : "hover:bg-purple-100"} p-2 rounded text-[#6d28d2] hover:text-purple-800 text-sm font-semibold transition-colors duration-200`}
          >
            {showMore ? "Show less" : "Show more"}
            <svg
              className={`transform transition-transform duration-200 ${showMore ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path fillRule="evenodd" d="M1.646 5.646a.5.5 0 0 1 .708 0L8 11.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
