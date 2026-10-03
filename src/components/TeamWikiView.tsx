import React from 'react';
import { TeamProfile } from '../types';

interface TeamWikiViewProps {
  team: TeamProfile;
  onBack: () => void;
  onOpenMenu: () => void;
  onRespect?: (id: string) => void;
}

export const TeamWikiView: React.FC<TeamWikiViewProps> = ({
  team,
  onBack,
  onOpenMenu,
  onRespect,
}) => {
  // Use custom team logo if available, or nct_logo.svg for National Cyber Team
  const teamLogoSrc =
    team.id === 'team-nct' || team.name.toLowerCase().includes('national cyber')
      ? '/nct_logo.svg'
      : '/nct_logo.svg';

  const foundedYear = team.founded || '2024';

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
              onClick={() => onRespect(team.id)}
              className="px-3 py-1 bg-black text-white hover:bg-zinc-800 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-2xs"
            >
              <span>Respect</span>
              <span className="text-red-400 font-mono">+{team.respectCount}</span>
            </button>
          )}
        </div>

        {/* Main "Team Wiki" Card (Exact Replica of Uploaded Screenshot) */}
        <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-2">
          <div className="bg-[#F7ECEB] rounded-3xl p-5 sm:p-6 shadow-xs border border-zinc-200/50 flex flex-col space-y-3">
            
            {/* 1. Header: "Team Wiki" Centered with Divider Line (Exact match) */}
            <div className="text-center pb-2.5 border-b border-white/70">
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Team Wiki
              </h2>
            </div>

            {/* 2. Team Identity: Centered Team Name + Circular Logo + "Since 2024" (Exact match) */}
            <div className="flex flex-col items-center justify-center pt-2 pb-2 text-center">
              {/* Centered Team Name */}
              <h3 className="text-2xl sm:text-[30px] font-black text-black leading-tight tracking-tight px-2">
                {team.name}
              </h3>

              {/* Centered Circular Team Logo */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-zinc-800 shadow-lg bg-black my-2.5 shrink-0 flex items-center justify-center">
                <img
                  src={teamLogoSrc}
                  alt={team.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/nct_logo.svg';
                  }}
                />
              </div>

              {/* Centered "Since [Year]" */}
              <p className="text-base sm:text-lg font-medium text-black tracking-tight">
                Since {foundedYear}
              </p>
            </div>

            {/* 3. "About" Section Title (Exact match) */}
            <div className="pt-2 text-left">
              <h4 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                About
              </h4>
            </div>

            {/* 4. Large White Rounded Container with Bio Details (Exact match) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 min-h-[340px] sm:min-h-[380px] shadow-2xs border border-zinc-200/60 flex flex-col justify-between space-y-4 text-left">
              <div className="space-y-4">
                {/* Team Manifesto / Description (Single clean render) */}
                <p className="text-sm sm:text-base text-zinc-900 leading-relaxed font-medium font-['Hind_Siliguri',sans-serif]">
                  {team.manifestoBangla ||
                    team.manifestoEnglish ||
                    `${team.name} বাংলাদেশের সাইবার স্পেসে সত্য, ন্যায়বিচার ও জাতীয় সার্বভৌমত্ব রক্ষায় প্রতিষ্ঠিত একটি শীর্ষস্থানীয় সাইবার টিম। সাইবার স্প্যামিং প্রতিরোধ, ভুয়া ও ক্ষতিকর আইডি/পেজ অপসারণ এবং ডিজিটাল আক্রমণ প্রতিহত করতে টিমটি অবিচল ভূমিকা পালন করে আসছে।`}
                </p>

                {/* Optional Distinct English Manifesto only if different from Bangla */}
                {team.manifestoEnglish &&
                  team.manifestoEnglish !== team.manifestoBangla &&
                  team.manifestoEnglish.trim().length > 0 && (
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-3">
                      {team.manifestoEnglish}
                    </p>
                  )}

                {/* Team Leadership & Key Members Count */}
                <div className="pt-2 border-t border-zinc-100">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/60">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                        Commander / Founder
                      </span>
                      <span className="font-black text-black text-sm mt-0.5 block">
                        {team.leader || 'Raj Alamin'}
                      </span>
                    </div>

                    <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/60">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                        Active Operatives
                      </span>
                      <span className="font-black text-black text-sm mt-0.5 block">
                        {team.memberCount || 380}+ Members
                      </span>
                    </div>
                  </div>
                </div>

                {/* Team Activists / এক্টিভিস্টবৃন্দ List */}
                {team.keyMembers && team.keyMembers.length > 0 && (
                  <div className="pt-2 border-t border-zinc-100">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                      Team Activists / এক্টিভিস্টবৃন্দ ({team.keyMembers.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {team.keyMembers.map((member, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-red-50 border border-red-200 text-red-900 rounded-md text-xs font-bold flex items-center gap-1 shadow-2xs"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notable Operations */}
                {team.notableOps && team.notableOps.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                      ঐতিহাসিক অপারেশন ও সাফল্য
                    </span>
                    <div className="space-y-2">
                      {team.notableOps.map((op, idx) => (
                        <div key={idx} className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/70 text-xs">
                          <span className="font-bold text-black">{op.opName}</span>
                          <span className="text-zinc-500 ml-1.5 font-mono">({op.year})</span>
                          <p className="text-zinc-600 mt-0.5">{op.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Status and Verification Footer */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <span className="font-bold text-zinc-800">Verified DarkHUB Cyber Legion</span>
                </div>
                <span className="font-mono text-[11px]">ID: {team.id}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
};
