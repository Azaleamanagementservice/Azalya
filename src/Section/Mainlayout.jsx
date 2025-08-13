import { useSelector, useDispatch } from "react-redux";
import { X, User, Mail, Phone, MessageSquare, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Mainlayout = (props) => {
  const isDialogOpen = useSelector((state) => state.isDialogOpen);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      number: "",
      message: "",
    },
  });

  const closeDialog = () => {
    dispatch({ type: "close" });
    reset();
  };

  const onSubmit = async (data) => {
    try {
 

      // Axios API call
      const response = await axios.post(
        "/api/contactApi.js",
        {
          name: data.name,
          email: data.email,
          number: data.number,
          message: data.message || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 seconds timeout
        }
      );

      const result = response.data;

      if (response?.status==201) {
        // Success alert
         Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your message has been sent successfully. We will get back to you soon!",
          confirmButtonColor: "#187530",
          confirmButtonText: "OK",
          timer: 3000,
          timerProgressBar: true,
        });

        // Reset form and close dialog
        reset();
        closeDialog();
      } else {
        // Error alert
         Swal.fire({
          icon: "error",
          title: "Oops!",
          text:
            result.error ||
            result.message ||
            "Something went wrong. Please try again.",
          confirmButtonColor: "#187530",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);

      let errorMessage = "Unable to send your message. Please try again.";

      // Handle different types of errors
      if (error.code === "ECONNABORTED") {
        errorMessage =
          "Request timed out. Please check your connection and try again.";
      } else if (error.response) {
        // Server responded with error status
        const serverError = error.response.data;
        errorMessage =
          serverError?.error ||
          serverError?.message ||
          `Server Error: ${error.response.status}`;
      } else if (error.request) {
        // Network error
        errorMessage = "Network error. Please check your internet connection.";
      }

      // Error alert with specific message
      await Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: errorMessage,
        confirmButtonColor: "#187530",
        confirmButtonText: "OK",
      });
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      closeDialog();
    }
  };

  return (
    <>
      <Navbar />
      {props.children}
      <Footer />

      {/* Contact Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-[9999] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-[#f2e9df] rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 animate-fadeInScale max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-900 to-[#187530] text-white p-6 rounded-t-2xl relative">
              <button
                onClick={closeDialog}
                disabled={isSubmitting}
                className="absolute top-4 right-4 rounded-lg bg-[#f2e9df] text-gray-500 hover:text-gray-600  transition-all  cursor-pointer hover:outline-1 outline-[#f2e9df] p-1 disabled:opacity-50"
                aria-label="Close dialog  "
              >
                <X size={24} />
              </button>
              <div className="pr-8">
                <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
                <p className="text-green-100 text-sm">
                  Reach out to us for inquiries, partnerships, or service
                  requests. Our team is ready to assist you.
                </p>
              </div>
            </div>

            {/* Scrollable Form Container */}
            <div
              className="overflow-y-auto custom-scrollbar"
              style={{ maxHeight: "calc(90vh - 120px)" }}
            >
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-green-900 mb-2"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                      size={20}
                    />
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter Your Name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters long",
                        },
                        maxLength: {
                          value: 50,
                          message: "Name must not exceed 50 characters",
                        },
                      })}
                      disabled={isSubmitting}
                      className={`w-full bg-green-900 text-white placeholder-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.name
                          ? "focus:ring-red-500 border border-red-500"
                          : "focus:ring-[#187530]"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-green-900 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                      size={20}
                    />
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter Your Email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      disabled={isSubmitting}
                      className={`w-full bg-green-900 text-white placeholder-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.email
                          ? "focus:ring-red-500 border border-red-500"
                          : "focus:ring-[#187530]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <label
                    htmlFor="number"
                    className="block text-sm font-semibold text-green-900 mb-2"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                      size={20}
                    />
                    <input
                      type="text"
                      id="number"
                      placeholder="Enter Your Number"
                      {...register("number", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\+?[\d\s-]{8,15}$/,
                          message:
                            "Please enter a valid phone number (8-15 digits)",
                        },
                      })}
                      disabled={isSubmitting}
                      className={`w-full bg-green-900 text-white placeholder-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.number
                          ? "focus:ring-red-500 border border-red-500"
                          : "focus:ring-[#187530]"
                      }`}
                    />
                  </div>
                  {errors.number && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.number.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-green-900 mb-2"
                  >
                    Message (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="absolute left-3 top-4 text-white"
                      size={20}
                    />
                    <textarea
                      id="message"
                      rows="4"
                      placeholder="Enter Your Message (Optional)"
                      {...register("message", {
                        maxLength: {
                          value: 500,
                          message: "Message must not exceed 500 characters",
                        },
                      })}
                      disabled={isSubmitting}
                      className={`w-full bg-green-900 text-white placeholder-white pl-10 pr-4 py-3 rounded-md resize-none focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.message
                          ? "focus:ring-red-500 border border-red-500"
                          : "focus:ring-[#187530]"
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-green-900 text-white p-2.5 px-8 text-base cursor-pointer duration-300 transition-all hover:bg-[#c89d47] font-semibold rounded-full flex items-center justify-center space-x-2 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Submit</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-600 text-center">
                  By submitting this form, you agree to our privacy policy and
                  terms of service.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mainlayout;
