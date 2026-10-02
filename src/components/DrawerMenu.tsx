import React, { useEffect } from 'react';
import { ActivePage, UserAccount } from '../types';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  currentUser: UserAccount | null;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  currentUser,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const menuItems: { id: ActivePage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: currentUser ? 'user-dashboard' : 'signin', label: 'Submit Bio-data' },
    { id: 'top-teams', label: 'Top Teams' },
    { id: 'top-spammers', label: 'Top Spammers' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'about', label: 'About DarkHUB' },
  ];

  return (
    <>
      {/* Dim Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Crimson Slide-in Panel (Matches Image 2 & 4 exactly) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[380px] md:w-[420px] bg-[#800000] text-white shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between select-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#800000' }}
      >
        <div>
          {/* Top Close Button Area */}
          <div className="pt-5 px-6 pb-4">
            <button
              onClick={onClose}
              aria-label="Close navigation"
              className="p-1 -ml-1 text-white hover:opacity-80 active:scale-95 transition-all focus:outline-none"
            >
              {/* Bold White ✕ Icon matching Image 4 */}
              <svg
                className="w-10 h-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Thin Horizontal Divider Line directly under the ✕ button (Matches Image 4) */}
          <div className="w-full h-[1.5px] bg-white/30" />

          {/* Vertical Menu Items (Matches typography of Image 4) */}
          <nav className="pt-8 px-7 flex flex-col space-y-5 sm:space-y-6">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`text-left text-[26px] sm:text-[30px] font-black tracking-tight leading-tight transition-transform hover:translate-x-1.5 focus:outline-none ${
                  currentPage === item.id ? 'text-white' : 'text-white/95 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Quick Admin Dashboard shortcut if admin */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => {
                  onNavigate('admin-dashboard');
                  onClose();
                }}
                className="text-left text-[24px] sm:text-[28px] font-black tracking-tight text-red-200 hover:text-white transition-transform hover:translate-x-1.5 pt-2 border-t border-white/20"
              >
                ★ Admin Dashboard
              </button>
            )}
          </nav>
        </div>

        {/* Bottom Metadata & Footer Area (Matches Image 4) */}
        <div className="px-7 pb-8 pt-6 space-y-6">
          {/* "Total Admins : 01" (Clickable to access Admin Dashboard) */}
          <button
            onClick={() => {
              if (currentUser?.role === 'admin') {
                onNavigate('admin-dashboard');
              } else {
                onNavigate('signin');
              }
              onClose();
            }}
            className="text-left text-[17px] sm:text-[18px] font-medium text-white/95 hover:text-white transition-opacity focus:outline-none flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Total Admins : 01</span>
          </button>

          {/* "©2026 DarkHUB . All Rights Reserved" (Matches Image 4) */}
          <div className="text-[13px] sm:text-[14px] text-white/90">
            &copy;2026 DarkHUB . All Rights Reserved
          </div>
        </div>
      </div>
    </>
  );
};
