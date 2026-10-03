import React from 'react';
import { SpammerProfile } from '../types';

interface SpammerWikiViewProps {
  spammer: SpammerProfile;
  onBack: () => void;
  onOpenMenu: () => void;
  onRespect?: (id: string) => void;
}

export const SpammerWikiView: React.FC<SpammerWikiViewProps> = ({
  spammer,
  onBack,
  onOpenMenu,
  onRespect,
}) => {
  const avatarSrc = spammer.avatarUrl || '/raj_alamin.png';

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between select-none">
      <div>
        {/* Top Header strictly matching Image with DarkHUB logo and hamburger */}
        <header className="w-full bg-[#f4f4f4] select-none border-b border-zinc-200/60">
          <div className="w-full px-4 sm:px-6 h-15 sm:h-16 flex items-center justify-between">
            {/* Brand Logo: DarkHUB */}
            <button 
              onClick={onBack}
              className="group focus:outline-none flex items-center text-left"
              title="DarkHUB"
            >
              <div className="relative inline-flex items-center text-[30px] sm:text-[36px] font-black tracking-tight text-black leading-none">
                <span className="relative pb-1">
                  Dark
                  <span className="absolute bottom-0 left-0 w-full h-[3.5px] bg-[#E50914]" />
                </span>
                <span className="relative pt-1 ml-0.5">
                  HUB
                  <span className="absolute top-0 left-0 w-full h-[3.5px] bg-[#E50914]" />
                </span>
              </div>
            </button>

            {/* Hamburger Menu Button */}
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
        </header>

        {/* Navigation Breadcrumb / Back Action */}
        <div className="max-w-xl mx-auto px-4 pt-3 pb-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-600 hover:text-black transition-colors"
          >
            ← Back to Home / Search
          </button>

          {onRespect && (
            <button
              onClick={() => onRespect(spammer.id)}
              className="px-3 py-1 bg-black text-white hover:bg-zinc-800 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-2xs"
            >
              <span>Respect</span>
              <span className="text-red-400 font-mono">+{spammer.respectCount}</span>
            </button>
          )}
        </div>

        {/* Main "Spammer Wiki" Card (Exact Replica of Uploaded Image) */}
        <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-2">
          <div className="bg-[#F7ECEB] rounded-3xl p-5 sm:p-6 shadow-xs border border-zinc-200/50 flex flex-col space-y-4">
            
            {/* Header: "Spammer Wiki" Centered with Divider Line */}
            <div className="text-center pb-3 border-b border-white/70">
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Spammer Wiki
              </h2>
            </div>

            {/* Profile Identity Row: Circular Avatar + Name, Team, Since info */}
            <div className="flex items-center gap-4 sm:gap-6 pt-2 pb-2">
              {/* Circular Avatar Photo */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-zinc-300 shadow-md shrink-0 bg-zinc-200">
                <img
                  src={avatarSrc}
                  alt={spammer.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder avatar if needed
                    (e.target as HTMLImageElement).src = '/raj_alamin.png';
                  }}
                />
              </div>

              {/* Identity Details */}
              <div className="flex flex-col justify-center text-left">
                <h3 className="text-2xl sm:text-[32px] font-black text-black leading-tight tracking-tight">
                  {spammer.name}
                </h3>

                <p className="text-base sm:text-lg font-medium text-black mt-1">
                  {spammer.team}
                </p>

                <p className="text-sm sm:text-base font-normal text-black mt-0.5">
                  {spammer.activePeriod}
                </p>

                {spammer.whatsapp && (
                  <p className="text-xs sm:text-sm font-medium text-emerald-900 mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Whatsapp : {spammer.whatsapp}</span>
                  </p>
                )}
              </div>
            </div>

            {/* "About" Section Title */}
            <div className="pt-2 text-left">
              <h4 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                About
              </h4>
            </div>

            {/* Large White Rounded Container with Bio Details */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 min-h-[340px] sm:min-h-[380px] shadow-2xs border border-zinc-200/60 flex flex-col justify-between space-y-4 text-left">
              <div className="space-y-4">
                {/* Biography (Single pristine render) */}
                <p className="text-sm sm:text-base text-zinc-900 leading-relaxed font-medium font-['Hind_Siliguri',sans-serif]">
                  {spammer.bioBangla || spammer.bioEnglish}
                </p>

                {/* Optional English Translation only if strictly distinct */}
                {spammer.bioEnglish &&
                  spammer.bioEnglish !== spammer.bioBangla &&
                  spammer.bioEnglish.trim().length > 0 && (
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-3">
                      {spammer.bioEnglish}
                    </p>
                  )}

                {/* Specializations Tags */}
                {spammer.specialty && spammer.specialty.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                      Expertise / অপারেশনাল দক্ষতা
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {spammer.specialty.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-md text-xs font-semibold text-zinc-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notable Operations */}
                {spammer.famousOperations && spammer.famousOperations.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                      ঐতিহাসিক অপারেশন ও সাফল্য
                    </span>
                    <div className="space-y-2">
                      {spammer.famousOperations.map((op, idx) => (
                        <div key={idx} className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/70 text-xs">
                          <span className="font-bold text-black">{op.title}</span>
                          <span className="text-zinc-500 ml-1.5 font-mono">({op.year})</span>
                          <p className="text-zinc-600 mt-0.5">{op.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Status and Verification Footer */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-zinc-700">Official DarkHUB Dossier</span>
                </div>
                <span className="font-mono text-[11px]">ID: {spammer.id}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
};
