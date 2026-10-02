import React, { useState, useRef } from 'react';
import { UserAccount, UserBioSubmission, TeamBioSubmission, WorkSubmission } from '../types';

interface UserDashboardViewProps {
  currentUser: UserAccount;
  onSignOut: () => void;
  onNavigateHome: () => void;
  onSubmitUserBio: (bio: Omit<UserBioSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>) => void;
  onSubmitTeamBio: (bio: Omit<TeamBioSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>) => void;
  onSubmitWork: (work: Omit<WorkSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status' | 'postViews' | 'postLink'>) => void;
  works: WorkSubmission[];
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  currentUser,
  onSignOut,
  onNavigateHome,
  onSubmitUserBio,
  onSubmitTeamBio,
  onSubmitWork,
  works,
}) => {
  const [activeTab, setActiveTab] = useState<'submit-bio' | 'team-bio' | 'submit-work'>('submit-bio');

  // Submit Bio Form State (Image 5)
  const [bioName, setBioName] = useState(currentUser.name || 'Raj Alamin');
  const [bioStartedOn, setBioStartedOn] = useState('2018');
  const [bioSelectTeam, setBioSelectTeam] = useState('Dark Shadow Hackers');
  const [bioAboutYou, setBioAboutYou] = useState('Cyber defense and mass reporting specialist.');
  const [bioProfileImage, setBioProfileImage] = useState<string>('');

  // Team Bio Form State (Image 6)
  const [teamName, setTeamName] = useState('');
  const [teamStartedOn, setTeamStartedOn] = useState('2020');
  const [teamFounder, setTeamFounder] = useState('');
  const [teamAbout, setTeamAbout] = useState('');
  const [teamProfileImage, setTeamProfileImage] = useState<string>('');
  const [applyForTopTeam, setApplyForTopTeam] = useState(false);

  // Submit Work Form State (Image 7)
  const [workTitle, setWorkTitle] = useState('');
  const [workPlatform, setWorkPlatform] = useState('Facebook');
  const [workType, setWorkType] = useState('ID Suspension / Mass Report');
  const [workSuccessDate, setWorkSuccessDate] = useState('2026-10-02');
  const [workSelectTeam, setWorkSelectTeam] = useState('Dark Shadow Hackers');
  const [workVictimUrl, setWorkVictimUrl] = useState('');
  const [workScreenShot, setWorkScreenShot] = useState<string>('');

  // Status feedback
  const [notification, setNotification] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // File Upload Handlers
  const bioFileRef = useRef<HTMLInputElement>(null);
  const teamFileRef = useRef<HTMLInputElement>(null);
  const workFileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
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
      profileImage: bioProfileImage || undefined,
    });
    setNotification('Your Bio has been submitted for approval!');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    onSubmitTeamBio({
      teamName: teamName.trim(),
      startedOn: teamStartedOn.trim(),
      founder: teamFounder.trim(),
      about: teamAbout.trim(),
      profileImage: teamProfileImage || undefined,
      applyForTopTeam,
    });
    setNotification('Team Bio submitted for approval!');
    setTeamName('');
    setTeamFounder('');
    setTeamAbout('');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleWorkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workTitle.trim()) return;
    onSubmitWork({
      title: workTitle.trim(),
      selectPlatform: workPlatform.trim(),
      typeOfWork: workType.trim(),
      successDate: workSuccessDate.trim(),
      selectTeam: workSelectTeam.trim(),
      victimUrl: workVictimUrl.trim(),
      screenShotUrl: workScreenShot || undefined,
    });
    setNotification('Work submission recorded in Contributions!');
    setWorkTitle('');
    setWorkVictimUrl('');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Default avatar image (matching the photo of Raj Alamin with sunglasses)
  const defaultAvatar = currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between select-none">
      <div>
        {/* Header strictly matching Image 5, 6, 7 */}
        <header className="w-full bg-[#f4f4f4] select-none border-b border-zinc-200/50">
          <div className="w-full px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
            {/* DarkHUB Logo */}
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

            {/* Circular User Profile Avatar (Matches Image 5, 6, 7) */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-300 shadow-xs cursor-pointer">
              <img
                src={defaultAvatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </header>

        {/* Greeting Banner */}
        <div className="w-full max-w-xl mx-auto px-4 pt-4 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
            Welcome {currentUser.name || 'Raj Alamin'}
          </h2>
        </div>

        {/* Navigation Tab Bar (Matches Image 5, 6, 7) */}
        <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-2">
          <div className="bg-[#800000] text-white rounded-lg p-1 flex items-center justify-between shadow-md text-xs sm:text-sm font-bold">
            {/* Submit Bio Tab */}
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

            {/* Team Bio Tab */}
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

            {/* Submit Work Tab */}
            <button
              onClick={() => setActiveTab('submit-work')}
              className={`flex-1 py-2 px-1 text-center rounded-md transition-all whitespace-nowrap ${
                activeTab === 'submit-work'
                  ? 'bg-[#980000] border border-white/60 shadow-xs'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              Submit Work
            </button>

            {/* Sign Out Button */}
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

        {/* TAB 1: Submit Bio Form (Exact replica of Image 5) */}
        {activeTab === 'submit-bio' && (
          <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-3">
            <div className="bg-[#F7ECEB] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
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
                    placeholder="Team Name (e.g. Bangladesh Cyber Army)"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* About You */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0 pt-1">
                    About You
                  </label>
                  <textarea
                    rows={6}
                    value={bioAboutYou}
                    onChange={(e) => setBioAboutYou(e.target.value)}
                    className="flex-1 p-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Select Profile (Square Upload Box matching Image 5) */}
                <div className="pt-2">
                  <label className="block text-sm sm:text-base font-bold text-black mb-2">
                    Select Profile
                  </label>
                  <input
                    type="file"
                    ref={bioFileRef}
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setBioProfileImage)}
                    className="hidden"
                  />
                  <div
                    onClick={() => bioFileRef.current?.click()}
                    className="w-36 h-36 bg-white rounded-md border border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 active:scale-98 transition-all overflow-hidden shadow-2xs"
                  >
                    {bioProfileImage ? (
                      <img
                        src={bioProfileImage}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-zinc-400 font-semibold text-base">
                        Upload
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit for Approval Button */}
                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#800000] text-white font-bold rounded-lg hover:bg-[#960000] active:scale-95 transition-all shadow-md text-sm sm:text-base"
                  >
                    Submit for Approval
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: Team Bio Form (Exact replica of Image 6) */}
        {activeTab === 'team-bio' && (
          <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-3">
            <div className="bg-[#F7ECEB] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
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
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Founder */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0">
                    Founder
                  </label>
                  <input
                    type="text"
                    value={teamFounder}
                    onChange={(e) => setTeamFounder(e.target.value)}
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* About */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <label className="w-28 text-sm sm:text-base font-bold text-black shrink-0 pt-1">
                    About
                  </label>
                  <textarea
                    rows={6}
                    value={teamAbout}
                    onChange={(e) => setTeamAbout(e.target.value)}
                    className="flex-1 p-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Select Profile (Square Upload Box matching Image 6) */}
                <div className="pt-2">
                  <label className="block text-sm sm:text-base font-bold text-black mb-2">
                    Select Profile
                  </label>
                  <input
                    type="file"
                    ref={teamFileRef}
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setTeamProfileImage)}
                    className="hidden"
                  />
                  <div
                    onClick={() => teamFileRef.current?.click()}
                    className="w-36 h-36 bg-white rounded-md border border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 active:scale-98 transition-all overflow-hidden shadow-2xs"
                  >
                    {teamProfileImage ? (
                      <img
                        src={teamProfileImage}
                        alt="Team Logo Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-zinc-400 font-semibold text-base">
                        Upload
                      </span>
                    )}
                  </div>
                </div>

                {/* Apply for Top Team Checkbox (Matches Image 6) */}
                <div className="pt-3 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="applyTopTeam"
                    checked={applyForTopTeam}
                    onChange={(e) => setApplyForTopTeam(e.target.checked)}
                    className="w-5 h-5 rounded border-zinc-300 text-red-600 focus:ring-red-500 cursor-pointer"
                  />
                  <label
                    htmlFor="applyTopTeam"
                    className="text-sm sm:text-base font-bold text-black cursor-pointer"
                  >
                    Apply for Top Team <span className="font-normal text-zinc-600">( Optional )</span>
                  </label>
                </div>

                {/* Submit for Approval Button */}
                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#800000] text-white font-bold rounded-lg hover:bg-[#960000] active:scale-95 transition-all shadow-md text-sm sm:text-base"
                  >
                    Submit for Approval
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: Submit Work + Contributions (Exact replica of Image 7) */}
        {activeTab === 'submit-work' && (
          <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-3 space-y-5">
            {/* Upper Work Form Card */}
            <div className="bg-[#F7ECEB] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <form onSubmit={handleWorkSubmit} className="space-y-3.5">
                {/* Title */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-32 text-sm sm:text-base font-bold text-black shrink-0">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={workTitle}
                    onChange={(e) => setWorkTitle(e.target.value)}
                    placeholder="e.g. Anik এর আইডি সাসপেন্ড করেছি"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Select Platform */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-32 text-sm sm:text-base font-bold text-black shrink-0">
                    Select Platform
                  </label>
                  <input
                    type="text"
                    value={workPlatform}
                    onChange={(e) => setWorkPlatform(e.target.value)}
                    placeholder="Facebook / Instagram / Web"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Type of Work */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-32 text-sm sm:text-base font-bold text-black shrink-0">
                    Type of Work
                  </label>
                  <input
                    type="text"
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    placeholder="Mass Report / Deface / Recon"
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Success Date */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-32 text-sm sm:text-base font-bold text-black shrink-0">
                    Success Date
                  </label>
                  <input
                    type="text"
                    value={workSuccessDate}
                    onChange={(e) => setWorkSuccessDate(e.target.value)}
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Select Team */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-32 text-sm sm:text-base font-bold text-black shrink-0">
                    Select Team
                  </label>
                  <input
                    type="text"
                    value={workSelectTeam}
                    onChange={(e) => setWorkSelectTeam(e.target.value)}
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Victim Url */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <label className="w-32 text-sm sm:text-base font-bold text-black shrink-0">
                    Victim Url
                  </label>
                  <input
                    type="text"
                    value={workVictimUrl}
                    onChange={(e) => setWorkVictimUrl(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="flex-1 h-9 sm:h-10 px-3 bg-white rounded-md border border-zinc-200 text-black font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Screen Shot: Upload Files button (Matches Image 7) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pt-1">
                  <label className="w-32 text-sm sm:text-base font-bold text-black shrink-0">
                    Screen Shot
                  </label>
                  <input
                    type="file"
                    ref={workFileRef}
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setWorkScreenShot)}
                    className="hidden"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => workFileRef.current?.click()}
                      className="px-4 py-2 bg-white rounded-md border border-zinc-300 text-zinc-600 font-semibold text-sm hover:bg-zinc-50 active:scale-95 transition-all shadow-2xs"
                    >
                      Upload Files
                    </button>
                    {workScreenShot && (
                      <span className="text-xs font-bold text-emerald-700">
                        ✓ Screenshot Attached
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit Button (Matches Image 7) */}
                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="px-12 py-2.5 bg-[#800000] text-white font-black text-xl rounded-xl hover:bg-[#960000] active:scale-95 transition-all shadow-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Lower Card: Contributions Table (Matches Image 7) */}
            <div className="bg-[#F7ECEB] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <h3 className="text-xl font-bold text-black text-center">
                Contributions
              </h3>

              {/* Red Divider Line */}
              <div className="w-full h-[2px] bg-red-500" />

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-black">
                  <thead>
                    <tr className="border-b border-zinc-300/80">
                      <th className="pb-3 font-bold text-base">Title</th>
                      <th className="pb-3 font-bold text-base text-center">Post Views</th>
                      <th className="pb-3 font-bold text-base text-right">Post link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {works.map((item) => (
                      <tr key={item.id} className="hover:bg-black/5 transition-colors">
                        <td className="py-3.5 pr-2 font-medium max-w-[180px] sm:max-w-xs truncate">
                          {item.title}
                        </td>
                        <td className="py-3.5 px-2 text-center font-mono font-semibold tabular-nums">
                          {item.postViews}
                        </td>
                        <td className="py-3.5 pl-2 text-right">
                          <button
                            onClick={() => handleCopyLink(item.postLink, item.id)}
                            className="px-4 py-1 bg-white border border-zinc-300 hover:border-black rounded-md text-xs font-bold text-black shadow-2xs active:scale-95 transition-all"
                          >
                            {copiedId === item.id ? 'Copied!' : 'Copy'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-6" />
    </div>
  );
};
