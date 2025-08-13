import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { memo, useState } from "react";
import logo from "../assets/logo/Azalea Logo (4).png";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const disp = useDispatch();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About US", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const nav = useNavigate();
  const NavigatedToService = () => [nav("/contact")];
  const toggleOpen = () => {
    disp({ type: "open" });
  };
  return (
    <nav className="bg-white shadow-md lg:rounded-b-[60px] z-50 fixed w-full top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between py-8">
          {/* Left Navigation Links */}
          <div className="flex gap-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium group relative transition text-gray-700 hover:text-green-700 ${
                  location.pathname === item.path
                    ? "font-semibold text-black"
                    : ""
                }`}
              >
                {item.name}
                <div className="absolute -bottom-2 w-0 group-hover:w-full bg-green-700 h-1 duration-300 transition-all rounded-lg"></div>
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4">
            <img
              src={logo}
              alt="Azalea Logo"
              className="h-20 "
              loading="lazy"
            />
          </div>

          {/* Right Button */}
          <div>
            <button
              onClick={toggleOpen}
              className="bg-green-900 text-white  p-2.5 px-8 text-base cursor-pointer  hover:bg-[#c89d47]  transition-all duration-300 font-semibold rounded-full"
            >
              Request Consultation
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between py-4">
            {/* Mobile Logo */}
            <div className="flex items-center">
              <img
                src={logo}
                alt="Azalea Logo"
                className="h-20"
                loading="lazy"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-700 transition p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeMenu}
            />
          )}

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <img
                src={logo}
                alt="Azalea Logo"
                className="h-20"
                loading="lazy"
              />
              <button
                onClick={closeMenu}
                className="text-gray-700 hover:text-green-700 transition p-2"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`font-medium transition text-gray-700 hover:text-green-700 py-2 px-3 rounded-lg ${
                    location.pathname === item.path
                      ? "font-semibold text-black bg-gray-100"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Button */}
              <button
                className="bg-green-900 text-white  p-2.5 px-8 text-base cursor-pointer hover:bg-green-800 font-semibold rounded-full"
                onClick={() => {
                  NavigatedToService();
                  closeMenu();
                }}
              >
                Request Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Tablet Navigation (md to lg screens) */}
        <div className="hidden md:flex lg:hidden items-center justify-between py-4">
          {/* Tablet Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Azalea Logo" className="h-11" />
          </div>

          {/* Tablet Navigation Links */}
          <div className="flex gap-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition text-gray-700 hover:text-green-700 text-sm ${
                  location.pathname === item.path
                    ? "font-semibold text-black"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Tablet Button */}
          <div>
            <button className="bg-green-900 text-white px-5 py-2 rounded-xl hover:bg-green-800 transition text-sm">
              Button
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
