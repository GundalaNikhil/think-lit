import { Award, BookOpen, Users } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative py-20">
      {/* Deep Space Footer Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-purple-900/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.1),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div
              className="text-4xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ThinkLIT
            </div>
            <h5
              className="text-xl font-bold text-blue-300 mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Advanced Programming Education Platform
            </h5>
            <p
              className="text-gray-300 max-w-lg mb-8 leading-relaxed text-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Empowering developers worldwide with cutting-edge programming
              education, comprehensive technical interview preparation, and
              industry-leading software development resources. Join the future
              of coding education.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-2xl transition-all duration-300 border border-white/20 hover:scale-110 hover:border-cyan-400/50">
                <BookOpen size={24} className="text-cyan-400" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-2xl transition-all duration-300 border border-white/20 hover:scale-110 hover:border-purple-400/50">
                <Users size={24} className="text-purple-400" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-2xl transition-all duration-300 border border-white/20 hover:scale-110 hover:border-orange-400/50">
                <Award size={24} className="text-orange-400" />
              </button>
            </div>
          </div>

          <div>
            <h3
              className="text-xl font-bold text-white mb-6 drop-shadow-lg"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Programming Tracks
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-sm text-base"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Data Structures & Algorithms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-sm text-base"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  System Design & Architecture
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-sm text-base"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Machine Learning & AI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-sm text-base"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Full-Stack Development
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="text-xl font-bold text-white mb-6 drop-shadow-lg"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Developer Resources
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors duration-300 hover:drop-shadow-sm text-base"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Technical Interview Prep
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors duration-300 hover:drop-shadow-sm text-base"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Coding Challenge Platform
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors duration-300 hover:drop-shadow-sm text-base"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Career Guidance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors duration-300 hover:drop-shadow-sm text-base"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Community Forum
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Enhanced Copyright Section */}
        <div className="border-t border-white/20 mt-16 pt-10">
          <div className="text-center">
            <div className="mb-6">
              <h6
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                Join the Programming Revolution
              </h6>
              <p
                className="text-gray-300 text-lg"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Empowering the next generation of software engineers and
                technology leaders
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                "JavaScript",
                "Python",
                "Java",
                "C++",
                "React",
                "Node.js",
                "AWS",
                "Docker",
                "Kubernetes",
                "MongoDB",
                "PostgreSQL",
                "Redis",
              ].map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-gray-300 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <p
              className="text-gray-400 drop-shadow-sm text-lg"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              &copy; 2025 ThinkLIT - Advanced Programming Education Platform.
              All rights reserved. 🚀 Learn • Code • Excel • Innovate ✨
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
