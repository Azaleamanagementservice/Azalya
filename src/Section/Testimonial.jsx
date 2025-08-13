import React, { useState, useEffect, memo } from "react";

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@SARAHJ_DEV",
      text: "This service completely transformed our business operations. The team's expertise and dedication are unmatched. Highly recommended!",
      rating: 5,
      avatar: "https://via.placeholder.com/40/10B981/FFFFFF?text=SJ",
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@MIKECHEN_TECH",
      text: "Outstanding results and professional service. They delivered exactly what they promised and exceeded our expectations.",
      rating: 5,
      avatar: "https://via.placeholder.com/40/10B981/FFFFFF?text=MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      handle: "@EMILY_DESIGNS",
      text: "Working with this team was a game-changer. Their innovative approach and attention to detail made all the difference.",
      rating: 5,
      avatar: "https://via.placeholder.com/40/10B981/FFFFFF?text=ER",
    },
    {
      id: 4,
      name: "David Wilson",
      handle: "@DAVIDW_STARTUP",
      text: "From concept to execution, everything was handled with utmost professionalism. Couldn't be happier with the results!",
      rating: 5,
      avatar: "https://via.placeholder.com/40/10B981/FFFFFF?text=DW",
    },
  ];

  // Continuous auto-slide functionality (no pause on hover)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 3500); // Change slide every 3.5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <>
      {/* <section className="bg-gradient-to-br from-green-900 to-green-800 px-6 py-10 md:py-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="mb-12 text-sm md:text-base max-w-2xl mx-auto text-green-100">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about their experience with us.
          </p>

          <div className="relative max-w-4xl mx-auto">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-full p-3 backdrop-blur-sm"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-full p-3 backdrop-blur-sm"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, idx) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-gradient-to-br from-white to-green-50 text-green-900 p-8 rounded-2xl shadow-2xl mx-auto max-w-2xl transform  transition-all duration-300">
                      <div className="text-green-600 mb-4">
                        <svg
                          className="w-8 h-8 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                        >
                          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8z" />
                        </svg>
                      </div>

                      <div className="flex justify-center gap-1 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      <p className="text-sm md:text-base leading-relaxed mb-6 text-gray-700 italic">
                        "{testimonial.text}"
                      </p>

                      <div className="flex items-center justify-center gap-4 ">
                        <span className="border-2  rounded-full p-1 font-semibold text-lg bg-gray-200 w-12 h-12 flex justify-center items-center">
                          {testimonial?.name.split(" ")[0][0] +
                            testimonial?.name?.split(" ")[1][0]}
                        </span>
                        <div className="text-left">
                          <h4 className="font-bold text-green-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs text-green-600 font-medium">
                            {testimonial.handle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="mt-6 max-w-xs mx-auto">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white to-green-200 rounded-full"
                style={{
                  width: `${((currentSlide + 1) / testimonials.length) * 100}%`,
                  transition: "width 3.5s linear",
                }}
              />
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default memo(Testimonial);
