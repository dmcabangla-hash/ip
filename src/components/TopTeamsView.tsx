import React, { useState } from 'react';
import { TeamProfile } from '../types';

interface TopTeamsViewProps {
  teams: TeamProfile[];
  onSelectTeam: (team: TeamProfile) => void;
  onRespectTeam: (teamId: string) => void;
  lang: 'bn' | 'en';
}

export const TopTeamsView: React.FC<TopTeamsViewProps> = ({
  teams,
  onSelectTeam,
  onRespectTeam,
  lang,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredTeams = teams
    .filter((t) => {
      const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
      const matchesQuery =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.alias.toLowerCase().includes(search.toLowerCase()) ||
        t.leader.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesQuery;
    })
    .sort((a, b) => b.respectCount - a.respectCount);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-bold text-red-600 tracking-wider uppercase">
              {lang === 'bn' ? 'ঐতিহাসিক সাইবার টিম তালিকা' : 'Historic Cyber Teams'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1">
            {lang === 'bn' ? 'শীর্ষ স্প্যামার ও সাইবার টিমসমূহ' : 'Top Teams & Syndicates'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl font-['Hind_Siliguri',sans-serif]">
            {lang === 'bn'
              ? 'অতীত থেকে আজ অবধি সাইবার ময়দানে নেতৃত্ব দেওয়া ঐতিহাসিক দলগুলোর রেকর্ড ও তাদের কার্যক্রম।'
              : 'Historical archive of cyber groups, underground syndicates, and mass report teams.'}
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Legendary', 'Active', 'Underground'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filterStatus === status
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Internal Search bar */}
      <div className="mt-6 mb-8 max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === 'bn' ? 'টিমের নাম দিয়ে ফিল্টার করুন...' : 'Filter by team name or leader...'}
          className="w-full px-3.5 py-2 text-xs sm:text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredTeams.map((team, idx) => {
          const rank = idx + 1;
          const isTopThree = rank <= 3;

          return (
            <div
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className="group cursor-pointer bg-white border border-zinc-200 hover:border-black rounded-xl p-5 sm:p-6 transition-all duration-200 hover:shadow-md relative flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Rank & Status */}
                <div className="flex items-center justify-between gap-3 text-xs mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-md flex items-center justify-center font-black tabular-nums ${
                        isTopThree
                          ? 'bg-black text-white'
                          : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      #{rank}
                    </span>
                    <span className="font-extrabold text-zinc-900 text-sm tracking-tight">
                      [{team.alias}]
                    </span>
                  </div>
                  
                  {/* Clean unboxed metadata separator per anti-slop guidelines */}
                  <div className="flex items-center gap-1.5 text-zinc-500 font-medium text-xs">
                    <span>Est. {team.founded}</span>
                    <span aria-hidden="true">·</span>
                    <span className={team.status === 'Legendary' ? 'text-red-600 font-bold' : ''}>
                      {team.status}
                    </span>
                  </div>
                </div>

                {/* Team Name */}
                <h3 className="text-lg sm:text-xl font-black text-zinc-950 group-hover:text-red-600 transition-colors">
                  {team.name}
                </h3>

                {/* Manifesto */}
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                  "{lang === 'bn' ? team.manifestoBangla : team.manifestoEnglish}"
                </p>

                {/* Operations & Key Stats */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-4 text-xs text-zinc-600">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Leader</span>
                    <span className="font-semibold text-zinc-900">{team.leader}</span>
                  </div>
                  <div className="border-l border-zinc-200 pl-4">
                    <span className="text-zinc-400 block text-[10px]">Members</span>
                    <span className="font-semibold text-zinc-900 tabular-nums">~{team.memberCount}+</span>
                  </div>
                  <div className="border-l border-zinc-200 pl-4">
                    <span className="text-zinc-400 block text-[10px]">Archived Ops</span>
                    <span className="font-semibold text-zinc-900 tabular-nums">{team.totalOps}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-bold text-red-600 group-hover:underline">
                  {lang === 'bn' ? 'পূর্ণাঙ্গ রেকর্ড দেখুন →' : 'View Full Dossier →'}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRespectTeam(team.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 hover:bg-red-50 text-zinc-700 hover:text-red-700 border border-zinc-200 rounded-lg text-xs font-bold transition-all active:scale-95"
                >
                  <span>🏴 Respect</span>
                  <span className="font-mono tabular-nums text-red-600 font-extrabold">
                    {team.respectCount.toLocaleString()}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
