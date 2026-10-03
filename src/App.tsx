import { useState, useEffect } from 'react';
import {
  ActivePage,
  SpammerProfile,
  TeamProfile,
  UserAccount,
  UserBioSubmission,
  TeamBioSubmission,
  WorkSubmission,
} from './types';
import { INITIAL_SPAMMERS, INITIAL_TEAMS, TARGET_PILLARS } from './data/initialData';
import { Header } from './components/Header';
import { DrawerMenu } from './components/DrawerMenu';
import { HeroPuppetSection, SearchSuggestionItem } from './components/HeroPuppetSection';
import { SpammerWikiView } from './components/SpammerWikiView';
import { TeamWikiView } from './components/TeamWikiView';
import { SignInView } from './components/SignInView';
import { RegistrationView } from './components/RegistrationView';
import { UserDashboardView } from './components/UserDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { TopTeamsView } from './components/TopTeamsView';
import { TopSpammersView } from './components/TopSpammersView';
import { SpammerProfileModal } from './components/SpammerProfileModal';
import { TeamDetailModal } from './components/TeamDetailModal';
import { AboutView } from './components/AboutView';
import { LegalView } from './components/LegalViews';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryPillar, setActiveCategoryPillar] = useState<string | null>(null);

  // Modals for detail inspection
  const [selectedSpammerModal, setSelectedSpammerModal] = useState<SpammerProfile | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamProfile | null>(null);

  // -------------------------------------------------------------
  // USER ACCOUNTS & AUTH STATE
  // -------------------------------------------------------------
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_users_v5');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'user-admin',
        name: 'DarkHUB Admin',
        email: 'admin@darkhub.com',
        role: 'admin',
        status: 'active',
        registeredAt: '2026-01-01',
      },
      {
        id: 'user-raj-nct',
        name: 'Raj Alamin',
        email: 'rajalamin@darkhub.com',
        role: 'user',
        status: 'active',
        avatarUrl: '/raj_alamin.png',
        registeredAt: '2014-06-15',
      },
      {
        id: 'user-raj-rdx',
        name: 'Raj Alamin',
        email: 'raj.rdx@darkhub.com',
        role: 'user',
        status: 'active',
        avatarUrl: '/raj_alamin.png',
        registeredAt: '2018-03-20',
      },
    ];
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('darkhub_current_user_v5');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('darkhub_users_v5', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('darkhub_current_user_v5', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('darkhub_current_user_v5');
    }
  }, [currentUser]);

  // -------------------------------------------------------------
  // SUBMISSIONS STATE (User Bios, Team Bios, Works)
  // -------------------------------------------------------------
  const [bioSubmissions, setBioSubmissions] = useState<UserBioSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_user_bios_v5');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'bio-1',
        userId: 'user-raj-nct',
        userName: 'Raj Alamin',
        name: 'Raj Alamin',
        startedOn: '2014',
        selectTeam: 'National Cyber Team',
        aboutYou: 'National Cyber Team (NCT) এর অন্যতম প্রতিষ্ঠাতা সদস্য ও ফ্রন্টলাইন কমান্ডার। ২০১৪ সাল থেকে সাইবার স্পেসে দেশের সার্বভৌমত্ব রক্ষা ও অপশক্তির বিরুদ্ধে সাইবার আক্রমণ প্রতিহত করে আসছেন।',
        famousOperations: [
          { year: '2014', title: 'Founding Offensive', description: 'Established National Cyber Team and coordinated mass anti-scam defense.' },
          { year: '2018', title: 'Mass Impersonation Purge', description: 'Decommissioned 600+ fraud networks targeting creators and public figures.' },
          { year: '2023', title: 'Op Cyber Shield', description: 'Protected verified national assets and conducted decisive counter-strikes.' }
        ],
        status: 'approved',
        submittedAt: '2026-10-01',
      },
    ];
  });

  const [teamSubmissions, setTeamSubmissions] = useState<TeamBioSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_team_bios_v5');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'team-sub-nct',
        userId: 'user-raj-nct',
        userName: 'Raj Alamin',
        teamName: 'National Cyber Team',
        startedOn: '2024',
        founder: 'Raj Alamin',
        about: 'National Cyber Team (NCT) সাইবার স্পেসে দেশের সার্বভৌমত্ব রক্ষা ও অপশক্তির বিরুদ্ধে ঐক্যবদ্ধ প্রতিরোধ। আমরা থামিনি, থামব না। উই নেভার বো ডাউন।',
        applyForTopTeam: true,
        memberCount: 380,
        activists: ['Raj Alamin', 'Cyber Ghost', 'Shadow Strike', 'Byte Striker'],
        notableOps: [
          { year: '2024', opName: 'National Guard Protocol', impact: 'Takedown of 500+ hostile spam and phishing links' },
          { year: '2025', opName: 'Cyber Sentinel 25', impact: 'Protected national cyberspace community infrastructure' }
        ],
        status: 'approved',
        submittedAt: '2026-10-01',
      },
    ];
  });

  const [works, setWorks] = useState<WorkSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_works_v5');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'work-1',
        userId: 'user-raj-nct',
        userName: 'Raj Alamin',
        title: 'Anik এর আইডি সাসপেন্ড করেছি',
        selectPlatform: 'Facebook',
        typeOfWork: 'ID Suspension',
        successDate: '2026-09-28',
        selectTeam: 'National Cyber Team',
        victimUrl: 'https://facebook.com/anik.hostile',
        postViews: 146,
        postLink: 'https://darkhub.io/work/w84920',
        status: 'approved',
        submittedAt: '2026-09-28',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('darkhub_user_bios_v5', JSON.stringify(bioSubmissions));
  }, [bioSubmissions]);

  useEffect(() => {
    localStorage.setItem('darkhub_team_bios_v5', JSON.stringify(teamSubmissions));
  }, [teamSubmissions]);

  useEffect(() => {
    localStorage.setItem('darkhub_works_v5', JSON.stringify(works));
  }, [works]);

  // -------------------------------------------------------------
  // SPAMMERS & TEAMS DIRECTORY STATE
  // -------------------------------------------------------------
  const [teams, setTeams] = useState<TeamProfile[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_teams_v5');
      return saved ? JSON.parse(saved) : INITIAL_TEAMS;
    } catch {
      return INITIAL_TEAMS;
    }
  });

  const [spammers, setSpammers] = useState<SpammerProfile[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_spammers_v5');
      return saved ? JSON.parse(saved) : INITIAL_SPAMMERS;
    } catch {
      return INITIAL_SPAMMERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('darkhub_teams_v5', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('darkhub_spammers_v5', JSON.stringify(spammers));
  }, [spammers]);

  // -------------------------------------------------------------
  // REAL-TIME WIKI PROFILE SELECTION (Single Source of Truth)
  // -------------------------------------------------------------
  const [selectedWikiSpammerId, setSelectedWikiSpammerId] = useState<string | null>(null);
  const [selectedWikiTeamId, setSelectedWikiTeamId] = useState<string | null>(null);

  // Directly derive active profiles from state so all additions/deletions update in real-time
  const selectedWikiSpammer = spammers.find((s) => s.id === selectedWikiSpammerId) || null;
  const selectedWikiTeam = teams.find((t) => t.id === selectedWikiTeamId) || null;

  // -------------------------------------------------------------
  // AUTHENTICATION LOGIC
  // -------------------------------------------------------------
  const handleSignIn = (email: string, pass: string): boolean => {
    // Admin check
    if (email === 'admin@darkhub.com' && (pass === 'admin123' || pass === '123456')) {
      const adminUser: UserAccount = {
        id: 'user-admin',
        name: 'DarkHUB Admin',
        email: 'admin@darkhub.com',
        role: 'admin',
        status: 'active',
        registeredAt: '2026-01-01',
      };
      setCurrentUser(adminUser);
      setCurrentPage('admin-dashboard');
      return true;
    }

    // Existing user check
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (found.status === 'suspended') {
        alert('This account has been suspended by Admin.');
        return false;
      }
      setCurrentUser(found);
      setCurrentPage(found.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
      return true;
    }

    // Allow login for entered email
    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: 'user',
      status: 'active',
      registeredAt: new Date().toISOString().slice(0, 10),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentPage('user-dashboard');
    return true;
  };

  const handleRegister = (name: string, email: string, _pass: string) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      alert('An account with this email already exists. Please Sign In.');
      setCurrentPage('signin');
      return;
    }

    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: name,
      email: email,
      role: 'user',
      status: 'active',
      registeredAt: new Date().toISOString().slice(0, 10),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentPage('user-dashboard');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  // -------------------------------------------------------------
  // USER DASHBOARD SUBMISSIONS (Interconnected with Spammer Wiki / About Page)
  // -------------------------------------------------------------
  const handleSubmitUserBio = (bioData: Omit<UserBioSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>) => {
    const newSubmission: UserBioSubmission = {
      id: `bio-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || bioData.name,
      ...bioData,
      status: 'approved',
      submittedAt: new Date().toISOString().slice(0, 10),
    };
    setBioSubmissions((prev) => [newSubmission, ...prev]);

    // Update live SpammerProfile so their Spammer Wiki immediately updates in real-time
    setSpammers((prev) => {
      const existingIdx = prev.findIndex(
        (s) =>
          (currentUser && s.id === currentUser.id) ||
          s.name.toLowerCase() === bioData.name.toLowerCase()
      );

      const updatedSpammer: SpammerProfile = {
        id: existingIdx >= 0 ? prev[existingIdx].id : `spammer-${Date.now()}`,
        name: bioData.name,
        alias: bioData.name,
        team: bioData.selectTeam || 'National Cyber Team',
        origin: 'Bangladesh',
        activePeriod: bioData.startedOn ? `Since ${bioData.startedOn} till now` : 'Since 2014 till now',
        specialty: existingIdx >= 0 ? prev[existingIdx].specialty : ['Mass Report', 'Social Engineering'],
        status: 'Legend',
        respectCount: existingIdx >= 0 ? prev[existingIdx].respectCount : 120,
        verified: true,
        bioBangla: bioData.aboutYou,
        bioEnglish: '', // Prevent duplicate bio text
        famousOperations: bioData.famousOperations !== undefined
          ? bioData.famousOperations
          : (existingIdx >= 0 ? prev[existingIdx].famousOperations : []),
        avatarUrl: bioData.profileImage || (existingIdx >= 0 ? prev[existingIdx].avatarUrl : '/raj_alamin.png'),
        whatsapp: bioData.whatsapp || (existingIdx >= 0 ? prev[existingIdx].whatsapp : '+601114303075'),
      };

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = updatedSpammer;
        return copy;
      } else {
        return [updatedSpammer, ...prev];
      }
    });
  };

  // -------------------------------------------------------------
  // TEAM DASHBOARD SUBMISSIONS (Interconnected with Team Wiki / About Page)
  // -------------------------------------------------------------
  const handleSubmitTeamBio = (teamData: Omit<TeamBioSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>) => {
    const newSubmission: TeamBioSubmission = {
      id: `team-sub-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || teamData.founder,
      ...teamData,
      status: 'approved',
      submittedAt: new Date().toISOString().slice(0, 10),
    };
    setTeamSubmissions((prev) => [newSubmission, ...prev]);

    // Update or sync live TeamProfile so Team Wiki immediately updates in real-time
    setTeams((prev) => {
      const existingIdx = prev.findIndex(
        (t) =>
          t.name.toLowerCase() === teamData.teamName.toLowerCase() ||
          t.alias.toLowerCase() === teamData.teamName.toLowerCase()
      );

      const updatedTeam: TeamProfile = {
        id: existingIdx >= 0 ? prev[existingIdx].id : `team-${Date.now()}`,
        name: teamData.teamName,
        alias: teamData.teamName.slice(0, 3).toUpperCase(),
        founded: teamData.startedOn || '2024',
        origin: 'Bangladesh',
        status: teamData.applyForTopTeam ? 'Legendary' : 'Active',
        memberCount: teamData.memberCount !== undefined
          ? teamData.memberCount
          : (existingIdx >= 0 ? prev[existingIdx].memberCount : 380),
        totalOps: existingIdx >= 0 ? prev[existingIdx].totalOps : 512,
        respectCount: existingIdx >= 0 ? prev[existingIdx].respectCount : 12450,
        manifestoBangla: teamData.about,
        manifestoEnglish: '', // Prevent duplicate manifesto text
        leader: teamData.founder,
        keyMembers: teamData.activists && teamData.activists.length > 0
          ? teamData.activists
          : (existingIdx >= 0 ? prev[existingIdx].keyMembers : [teamData.founder]),
        notableOps: teamData.notableOps !== undefined
          ? teamData.notableOps
          : (existingIdx >= 0 ? prev[existingIdx].notableOps : []),
      };

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = updatedTeam;
        return copy;
      } else {
        return [updatedTeam, ...prev];
      }
    });
  };

  const handleSubmitWork = (workData: Omit<WorkSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status' | 'postViews' | 'postLink'>) => {
    const newWork: WorkSubmission = {
      id: `work-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Operative',
      ...workData,
      postViews: 1,
      postLink: `https://darkhub.io/work/w${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'approved',
      submittedAt: new Date().toISOString().slice(0, 10),
    };
    setWorks((prev) => [newWork, ...prev]);
  };

  // -------------------------------------------------------------
  // ADMIN DASHBOARD ACTIONS
  // -------------------------------------------------------------
  const handleToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            status: u.status === 'active' ? 'suspended' : 'active',
          };
        }
        return u;
      })
    );
  };

  const handleApproveBio = (submissionId: string) => {
    const sub = bioSubmissions.find((b) => b.id === submissionId);
    if (!sub) return;

    setBioSubmissions((prev) =>
      prev.map((b) => (b.id === submissionId ? { ...b, status: 'approved' } : b))
    );

    const newSpammerProfile: SpammerProfile = {
      id: `spammer-${Date.now()}`,
      name: sub.name,
      alias: sub.name,
      team: sub.selectTeam || 'Independent',
      origin: 'Bangladesh',
      activePeriod: `${sub.startedOn} - Present`,
      specialty: ['Mass Report', 'Social Engineering'],
      status: 'Active',
      respectCount: 10,
      verified: true,
      bioBangla: sub.aboutYou,
      bioEnglish: '',
      famousOperations: sub.famousOperations || [],
      avatarUrl: sub.profileImage,
    };
    setSpammers((prev) => [newSpammerProfile, ...prev]);
  };

  const handleRejectBio = (submissionId: string) => {
    setBioSubmissions((prev) =>
      prev.map((b) => (b.id === submissionId ? { ...b, status: 'rejected' } : b))
    );
  };

  const handleApproveTeam = (submissionId: string) => {
    const sub = teamSubmissions.find((t) => t.id === submissionId);
    if (!sub) return;

    setTeamSubmissions((prev) =>
      prev.map((t) => (t.id === submissionId ? { ...t, status: 'approved' } : t))
    );

    const newTeam: TeamProfile = {
      id: `team-${Date.now()}`,
      name: sub.teamName,
      alias: sub.teamName.slice(0, 3).toUpperCase(),
      founded: sub.startedOn || '2024',
      origin: 'Bangladesh',
      status: sub.applyForTopTeam ? 'Legendary' : 'Active',
      memberCount: sub.memberCount || 20,
      totalOps: 5,
      respectCount: 15,
      manifestoBangla: sub.about,
      manifestoEnglish: '',
      leader: sub.founder,
      keyMembers: sub.activists || [sub.founder],
      notableOps: sub.notableOps || [],
    };
    setTeams((prev) => [newTeam, ...prev]);
  };

  const handleRejectTeam = (submissionId: string) => {
    setTeamSubmissions((prev) =>
      prev.map((t) => (t.id === submissionId ? { ...t, status: 'rejected' } : t))
    );
  };

  const handleApproveWork = (workId: string) => {
    setWorks((prev) =>
      prev.map((w) => (w.id === workId ? { ...w, status: 'approved', postViews: w.postViews + 10 } : w))
    );
  };

  const handleRejectWork = (workId: string) => {
    setWorks((prev) => prev.filter((w) => w.id !== workId));
  };

  // -------------------------------------------------------------
  // RESPECT COUNTERS
  // -------------------------------------------------------------
  const handleRespectSpammer = (id: string) => {
    setSpammers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, respectCount: s.respectCount + 1 } : s))
    );
  };

  const handleRespectTeam = (id: string) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, respectCount: t.respectCount + 1 } : t))
    );
  };

  // Navigation Handler
  const handleNavigate = (page: ActivePage) => {
    setSelectedWikiSpammerId(null);
    setSelectedWikiTeamId(null);
    if (page === 'submit-biodata') {
      if (currentUser) {
        setCurrentPage('user-dashboard');
      } else {
        setCurrentPage('signin');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------------------------------------
  // REAL-TIME AUTO-SUGGESTIONS & SEARCH
  // -------------------------------------------------------------
  const isSearching = searchQuery.trim().length > 0;
  const q = searchQuery.toLowerCase().trim();

  // Search filtered spammers
  const searchSpammers = isSearching
    ? spammers.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.alias.toLowerCase().includes(q) ||
          s.team.toLowerCase().includes(q)
      )
    : [];

  // Search filtered teams
  const searchTeams = isSearching
    ? teams.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.alias.toLowerCase().includes(q) ||
          t.leader.toLowerCase().includes(q)
      )
    : [];

  // Formatted Suggestions
  const suggestions: SearchSuggestionItem[] = isSearching
    ? [
        ...searchSpammers.map((s) => ({
          id: s.id,
          type: 'spammer' as const,
          name: s.name,
          team: s.team,
          formattedLabel: `${s.name} - ${s.team}`,
          spammer: s,
        })),
        ...searchTeams.map((t) => ({
          id: t.id,
          type: 'team' as const,
          name: t.name,
          team: t.alias,
          formattedLabel: `${t.name} [Team]`,
          teamProfile: t,
        })),
      ]
    : [];

  const handleSelectSuggestion = (item: SearchSuggestionItem) => {
    if (item.type === 'spammer' && item.spammer) {
      setSelectedWikiSpammerId(item.spammer.id);
      setSelectedWikiTeamId(null);
      setSearchQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.type === 'team' && item.teamProfile) {
      setSelectedWikiTeamId(item.teamProfile.id);
      setSelectedWikiSpammerId(null);
      setSearchQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center">
      <div className="w-full max-w-xl min-h-screen bg-white shadow-xl flex flex-col justify-between relative overflow-x-hidden">
        
        {/* 1. TEAM WIKI PAGE (Exact match of uploaded screenshot Screenshot_20261003-141759.png) */}
        {selectedWikiTeam ? (
          <TeamWikiView
            team={selectedWikiTeam}
            onBack={() => setSelectedWikiTeamId(null)}
            onOpenMenu={() => setIsMenuOpen(true)}
            onRespect={handleRespectTeam}
          />
        ) : selectedWikiSpammer ? (
          /* 2. SPAMMER WIKI PAGE (Exact match of uploaded design) */
          <SpammerWikiView
            spammer={selectedWikiSpammer}
            onBack={() => setSelectedWikiSpammerId(null)}
            onOpenMenu={() => setIsMenuOpen(true)}
            onRespect={handleRespectSpammer}
          />
        ) : (
          <>
            {/* Top Header */}
            {currentPage !== 'signin' && currentPage !== 'register' && currentPage !== 'user-dashboard' && currentPage !== 'admin-dashboard' && (
              <Header
                onOpenMenu={() => setIsMenuOpen(true)}
                onNavigateHome={() => {
                  setCurrentPage('home');
                  setSelectedWikiSpammerId(null);
                  setSelectedWikiTeamId(null);
                  setSearchQuery('');
                }}
                showRedBar={currentPage !== 'home' && currentPage !== 'top-spammers'}
              />
            )}

            {/* Main Body */}
            <main className="flex-1 w-full">
              {/* HOME VIEW */}
              {currentPage === 'home' && (
                <div className="relative pb-8">
                  <HeroPuppetSection
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSubmitSearch={() => {
                      if (suggestions.length > 0) {
                        handleSelectSuggestion(suggestions[0]);
                      }
                    }}
                    onSelectCategory={(category) => {
                      setActiveCategoryPillar(category);
                    }}
                    suggestions={suggestions}
                    onSelectSuggestion={handleSelectSuggestion}
                  />

                  {activeCategoryPillar && (
                    <div className="px-4 sm:px-6 pt-2 pb-4">
                      <div className="bg-zinc-900 text-white rounded-xl p-4 shadow-lg flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <h4 className="text-xs font-bold text-red-400">
                              {activeCategoryPillar}
                            </h4>
                          </div>
                          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                            {TARGET_PILLARS.find((p) => p.label === activeCategoryPillar)?.bengaliDescription ||
                              'এই সেক্টরের ডিজিটাল সুরক্ষা ও সাইবার অপারেশন ইতিহাস সংরক্ষিত রয়েছে।'}
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveCategoryPillar(null)}
                          className="text-zinc-400 hover:text-white text-xs font-bold p-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SIGN IN VIEW */}
              {currentPage === 'signin' && (
                <SignInView
                  onSignIn={handleSignIn}
                  onNavigateRegister={() => setCurrentPage('register')}
                  onNavigateHome={() => setCurrentPage('home')}
                  onOpenMenu={() => setIsMenuOpen(true)}
                />
              )}

              {/* REGISTRATION VIEW */}
              {currentPage === 'register' && (
                <RegistrationView
                  onRegister={handleRegister}
                  onNavigateSignIn={() => setCurrentPage('signin')}
                  onNavigateHome={() => setCurrentPage('home')}
                  onOpenMenu={() => setIsMenuOpen(true)}
                />
              )}

              {/* USER DASHBOARD VIEW */}
              {currentPage === 'user-dashboard' && currentUser && (
                <UserDashboardView
                  currentUser={currentUser}
                  onSignOut={handleSignOut}
                  onNavigateHome={() => setCurrentPage('home')}
                  onSubmitUserBio={handleSubmitUserBio}
                  onSubmitTeamBio={handleSubmitTeamBio}
                  onSubmitWork={handleSubmitWork}
                  works={works}
                  currentSpammerProfile={
                    spammers.find(
                      (s) =>
                        s.id === currentUser.id ||
                        s.name.toLowerCase() === currentUser.name.toLowerCase()
                    ) || spammers.find((s) => s.id === 'spammer-raj-nct') || null
                  }
                  currentTeamProfile={
                    teams.find(
                      (t) =>
                        t.name.toLowerCase().includes('national cyber') ||
                        t.leader.toLowerCase() === currentUser.name.toLowerCase()
                    ) || teams[0] || null
                  }
                  onViewMyWiki={(spammer) => {
                    setSelectedWikiSpammerId(spammer.id);
                    setSelectedWikiTeamId(null);
                  }}
                  onViewTeamWiki={(team) => {
                    setSelectedWikiTeamId(team.id);
                    setSelectedWikiSpammerId(null);
                  }}
                />
              )}

              {/* ADMIN DASHBOARD VIEW */}
              {currentPage === 'admin-dashboard' && (
                <AdminDashboardView
                  users={users}
                  bioSubmissions={bioSubmissions}
                  teamSubmissions={teamSubmissions}
                  workSubmissions={works}
                  onToggleUserStatus={handleToggleUserStatus}
                  onApproveBio={handleApproveBio}
                  onRejectBio={handleRejectBio}
                  onApproveTeam={handleApproveTeam}
                  onRejectTeam={handleRejectTeam}
                  onApproveWork={handleApproveWork}
                  onRejectWork={handleRejectWork}
                  onNavigateHome={() => setCurrentPage('home')}
                />
              )}

              {/* TOP TEAMS VIEW */}
              {currentPage === 'top-teams' && (
                <TopTeamsView
                  teams={teams}
                  onSelectTeam={(team) => {
                    setSelectedWikiTeamId(team.id);
                    setSelectedWikiSpammerId(null);
                  }}
                  onRespectTeam={handleRespectTeam}
                  lang="bn"
                />
              )}

              {/* TOP SPAMMERS VIEW */}
              {currentPage === 'top-spammers' && (
                <TopSpammersView
                  spammers={spammers}
                  onSelectSpammer={(s) => {
                    setSelectedWikiSpammerId(s.id);
                    setSelectedWikiTeamId(null);
                  }}
                  onRespectSpammer={handleRespectSpammer}
                  lang="bn"
                />
              )}

              {/* ABOUT DARKHUB VIEW */}
              {currentPage === 'about' && (
                <AboutView
                  lang="bn"
                  onNavigateSubmit={() => {
                    if (currentUser) {
                      setCurrentPage('user-dashboard');
                    } else {
                      setCurrentPage('signin');
                    }
                  }}
                />
              )}

              {/* TERMS & CONDITIONS VIEW */}
              {currentPage === 'terms' && (
                <LegalView type="terms" lang="bn" />
              )}

              {/* PRIVACY POLICY VIEW */}
              {currentPage === 'privacy' && (
                <LegalView type="privacy" lang="bn" />
              )}
            </main>
          </>
        )}

        {/* Slide-over Crimson Navigation Drawer */}
        <DrawerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          currentUser={currentUser}
        />

        {/* Detail Modals */}
        <SpammerProfileModal
          spammer={selectedSpammerModal}
          onClose={() => setSelectedSpammerModal(null)}
          onRespect={handleRespectSpammer}
          lang="bn"
        />

        <TeamDetailModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onRespect={handleRespectTeam}
          lang="bn"
        />
      </div>
    </div>
  );
}
