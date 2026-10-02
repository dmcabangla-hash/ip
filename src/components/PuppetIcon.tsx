import React from 'react';

interface PuppetIconProps {
  className?: string;
  interactive?: boolean;
}

export const PuppetIcon: React.FC<PuppetIconProps> = ({ 
  className = "w-full h-full", 
  interactive = false 
}) => {
  return (
    <div 
      className={`relative select-none ${interactive ? 'group cursor-pointer' : ''} ${className}`}
    >
      <svg 
        viewBox="0 0 512 512" 
        fill="currentColor" 
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Control Crossbar - Two Crossing Bars matching pngwing.com (1).png */}
        <g fill="#000000" className="transition-transform duration-300 origin-[256px_110px] group-hover:rotate-2">
          {/* Bar 1: Tilted from top-left to bottom-right */}
          <rect 
            x="110" 
            y="95" 
            width="290" 
            height="36" 
            rx="18" 
            transform="rotate(-23 256 113)" 
          />
          {/* Bar 2: Tilted from bottom-left to top-right */}
          <rect 
            x="110" 
            y="95" 
            width="290" 
            height="36" 
            rx="18" 
            transform="rotate(23 256 113)" 
          />
        </g>

        {/* 4 Fine Puppet Strings connecting crossbar to puppet extremities */}
        <g stroke="#000000" strokeWidth="4.5" strokeLinecap="round" opacity="0.95">
          {/* Left string from crossbar to raised left hand */}
          <line x1="138" y1="165" x2="130" y2="295" />
          {/* Inner left string from crossbar to shoulder/torso */}
          <line x1="172" y1="58" x2="198" y2="335" />
          {/* Inner right string from crossbar to neck/head */}
          <line x1="384" y1="62" x2="330" y2="335" />
          {/* Right string from crossbar to lower right hand */}
          <line x1="375" y1="170" x2="370" y2="400" />
        </g>

        {/* Marionette Stick Figure Body - exact silhouette from pngwing.com (1).png */}
        <g fill="#000000" className="transition-transform duration-300 origin-[256px_340px] group-hover:translate-y-1">
          {/* Head */}
          <circle cx="256" cy="275" r="50" />

          {/* Torso */}
          <rect x="207" y="325" width="98" height="150" rx="49" />

          {/* Raised Left Arm (reaching up-left) */}
          <path 
            d="M 235 342 
               L 125 292 
               C 112 286 102 305 116 316 
               L 205 385 
               Z" 
          />
          <circle cx="124" cy="298" r="16" />

          {/* Angled Right Arm (reaching down-right) */}
          <path 
            d="M 276 338 
               L 362 396 
               C 374 404 384 386 371 376 
               L 298 322 
               Z" 
          />
          <circle cx="366" cy="402" r="16" />
        </g>
      </svg>
    </div>
  );
};
