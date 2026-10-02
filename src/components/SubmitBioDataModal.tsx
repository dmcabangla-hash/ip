import React, { useState } from 'react';
import { SpammerProfile, SpammerSpecialty, TeamProfile } from '../types';

interface SubmitBioDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSpammer: (spammer: SpammerProfile) => void;
  onSubmitTeam: (team: TeamProfile) => void;
  lang: 'bn' | 'en';
}

const AVAILABLE_SPECIALTIES: SpammerSpecialty[] = [
  'Mass Report',
  'Social Engineering',
  'Traffic Flooding / DDoS',
  'Page Takeover',
  'Deface & Recon',
  'Botnet & Automation',
  'OSINT & Doxx',
  'Account Recovery & Defense',
];

export const SubmitBioDataModal: React.FC<SubmitBioDataModalProps> = ({
  isOpen,
  onClose,
  onSubmitSpammer,
  onSubmitTeam,
  lang,
}) => {
  const [submissionType, setSubmissionType] = useState<'spammer' | 'team'>('spammer');

  // Spammer Form State
  const [alias, setAlias] = useState('');
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [origin, setOrigin] = useState('Dhaka, Bangladesh');
  const [activePeriod, setActivePeriod] = useState('2020 - Present');
  const [selectedSpecialties, setSelectedSpecialties] = useState<SpammerSpecialty[]>(['Mass Report']);
  const [bioBangla, setBioBangla] = useState('');
  const [bioEnglish, setBioEnglish] = useState('');
  const [opTitle, setOpTitle] = useState('');
  const [opYear, setOpYear] = useState('2023');
  const [opDesc, setOpDesc] = useState('');
  const [telegram, setTelegram] = useState('');
  const [facebook, setFacebook] = useState('');

  // Team Form State
  const [teamName, setTeamName] = useState('');
  const [teamAlias, setTeamAlias] = useState('');
  const [founded, setFounded] = useState('2018');
  const [leader, setLeader] = useState('');
  const [memberCount, setMemberCount] = useState(25);
  const [teamManifesto, setTeamManifesto] = useState('');

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleSpecialty = (spec: SpammerSpecialty) => {
    if (selectedSpecialties.includes(spec)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== spec));
    } else {
      setSelectedSpecialties([...selectedSpecialties, spec]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionType === 'spammer') {
      if (!alias.trim()) return;
      const newSpammer: SpammerProfile = {
        id: `spammer-${Date.now()}`,
        alias: alias.trim(),
        name: name.trim() || alias.trim(),
        team: team.trim() || 'Independent Operator',
        origin: origin.trim() || 'Bangladesh',
        activePeriod: activePeriod.trim() || 'Active',
        specialty: selectedSpecialties.length > 0 ? selectedSpecialties : ['Mass Report'],
        status: 'Active',
        respectCount: 1,
        verified: true,
        bioBangla: bioBangla.trim() || 'DarkHUB আর্কাইভে সংরক্ষিত ঐতিহাসিক স্প্যামার প্রোফাইল।',
        bioEnglish: bioEnglish.trim() || 'Preserved official cyber operative bio-data in DarkHUB.',
        famousOperations: opTitle.trim()
          ? [{ year: opYear, title: opTitle, description: opDesc || 'Operational success.' }]
          : [],
        socials: {
          telegram: telegram.trim() || undefined,
          facebook: facebook.trim() || undefined,
        },
        submittedAt: new Date().toISOString(),
      };
      onSubmitSpammer(newSpammer);
    } else {
      if (!teamName.trim()) return;
      const newTeam: TeamProfile = {
        id: `team-${Date.now()}`,
        name: teamName.trim(),
        alias: teamAlias.trim() || teamName.slice(0, 3).toUpperCase(),
        founded: founded.trim() || '2024',
        origin: origin.trim() || 'Bangladesh',
        status: 'Active',
        memberCount: Number(memberCount) || 10,
        totalOps: 1,
        respectCount: 1,
        manifestoBangla: teamManifesto.trim() || 'আমরা সাইবার স্পেসে সত্য ও অধিকারের পক্ষে অটল।',
        manifestoEnglish: teamManifesto.trim() || 'Unbowed, unbroken cyber operations.',
        leader: leader.trim() || 'Commander',
        keyMembers: [leader.trim() || 'Commander'],
        notableOps: opTitle.trim()
          ? [{ year: opYear, opName: opTitle, impact: opDesc || 'Notable achievement.' }]
          : [],
      };
      onSubmitTeam(newTeam);
    }

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#800000] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-xl font-black tracking-tight">
                {lang === 'bn' ? 'বায়োডাটা বা প্রোফাইল জমা দিন' : 'Submit Bio-data / Profile'}
              </h3>
            </div>
            <p className="text-xs text-white/80 mt-0.5">
              {lang === 'bn' 
                ? 'DarkHUB এর ইতিহাস আর্কাইভে নিজের বা টিমের নাম স্থায়ী করে রাখুন' 
                : 'Immortalize your alias and team in the DarkHUB historical registry'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/90 hover:text-white rounded-lg hover:bg-white/10 text-xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Success Confirmation Toast */}
        {submittedSuccess ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
              ✓
            </div>
            <h4 className="text-2xl font-black text-zinc-900">
              {lang === 'bn' ? 'বায়োডাটা সফলভাবে সংরক্ষিত হয়েছে!' : 'Bio-data Recorded Successfully!'}
            </h4>
            <p className="text-sm text-zinc-600 max-w-md mx-auto">
              {lang === 'bn'
                ? 'আপনার প্রোফাইল এখন DarkHUB এর মূল আর্কাইভে যুক্ত হয়েছে এবং তাৎক্ষণিক সার্চ করা যাবে।'
                : 'Your profile is now permanently logged in the DarkHUB records and searchable immediately.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Category Toggle: Individual Spammer vs Team */}
            <div className="flex p-1 bg-zinc-100 rounded-xl">
              <button
                type="button"
                onClick={() => setSubmissionType('spammer')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  submissionType === 'spammer' 
                    ? 'bg-black text-white shadow-sm' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                {lang === 'bn' ? '👤 স্প্যামার বায়োডাটা' : '👤 Individual Spammer'}
              </button>
              <button
                type="button"
                onClick={() => setSubmissionType('team')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  submissionType === 'team' 
                    ? 'bg-black text-white shadow-sm' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                {lang === 'bn' ? '🛡️ সাইবার টিম বায়োডাটা' : '🛡️ Cyber Team Profile'}
              </button>
            </div>

            {submissionType === 'spammer' ? (
              <>
                {/* Spammer Primary Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {lang === 'bn' ? 'অ্যালিয়াস / কোডনেম *' : 'Spammer Alias / Codename *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                      placeholder="e.g. Shadow Hunter, Cyber Fox"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {lang === 'bn' ? 'টিম বা অ্যাফিলিয়েশন' : 'Team / Affiliation'}
                    </label>
                    <input
                      type="text"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                      placeholder="e.g. Bangladesh Cyber Army, Independent"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {lang === 'bn' ? 'অঞ্চল / দেশ' : 'Origin / Location'}
                    </label>
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {lang === 'bn' ? 'সক্রিয় সময়কাল' : 'Active Period'}
                    </label>
                    <input
                      type="text"
                      value={activePeriod}
                      onChange={(e) => setActivePeriod(e.target.value)}
                      placeholder="e.g. 2018 - Present"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Specialties Multi-select */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                    {lang === 'bn' ? 'বিশেষ দক্ষতা ও রোলসমূহ' : 'Specialty / Tactical Roles'}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_SPECIALTIES.map((spec) => {
                      const isSelected = selectedSpecialties.includes(spec);
                      return (
                        <button
                          key={spec}
                          type="button"
                          onClick={() => toggleSpecialty(spec)}
                          className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                            isSelected 
                              ? 'bg-red-600 text-white shadow-xs' 
                              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {spec}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bio text */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    {lang === 'bn' ? 'সংক্ষিপ্ত পরিচয় / বায়ো (বাংলা)' : 'Bio / History (Bangla/English)'}
                  </label>
                  <textarea
                    rows={2}
                    value={bioBangla}
                    onChange={(e) => setBioBangla(e.target.value)}
                    placeholder={lang === 'bn' ? 'স্প্যামিং জগতে আপনার পথচলা ও অর্জন সম্পর্কে লিখুন...' : 'Write about your journey, cyber defense stance, or achievements...'}
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none font-['Hind_Siliguri',sans-serif]"
                  />
                </div>

                {/* Notable Operation */}
                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {lang === 'bn' ? 'ঐতিহাসিক অপারেশন বা সাফল্য (ঐচ্ছিক)' : 'Historic Operation or Highlight (Optional)'}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={opYear}
                      onChange={(e) => setOpYear(e.target.value)}
                      placeholder="Year (e.g. 2022)"
                      className="px-2.5 py-1.5 text-xs border border-zinc-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      value={opTitle}
                      onChange={(e) => setOpTitle(e.target.value)}
                      placeholder="Op Name (e.g. Op Clean Sweep)"
                      className="col-span-2 px-2.5 py-1.5 text-xs border border-zinc-300 rounded-md bg-white"
                    />
                  </div>
                  <input
                    type="text"
                    value={opDesc}
                    onChange={(e) => setOpDesc(e.target.value)}
                    placeholder="Short outcome / impact description"
                    className="w-full px-2.5 py-1.5 text-xs border border-zinc-300 rounded-md bg-white"
                  />
                </div>

                {/* Social Handles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Telegram Handle</label>
                    <input
                      type="text"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      placeholder="@username"
                      className="w-full px-3 py-1.5 text-xs border border-zinc-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Facebook ID / Handle</label>
                    <input
                      type="text"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      placeholder="fb.com/yourhandle"
                      className="w-full px-3 py-1.5 text-xs border border-zinc-300 rounded-lg"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Team Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {lang === 'bn' ? 'টিমের পুরো নাম *' : 'Team Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. Cyber 71, Dark Shadow"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {lang === 'bn' ? 'সংক্ষিপ্ত রূপ (Alias / Tag)' : 'Short Tag / Alias'}
                    </label>
                    <input
                      type="text"
                      value={teamAlias}
                      onChange={(e) => setTeamAlias(e.target.value)}
                      placeholder="e.g. C71, BCA, DSH"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">প্রতিষ্ঠা সাল</label>
                    <input
                      type="text"
                      value={founded}
                      onChange={(e) => setFounded(e.target.value)}
                      placeholder="2016"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">টিম লিডার</label>
                    <input
                      type="text"
                      value={leader}
                      onChange={(e) => setLeader(e.target.value)}
                      placeholder="Leader alias"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">আনুমানিক সদস্য</label>
                    <input
                      type="number"
                      value={memberCount}
                      onChange={(e) => setMemberCount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    {lang === 'bn' ? 'টিম ম্যানিফেস্টো / লক্ষ্য' : 'Team Manifesto / Motto'}
                  </label>
                  <textarea
                    rows={2}
                    value={teamManifesto}
                    onChange={(e) => setTeamManifesto(e.target.value)}
                    placeholder="We spammers never bow down..."
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg font-['Hind_Siliguri',sans-serif]"
                  />
                </div>
              </>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 rounded-lg"
              >
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#800000] hover:bg-[#960000] text-white text-xs sm:text-sm font-black rounded-lg shadow-md transition-all active:scale-98"
              >
                {lang === 'bn' ? 'বায়োডাটা আর্কাইভ করুন' : 'Record in DarkHUB'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
