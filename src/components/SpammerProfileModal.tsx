import React from 'react';
import { SpammerProfile } from '../types';

interface SpammerProfileModalProps {
  spammer: SpammerProfile | null;
  onClose: () => void;
  onRespect: (id: string) => void;
  lang: 'bn' | 'en';
}

export const SpammerProfileModal: React.FC<SpammerProfileModalProps> = ({
  spammer,
  onClose,
  onRespect,
  lang,
}) => {
  if (!spammer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header with Crimson styling */}
        <div className="bg-[#800000] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/90">
              DARKHUB HISTORICAL DOSSIER // {spammer.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/90 hover:text-white rounded-lg hover:bg-white/10 text-xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Operative Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                  {spammer.alias}
                </h3>
                {spammer.verified && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500 font-medium mt-0.5">
                {spammer.name !== spammer.alias ? `${spammer.name} · ` : ''}
                {spammer.origin}
              </p>
            </div>

            {/* Respect Button */}
            <button
              onClick={() => onRespect(spammer.id)}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black shadow-sm transition-all active:scale-95"
            >
              <span>🫡 সালাম</span>
              <span className="font-mono tabular-nums bg-black/20 px-1.5 py-0.5 rounded">
                {spammer.respectCount.toLocaleString()}
              </span>
            </button>
          </div>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs">
            <div>
              <span className="text-zinc-400 block font-medium">Team</span>
              <span className="font-bold text-zinc-900">{spammer.team}</span>
            </div>
            <div>
              <span className="text-zinc-400 block font-medium">Active Period</span>
              <span className="font-bold text-zinc-900">{spammer.activePeriod}</span>
            </div>
            <div>
              <span className="text-zinc-400 block font-medium">Status</span>
              <span className={`font-bold ${spammer.status === 'Legend' ? 'text-red-600' : 'text-zinc-900'}`}>
                {spammer.status}
              </span>
            </div>
          </div>

          {/* Bio / Manifesto */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-zinc-900 tracking-wider uppercase">
              {lang === 'bn' ? 'ঐতিহাসিক পরিচয় ও ভূমিকা' : 'Dossier Bio & Role'}
            </h4>
            <p className="text-sm text-zinc-700 leading-relaxed font-['Hind_Siliguri',sans-serif] bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
              {lang === 'bn' ? spammer.bioBangla : spammer.bioEnglish}
            </p>
          </div>

          {/* Tactical Specialties */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-900 tracking-wider uppercase">
              {lang === 'bn' ? 'দক্ষতা ও অপারেশনাল রোল' : 'Tactical Specialties'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {spammer.specialty.map((s) => (
                <span
                  key={s}
                  className="text-xs font-bold bg-black text-white px-2.5 py-1 rounded-md"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Historic Operations */}
          {spammer.famousOperations && spammer.famousOperations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-900 tracking-wider uppercase">
                {lang === 'bn' ? 'স্মরণীয় অপারেশনসমূহ' : 'Archived Operations'}
              </h4>
              <div className="space-y-2">
                {spammer.famousOperations.map((op, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-start gap-3 text-xs"
                  >
                    <span className="font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      {op.year}
                    </span>
                    <div>
                      <span className="font-bold text-zinc-900 block">{op.title}</span>
                      <span className="text-zinc-600 mt-0.5 block">{op.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact / Social Handles */}
          {spammer.socials && (spammer.socials.telegram || spammer.socials.facebook) && (
            <div className="pt-2 border-t border-zinc-200 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-zinc-400 font-medium">Handles:</span>
              {spammer.socials.telegram && (
                <span className="bg-sky-50 text-sky-800 font-semibold px-2 py-0.5 rounded border border-sky-200">
                  Telegram: {spammer.socials.telegram}
                </span>
              )}
              {spammer.socials.facebook && (
                <span className="bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded border border-blue-200">
                  Facebook: {spammer.socials.facebook}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
