import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
} from "react-icons/fa";
import logo from "../assets/logo/Azalea Logo (4).png";
import { Link } from "react-router-dom";
import { memo } from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F2E9DC] text-gray-800">
      {/* Main Footer Content */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {/* Company Info */}
            <div>
              <img
                src={logo}
                alt="Azalea Logo"
                className="h-28 mb-4"
                loading="lazy"
              />
              <h2 className="text-base font-semibold">	Your Property, Our Priority—with Care and Clarity.</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Azalea Management Services LLP is a Start Up India certified
                company recognized by DPIIT
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="bg-green-900 hover:bg-green-800 p-2.5 rounded-full text-white transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61579217911251"
                  className="bg-green-900 hover:bg-green-800 p-2.5 rounded-full text-white transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <FaFacebook size={16} />
                </a>
                <a
                  href="https://www.instagram.com/azaleamanagementservices"
                  className="bg-green-900 hover:bg-green-800 p-2.5 rounded-full text-white transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt
                    className="text-green-900 mt-1 flex-shrink-0"
                    size={14}
                  />
                  <a
                    href="https://maps.app.goo.gl/Nzqbd45jDDkHQfJ86"
                    className="text-sm hover:underline hover:text-green-900 cursor-pointer text-gray-700 leading-relaxed"
                  >
                    12/28-B, Rajdeep Vrindavan CHSL, Vrindavan Society Phase I,
                    Thane, Maharashtra 400601, India
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone
                    className="text-green-900 flex-shrink-0 rotate-100"
                    size={14}
                  />
                  <a
                    href="tel:+917738975751"
                    className="text-sm text-gray-700 hover:underline hover:text-green-900 transition-colors duration-200"
                  >
                    +91 77389 757 51
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope
                    className="text-green-900 flex-shrink-0"
                    size={14}
                  />
                  <a
                    href="mailto:contact@azaleaservices.co.in"
                    className="text-sm hover:underline text-gray-700 hover:text-green-900 transition-colors duration-200"
                  >
                    contact@azaleaservices.co.in
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope
                    className="text-green-900 flex-shrink-0"
                    size={14}
                  />
                  <a
                    href="mailto:azaleamanagementservices@gmail.com"
                    className="text-sm hover:underline text-gray-700 hover:text-green-900 transition-colors duration-200"
                  >
                    azaleamanagementservices@gmail.com
                  </a>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-gray-700 hover:text-green-900 hover:underline transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-gray-700 hover:text-green-900 hover:underline transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-sm text-gray-700 hover:text-green-900 hover:underline transition-colors duration-200"
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-gray-700 hover:text-green-900 hover:underline transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
