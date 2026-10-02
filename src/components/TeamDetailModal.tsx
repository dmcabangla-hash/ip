import React from 'react';
import { TeamProfile } from '../types';

interface TeamDetailModalProps {
  team: TeamProfile | null;
  onClose: () => void;
  onRespect: (id: string) => void;
  lang: 'bn' | 'en';
}

export const TeamDetailModal: React.FC<TeamDetailModalProps> = ({
  team,
  onClose,
  onRespect,
  lang,
}) => {
  if (!team) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#800000] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/90">
              TEAM ARCHIVE // {team.alias}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/90 hover:text-white rounded-lg hover:bg-white/10 text-xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Team Title */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                  {team.name}
                </h3>
                <span className="text-xs font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                  [{team.alias}]
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
                Founded {team.founded} · {team.origin} · {team.status}
              </p>
            </div>

            <button
              onClick={() => onRespect(team.id)}
              className="flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-black shadow-sm transition-all active:scale-95"
            >
              <span>🏴 Respect</span>
              <span className="font-mono tabular-nums text-red-400">
                {team.respectCount.toLocaleString()}
              </span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-center">
            <div>
              <span className="text-zinc-400 block font-medium">Archived Ops</span>
              <span className="text-lg font-black text-zinc-950 font-mono tabular-nums">{team.totalOps}</span>
            </div>
            <div className="border-x border-zinc-200">
              <span className="text-zinc-400 block font-medium">Operators</span>
              <span className="text-lg font-black text-zinc-950 font-mono tabular-nums">~{team.memberCount}+</span>
            </div>
            <div>
              <span className="text-zinc-400 block font-medium">Commander</span>
              <span className="text-sm font-bold text-zinc-900 block truncate">{team.leader}</span>
            </div>
          </div>

          {/* Team Manifesto */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-zinc-900 tracking-wider uppercase">
              {lang === 'bn' ? 'টিমের ম্যানিফেস্টো ও লক্ষ্য' : 'Team Manifesto'}
            </h4>
            <div className="p-4 rounded-xl bg-zinc-900 text-zinc-100 font-['Hind_Siliguri',sans-serif] text-sm leading-relaxed border-l-4 border-red-600">
              "{lang === 'bn' ? team.manifestoBangla : team.manifestoEnglish}"
            </div>
          </div>

          {/* Key Members / Roster */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-900 tracking-wider uppercase">
              {lang === 'bn' ? 'উল্লেখযোগ্য সদস্য ও অপারেটর' : 'Notable Operators'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {team.keyMembers.map((member) => (
                <span
                  key={member}
                  className="text-xs font-bold bg-zinc-100 text-zinc-800 border border-zinc-200 px-2.5 py-1 rounded-md"
                >
                  ⚡ {member}
                </span>
              ))}
            </div>
          </div>

          {/* Operational Log */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-900 tracking-wider uppercase">
              {lang === 'bn' ? 'ঐতিহাসিক অপারেশনাল রেকর্ড' : 'Archived Operations & Hits'}
            </h4>
            <div className="space-y-2">
              {team.notableOps.map((op, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-start gap-3 text-xs"
                >
                  <span className="font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    {op.year}
                  </span>
                  <div>
                    <span className="font-bold text-zinc-900 block">{op.opName}</span>
                    <span className="text-zinc-600 mt-0.5 block">{op.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
