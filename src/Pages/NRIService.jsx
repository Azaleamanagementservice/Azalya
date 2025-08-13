import React from "react";
import Mainlayout from "../Section/Mainlayout";
import Hero from "../Section/Hero";
import Contactsection from "../Section/Contactsection";
import { memo } from "react";
import FaqSection from "../Section/FaqSection";
import { useDispatch } from "react-redux";

const NRIPropertyInventoryPage = () => {
  const disp = useDispatch();
  const toggleOpen = () => {
    disp({ type: "open" });
  };
  return (
    <Mainlayout>
      {/* Hero Section - Enhanced with more engaging visuals */}
      <Hero
        isHomepage={false}
        heading="NRI Property Inventory Management"
        paragraph="Comprehensive property inventory solutions for Non-Resident Indians. Professional documentation, regular inspections, and detailed reporting to keep your Indian property investments secure and well-maintained."
        // Assuming Hero component supports background images or additional props for attractiveness
        backgroundImage="url('/path-to-attractive-property-image.jpg')" // Add a relevant background image for visual appeal (replace with actual path)
        ctaButtonText="Get Started Today" // Add a CTA button to attract users
        ctaButtonLink="/contact" // Link to contact for immediate engagement
      />

      {/* Service Overview Section - Made more attractive with subtle animations and centered content */}
      <section className="bg-[#f2e9df] text-green-900 px-6 py-10 md:py-20 animate-fadeIn">
        {" "}
        {/* Added fade-in animation for engagement */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6 tracking-wide">
            Complete Property Inventory Solutions
          </h2>
          <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto italic">
            {" "}
            {/* Italic for emphasis */}
            Our specialized NRI Property Inventory Management service provides
            detailed documentation and regular monitoring of your property
            assets in India, ensuring transparency and peace of mind from
            anywhere in the world.
          </p>
        </div>
      </section>

      {/* Key Features Section - Enhanced with hover effects and icons for better user attraction */}
      <section className="bg-white text-green-900 px-6 py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6">
              Comprehensive Inventory Features
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📋", // Added emoji icons for visual appeal (can replace with actual icons)
                title: "Detailed Property Documentation",
                description:
                  "Comprehensive inventory of all fixtures, fittings, and amenities with professional cataloging",
              },
              {
                icon: "🔍",
                title: "Regular Inspection Reports",
                description:
                  "Monthly and quarterly property condition assessments with photographic evidence",
              },
              {
                icon: "📱",
                title: "Digital Asset Tracking",
                description:
                  "Advanced photo documentation and digital cataloging system for easy access",
              },
              {
                icon: "🛠️",
                title: "Maintenance Scheduling",
                description:
                  "Proactive maintenance alerts and scheduling to preserve property value",
              },
              {
                icon: "🏠",
                title: "Tenant Handover Management",
                description:
                  "Complete inventory management during tenant transitions and lease agreements",
              },
              {
                icon: "🛡️",
                title: "Insurance Documentation",
                description:
                  "Detailed records for insurance claims and coverage verification support",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#f2e9df] p-6 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {" "}
                {/* Enhanced hover effects */}
                <div className="text-4xl mb-3">{feature.icon}</div>{" "}
                {/* Icon for attraction */}
                <h3 className="text-xl font-bold mb-3 text-[#187530]">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Added numbering with colors and animations */}
      <section className="bg-[#f2e9df] text-green-900 px-6 py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6">
              Our Inventory Management Process
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Initial Property Assessment",
                description:
                  "Comprehensive survey and documentation of current property status and condition",
              },
              {
                step: "02",
                title: "Digital Cataloging",
                description:
                  "Creating detailed digital inventory with high-resolution photographs and descriptions",
              },
              {
                step: "03",
                title: "Regular Monitoring",
                description:
                  "Scheduled inspections and real-time condition updates with detailed reporting",
              },
              {
                step: "04",
                title: "Reporting & Updates",
                description:
                  "Monthly comprehensive reports with recommendations and immediate alerts",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center bg-white p-6 rounded-lg hover:shadow-md transition-all duration-300 animate-slideUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {" "}
                {/* Staggered animation */}
                <div className="bg-green-900 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#187530]">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Made more attractive with checkmarks and responsive grid */}
      <section className="bg-white text-green-900 px-6 py-10 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6">
              Why Choose Our NRI Inventory Management?
            </h2>
            <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto">
              Experience peace of mind with our comprehensive property
              management solutions designed specifically for Non-Resident
              Indians.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Complete transparency and detailed documentation",
              "Regular professional property condition monitoring",
              "Comprehensive inspection reports with photographs",
              "Insurance claim support and documentation assistance",
              "Tenant accountability and handover management",
              "Property value preservation through preventive care",
              "Remote property oversight from anywhere in the world",
              "Legal compliance documentation and record keeping",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center bg-[#f2e9df] p-4 rounded-lg hover:bg-green-100 transition-colors duration-300"
              >
                {" "}
                {/* Hover color change */}
                <div className="bg-green-900 text-white rounded-full w-6 h-6 flex items-center justify-center mr-4 flex-shrink-0 text-sm">
                  ✓
                </div>
                <span className="text-gray-600 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section - Enhanced with grid and subtle shadows */}
      <section className="bg-[#f2e9df] text-green-900 px-6 py-10 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6">
            Advanced Digital Solutions
          </h2>
          <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto mb-12">
            We leverage cutting-edge technology to provide comprehensive
            property inventory management services for NRI property owners
            worldwide.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Digital inventory management system",
              "Real-time photo documentation platform",
              "Cloud-based reporting and access portal",
              "Mobile inspection applications",
              "Automated alert and notification systems",
              "Secure data storage and backup solutions",
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-green-900 font-semibold text-center">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Get Consultation Section - Added for user attraction with CTA */}
      <section className="bg-green-900 text-white px-6 py-10 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Get a Free Consultation
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Ready to secure your property investments? Schedule a free
            consultation with our experts today and discover how our NRI
            Property Inventory Management can give you complete peace of mind.
          </p>
          <a
            onClick={toggleOpen}
            className="bg-white cursor-pointer hover:bg-[#c89d47] text-green-900 px-8 py-4 rounded-full font-bold text-lg  hover:text-white transition-all duration-300"
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

export default memo(NRIPropertyInventoryPage);
