import React, { useState } from 'react';
import { SpammerProfile, SpammerSpecialty } from '../types';

interface TopSpammersViewProps {
  spammers: SpammerProfile[];
  onSelectSpammer: (spammer: SpammerProfile) => void;
  onRespectSpammer: (spammerId: string) => void;
  lang: 'bn' | 'en';
}

const SPECIALTY_FILTERS: (SpammerSpecialty | 'All')[] = [
  'All',
  'Mass Report',
  'Traffic Flooding / DDoS',
  'Page Takeover',
  'Deface & Recon',
  'Botnet & Automation',
  'OSINT & Doxx',
];

export const TopSpammersView: React.FC<TopSpammersViewProps> = ({
  spammers,
  onSelectSpammer,
  onRespectSpammer,
  lang,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filteredSpammers = spammers
    .filter((s) => {
      const matchesSpec =
        selectedSpecialty === 'All' || s.specialty.includes(selectedSpecialty as SpammerSpecialty);
      const matchesQuery =
        s.alias.toLowerCase().includes(query.toLowerCase()) ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.team.toLowerCase().includes(query.toLowerCase());
      return matchesSpec && matchesQuery;
    })
    .sort((a, b) => b.respectCount - a.respectCount);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-bold text-red-600 tracking-wider uppercase">
              {lang === 'bn' ? 'হল অব ফেম ও কিংবদন্তি' : 'Hall of Fame & Operatives'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1">
            {lang === 'bn' ? 'শীর্ষ ইতিহাসখ্যাত স্প্যামারবৃন্দ' : 'Top Spammers & Tacticians'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl font-['Hind_Siliguri',sans-serif]">
            {lang === 'bn'
              ? 'সাইবার স্পেসে মাস রিপোর্ট, ট্রাফিক নিয়ন্ত্রণ ও নিরাপত্তা সুরক্ষায় স্মরণীয় স্প্যামারদের তালিকা।'
              : 'Verified records of legendary cyber operatives, mass reporters, and system tacticians.'}
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'স্প্যামার বা টিম খুঁজুন...' : 'Search spammer alias...'}
            className="w-full px-3.5 py-2 text-xs sm:text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>
      </div>

      {/* Specialty Filter Bar */}
      <div className="py-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {SPECIALTY_FILTERS.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedSpecialty === spec
                ? 'bg-black text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Spammer Cards Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredSpammers.map((spammer, idx) => {
          const rank = idx + 1;
          const isTopThree = rank <= 3;

          return (
            <div
              key={spammer.id}
              onClick={() => onSelectSpammer(spammer)}
              className="group cursor-pointer bg-white border border-zinc-200 hover:border-black rounded-xl p-5 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Top Bar inside card: Rank, Status, Verified badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-black tabular-nums ${
                        isTopThree ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      #{rank}
                    </span>
                    <span className="text-xs font-bold text-zinc-500">
                      {spammer.origin}
                    </span>
                  </div>

                  {spammer.status === 'Legend' && (
                    <span className="text-[11px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      LEGEND
                    </span>
                  )}
                </div>

                {/* Alias & Real Name */}
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-black text-zinc-950 group-hover:text-red-600 transition-colors">
                    {spammer.alias}
                  </h3>
                  {spammer.verified && (
                    <span className="text-emerald-600 text-xs font-bold" title="Verified Operative">
                      ✓
                    </span>
                  )}
                </div>

                {/* Team Affiliation & Active Period */}
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1 font-medium">
                  <span className="text-zinc-900 font-semibold">{spammer.team}</span>
                  <span aria-hidden="true">·</span>
                  <span>{spammer.activePeriod}</span>
                </div>

                {/* Bio snippet */}
                <p className="mt-3 text-xs text-zinc-600 line-clamp-3 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                  {lang === 'bn' ? spammer.bioBangla : spammer.bioEnglish}
                </p>

                {/* Specialties tags */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {spammer.specialty.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-bold text-red-600 group-hover:underline">
                  {lang === 'bn' ? 'প্রোফাইল দেখুন →' : 'View Profile →'}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRespectSpammer(spammer.id);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-zinc-50 hover:bg-red-50 text-zinc-700 hover:text-red-700 border border-zinc-200 rounded-lg text-xs font-bold transition-all active:scale-95"
                >
                  <span>🫡 সালাম</span>
                  <span className="font-mono tabular-nums text-red-600 font-bold">
                    {spammer.respectCount.toLocaleString()}
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
