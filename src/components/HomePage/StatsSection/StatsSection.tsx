export const StatsSection = () => {
  const stats = [
    {
      number: "500+",
      label: "Expert Programming Tutorials",
      description:
        "Comprehensive guides covering all major programming languages and frameworks",
    },
    {
      number: "2000+",
      label: "Interactive Coding Challenges",
      description: "Hands-on exercises designed by industry professionals",
    },
    {
      number: "1500+",
      label: "Technical Interview Questions",
      description:
        "Real questions from top tech companies like Google, Meta, Amazon",
    },
    {
      number: "100+",
      label: "3D Learning Animations",
      description:
        "Visual representations of complex algorithms and data structures",
    },
  ];

  return (
    <section className="py-24 relative">
      {/* Stellar Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(139,69,19,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(30,58,138,0.15),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2
            className="text-5xl sm:text-6xl font-black text-white mb-6 drop-shadow-2xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Platform Impact Metrics
          </h2>
          <h3
            className="text-2xl sm:text-3xl font-bold text-orange-300 mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Transforming Careers Through Code
          </h3>
          <p
            className="text-xl sm:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Our comprehensive programming education platform has helped
            thousands of developers
            <span className="text-green-400 font-bold">
              {" "}
              master new technologies
            </span>
            ,
            <span className="text-blue-400 font-bold">
              {" "}
              ace technical interviews
            </span>
            , and
            <span className="text-purple-400 font-bold">
              {" "}
              advance their careers
            </span>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 group shadow-2xl"
            >
              <div
                className="text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {stat.number}
              </div>
              <div
                className="text-xl font-bold text-white mb-3 drop-shadow-lg"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                {stat.label}
              </div>
              <p
                className="text-sm text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="mt-20">
          <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-10 border border-white/20">
            <h4
              className="text-4xl font-bold text-white mb-8 text-center"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              Developer Success Stories
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div
                  className="text-3xl font-bold text-green-400 mb-2"
                  style={{ fontFamily: "'Exo 2', sans-serif" }}
                >
                  95%
                </div>
                <p
                  className="text-gray-300"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  of learners report improved coding skills within 30 days
                </p>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold text-blue-400 mb-2"
                  style={{ fontFamily: "'Exo 2', sans-serif" }}
                >
                  87%
                </div>
                <p
                  className="text-gray-300"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  successfully pass technical interviews after our prep course
                </p>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold text-purple-400 mb-2"
                  style={{ fontFamily: "'Exo 2', sans-serif" }}
                >
                  73%
                </div>
                <p
                  className="text-gray-300"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  receive job offers from top tech companies within 6 months
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
