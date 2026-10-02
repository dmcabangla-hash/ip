import React from 'react';

interface WorldMapSvgProps {
  className?: string;
}

export const WorldMapSvg: React.FC<WorldMapSvgProps> = ({ 
  className = "w-full h-full text-zinc-200" 
}) => {
  return (
    <svg 
      viewBox="0 0 1000 500" 
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* North America */}
      <path d="M 50 80 Q 90 60 160 50 Q 220 50 250 80 Q 290 70 330 90 Q 300 120 280 140 Q 260 170 230 190 Q 200 210 180 230 Q 150 220 130 180 Q 90 170 70 140 Q 40 120 50 80 Z" />
      <path d="M 170 230 Q 190 250 210 270 Q 220 290 200 300 Q 180 270 160 250 Z" />
      
      {/* Greenland */}
      <path d="M 330 35 Q 380 30 390 60 Q 370 85 340 80 Q 320 60 330 35 Z" />

      {/* South America */}
      <path d="M 210 290 Q 250 290 280 320 Q 300 360 280 400 Q 260 450 240 480 Q 220 450 210 400 Q 190 350 200 320 Z" />

      {/* Europe */}
      <path d="M 430 75 Q 490 60 520 85 Q 540 120 500 140 Q 470 150 440 130 Q 420 110 430 75 Z" />
      <path d="M 410 95 Q 425 85 430 100 Q 415 110 410 95 Z" />
      <path d="M 450 145 Q 480 140 490 165 Q 460 170 450 145 Z" />

      {/* Africa */}
      <path d="M 430 180 Q 520 170 560 210 Q 580 270 560 330 Q 530 390 490 410 Q 450 350 430 280 Q 410 230 430 180 Z" />
      {/* Madagascar */}
      <path d="M 590 330 Q 600 340 595 370 Q 585 365 590 330 Z" />

      {/* Asia */}
      <path d="M 530 70 Q 640 50 780 65 Q 890 80 920 130 Q 880 180 840 210 Q 770 230 730 210 Q 700 240 680 280 Q 640 270 610 230 Q 570 220 550 170 Q 530 130 530 70 Z" />
      {/* South Asia & Indian Subcontinent */}
      <path d="M 660 210 Q 700 220 720 270 Q 690 310 670 270 Q 650 240 660 210 Z" />
      {/* Southeast Asia Islands */}
      <path d="M 750 270 Q 780 280 810 290 Q 790 320 760 300 Z" />
      <path d="M 800 300 Q 840 310 870 330 Q 840 350 810 330 Z" />
      <path d="M 850 200 Q 880 180 890 220 Q 860 240 850 200 Z" />

      {/* Australia & Oceania */}
      <path d="M 780 340 Q 870 330 900 380 Q 880 430 810 440 Q 770 410 770 370 Q 760 350 780 340 Z" />
      <path d="M 900 420 Q 920 430 910 450 Q 895 440 900 420 Z" />
    </svg>
  );
};
