import { memo } from "react";
import AboutImage from "../assets/About/Image2.jpg";
import Hero from "./Hero";

const AboutSection = () => {
  return (
    <>
      {/* Hero */}

      {/* About Company */}
      <section className="bg-[#f2e9df] px-4 py-12 md:py-16 lg:py-20" id="about">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-4">
              About Us
            </h2>
            <div className="w-20 h-1 bg-[#187530] mx-auto mb-6"></div>
            <p className="text-base text-gray-700 leading-relaxed max-w-3xl mx-auto mb-4">
              Azalea Management Services LLP offers complete real estate and
              community living solutions—from post-sales property management to
              NRI care and cooperative society administration.
            </p>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Guided by our core values of <span className="text-[#187530] font-semibold">clarity</span>, <span className="text-[#187530] font-semibold">care</span>, and <span className="text-[#187530] font-semibold">accountability</span>, we ensure every client receives transparent, compassionate, and reliable service.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Content Section */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {/* Origin Story */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#187530] to-[#0f5a1f] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">1</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-[#187530] mb-4">
                        Our Origin Story
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-base">
                        Founded to bridge the gap between property owners and seamless management, 
                        Azalea emerged from recognizing the unique challenges faced by NRIs, 
                        developers, and housing societies. Our experienced founders established 
                        Azalea to provide reliable, professional services that property owners 
                        can truly depend on, regardless of their location.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission & Vision Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Mission */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#187530] to-[#0f5a1f] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">2</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#187530] mb-4">
                          Our Mission
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-base">
                          To deliver reliable, transparent, and efficient real estate and 
                          community services that empower clients and enhance property value.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vision */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#187530] to-[#0f5a1f] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">3</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#187530] mb-4">
                          Our Vision
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-base">
                          To redefine real estate care by setting new benchmarks in 
                          innovation, quality, and client satisfaction across India.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Pillars */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#187530] to-[#0f5a1f] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">4</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-[#187530] mb-2">
                        What Sets Us Apart
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Our core differentiators that make us the trusted choice
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Transparency */}
                    <div className="text-center p-4 rounded-xl bg-gradient-to-b from-green-50 to-white border border-green-100">
                      <div className="w-16 h-16 bg-[#187530] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-[#187530] text-lg mb-2">Transparency</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Complete visibility with regular updates and open communication channels
                      </p>
                    </div>

                    {/* Structure */}
                    <div className="text-center p-4 rounded-xl bg-gradient-to-b from-green-50 to-white border border-green-100">
                      <div className="w-16 h-16 bg-[#187530] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-[#187530] text-lg mb-2">Structure</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Systematic approach with standardized procedures and organized workflows
                      </p>
                    </div>

                    {/* Trust */}
                    <div className="text-center p-4 rounded-xl bg-gradient-to-b from-green-50 to-white border border-green-100">
                      <div className="w-16 h-16 bg-[#187530] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-[#187530] text-lg mb-2">Trust</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Built on integrity and accountability with highest ethical standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-2">
              <div className="sticky top-8">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                  loading="lazy"
                    src={AboutImage}
                    alt="About Azalea Management Services - Professional Property Management"
                    className="w-full h-80 lg:h-[810px] object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                
                {/* Stats or Additional Info Card */}
                <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="border-r border-gray-200">
                      <div className="text-2xl font-bold text-[#187530]">500+</div>
                      <div className="text-sm text-gray-600">Properties Managed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#187530]">100%</div>
                      <div className="text-sm text-gray-600">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(AboutSection);
