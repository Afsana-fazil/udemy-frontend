"use client";
import { useRouter } from "next/navigation";
import SubscriptionPlans from '../data/SubscriptionPlans.json';

export default function Plans() {
  const router = useRouter();

  return (
    <section className="w-[80%] mx-auto py-10">
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#2a2b3f] my-1.5">
          Accelerate growth — for you or your organization
        </h2>
        <p className="font-sans text-sm xs:text-base text-[#595c73]">
          Reach goals faster with one of our plans or programs. Try one free today or contact sales to learn more.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-10">
        {SubscriptionPlans.map((plan, index) => (
          <div key={index} className="border border-solid border-[#d1d2e0] rounded-lg w-full md:w-1/3">
            <div
              className={`border-solid rounded-lg border-t-8 ${
                index === 0 ? 'border-[#a435f0]' : 'border-[#5022c3]'
              }`}
            >
              <div className='bg-gray-100 p-6'>
                <h3 className="text-xl font-serif font-bold text-[#2a2b3f]">{plan.name}</h3>
                <p className="text-xs text-[#595c73]">{plan.subtitle}</p>
                <span className="flex gap-2 items-center mt-2">
                  <img src={plan.icon} alt="avatar icon" className='w-5 h-5 scale-x-[-1]' />
                  <p className='text-sm mt-1 text-[#595c73]'>{plan.audience}</p>
                </span>
              </div>
              <div className='px-6'>
                <p className="mt-4 font-semibold text-[#2a2b3f]">{plan.price}</p>
                {plan.note && (
                  <p className="text-xs text-[#595c73]">{plan.note}</p>
                )}
                <button 
                  onClick={() => router.push("/demo")}
                  className="bg-[#6d28d2] text-white font-semibold mt-4 mb-6 px-4 py-2 rounded-md w-full hover:bg-[#6d0fb8] transition flex gap-2 justify-center items-center"
                >
                  {plan.ctaText}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" stroke="#fff" strokeWidth="0.7" />
                    </svg>
                </button>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-[#2a2b3f] px-6 pb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mt-1 flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="15px" height="15px">
                      <path fill="#fff" d="M15,28.5C7.6,28.5,1.5,22.4,1.5,15S7.6,1.5,15,1.5S28.5,7.6,28.5,15S22.4,28.5,15,28.5z"/>
                      <path stroke="#206241" d="M15,2c7.2,0,13,5.8,13,13s-5.8,13-13,13S2,22.2,2,15S7.8,2,15,2 M15,1C7.3,1,1,7.3,1,15s6.3,14,14,14 s14-6.3,14-14S22.7,1,15,1L15,1z"/>
                      <path fill="#206241" d="M12.8 20.8L7.8 15.7 9.2 14.3 12.8 17.9 21.8 8.9 23.2 10.4z"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
