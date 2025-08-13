import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import ContactImage from "../assets/Contact/Image1.jpg";
import { memo } from "react";

const Contactsection = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Show loading alert
      Swal.fire({
        title: 'Sending...',
        text: 'Please wait while we process your request',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Axios API call
      const response = await axios.post('/api/contactApi.js', {
        name: data.name,
        email: data.email,
        number: data.number,
        message: data.message || ""
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 seconds timeout
      });

      const result = response.data;

      if (result.isSuccess) {
        // Success alert
        await Swal.fire({
          icon: 'success',
          title: 'Thank You!',
          text: 'Your message has been sent successfully. We will get back to you soon!',
          confirmButtonColor: '#187530',
          confirmButtonText: 'OK',
          timer: 3000,
          timerProgressBar: true
        });
        
        // Reset form
        reset();
      } else {
        // Error alert
        await Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: result.error || result.message || 'Something went wrong. Please try again.',
          confirmButtonColor: '#187530',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      let errorMessage = 'Unable to send your message. Please try again.';
      
      // Handle different types of errors
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (error.response) {
        // Server responded with error status
        const serverError = error.response.data;
        errorMessage = serverError?.error || serverError?.message || `Server Error: ${error.response.status}`;
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      // Error alert with specific message
      await Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: errorMessage,
        confirmButtonColor: '#187530',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <section
      className="bg-[#f2e9df] text-green-900 px-6 py-10 md:py-20"
      id="contact"
    >
      <div className="max-w-4xl mx-auto text-center pb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530]">
          Contact Us
        </h2>
        <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto">
          Reach out to us for inquiries, partnerships, or service requests. Our
          team is ready to assist you with personalized support and guidance.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left Form */}
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col order-2 md:order-1 space-y-4 md:px-16"
        >
          <div>
            <input
              type="text"
              placeholder="Enter Your Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long"
                },
                maxLength: {
                  value: 50,
                  message: "Name must not exceed 50 characters"
                }
              })}
              className={`w-full bg-green-900 text-white placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${
                errors.name ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-[#187530]'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Your Number"
              {...register("number", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[\d\s-]{8,15}$/,
                  message: "Please enter a valid phone number (8-15 digits)"
                }
              })}
              className={`w-full bg-green-900 text-white placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${
                errors.number ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-[#187530]'
              }`}
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address"
                }
              })}
              className={`w-full bg-green-900 text-white placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-[#187530]'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <textarea
              rows="4"
              placeholder="Enter Your Message (Optional)"
              {...register("message", {
                maxLength: {
                  value: 500,
                  message: "Message must not exceed 500 characters"
                }
              })}
              className={`w-full bg-green-900 text-white placeholder-white px-4 py-3 rounded-md resize-none focus:outline-none focus:ring-2 ${
                errors.message ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-[#187530]'
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-green-900 text-white p-2.5 px-8 text-base cursor-pointer duration-300 transition-all hover:bg-[#c89d47] font-semibold rounded-full ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>

        {/* Right Image */}
        <div className="rounded-xl order-1 md:order-2">
          <img
            src={ContactImage}
            loading="lazy"
            alt="Contact Illustration"
            className="h-90 w-full rounded-lg object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>

      {/* Google Map */}
      {props?.shouldMapShow && (
        <div className="max-w-7xl mx-auto mt-16">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-6 text-center">Our Location</h3>
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3767.6808073840143!2d72.9839167!3d19.209138900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDEyJzMyLjkiTiA3MsKwNTknMDIuMSJF!5e0!3m2!1sen!2sin!4v1755005198612!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Contactsection);
