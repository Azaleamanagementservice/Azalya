import { useNavigate } from "react-router-dom";
import service1 from "../assets/Service/Image 1.jpeg";
import service2 from "../assets/Service/image 2.jpeg";
import service3 from "../assets/Service/image 3.jpeg";

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
              title: "NRI Property Inventory Management ",
              desc: "End-to-end inventory documentation, valuation, and digitization for NRIs. Transparent reporting, chain-of-custody clarity, and dispute-ready evidence.",
              path: "/services/nri-property-inventory-management",
            },
            {
              img: service2,
              title: "Post Sales Services Support for Developers ",
              desc: "Seamless handovers, snag lists, documentation, and customer communication. Reduce post-handover friction and enhance brand trust.",
              path: "/services/post-sales-services",
            },
            {
              img: service3,
              title: "Cooperative Housing Society Management ",
              desc: "AGM support, compliance, vendor management, and transparent record-keeping. Structure, accountability, and peace of mind for CHS committees.",
              path: "/services/cooperative-housing-society-management",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl shadow-md hover:scale-105 duration-500 transition-all cursor-pointer"
            >
              <img
                src={item.img}
                loading="lazy"
                alt={item.title}
                className="rounded-xl mb-4 h-48 w-full object-cover "
              />
              <h3 className="font-bold text-xl text-green-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700">{item.desc}</p>
              {props?.isServiceDisplay && (
                <div className="mt-5">
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
                <div className="mt-5">
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
          ))}
        </div>
      </section>
    </section>
  );
};

export default memo(Servicesection);
