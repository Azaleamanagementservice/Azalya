import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import hero1 from "../assets/Hero/image1.jpg";
import hero2 from "../assets/Hero/image2.jpg";
import hero3 from "../assets/Hero/image3.jpg";

function Hero(props) {
  const data = [
    "Creating well-managed communities through trust and innovation.",
    "Empowering NRIs and developers with transparent, dispute-ready systems.",
    "Built on clarity, care, and accountability—Azalea is more than management.",
  ];

  // Meaningful image captions that align with Azalea's values and services
  const imageCaptions = [
    "Trust in Action - Building Communities Together",
    "Excellence in Property Management Solutions", 
    "Clarity, Care & Accountability - Our Foundation"
  ];

  const nav = useNavigate();
  const NavigateToService = () => {
    nav("/services");
  };

  return (
    <>
      {/* Hero Section with Auto Carousel and Green Text */}
      <section className="relative">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          showArrows={false}
          stopOnHover={false}
          swipeable={true}
          emulateTouch={true}
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
        >
          {[hero1, hero2, hero3].map((img, idx) => (
            <div key={idx} className="relative h-[80vh] md:h-[90vh] w-full">
              <img
                src={img}
                loading="lazy"
                alt={imageCaptions[idx]}
                className="object-cover w-full h-[80vh] md:h-[95vh] object-center"
              />

              {/* Bottom-to-top light gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>

              {/* Compact Text Card with reduced blur and drop shadow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-2 sm:px-4">
                <div className="bg-white/20 backdrop-blur-[1px] rounded-xl shadow-sm p-4 sm:p-6 md:p-8 w-[95vw] sm:w-[90vw] md:w-auto lg:max-w-3xl lg:mx-auto border border-white/20 drop-shadow-sm">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                    {data[idx]}
                  </h1>
                  <p className="text-gray-200 text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-6 leading-relaxed">
                    {imageCaptions[idx]}
                  </p>
                  {props?.isHomepage && (
                    <button
                      onClick={NavigateToService}
                      className="bg-[#187530] text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium cursor-pointer hover:bg-[#c89d47] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Explore More
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
}

export default memo(Hero);
