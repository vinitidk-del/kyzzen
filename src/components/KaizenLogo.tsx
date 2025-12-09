import React from 'react';

interface KaizenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textClassName?: string;
}

export const KaizenLogo: React.FC<KaizenLogoProps> = ({ 
  className = '',
  size = 'md',
  showText = false,
  textClassName = ''
}) => {
  const sizeMap = {
    sm: { wrapper: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-lg' },
    md: { wrapper: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-xl' },
    lg: { wrapper: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-2xl' },
    xl: { wrapper: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-3xl' },
  };

  const { wrapper, icon, text } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${wrapper} rounded-xl bg-gradient-to-br from-primary via-insight-teal to-accent flex items-center justify-center shadow-lg shadow-primary/30 relative overflow-hidden`}>
        {/* Abstract K shape - unique brand identity */}
        <svg 
          viewBox="0 0 24 24" 
          className={icon}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized K with ascending elements representing growth/improvement */}
          <path 
            d="M6 4V20" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          <path 
            d="M6 12L14 4" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          <path 
            d="M6 12L14 20" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          {/* Accent arrow pointing up - continuous improvement */}
          <path 
            d="M16 8L18 6L20 8" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M18 6V14" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-50" />
      </div>
      {showText && (
        <span className={`font-extrabold bg-gradient-to-r from-primary to-insight-teal bg-clip-text text-transparent ${text} ${textClassName}`}>
          Kaizen
        </span>
      )}
    </div>
  );
};

// Icon-only variant for smaller usage
export const KaizenIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M6 4V20" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
    <path 
      d="M6 12L14 4" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
    <path 
      d="M6 12L14 20" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
    <path 
      d="M16 8L18 6L20 8" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M18 6V14" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);
