"use client";
import { Zap } from "lucide-react";
import AnimationBlock from "./AnimationBlock";

interface AnimationComponent {
  id: string;
  animation_code?: string;
}

interface TopicAnimationProps {
  getComponentsByType: (type: string) => AnimationComponent[];
  animationKey: number;
  onResetAnimation: () => void;
}

const TopicAnimation: React.FC<TopicAnimationProps> = ({
  getComponentsByType,
  animationKey,
  onResetAnimation,
}) => {
  return (
    <div className="p-16">
      <div className="text-center mb-16 animate-fadeInUp">
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-lg mb-8">
          <Zap size={32} />
          <h2 className="text-3xl font-black font-['Space_Grotesk']">
            Interactive Visuals
          </h2>
        </div>
        <p className="text-xl text-gray-600 font-['Inter'] max-w-3xl mx-auto">
          Experience concepts through beautiful animations and interactive
          demonstrations!
        </p>
      </div>

      {/* Animation Blocks */}
      {getComponentsByType("shared.animation-block").map(
        (component) =>
          component.animation_code && (
            <div key={`${component.id}-${animationKey}`} className="mb-12">
              <AnimationBlock animationCode={component.animation_code} />
            </div>
          )
      )}

      {/* Additional Visual Content */}
      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 border border-blue-200 hover-lift animate-fadeInUp">
          <div className="text-center">
            <div className="text-5xl mb-4">📊</div>
            <h4 className="text-2xl font-bold font-['Space_Grotesk'] text-gray-900 mb-4">
              Data Visualization
            </h4>
            <p className="font-['Inter'] text-gray-700">
              Interactive charts and graphs to help you understand complex data
              relationships.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-3xl p-8 border border-green-200 hover-lift animate-slideInRight">
          <div className="text-center">
            <div className="text-5xl mb-4">🎮</div>
            <h4 className="text-2xl font-bold font-['Space_Grotesk'] text-gray-900 mb-4">
              Interactive Demos
            </h4>
            <p className="font-['Inter'] text-gray-700">
              Hands-on demonstrations that let you experiment with concepts in
              real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-12 border border-purple-200 animate-fadeInUp">
        <div className="text-6xl mb-6">✨</div>
        <h4 className="text-3xl font-black font-['Space_Grotesk'] text-gray-900 mb-4">
          Visualize to Learn Better
        </h4>
        <p className="text-xl font-['Inter'] text-gray-700 mb-8">
          Studies show that visual learning improves retention by up to 400%!
        </p>
        <button
          onClick={onResetAnimation}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-['Space_Grotesk'] font-bold text-lg transform hover:scale-105 shadow-xl animate-glow"
        >
          Reset All Animations 🔄
        </button>
      </div>
    </div>
  );
};

export default TopicAnimation;
