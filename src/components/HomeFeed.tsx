import React from 'react';
import { SpammerProfile, TeamProfile } from '../types';
import { TARGET_PILLARS } from '../data/initialData';

interface HomeFeedProps {
  searchQuery: string;
  teams: TeamProfile[];
  spammers: SpammerProfile[];
  onSelectTeam: (team: TeamProfile) => void;
  onSelectSpammer: (spammer: SpammerProfile) => void;
  onRespectTeam: (id: string) => void;
  onRespectSpammer: (id: string) => void;
  onNavigate: (page: any) => void;
  lang: 'bn' | 'en';
}

export const HomeFeed: React.FC<HomeFeedProps> = ({
  searchQuery,
  teams,
  spammers,
  onSelectTeam,
  onSelectSpammer,
  onRespectTeam,
  onRespectSpammer,
  onNavigate,
  lang,
}) => {
  const isSearching = searchQuery.trim().length > 0;
  const q = searchQuery.toLowerCase();

  const matchingSpammers = spammers.filter(
    (s) =>
      s.alias.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.team.toLowerCase().includes(q) ||
      s.origin.toLowerCase().includes(q)
  );

  const matchingTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.alias.toLowerCase().includes(q) ||
      t.leader.toLowerCase().includes(q)
  );

  const totalResults = matchingSpammers.length + matchingTeams.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      {/* Search Results Display if user has typed something */}
      {isSearching && (
        <div className="bg-zinc-50 border-2 border-black rounded-2xl p-5 sm:p-7 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <h3 className="text-lg font-black text-black">
                {lang === 'bn' ? `অনুসন্ধানের ফলাফল: "${searchQuery}"` : `Search Results for: "${searchQuery}"`}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-zinc-600 bg-white px-2.5 py-1 rounded border border-zinc-200">
              {totalResults} {lang === 'bn' ? 'টি ফলাফল' : 'Records Found'}
            </span>
          </div>

          {totalResults === 0 ? (
            <div className="py-8 text-center space-y-3">
              <p className="text-zinc-600 text-sm font-['Hind_Siliguri',sans-serif]">
                {lang === 'bn'
                  ? 'এই নামে এখনো কোনো রেকর্ড নেই। আপনি কি নিজের বা টিমের বায়োডাটা যুক্ত করতে চান?'
                  : 'No matching records found. Would you like to submit this alias to DarkHUB?'}
              </p>
              <button
                onClick={() => onNavigate('submit-biodata')}
                className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-red-700"
              >
                {lang === 'bn' ? '+ নতুন বায়োডাটা জমা দিন' : '+ Submit Bio-data Now'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Spammers results */}
              {matchingSpammers.map((spammer) => (
                <div
                  key={spammer.id}
                  onClick={() => onSelectSpammer(spammer)}
                  className="bg-white border border-zinc-200 hover:border-black rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-red-600 uppercase">
                      Spammer Profile
                    </span>
                    <h4 className="text-base font-black text-zinc-950 mt-0.5">
                      {spammer.alias}
                    </h4>
                    <p className="text-xs text-zinc-500 font-medium">
                      {spammer.team} · {spammer.origin}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-red-600">Dossier →</span>
                </div>
              ))}

              {/* Teams results */}
              {matchingTeams.map((team) => (
                <div
                  key={team.id}
                  onClick={() => onSelectTeam(team)}
                  className="bg-white border border-zinc-200 hover:border-black rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-black uppercase">
                      Cyber Team
                    </span>
                    <h4 className="text-base font-black text-zinc-950 mt-0.5">
                      {team.name} [{team.alias}]
                    </h4>
                    <p className="text-xs text-zinc-500 font-medium">
                      Leader: {team.leader} · Est. {team.founded}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-black">Archive →</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl">
        <div className="text-center p-2">
          <span className="block text-2xl sm:text-3xl font-black text-black tabular-nums">
            {teams.length}
          </span>
          <span className="text-xs font-bold text-zinc-500">
            {lang === 'bn' ? 'সংরক্ষিত টিম' : 'Archived Teams'}
          </span>
        </div>
        <div className="text-center p-2 border-l border-zinc-200">
          <span className="block text-2xl sm:text-3xl font-black text-black tabular-nums">
            {spammers.length}
          </span>
          <span className="text-xs font-bold text-zinc-500">
            {lang === 'bn' ? 'স্প্যামার বায়োডাটা' : 'Active Profiles'}
          </span>
        </div>
        <div className="text-center p-2 border-l-0 md:border-l border-zinc-200">
          <span className="block text-2xl sm:text-3xl font-black text-black tabular-nums">
            1,840+
          </span>
          <span className="text-xs font-bold text-zinc-500">
            {lang === 'bn' ? 'ঐতিহাসিক অপারেশন' : 'Recorded Ops'}
          </span>
        </div>
        <div className="text-center p-2 border-l border-zinc-200">
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-2xl sm:text-3xl font-black text-black tabular-nums">
              01
            </span>
          </div>
          <span className="text-xs font-bold text-zinc-500">
            {lang === 'bn' ? 'টোটাল অ্যাডমিন' : 'Total Admins'}
          </span>
        </div>
      </div>

      {/* Section 1: Featured Hall of Fame Spammers */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                {lang === 'bn' ? 'ঐতিহাসিক হল অব ফেম' : 'Hall of Fame Highlight'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 mt-0.5">
              {lang === 'bn' ? 'সেরা ইতিহাসখ্যাত স্প্যামারবৃন্দ' : 'Legendary Operatives'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('top-spammers')}
            className="text-xs font-bold text-black hover:text-red-600 transition-colors"
          >
            {lang === 'bn' ? 'সকল স্প্যামার দেখুন →' : 'View All Spammers →'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {spammers.slice(0, 3).map((spammer, idx) => (
            <div
              key={spammer.id}
              onClick={() => onSelectSpammer(spammer)}
              className="bg-white border border-zinc-200 hover:border-black rounded-xl p-5 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded">
                    Rank #{idx + 1}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    {spammer.origin}
                  </span>
                </div>
                <h3 className="text-lg font-black text-zinc-900 group-hover:text-red-600">
                  {spammer.alias}
                </h3>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                  {spammer.team} · {spammer.activePeriod}
                </p>
                <p className="mt-2 text-xs text-zinc-600 line-clamp-2 font-['Hind_Siliguri',sans-serif]">
                  {lang === 'bn' ? spammer.bioBangla : spammer.bioEnglish}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-bold text-red-600">
                  {lang === 'bn' ? 'প্রোফাইল' : 'Dossier'} →
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRespectSpammer(spammer.id);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-zinc-50 hover:bg-red-50 text-zinc-700 hover:text-red-600 border border-zinc-200 rounded-lg text-xs font-bold"
                >
                  <span>🫡 সালাম</span>
                  <span className="tabular-nums font-mono text-red-600 font-bold">
                    {spammer.respectCount}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Top Teams Spotlight */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                {lang === 'bn' ? 'ঐতিহাসিক সাইবার বাহিনী' : 'Cyber Armies & Syndicates'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 mt-0.5">
              {lang === 'bn' ? 'শীর্ষ সাইবার ও স্প্যামার টিম' : 'Prominent Syndicates'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('top-teams')}
            className="text-xs font-bold text-black hover:text-red-600 transition-colors"
          >
            {lang === 'bn' ? 'সকল টিম দেখুন →' : 'View All Teams →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teams.slice(0, 2).map((team, idx) => (
            <div
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className="bg-white border border-zinc-200 hover:border-black rounded-xl p-5 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black bg-black text-white px-2 py-0.5 rounded">
                    Rank #{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500">
                    Est. {team.founded} · {team.status}
                  </span>
                </div>
                <h3 className="text-lg font-black text-zinc-950">
                  {team.name} [{team.alias}]
                </h3>
                <p className="mt-2 text-xs text-zinc-600 line-clamp-2 font-['Hind_Siliguri',sans-serif]">
                  "{lang === 'bn' ? team.manifestoBangla : team.manifestoEnglish}"
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
                  <span>Leader: <strong className="text-zinc-900">{team.leader}</strong></span>
                  <span>Ops: <strong className="text-zinc-900">{team.totalOps}</strong></span>
                  <span>Members: <strong className="text-zinc-900">~{team.memberCount}+</strong></span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-bold text-red-600">
                  {lang === 'bn' ? 'টিম রেকর্ড দেখুন' : 'Full Dossier'} →
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRespectTeam(team.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 hover:bg-red-50 text-zinc-700 hover:text-red-600 border border-zinc-200 rounded-lg text-xs font-bold"
                >
                  <span>🏴 Respect</span>
                  <span className="tabular-nums font-mono text-red-600 font-bold">
                    {team.respectCount}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Target Domains Breakdown (Reflecting the 5 puppets) */}
      <section className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Operational Spheres
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-zinc-950 mt-0.5">
            {lang === 'bn' ? 'DarkHUB এর ৫টি মৌলিক প্রতিরক্ষা ক্ষেত্র' : 'The 5 Digital Spheres of Influence'}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl font-['Hind_Siliguri',sans-serif]">
            {lang === 'bn'
              ? 'আমাদের মূল স্ক্রিনে প্রদর্শিত ৫টি ক্যাটাগরি — যাদের ডিজিটাল স্বাধিকার ও সুরক্ষায় সাইবার স্প্যামার ও ডিফেন্ডাররা কাজ করে থাকেন।'
              : 'The 5 entities displayed in our hero marionette constellation across cyberspace.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {TARGET_PILLARS.map((p) => (
            <div key={p.id} className="bg-white border border-zinc-200 rounded-xl p-4 space-y-1.5 shadow-2xs">
              <span className="text-xs font-black text-black bg-zinc-100 px-2 py-0.5 rounded inline-block">
                {p.label}
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                {lang === 'bn' ? p.bengaliDescription : p.description}
              </p>
            </div>
          ))}
          {/* Sixth card: Submit CTA */}
          <div 
            onClick={() => onNavigate('submit-biodata')}
            className="bg-black text-white border border-black rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:bg-zinc-800 transition-colors"
          >
            <div>
              <span className="text-xs font-bold text-red-400">Join The Registry</span>
              <h4 className="text-sm font-black text-white mt-1">
                {lang === 'bn' ? 'নিজের নাম স্মরণীয় করে রাখো' : 'Submit Your Name or Team'}
              </h4>
            </div>
            <span className="text-xs font-bold text-red-400 mt-3 inline-block">
              {lang === 'bn' ? 'ফর্ম পূরণ করুন →' : 'Open Form →'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
