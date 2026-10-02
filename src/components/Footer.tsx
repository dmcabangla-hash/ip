import React from 'react';
import { ActivePage } from '../types';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  lang: 'bn' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  return (
    <footer className="mt-16 bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-zinc-800">
          {/* Brand */}
          <div className="space-y-3">
            <div className="relative inline-flex items-center font-black text-3xl tracking-tight text-white select-none">
              <span className="relative">
                Dark
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#E50914] rounded-full" />
              </span>
              <span className="relative ml-0.5">
                HUB
                <span className="absolute -top-1 left-0 w-full h-[3px] bg-[#E50914] rounded-full" />
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm font-['Hind_Siliguri',sans-serif]">
              {lang === 'bn'
                ? 'অতীত ও বর্তমান এর সকল ইতিহাস খ্যাত স্প্যামার ও টিম এর স্মৃতি সংরক্ষণাগার। উই স্প্যামারস নেভার বো ডাউন।'
                : 'Historical registry documenting the operations, syndicates, and archives of cyber operatives.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-zinc-400">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
              Home
            </button>
            <button onClick={() => onNavigate('submit-biodata')} className="hover:text-white transition-colors">
              Submit Bio-data
            </button>
            <button onClick={() => onNavigate('top-teams')} className="hover:text-white transition-colors">
              Top Teams
            </button>
            <button onClick={() => onNavigate('top-spammers')} className="hover:text-white transition-colors">
              Top Spammers
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
              About DarkHUB
            </button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-zinc-400">Total Admins : 01</span>
          </div>

          <div className="font-mono text-zinc-400">
            &copy;2026 DarkHUB . All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
