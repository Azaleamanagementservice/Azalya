import { useNavigate } from "react-router-dom";
import service1 from "../assets/Service/Image 1.jpeg";
import service2 from "../assets/Service/image 2.jpeg";
import service3 from "../assets/Service/image 3.jpeg";
import { FaGlobe, FaShieldAlt, FaHome } from "react-icons/fa";
import { memo } from "react";

const Servicesection = (props) => {
  const nav = useNavigate();
  return (
    <section>
      {/* hero */}

      {/* Services Section */}
      <section
        className="bg-[#F2E9DC] px-6 py-10 md:py-20 text-center"
        id="services"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-2">
            Our Services
          </h2>
          <p className="text-gray-700 mb-12 text-base">
            Elevating and Empowering Your Business with Customized, Innovative,
            and Strategic Solutions Designed for Success
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              img: service1,
              icon: FaGlobe,
              title: "NRI 1st",
              subtitle:
                "Smart property inventory care for NRIs  secure, documented, and dispute-ready.",
              desc: "Complete Inventory Management for NRIs  End-to-end property documentation, valuation, and digitization designed for NRIs. With transparent reporting, chain-of-custody clarity, and dispute-ready evidence, we protect your assets while ensuring peace of mind across borders.",
              path: "/services/nri-property-inventory-management",
            },
            {
              img: service2,
              icon: FaShieldAlt,
              title: "Azalea Assurance",
              subtitle:
                "Post-sales support for developers  smooth handovers, happy customers.",
              desc: "Post-Sales Support for Developers  Seamless handovers, detailed snag lists, precise documentation, and proactive customer communication  all designed to reduce post-handover friction and strengthen brand trust. We ensure every transition from possession to satisfaction is smooth, structured, and reputation-enhancing.",
              path: "/services/post-sales-services",
            },
            {
              img: service3,
              icon: FaHome,
              title: "Azalea Harmony",
              subtitle:
                "End-to-end society management  structured, transparent, and community-focused.",
              desc: "Comprehensive Society Management Services  Seamless governance for cooperative housing societies  from AGM facilitation and compliance oversight to vendor coordination and transparent record-keeping. We deliver structure, clarity, and harmony to community living.",
              path: "/services/cooperative-housing-society-management",
            },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl shadow-md hover:scale-105 duration-500 transition-all cursor-pointer text-left"
            >
              <img
                src={item.img}
                loading="lazy"
                alt={item.title}
                className="rounded-xl mb-4 h-48 w-full object-cover "
              />
              <div className="mb-2 text-left">
                <div className="flex items-center gap-3">
                  {IconComponent && (
                    <IconComponent className="text-2xl text-[#187530] flex-shrink-0" />
                  )}
                  <h3 className="font-bold text-xl text-green-900 m-0">
                    {item.title}
                  </h3>
                </div>
                {item.subtitle && (
                  <p className="text-base font-semibold text-[#187530] leading-snug mt-1">
                    {item.subtitle}
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-700">{item.desc}</p>
              {props?.isServiceDisplay && (
                <div className="mt-5 text-center">
                  <button
                    className="bg-green-900 text-white p-2.5 px-8 text-base cursor-pointer duration-300 transition-all hover:bg-[#c89d47] font-semibold rounded-full"
                    onClick={() => {
                      nav("/services");
                    }}
                  >
                    Explore More
                  </button>
                </div>
              )}
              {props?.isServiceNavigation && (
                <div className="mt-5 text-center">
                  <button
                    className="bg-green-900 text-white p-2.5 px-8 text-base cursor-pointer duration-300 transition-all hover:bg-[#c89d47] font-semibold rounded-full"
                    onClick={() => {
                      nav(item.path);
                    }}
                  >
                    Read More
                  </button>
                </div>
              )}
            </div>
          );
          })}
        </div>
      </section>
    </section>
  );
};

export default memo(Servicesection);
