import React from 'react';

interface HeaderProps {
  onOpenMenu: () => void;
  onNavigateHome: () => void;
  showRedBar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onNavigateHome,
  showRedBar = false,
}) => {
  return (
    <header className="w-full bg-[#f4f4f4] select-none">
      {/* Top Header Bar strictly matching Image 1 */}
      <div className="w-full px-4 sm:px-6 h-15 sm:h-16 flex items-center justify-between">
        {/* Brand Logo: DarkHUB with signature red overline/underline */}
        <button 
          onClick={onNavigateHome}
          className="group focus:outline-none flex items-center text-left"
          title="DarkHUB"
        >
          <div className="relative inline-flex items-center text-[30px] sm:text-[36px] font-black tracking-tight text-black leading-none">
            {/* 'Dark' with bottom red bar */}
            <span className="relative pb-1">
              Dark
              <span className="absolute bottom-0 left-0 w-full h-[3.5px] bg-[#E50914]" />
            </span>

            {/* 'HUB' with top red bar */}
            <span className="relative pt-1 ml-0.5">
              HUB
              <span className="absolute top-0 left-0 w-full h-[3.5px] bg-[#E50914]" />
            </span>
          </div>
        </button>

        {/* Hamburger Menu Button (Exact 3 thick black horizontal bars as in Image 1) */}
        <button
          onClick={onOpenMenu}
          aria-label="Open Navigation Menu"
          className="w-10 h-10 flex flex-col justify-center items-end gap-[5px] p-1.5 focus:outline-none active:scale-95 transition-transform"
        >
          <span className="w-7 h-[3.5px] bg-black rounded-xs block"></span>
          <span className="w-7 h-[3.5px] bg-black rounded-xs block"></span>
          <span className="w-7 h-[3.5px] bg-black rounded-xs block"></span>
        </button>
      </div>

      {showRedBar && (
        <div className="w-full h-[4px] bg-[#E50914]" />
      )}
    </header>
  );
};
