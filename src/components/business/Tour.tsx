

export default function Tour() {
  return (
    <div className="bg-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex gap-10">
                <div className="pt-[72px]">
                    <img src="/assets/module-product-tour-perspective-v2-1200x667.webp" alt="Tour" />
                </div>
                <div className="py-[72px] text-white">
                    <h2 className="text-5xl mb-5 leading-tight">
                        Tour the Udemy Business Platform
                    </h2>
                    <p className="text-lg mb-8">
                        Take the interactive tour to see how our platform can transform the way your team learns and grows.
                    </p>
                    <a href="/tour" className="px-3 py-2 text-sm text-white font-bold border border-solid border-white rounded hover:bg-[#4435bb]">
                        Start Tour
                    </a>
                </div>
            </div>

        </div>
    </div>
  );
}