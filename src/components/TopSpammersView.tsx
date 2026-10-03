import React, { useState } from 'react';
import { SpammerProfile } from '../types';

interface TopSpammersViewProps {
  spammers: SpammerProfile[];
  onSelectSpammer: (spammer: SpammerProfile) => void;
  onRespectSpammer?: (spammerId: string) => void;
  lang?: 'bn' | 'en';
}

type SpammerFilterCategory = 'All' | 'Legends' | 'Active' | 'Underground';

export const TopSpammersView: React.FC<TopSpammersViewProps> = ({
  spammers,
  onSelectSpammer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SpammerFilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter spammers by search query and category (Legends, Active, Underground)
  const filteredSpammers = spammers.filter((s) => {
    // Category match
    const categoryMatch =
      selectedCategory === 'All' ||
      (selectedCategory === 'Legends' && s.status === 'Legend') ||
      (selectedCategory === 'Active' && s.status === 'Active') ||
      (selectedCategory === 'Underground' && (s.status === 'Undercover' || s.status === 'Inactive'));

    // Search query match (name, alias, team, or whatsapp)
    const q = searchQuery.toLowerCase().trim();
    const queryMatch =
      q === '' ||
      s.name.toLowerCase().includes(q) ||
      s.alias.toLowerCase().includes(q) ||
      s.team.toLowerCase().includes(q) ||
      (s.whatsapp && s.whatsapp.toLowerCase().includes(q));

    return categoryMatch && queryMatch;
  });

  return (
    <div className="w-full bg-[#FAF8F6] min-h-[calc(100vh-64px)] px-4 sm:px-6 py-5 select-none text-left">
      {/* 1. Header: Top Spammers Title & Bangladesh Flag */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Top Spammers
          </h1>
          <p className="text-sm font-normal text-zinc-900 mt-0.5">
            All Legends in one place
          </p>
        </div>

        {/* Bangladesh National Flag Badge (Matches Screenshot) */}
        <div className="w-16 h-10 sm:w-18 sm:h-11 bg-[#006a4e] rounded-xs relative flex items-center justify-center shrink-0 shadow-2xs border border-zinc-200/50">
          <div className="w-6 h-6 rounded-full bg-[#f42a41] shadow-2xs" />
        </div>
      </div>

      {/* 2. Search Bar with bordered magnifying glass icon */}
      <div className="mt-4 flex items-center rounded-lg border border-zinc-400 bg-white overflow-hidden shadow-2xs focus-within:border-black transition-colors">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your name"
          className="flex-1 h-11 px-3.5 text-sm sm:text-base text-black placeholder:text-zinc-400 focus:outline-none"
        />
        <div className="w-11 h-11 border-l border-zinc-400 flex items-center justify-center text-zinc-800 shrink-0">
          <svg
            className="w-5 h-5 text-black stroke-[2.2]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>

      {/* 3. Filter Buttons: All, Legends, Active, Underground */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {(['All', 'Legends', 'Active', 'Underground'] as SpammerFilterCategory[]).map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1 text-xs sm:text-sm font-bold rounded-md border transition-all whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-[#333333] text-white border-zinc-900 shadow-2xs'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 4. Spammer Cards List */}
      <div className="mt-4 space-y-3.5 pb-10">
        {filteredSpammers.map((spammer) => {
          const avatar = spammer.avatarUrl || '/raj_alamin.png';
          const whatsappNumber = spammer.whatsapp || '+601114303075';

          return (
            <div
              key={spammer.id}
              className="bg-white rounded-2xl p-3.5 sm:p-4.5 border border-zinc-200/80 shadow-2xs flex items-center justify-between gap-3 text-left transition-all hover:border-zinc-300"
            >
              {/* Left: Avatar + Details */}
              <div 
                onClick={() => onSelectSpammer(spammer)}
                className="flex items-center gap-3 sm:gap-4 flex-1 cursor-pointer"
              >
                {/* Circular Avatar */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border border-zinc-300 bg-zinc-100 shrink-0 shadow-2xs">
                  <img
                    src={avatar}
                    alt={spammer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/raj_alamin.png';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="space-y-0.5">
                  <h3 className="text-xl sm:text-2xl font-black text-black leading-tight tracking-tight">
                    {spammer.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-black leading-snug">
                    {spammer.team}
                  </p>
                  <p className="text-xs sm:text-sm font-normal text-black leading-snug">
                    {spammer.activePeriod || 'Since 2014 Till now'}
                  </p>
                  <p className="text-xs sm:text-sm font-normal text-black leading-snug">
                    Whatsapp : {whatsappNumber}
                  </p>
                </div>
              </div>

              {/* Right: "View wiki ▶" Button */}
              <button
                type="button"
                onClick={() => onSelectSpammer(spammer)}
                className="group flex items-center gap-1 text-zinc-400 hover:text-black font-bold text-xs sm:text-sm whitespace-nowrap pl-2 pr-1 py-2 transition-colors cursor-pointer shrink-0"
              >
                <span>View wiki</span>
                <svg
                  className="w-3.5 h-3.5 fill-zinc-400 group-hover:fill-black transition-colors"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          );
        })}

        {filteredSpammers.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center border border-zinc-200 text-zinc-500 text-sm">
            কোনো স্প্যামার পাওয়া যায়নি। অন্য নাম দিয়ে অনুসন্ধান করুন।
          </div>
        )}
      </div>
    </div>
  );
};
