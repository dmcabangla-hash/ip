import React, { useState, useEffect } from 'react';
import {
  UserAccount,
  UserBioSubmission,
  TeamBioSubmission,
  WorkSubmission,
  SpammerProfile,
  TeamProfile,
} from '../types';
import { getTeamLogoSrc } from '../utils/teamLogo';

interface UserDashboardViewProps {
  currentUser: UserAccount;
  onSignOut: () => void;
  onNavigateHome: () => void;
  onSubmitUserBio: (
    bio: Omit<UserBioSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>
  ) => void;
  onSubmitTeamBio: (
    team: Omit<TeamBioSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>
  ) => void;
  onSubmitWork?: (
    work: Omit<WorkSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status' | 'postViews' | 'postLink'>
  ) => void;
  works?: WorkSubmission[];
  currentSpammerProfile?: SpammerProfile | null;
  currentTeamProfile?: TeamProfile | null;
  onViewMyWiki?: (spammer: SpammerProfile) => void;
  onViewTeamWiki?: (team: TeamProfile) => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  currentUser,
  onSignOut,
  onNavigateHome,
  onSubmitUserBio,
  onSubmitTeamBio,
  currentSpammerProfile,
  currentTeamProfile,
  onViewMyWiki,
  onViewTeamWiki,
}) => {
  const [activeTab, setActiveTab] = useState<'submit-bio' | 'team-bio'>('submit-bio');
  const [notification, setNotification] = useState<string | null>(null);

  // -------------------------------------------------------------
  // USER BIO / ABOUT PAGE FORM STATE
  // -------------------------------------------------------------
  const [bioName, setBioName] = useState(
    currentSpammerProfile?.name || currentUser.name || 'Raj Alamin'
  );
  const [bioStartedOn, setBioStartedOn] = useState(
    currentSpammerProfile?.activePeriod
      ? currentSpammerProfile.activePeriod.replace(/[^0-9]/g, '').slice(0, 4) || '2014'
      : '2014'
  );
  const [bioSelectTeam, setBioSelectTeam] = useState(
    currentSpammerProfile?.team || 'National Cyber Team'
  );
  const [bioAboutYou, setBioAboutYou] = useState(
    currentSpammerProfile?.bioBangla ||
      currentSpammerProfile?.bioEnglish ||
      'ন্যাশনাল সাইবার টিমের অন্যতম প্রধান স্তম্ভ ও শীর্ষস্থানীয় সাইবার স্প্যামার। ২০১৪ সাল থেকে সাইবার স্পেসে দেশের সার্বভৌমত্ব রক্ষা ও অপশক্তির বিরুদ্ধে ঐক্যবদ্ধ প্রতিরোধ গড়ে তুলতে নেতৃত্ব দিচ্ছেন।'
  );
  const [bioWhatsapp, setBioWhatsapp] = useState(
    currentSpammerProfile?.whatsapp || '+601114303075'
  );
  const [bioProfileImage, setBioProfileImage] = useState<string | null>(
    currentSpammerProfile?.avatarUrl || currentUser.avatarUrl || '/raj_alamin.png'
  );

  // Spammer Notable Operations
  const [spammerOps, setSpammerOps] = useState<{ year: string; title: string; description: string }[]>(() => {
    if (currentSpammerProfile && currentSpammerProfile.famousOperations && currentSpammerProfile.famousOperations.length > 0) {
      return currentSpammerProfile.famousOperations;
    }
    return [
      {
        year: '2014',
        title: 'Founding Offensive',
        description: 'Established National Cyber Team and coordinated mass anti-scam defense.',
      },
      {
        year: '2018',
        title: 'Mass Impersonation Purge',
        description: 'Decommissioned 600+ fraud networks targeting creators and public figures.',
      },
      {
        year: '2023',
        title: 'Op Cyber Shield',
        description: 'Protected verified national assets and conducted decisive counter-strikes.',
      },
    ];
  });

  const [newSpammerOpYear, setNewSpammerOpYear] = useState('');
  const [newSpammerOpTitle, setNewSpammerOpTitle] = useState('');
  const [newSpammerOpDesc, setNewSpammerOpDesc] = useState('');

  const handleAddSpammerOp = () => {
    if (!newSpammerOpTitle.trim() || !newSpammerOpDesc.trim()) return;
    const op = {
      year: newSpammerOpYear.trim() || '2024',
      title: newSpammerOpTitle.trim(),
      description: newSpammerOpDesc.trim(),
    };
    setSpammerOps((prev) => [...prev, op]);
    setNewSpammerOpYear('');
    setNewSpammerOpTitle('');
    setNewSpammerOpDesc('');
  };

  const handleRemoveSpammerOp = (index: number) => {
    setSpammerOps((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (currentSpammerProfile) {
      setBioName(currentSpammerProfile.name);
      setBioSelectTeam(currentSpammerProfile.team);
      setBioAboutYou(currentSpammerProfile.bioBangla || currentSpammerProfile.bioEnglish);
      if (currentSpammerProfile.whatsapp) {
        setBioWhatsapp(currentSpammerProfile.whatsapp);
      }
      if (currentSpammerProfile.avatarUrl) {
        setBioProfileImage(currentSpammerProfile.avatarUrl);
      }
      if (currentSpammerProfile.famousOperations) {
        setSpammerOps(currentSpammerProfile.famousOperations);
      }
    }
  }, [currentSpammerProfile]);

  // -------------------------------------------------------------
  // TEAM BIO / ABOUT PAGE FORM STATE (Pre-populated from Team Wiki)
  // -------------------------------------------------------------
  const [teamName, setTeamName] = useState(
    currentTeamProfile?.name || 'National Cyber Team'
  );
  const [teamStartedOn, setTeamStartedOn] = useState(
    currentTeamProfile?.founded || '2024'
  );
  const [teamFounder, setTeamFounder] = useState(
    currentTeamProfile?.leader || currentUser.name || 'Raj Alamin'
  );
  const [teamWhatsapp, setTeamWhatsapp] = useState(
    currentTeamProfile?.whatsapp || '+601114303075'
  );
  const [teamAbout, setTeamAbout] = useState(
    currentTeamProfile?.manifestoBangla ||
      currentTeamProfile?.manifestoEnglish ||
      'ন্যাশনাল সাইবার টিম (National Cyber Team) সাইবার স্পেসে সত্য, সার্বভৌমত্ব ও ন্যায়বিচার প্রতিষ্ঠায় প্রতিষ্ঠিত শীর্ষস্থানীয় সাইবার প্রতিরোধ দল। আমরা কখনো মাথা নত করি না।'
  );
  const [teamProfileImage, setTeamProfileImage] = useState<string | null>(
    '/nct_logo.svg'
  );
  const [applyForTopTeam, setApplyForTopTeam] = useState(true);

  // Team Activists (এক্টিভিস্টবৃন্দ)
  const [teamActivists, setTeamActivists] = useState<string[]>(() => {
    if (currentTeamProfile && currentTeamProfile.keyMembers && currentTeamProfile.keyMembers.length > 0) {
      return currentTeamProfile.keyMembers;
    }
    return ['Raj Alamin', 'Cyber Ghost', 'Shadow Strike', 'Byte Striker'];
  });
  const [newActivistName, setNewActivistName] = useState('');
  const [teamMemberCount, setTeamMemberCount] = useState<number>(
    currentTeamProfile?.memberCount || 380
  );

  const handleAddActivist = () => {
    if (!newActivistName.trim()) return;
    if (teamActivists.includes(newActivistName.trim())) return;
    setTeamActivists((prev) => [...prev, newActivistName.trim()]);
    setNewActivistName('');
  };

  const handleRemoveActivist = (index: number) => {
    setTeamActivists((prev) => prev.filter((_, i) => i !== index));
  };

  // Team Notable Operations (ঐতিহাসিক অপারেশন ও সাফল্য)
  const [teamOps, setTeamOps] = useState<{ year: string; opName: string; impact: string }[]>(() => {
    if (currentTeamProfile && currentTeamProfile.notableOps) {
      return currentTeamProfile.notableOps;
    }
    return [
      {
        year: '2024',
        opName: 'National Guard Protocol',
        impact: 'Takedown of 500+ hostile spam and phishing links',
      },
      {
        year: '2025',
        opName: 'Cyber Sentinel 25',
        impact: 'Protected national cyberspace community infrastructure',
      },
    ];
  });

  const [newOpYear, setNewOpYear] = useState('');
  const [newOpName, setNewOpName] = useState('');
  const [newOpImpact, setNewOpImpact] = useState('');

  const handleAddOp = () => {
    if (!newOpName.trim() || !newOpImpact.trim()) return;
    const op = {
      year: newOpYear.trim() || '2024',
      opName: newOpName.trim(),
      impact: newOpImpact.trim(),
    };
    setTeamOps((prev) => [...prev, op]);
    setNewOpYear('');
    setNewOpName('');
    setNewOpImpact('');
  };

  const handleRemoveOp = (index: number) => {
    setTeamOps((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (currentTeamProfile) {
      setTeamName(currentTeamProfile.name);
      setTeamStartedOn(currentTeamProfile.founded);
      setTeamFounder(currentTeamProfile.leader);
      if (currentTeamProfile.whatsapp) {
        setTeamWhatsapp(currentTeamProfile.whatsapp);
      }
      setTeamAbout(currentTeamProfile.manifestoBangla || currentTeamProfile.manifestoEnglish);
      if (currentTeamProfile.notableOps) {
        setTeamOps(currentTeamProfile.notableOps);
      }
      if (currentTeamProfile.keyMembers && currentTeamProfile.keyMembers.length > 0) {
        setTeamActivists(currentTeamProfile.keyMembers);
      }
      if (currentTeamProfile.memberCount) {
        setTeamMemberCount(currentTeamProfile.memberCount);
      }
    }
  }, [currentTeamProfile]);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setter(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bioName.trim()) return;
    
    onSubmitUserBio({
      name: bioName.trim(),
      startedOn: bioStartedOn.trim(),
      selectTeam: bioSelectTeam.trim(),
      aboutYou: bioAboutYou.trim(),
      whatsapp: bioWhatsapp.trim(),
      profileImage: bioProfileImage || undefined,
      famousOperations: spammerOps,
    });
    
    setNotification('আপনার About Page / Spammer Wiki তথ্য ও অপারেশন সফলভাবে আপডেট হয়েছে!');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    onSubmitTeamBio({
      teamName: teamName.trim(),
      startedOn: teamStartedOn.trim(),
      founder: teamFounder.trim(),
      about: teamAbout.trim(),
      whatsapp: teamWhatsapp.trim(),
      profileImage: teamProfileImage || undefined,
      applyForTopTeam,
      memberCount: teamMemberCount,
      activists: teamActivists,
      notableOps: teamOps,
    });
    setNotification('আপনার Team Bio, এক্টিভিস্ট ও ঐতিহাসিক অপারেশন সফলভাবে আপডেট হয়েছে!');
    setTimeout(() => setNotification(null), 4000);
  };

  const activeAvatar = bioProfileImage || currentSpammerProfile?.avatarUrl || currentUser.avatarUrl || '/raj_alamin.png';
  const activeTeamLogo = teamProfileImage || getTeamLogoSrc(teamName);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between select-none">
      <div>
        {/* Top Header */}
        <header className="w-full bg-[#f4f4f4] select-none border-b border-zinc-200/50">
          <div className="w-full px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
            <button 
              onClick={onNavigateHome}
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

            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateHome}
                className="text-xs sm:text-sm font-bold text-zinc-700 hover:text-black transition-colors"
              >
                Home
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-400 bg-zinc-200">
                <img
                  src={activeAvatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Navigation Bar */}
        <div className="w-full bg-[#B20000] text-white select-none shadow-sm">
          <div className="max-w-xl mx-auto px-2 sm:px-4 flex items-center justify-between py-1 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('submit-bio')}
              className={`flex-1 py-2 px-1 text-center rounded-md transition-all whitespace-nowrap ${
                activeTab === 'submit-bio'
                  ? 'bg-[#980000] border border-white/60 shadow-xs'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              Submit Bio
            </button>

            <button
              onClick={() => setActiveTab('team-bio')}
              className={`flex-1 py-2 px-1 text-center rounded-md transition-all whitespace-nowrap ${
                activeTab === 'team-bio'
                  ? 'bg-[#980000] border border-white/60 shadow-xs'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              Team Bio
            </button>

            <button
              onClick={onSignOut}
              className="py-2 px-3 text-center rounded-md bg-[#800000] hover:bg-black/30 text-white/95 transition-all whitespace-nowrap border-l border-white/20"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Global Success Notification */}
        {notification && (
          <div className="w-full max-w-xl mx-auto px-4 py-2">
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold rounded-xl text-center shadow-xs animate-in fade-in duration-200">
              ✓ {notification}
            </div>
          </div>
        )}

        {/* TAB 1: Submit Bio Form & Spammer Wiki Operations */}
        {activeTab === 'submit-bio' && (
          <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-3 space-y-4">
            
            {/* Live Spammer Wiki Preview Card */}
            <div className="bg-[#FAF2F2] border-2 border-red-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-red-300 shrink-0 bg-zinc-200 shadow-sm">
                  <img
                    src={activeAvatar}
                    alt={bioName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                      Live on Spammer Wiki
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-black leading-tight">
                    {bioName}
                  </h3>
                  <p className="text-xs text-zinc-600 font-medium">
                    {bioSelectTeam} · Since {bioStartedOn} till now
                  </p>
                </div>
              </div>

              {onViewMyWiki && currentSpammerProfile && (
                <button
                  type="button"
                  onClick={() => onViewMyWiki(currentSpammerProfile)}
                  className="w-full sm:w-auto px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-2 shrink-0"
                >
                  <span>View About Page</span>
                  <span>→</span>
                </button>
              )}
            </div>

            {/* Submit Bio Edit Form */}
            <div className="bg-[#F7ECEB] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="border-b border-white/60 pb-2 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-black">
                    Submit / Edit Your Bio (About Page Info)
                  </h2>
                  <p className="text-xs text-zinc-600">
                    এখানে পূরণ করা তথ্যগুলো সরাসরি আপনার Spammer Wiki / About Page-এ যুক্ত হবে।
                  </p>
                </div>
              </div>

              <form onSubmit={handleBioSubmit} className="space-y-4">
                {/* Name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bioName}
                    onChange={(e) => setBioName(e.target.value)}
                    placeholder="Your Name (e.g. Raj Alamin)"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Started On */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    Started On
                  </label>
                  <input
                    type="text"
                    value={bioStartedOn}
                    onChange={(e) => setBioStartedOn(e.target.value)}
                    placeholder="Year (e.g. 2014)"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Select Team */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    Select Team
                  </label>
                  <input
                    type="text"
                    value={bioSelectTeam}
                    onChange={(e) => setBioSelectTeam(e.target.value)}
                    placeholder="Team Name (e.g. National Cyber Team or RDX Zone)"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* WhatsApp Number (Appears on Top Spammers & Spammer Wiki) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    WhatsApp No
                  </label>
                  <input
                    type="text"
                    value={bioWhatsapp}
                    onChange={(e) => setBioWhatsapp(e.target.value)}
                    placeholder="e.g. +601114303075"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* About You */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0 pt-1">
                    About You
                  </label>
                  <textarea
                    rows={5}
                    value={bioAboutYou}
                    onChange={(e) => setBioAboutYou(e.target.value)}
                    placeholder="Write detailed biography and historical cyber background..."
                    className="flex-1 p-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black leading-relaxed font-['Hind_Siliguri',sans-serif]"
                  />
                </div>

                {/* Profile Image (File Upload) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    Profile Image
                  </label>
                  <div className="flex-1 flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, setBioProfileImage)}
                      className="text-xs text-zinc-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-zinc-200 file:text-black hover:file:bg-zinc-300 cursor-pointer"
                    />
                    {bioProfileImage && (
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-400 shrink-0">
                        <img
                          src={bioProfileImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Spammer Wiki: ঐতিহাসিক অপারেশন ও সাফল্য (Operations Management) */}
                <div className="pt-3 border-t border-white/70 space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm sm:text-base font-bold text-black block">
                        ব্যক্তিগত ঐতিহাসিক অপারেশন ও সাফল্য
                      </label>
                      <span className="text-[11px] text-zinc-600 block">
                        আপনার পরিচালিত সফল সাইবার অপারেশনগুলো Spammer Wiki-তে প্রদর্শিত হবে।
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-black text-white text-[11px] font-bold rounded">
                      {spammerOps.length} টি অপারেশন
                    </span>
                  </div>

                  {/* Existing Spammer Operations List */}
                  <div className="space-y-2">
                    {spammerOps.map((op, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-xl border border-zinc-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-black text-white text-xs font-mono font-bold rounded">
                              {op.year}
                            </span>
                            <span className="font-black text-sm text-black">
                              {op.title}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-600 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                            {op.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveSpammerOp(idx)}
                          className="self-end sm:self-center px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0"
                          title="অপারেশন মুছে ফেলুন"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    ))}

                    {spammerOps.length === 0 && (
                      <div className="p-3 bg-white/60 rounded-lg text-center text-xs text-zinc-500 italic">
                        কোনো ব্যক্তিগত অপারেশন যোগ করা নেই। নিচে নতুন অপারেশন যোগ করুন।
                      </div>
                    )}
                  </div>

                  {/* Add New Spammer Operation */}
                  <div className="p-3 bg-white/80 border border-dashed border-zinc-400 rounded-xl space-y-2 text-left">
                    <span className="text-xs font-bold text-black flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-black" />
                      + নতুন ব্যক্তিগত অপারেশন যোগ করুন
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={newSpammerOpYear}
                        onChange={(e) => setNewSpammerOpYear(e.target.value)}
                        placeholder="বছর (e.g. 2024)"
                        className="h-9 px-2.5 bg-white rounded-md border border-zinc-300 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black"
                      />
                      <input
                        type="text"
                        value={newSpammerOpTitle}
                        onChange={(e) => setNewSpammerOpTitle(e.target.value)}
                        placeholder="অপারেশনের শিরোনাম (e.g. Mass Botnet Purge)"
                        className="h-9 px-2.5 bg-white rounded-md border border-zinc-300 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black sm:col-span-2"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={newSpammerOpDesc}
                        onChange={(e) => setNewSpammerOpDesc(e.target.value)}
                        placeholder="অপারেশনের বর্ণনা ও সফলতা (e.g. ৩০০+ ভুয়া পেজ অপসারণ)"
                        className="flex-1 h-9 px-2.5 bg-white rounded-md border border-zinc-300 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black font-['Hind_Siliguri',sans-serif]"
                      />
                      <button
                        type="button"
                        onClick={handleAddSpammerOp}
                        className="px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-md shrink-0 active:scale-95 transition-all"
                      >
                        + Add Op
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit / Update Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-end">
                  {onViewMyWiki && currentSpammerProfile && (
                    <button
                      type="button"
                      onClick={() => onViewMyWiki(currentSpammerProfile)}
                      className="w-full sm:w-auto px-4 py-2 border border-black text-black font-bold text-xs sm:text-sm rounded-md hover:bg-black/5"
                    >
                      Preview About Page
                    </button>
                  )}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-md active:scale-95 transition-all shadow-xs"
                  >
                    Save & Update About Info
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: Team Bio Form & Live Team Wiki Preview */}
        {activeTab === 'team-bio' && (
          <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-3 space-y-4">
            
            {/* Live Team Wiki Preview Card */}
            <div className="bg-[#FAF2F2] border-2 border-red-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-800 bg-black shrink-0 shadow-sm flex items-center justify-center">
                  <img
                    src={activeTeamLogo}
                    alt={teamName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/nct_logo.svg';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
                      Live on Team Wiki
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-black leading-tight">
                    {teamName}
                  </h3>
                  <p className="text-xs text-zinc-600 font-medium">
                    Since {teamStartedOn} · Leader: {teamFounder}
                  </p>
                </div>
              </div>

              {onViewTeamWiki && currentTeamProfile && (
                <button
                  type="button"
                  onClick={() => onViewTeamWiki(currentTeamProfile)}
                  className="w-full sm:w-auto px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-2 shrink-0"
                >
                  <span>View Team Wiki</span>
                  <span>→</span>
                </button>
              )}
            </div>

            {/* Team Bio Edit Form */}
            <div className="bg-[#F7ECEB] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="border-b border-white/60 pb-2 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-black">
                    Submit / Edit Team Bio (Team Wiki Info)
                  </h2>
                  <p className="text-xs text-zinc-600">
                    এখানে পূরণ করা তথ্যগুলো সরাসরি আপনার টিমের Team Wiki / About Page-এ প্রদর্শিত হবে।
                  </p>
                </div>
              </div>

              <form onSubmit={handleTeamSubmit} className="space-y-4">
                {/* Team Name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    Team Name
                  </label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter your team name (e.g. National Cyber Team)"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Started On */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    Started On
                  </label>
                  <input
                    type="text"
                    value={teamStartedOn}
                    onChange={(e) => setTeamStartedOn(e.target.value)}
                    placeholder="Founded Year (e.g. 2024)"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Founder */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    Founder / Lead
                  </label>
                  <input
                    type="text"
                    value={teamFounder}
                    onChange={(e) => setTeamFounder(e.target.value)}
                    placeholder="Founder or Commander Name"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Team WhatsApp Number (Appears on Top Teams & Team Wiki) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    WhatsApp No
                  </label>
                  <input
                    type="text"
                    value={teamWhatsapp}
                    onChange={(e) => setTeamWhatsapp(e.target.value)}
                    placeholder="e.g. +601114303075"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* About */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0 pt-1">
                    About
                  </label>
                  <textarea
                    rows={5}
                    value={teamAbout}
                    onChange={(e) => setTeamAbout(e.target.value)}
                    placeholder="Team manifesto, mission, operations history and cyber impact..."
                    className="flex-1 p-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black leading-relaxed font-['Hind_Siliguri',sans-serif]"
                  />
                </div>

                {/* Team Profile Image */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    Team Logo
                  </label>
                  <div className="flex-1 flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, setTeamProfileImage)}
                      className="text-xs text-zinc-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-zinc-200 file:text-black hover:file:bg-zinc-300 cursor-pointer"
                    />
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-700 bg-black shrink-0 flex items-center justify-center">
                      <img
                        src={activeTeamLogo}
                        alt="Logo Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* টিমের এক্টিভিস্টবৃন্দ ও সক্রিয় সদস্য সংখ্যা (Team Activists & Member Count) */}
                <div className="pt-3 border-t border-white/70 space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm sm:text-base font-bold text-black block">
                        টিমের এক্টিভিস্ট ও সদস্য ব্যবস্থাপনা
                      </label>
                      <span className="text-[11px] text-zinc-600 block">
                        টিমের শীর্ষ এক্টিভিস্টদের নাম যোগ করুন, যা Team Wiki-তে প্রকাশিত হবে।
                      </span>
                    </div>
                  </div>

                  {/* Member Count Input */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-xs font-bold text-zinc-700 w-32 shrink-0">
                      সক্রিয় সদস্য সংখ্যা:
                    </label>
                    <input
                      type="number"
                      value={teamMemberCount}
                      onChange={(e) => setTeamMemberCount(parseInt(e.target.value) || 0)}
                      className="w-32 h-9 px-2.5 bg-white rounded-md border border-zinc-300 text-xs font-mono font-bold text-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <span className="text-xs text-zinc-500">+ Members</span>
                  </div>

                  {/* Activists Tags List */}
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                      বর্তমান এক্টিভিস্টবৃন্দ ({teamActivists.length}):
                    </label>
                    <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-white/70 border border-zinc-300 rounded-lg">
                      {teamActivists.map((act, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-red-100 text-red-900 border border-red-200 text-xs font-bold rounded-md flex items-center gap-1.5 shadow-2xs"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          <span>{act}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveActivist(idx)}
                            className="text-red-500 hover:text-red-800 ml-1 font-bold text-xs"
                            title="মুছে ফেলুন"
                          >
                            ✕
                          </button>
                        </span>
                      ))}

                      {teamActivists.length === 0 && (
                        <span className="text-xs text-zinc-400 italic">
                          কোনো এক্টিভিস্ট যোগ করা নেই। নিচে নাম লিখে যোগ করুন।
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add New Activist */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newActivistName}
                      onChange={(e) => setNewActivistName(e.target.value)}
                      placeholder="নতুন এক্টিভিস্টের নাম (যেমন: Shadow Strike, Cyber Hunter)"
                      className="flex-1 h-9 px-2.5 bg-white rounded-md border border-zinc-300 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddActivist();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddActivist}
                      className="px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-md shrink-0 active:scale-95 transition-all"
                    >
                      + Add এক্টিভিস্ট
                    </button>
                  </div>
                </div>

                {/* ঐতিহাসিক অপারেশন ও সাফল্য (Notable Operations & Successes) */}
                <div className="pt-3 border-t border-white/70 space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm sm:text-base font-bold text-black block">
                        টিমের ঐতিহাসিক অপারেশন ও সাফল্য
                      </label>
                      <span className="text-[11px] text-zinc-600 block">
                        আপনার টিমের সফল সাইবার অপারেশনগুলো টিম উইকিতে প্রদর্শন করার জন্য নিচে পরিবর্তন ও যোগ করুন।
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-black text-white text-[11px] font-bold rounded">
                      {teamOps.length} টি অপারেশন
                    </span>
                  </div>

                  {/* Existing Operations List */}
                  <div className="space-y-2">
                    {teamOps.map((op, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-xl border border-zinc-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-mono font-bold rounded">
                              {op.year}
                            </span>
                            <span className="font-black text-sm text-black">
                              {op.opName}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-600 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                            {op.impact}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveOp(idx)}
                          className="self-end sm:self-center px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0"
                          title="অপারেশন মুছে ফেলুন"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    ))}

                    {teamOps.length === 0 && (
                      <div className="p-3 bg-white/60 rounded-lg text-center text-xs text-zinc-500 italic">
                        বর্তমানে কোনো অপারেশন যোগ করা নেই। নিচে নতুন অপারেশন যোগ করুন।
                      </div>
                    )}
                  </div>

                  {/* Add New Operation Box */}
                  <div className="p-3.5 bg-white/80 border border-dashed border-zinc-400 rounded-xl space-y-2.5 text-left">
                    <span className="text-xs font-bold text-black flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      + নতুন অপারেশন যুক্ত করুন
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={newOpYear}
                        onChange={(e) => setNewOpYear(e.target.value)}
                        placeholder="বছর (যেমন: 2026)"
                        className="h-9 px-2.5 bg-white rounded-md border border-zinc-300 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black"
                      />
                      <input
                        type="text"
                        value={newOpName}
                        onChange={(e) => setNewOpName(e.target.value)}
                        placeholder="অপারেশনের নাম (যেমন: Operation Cyber Sentinel)"
                        className="h-9 px-2.5 bg-white rounded-md border border-zinc-300 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black sm:col-span-2"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={newOpImpact}
                        onChange={(e) => setNewOpImpact(e.target.value)}
                        placeholder="সাফল্য ও প্রভাব (যেমন: ৫০০+ ক্ষতিকর বটনেট ও ফিশিং সার্ভার নিষ্ক্রিয়)"
                        className="flex-1 h-9 px-2.5 bg-white rounded-md border border-zinc-300 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black font-['Hind_Siliguri',sans-serif]"
                      />
                      <button
                        type="button"
                        onClick={handleAddOp}
                        className="px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-md shrink-0 active:scale-95 transition-all"
                      >
                        + Add Op
                      </button>
                    </div>
                  </div>
                </div>

                {/* Checkbox: Apply for Top Team */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="applyTopTeam"
                    checked={applyForTopTeam}
                    onChange={(e) => setApplyForTopTeam(e.target.checked)}
                    className="w-4 h-4 rounded text-black focus:ring-black"
                  />
                  <label htmlFor="applyTopTeam" className="text-sm font-bold text-black cursor-pointer">
                    Apply for Top Team Directory (শীর্ষ টিম তালিকাভুক্তির জন্য আবেদন)
                  </label>
                </div>

                {/* Submit / Update Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-end">
                  {onViewTeamWiki && currentTeamProfile && (
                    <button
                      type="button"
                      onClick={() => onViewTeamWiki(currentTeamProfile)}
                      className="w-full sm:w-auto px-4 py-2 border border-black text-black font-bold text-xs sm:text-sm rounded-md hover:bg-black/5"
                    >
                      Preview Team Wiki
                    </button>
                  )}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-md active:scale-95 transition-all shadow-xs"
                  >
                    Save & Update Team Bio
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>

      <div className="h-6" />
    </div>
  );
};
