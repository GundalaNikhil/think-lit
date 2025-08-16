import React from 'react';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'medium' | 'dark' | 'custom';
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  opacity?: number;
  borderOpacity?: number;
  onClick?: () => void;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className = '',
  variant = 'medium',
  blur = 'xl',
  opacity = 0.1,
  borderOpacity = 0.2,
  onClick,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'light':
        return 'bg-white/5 border-white/10';
      case 'medium':
        return 'bg-white/10 border-white/20';
      case 'dark':
        return 'bg-white/20 border-white/30';
      case 'custom':
        return `bg-white/${Math.round(opacity * 100)} border-white/${Math.round(borderOpacity * 100)}`;
      default:
        return 'bg-white/10 border-white/20';
    }
  };

  const getBlurClass = () => {
    switch (blur) {
      case 'sm':
        return 'backdrop-blur-sm';
      case 'md':
        return 'backdrop-blur-md';
      case 'lg':
        return 'backdrop-blur-lg';
      case 'xl':
        return 'backdrop-blur-xl';
      case '2xl':
        return 'backdrop-blur-2xl';
      default:
        return 'backdrop-blur-xl';
    }
  };

  return (
    <div
      className={`
        ${getVariantStyles()}
        ${getBlurClass()}
        border
        shadow-xl
        transition-all
        duration-300
        hover:bg-white/15
        hover:border-white/30
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassmorphismCard;

// Usage Examples:
// <GlassmorphismCard variant="light" blur="lg" className="p-6 rounded-2xl">
//   Content here
// </GlassmorphismCard>
//
// <GlassmorphismCard variant="custom" opacity={0.15} borderOpacity={0.25} blur="2xl">
//   Custom glassmorphism content
// </GlassmorphismCard>
