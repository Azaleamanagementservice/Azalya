import React from 'react';
import Mainlayout from '../Section/Mainlayout';
import Hero from '../Section/Hero';
import Contactsection from '../Section/Contactsection';
import { memo } from 'react';
import FaqSection from '../Section/FaqSection';
import { useDispatch } from 'react-redux';

const CooperativeHousingSocietyManagementPage = () => {
    const disp=useDispatch()
     const toggleOpen = () => {
    disp({ type: "open" });
  };
  return (
    <Mainlayout>
      {/* Hero Section - Enhanced with engaging visuals */}
      <Hero
        isHomepage={false}
        heading="Cooperative Housing Society Management"
        paragraph="Efficient management solutions for cooperative housing societies. Streamline finances, maintenance, security, and community welfare to ensure smooth operations and resident satisfaction."
        backgroundImage="url('/path-to-attractive-housing-society-image.jpg')" // Add a relevant background image for visual appeal (replace with actual path)
        ctaButtonText="Get Started Today"
        ctaButtonLink="/contact"
      />

      {/* Service Overview Section - Attractive with animations */}
      <section className="bg-[#f2e9df] text-green-900 px-6 py-10 md:py-20 animate-fadeIn">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6 tracking-wide">
            Complete Society Management Solutions
          </h2>
          <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto italic">
            Our specialized services support cooperative housing societies with comprehensive management of finances, infrastructure, security, and community activities for transparent and efficient operations.
          </p>
        </div>
      </section>

      {/* Key Features Section - With icons and hover effects */}
      <section className="bg-white text-green-900 px-6 py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6">
              Key Management Features
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💼",
                title: "Finance Management",
                description: "Handle maintenance collections, expenditures, audits, and budgeting efficiently"
              },
              {
                icon: "🏗️",
                title: "Infrastructure Maintenance",
                description: "Regular repairs, amenities upkeep, and construction oversight"
              },
              {
                icon: "👥",
                title: "Staff & Vendor Management",
                description: "Coordinate services like cleaning, plumbing, and vendor tracking"
              },
              {
                icon: "🛡️",
                title: "Security Management",
                description: "Gate security, CCTV monitoring, and resident safety protocols"
              },
              {
                icon: "🎉",
                title: "Community Welfare",
                description: "Organize events, festivals, and cultural activities for residents"
              },
              {
                icon: "📝",
                title: "Complaint & Bill Management",
                description: "Online tracking of complaints, bills, and payments"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-[#f2e9df] p-6 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#187530]">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Numbered with animations */}
      <section className="bg-[#f2e9df] text-green-900 px-6 py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6">
              Our Society Management Process
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Committee Formation",
                description: "Elect management committee including president, secretary, and treasurer"
              },
              {
                step: "02",
                title: "Planning & Budgeting",
                description: "Prepare annual programs, budgets, and activity schedules"
              },
              {
                step: "03",
                title: "Operations Management",
                description: "Handle daily finances, maintenance, and resident services"
              },
              {
                step: "04",
                title: "Review & Reporting",
                description: "Conduct audits, meetings, and provide updates to members"
              }
            ].map((step, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg hover:shadow-md transition-all duration-300 animate-slideUp" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="bg-green-900 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#187530]">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - With checkmarks and hover effects */}
      <section className="bg-white text-green-900 px-6 py-10 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6">
              Why Choose Our Society Management?
            </h2>
            <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto">
              Enjoy affordability, security, and community harmony through effective cooperative management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Cost-effective shared expenses and maintenance",
              "Enhanced security with community oversight",
              "Shared responsibilities for efficient operations",
              "Better facilities and amenities management",
              "Promotes community living and social harmony",
              "Equitable ownership and decision-making",
              "Legal protection and transparent governance",
              "Sensible long-term investment opportunities"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center bg-[#f2e9df] p-4 rounded-lg hover:bg-green-100 transition-colors duration-300">
                <div className="bg-green-900 text-white rounded-full w-6 h-6 flex items-center justify-center mr-4 flex-shrink-0 text-sm">
                  ✓
                </div>
                <span className="text-gray-600 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section - Grid with shadows */}
      <section className="bg-[#f2e9df] text-green-900 px-6 py-10 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6">
            Advanced Digital Tools for Society Management
          </h2>
          <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto mb-12">
            Utilize modern software for seamless society operations and resident engagement.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Online bill and payment management",
              "Digital complaint tracking system",
              "Cloud-based accounting and reporting",
              "Mobile apps for notices and events",
              "Automated security and visitor management",
              "Member communication portals"
            ].map((tech, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-green-900 font-semibold text-center">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Consultation Section - Prominent CTA */}
      <section className="bg-green-900 text-white px-6 py-10 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Get a Free Consultation
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Ready to streamline your cooperative housing society management? Schedule a free consultation with our experts and discover tailored solutions for efficient operations and resident satisfaction.
          </p>
          <a 
        onClick={toggleOpen}
            className="bg-white cursor-pointer hover:bg-[#c89d47]  text-green-900 px-8 py-4 rounded-full font-bold text-lg hover:text-white transition-all duration-300"
          >
            Book Your Consultation Now
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Contact Section */}
      <Contactsection shouldMapShow={true} />
    </Mainlayout>
  );
};

export default memo(CooperativeHousingSocietyManagementPage);
