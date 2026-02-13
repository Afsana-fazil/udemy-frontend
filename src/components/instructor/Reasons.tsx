import React from "react";

const Reasons: React.FC = () => (
  <div className="text-[#2a2b3f]">
    <section className="bg-white py-20 text-center">
      <h2 className="text-5xl font-serif font-bold mb-0">So many reasons to start</h2>
      <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-32 mt-12">
        {/* Feature 1 */}
        <div className="max-w-xs mx-auto md:mx-0 flex flex-col items-center">
          <img src="/assets/value-prop-teach-v3.jpg" alt="Value Prop Teach" className="w-24 h-24" />
          <h3 className="font-bold text-lg">Teach your way</h3>
          <p className="mt-1">
            Publish the course you want, in the way you want, and always have control of your own content.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="max-w-xs mx-auto md:mx-0 flex flex-col items-center">
          <img src="/assets/value-prop-inspire-v3.jpg" alt="Value Prop Inspire" className="w-24 h-24" />
          <h3 className="font-bold text-lg">Inspire learners</h3>
          <p className="mt-1">
            Teach what you know and help learners explore their interests, gain new skills, and advance their careers.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="max-w-xs mx-auto md:mx-0 flex flex-col items-center">
          <img src="/assets/value-prop-get-rewarded-v3.jpg" alt="Value Prop Get Rewarded" className="w-24 h-24" />
          <h3 className="font-bold text-lg">Get rewarded</h3>
          <p className="mt-1">
            Expand your professional network, build your expertise, and earn money on each paid enrollment.
          </p>
        </div>
      </div>
    </section>
    <div className="bg-[#5624d0] w-full text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-24 py-12">
            <div className="text-center">
                <div className="font-bold text-5xl mb-2">80M</div>
                <div className="text-base">Students</div>
            </div>
            <div className="text-center">
                <div className="font-bold text-5xl mb-2">75+</div>
                <div className="text-base">Languages</div>
            </div>
            <div className="text-center">
                <div className="font-bold text-5xl mb-2">1.1B</div>
                <div className="text-base">Enrollments</div>
            </div>
            <div className="text-center">
                <div className="font-bold text-5xl mb-2">180+</div>
                <div className="text-base">Countries</div>
            </div>
            <div className="text-center">
                <div className="font-bold text-5xl mb-2">17,200+</div>
                <div className="text-base">Enterprise customers</div>
            </div>
        </div>
    </div>
  </div>
);

export default Reasons;
