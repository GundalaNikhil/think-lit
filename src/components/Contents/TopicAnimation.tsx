"use client";
import { Zap } from "lucide-react";
import AnimationBlock from "./AnimationBlock";
import TestAnimation from "./TestAnimation";
import AnimationErrorBoundary from "./AnimationErrorBoundary";

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
  const animationComponents = getComponentsByType("shared.animation-block");
  const hasAnimations = animationComponents.some(
    (component) => component.animation_code
  );

  return (
    <div className="px-6 py-8 bg-white min-h-[600px]">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Zap size={24} className="text-gray-700" />
          <h2 className="text-2xl font-space-grotesk font-bold text-gray-900">
            Interactive Visuals
          </h2>
        </div>
        <p className="text-gray-600 font-inter leading-relaxed">
          Explore the concepts through interactive animations and demonstrations
          below.
        </p>
      </div>

      {/* Animation Blocks */}
      {animationComponents.map(
        (component) =>
          component.animation_code && (
            <div key={`${component.id}-${animationKey}`} className="mb-12">
              <AnimationErrorBoundary>
                <AnimationBlock animationCode={component.animation_code} />
              </AnimationErrorBoundary>
            </div>
          )
      )}

      {/* Test Animation when no animations are available */}
      {!hasAnimations && (
        <div className="mb-12 animate-fadeInUp">
          <TestAnimation />
        </div>
      )}

      {/* Reset All Button */}
      {hasAnimations && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onResetAnimation}
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 font-space-grotesk font-medium text-sm"
          >
            Reset All Animations
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicAnimation;
