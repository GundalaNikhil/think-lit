"use client";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "../../constants/HomepageConstants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling down from top, hide when at very top
      if (currentScrollY > 100) {
        setIsVisible(true);
      } else if (currentScrollY < 50) {
        setIsVisible(false);
        setIsOpen(false); // Close mobile menu when hiding navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(51, 65, 85, 0.95) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Enhanced Logo with Cosmic Colors */}
          <div className="flex-shrink-0 flex items-center">
            <div
              className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              ThinkLIT
            </div>
          </div>

          {/* Enhanced Desktop Menu with Cosmic Colors */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-200 hover:text-cyan-300 px-4 py-2 text-base font-semibold transition-all duration-300 hover:scale-105 transform drop-shadow-lg relative group"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <div className="flex items-center space-x-4 ml-6">
                <button
                  className="text-slate-200 hover:text-cyan-300 px-4 py-2 text-base font-semibold transition-all duration-300 hover:scale-105 transform drop-shadow-lg relative group"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </button>
                <button
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-sm border border-cyan-400/30 hover:border-cyan-300/50"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile menu button with Cosmic Colors */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 hover:text-cyan-300 p-3 rounded-xl bg-slate-700/50 hover:bg-slate-600/60 border border-slate-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Cosmic Theme */}
        {isOpen && (
          <div
            className="lg:hidden absolute top-full left-0 w-full shadow-2xl border-t border-slate-500/30"
            style={{
              background:
                "linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="px-6 pt-6 pb-8 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-slate-200 hover:text-cyan-300 hover:bg-slate-700/50 rounded-xl transition-all duration-300 font-semibold border border-transparent hover:border-cyan-400/30"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-600/40 space-y-4">
                <button
                  className="w-full text-center text-slate-200 hover:text-cyan-300 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all duration-300 font-semibold border border-slate-600/40 hover:border-cyan-400/50"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </button>
                <button
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white px-4 py-3 rounded-xl hover:scale-105 transform transition-all duration-300 shadow-lg font-bold border border-cyan-400/30"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
