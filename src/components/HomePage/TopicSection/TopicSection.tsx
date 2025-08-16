import { ArrowRight, Star } from "lucide-react";
import { topics } from "../../constants/Topics";
import Link from "next/link";

export const LearningTopicsSection = () => {
  return (
    <section id="topics" className="py-24 relative">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/50 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.12),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2
            className="text-5xl sm:text-6xl font-black text-white mb-6 drop-shadow-2xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Programming Mastery Paths
          </h2>
          <h3
            className="text-2xl sm:text-3xl font-bold text-blue-300 mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Advanced Software Development Curriculum
          </h3>
          <p
            className="text-xl sm:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Master cutting-edge programming technologies through our
            comprehensive learning ecosystem. Each specialization includes{" "}
            <span className="text-cyan-400 font-bold">expert tutorials</span>,
            <span className="text-green-400 font-bold">
              hands-on coding challenges
            </span>
            ,
            <span className="text-purple-400 font-bold">
              technical interview preparation
            </span>
            , and
            <span className="text-orange-400 font-bold">
              interactive visualizations
            </span>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="group bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 border border-white/20 overflow-hidden hover:border-cyan-400/50"
            >
              <div
                className={`h-3 bg-gradient-to-r ${topic.color} shadow-lg`}
              ></div>

              <div className="p-8">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${topic.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}
                >
                  {topic.icon}
                </div>

                <h3
                  className="text-2xl font-bold text-white mb-4 drop-shadow-lg"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {topic.title}
                </h3>
                <p
                  className="text-gray-300 mb-6 leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {topic.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-sm text-cyan-300 font-semibold"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {topic.articleCount} Expert Tutorials
                  </span>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                    <span className="text-sm text-gray-200 font-bold">4.9</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <p
                    className="text-sm font-semibold text-blue-300"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    What you&apos;ll get:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topic.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/20 backdrop-blur-sm text-gray-200 px-3 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {topic.id === "more" ? (
                  <button
                    className={`w-full bg-gradient-to-r ${topic.color} text-white py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group-hover:translate-y-[-4px] shadow-lg`}
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    🚀 Coming Soon
                  </button>
                ) : (
                  <Link
                    href="/topics"
                    className={`w-full bg-gradient-to-r ${topic.color} text-white py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group-hover:translate-y-[-4px] shadow-lg`}
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    Begin Mastery Path
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack & Skills */}
        <div className="mt-20 text-center">
          <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h4
              className="text-3xl font-bold text-white mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Technologies & Skills You&apos;ll Master
            </h4>
            <p
              className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Build expertise in the most in-demand programming languages,
              frameworks, and concepts that top tech companies are looking for.
            </p>

            {/* Technology Keywords */}
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {[
                "JavaScript",
                "Python",
                "React",
                "Node.js",
                "TypeScript",
                "System Design",
                "Algorithms",
                "Data Structures",
                "Machine Learning",
                "Web Development",
                "Software Engineering",
                "Technical Interviews",
                "AWS",
                "Docker",
                "MongoDB",
                "PostgreSQL",
                "Git",
                "REST APIs",
              ].map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-gray-200 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to start your learning journey?
          </p>
          <Link
            href="/topics"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Browse All Topics
          </Link>
        </div>
      </div>
    </section>
  );
};
