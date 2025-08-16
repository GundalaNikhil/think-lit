import { features } from "../../constants/HomepageConstants";

export const ContentFeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-900/40 to-purple-900/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2
            className="text-5xl sm:text-6xl font-black text-white mb-6 drop-shadow-2xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Comprehensive Learning Ecosystem
          </h2>
          <h3
            className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Four-Dimensional Programming Education
          </h3>
          <p
            className="text-xl sm:text-2xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every programming concept is reinforced through multiple learning
            modalities to ensure
            <span className="text-green-400 font-bold">
              {" "}
              deep understanding
            </span>
            ,
            <span className="text-blue-400 font-bold">
              {" "}
              practical application
            </span>
            , and
            <span className="text-purple-400 font-bold">
              {" "}
              long-term retention
            </span>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-110 group text-center border border-white/20 hover:border-cyan-400/50"
            >
              <div className="text-cyan-400 mb-6 group-hover:scale-125 transition-transform duration-300 flex justify-center drop-shadow-2xl">
                {feature.icon}
              </div>
              <h3
                className="text-xl font-bold text-white mb-4 drop-shadow-lg"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comprehensive Learning Benefits */}
        <div className="mt-20">
          <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-10 border border-white/20">
            <h4
              className="text-4xl font-bold text-white mb-8 text-center"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Why Choose ThinkLIT?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-300">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-3">
                  Expert-Crafted
                </div>
                <h5
                  className="text-lg font-bold text-white mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Industry-Standard Content
                </h5>
                <p style={{ fontFamily: "'Inter', sans-serif" }}>
                  Every tutorial and challenge is designed by senior engineers
                  from top tech companies, ensuring you learn skills that matter
                  in real-world development.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-3">
                  Comprehensive
                </div>
                <h5
                  className="text-lg font-bold text-white mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Multi-Modal Learning
                </h5>
                <p style={{ fontFamily: "'Inter', sans-serif" }}>
                  Master concepts through articles, interactive coding
                  challenges, visual animations, and technical interview
                  preparation.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-3">
                  Career-Focused
                </div>
                <h5
                  className="text-lg font-bold text-white mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Interview Ready
                </h5>
                <p style={{ fontFamily: "'Inter', sans-serif" }}>
                  Build confidence with real interview questions from Google,
                  Meta, Amazon, and other leading technology companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
