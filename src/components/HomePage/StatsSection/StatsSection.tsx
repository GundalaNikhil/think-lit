export const StatsSection = () => {
  const stats = [
    { number: "200+", label: "Articles Published" },
    { number: "1000+", label: "Quiz Questions" },
    { number: "500+", label: "Interview Questions" },
    { number: "50+", label: "Visual Animations" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Learning by Numbers
          </h2>
          <p className="text-xl text-blue-100">
            Our comprehensive content library keeps growing
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
