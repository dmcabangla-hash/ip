import React, { useState } from 'react';
import { TeamProfile } from '../types';
import { getTeamLogoSrc } from '../utils/teamLogo';

interface TopTeamsViewProps {
  teams: TeamProfile[];
  onSelectTeam: (team: TeamProfile) => void;
  onRespectTeam?: (teamId: string) => void;
  lang?: 'bn' | 'en';
}

type TeamFilterCategory = 'All' | 'Legends' | 'Active' | 'Underground';

export const TopTeamsView: React.FC<TopTeamsViewProps> = ({
  teams,
  onSelectTeam,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TeamFilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter teams by category and search query
  const filteredTeams = teams.filter((t) => {
    // Category match
    const categoryMatch =
      selectedCategory === 'All' ||
      (selectedCategory === 'Legends' && t.status === 'Legendary') ||
      (selectedCategory === 'Active' && t.status === 'Active') ||
      (selectedCategory === 'Underground' && (t.status === 'Underground' || t.status === 'Retired'));

    // Search query match (name, alias, leader, whatsapp)
    const q = searchQuery.toLowerCase().trim();
    const queryMatch =
      q === '' ||
      t.name.toLowerCase().includes(q) ||
      t.alias.toLowerCase().includes(q) ||
      t.leader.toLowerCase().includes(q) ||
      (t.whatsapp && t.whatsapp.toLowerCase().includes(q));

    return categoryMatch && queryMatch;
  });

  return (
    <div className="w-full bg-[#FAF8F6] min-h-[calc(100vh-64px)] px-4 sm:px-6 py-5 select-none text-left">
      {/* 1. Header: Top Teams Title & Bangladesh National Flag (Exact Match) */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Top Teams
          </h1>
          <p className="text-sm font-normal text-zinc-900 mt-0.5">
            All Legendary Terms in one arena
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
        {(['All', 'Legends', 'Active', 'Underground'] as TeamFilterCategory[]).map((cat) => {
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

      {/* 4. Team Cards List (Matches Screenshot) */}
      <div className="mt-4 space-y-3.5 pb-10">
        {filteredTeams.map((team) => {
          const logoSrc = getTeamLogoSrc(team);
          const whatsappNumber = team.whatsapp || '+601114303075';
          const activePeriod = team.founded ? `Since ${team.founded} Till now` : 'Since 2014 Till now';

          return (
            <div
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className="bg-white rounded-2xl p-3.5 sm:p-4.5 border border-zinc-200/80 shadow-2xs flex items-center justify-between gap-3 text-left transition-all hover:border-zinc-300 cursor-pointer"
            >
              {/* Left: Avatar + Details */}
              <div className="flex items-center gap-3 sm:gap-4 flex-1">
                {/* Circular Avatar / Team Logo */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-zinc-800 bg-black shrink-0 shadow-2xs flex items-center justify-center p-0.5">
                  <img
                    src={logoSrc}
                    alt={team.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/nct_logo.svg';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="space-y-0.5">
                  <h3 className="text-xl sm:text-2xl font-black text-black leading-tight tracking-tight">
                    {team.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-black leading-snug">
                    Founder: {team.leader || 'Raj Alamin'}
                  </p>
                  <p className="text-xs sm:text-sm font-normal text-black leading-snug">
                    {activePeriod}
                  </p>
                  <p className="text-xs sm:text-sm font-normal text-black leading-snug">
                    Whatsapp : {whatsappNumber}
                  </p>
                </div>
              </div>

              {/* Right: Triangle Arrow Icon ▶ */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTeam(team);
                }}
                className="group p-2 flex items-center justify-center text-zinc-400 hover:text-black transition-colors shrink-0"
                aria-label={`View ${team.name} wiki`}
              >
                <svg
                  className="w-4 h-4 fill-zinc-400 group-hover:fill-black transition-colors"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          );
        })}

        {filteredTeams.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center border border-zinc-200 text-zinc-500 text-sm">
            কোনো টিম পাওয়া যায়নি। অন্য নাম দিয়ে অনুসন্ধান করুন।
          </div>
        )}
      </div>
    </div>
  );
};
