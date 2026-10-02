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
import { HeroPuppetSection } from './components/HeroPuppetSection';
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
  const [selectedSpammer, setSelectedSpammer] = useState<SpammerProfile | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamProfile | null>(null);

  // -------------------------------------------------------------
  // USER ACCOUNTS & AUTH STATE
  // -------------------------------------------------------------
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_users_v3');
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
        id: 'user-raj',
        name: 'Raj Alamin',
        email: 'rajalamin@darkhub.com',
        role: 'user',
        status: 'active',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        registeredAt: '2026-03-15',
      },
      {
        id: 'user-tanvir',
        name: 'Tanvir Hossain',
        email: 'tanvir@shadowhunter.bd',
        role: 'user',
        status: 'active',
        registeredAt: '2026-05-20',
      },
    ];
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('darkhub_current_user_v3');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('darkhub_users_v3', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('darkhub_current_user_v3', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('darkhub_current_user_v3');
    }
  }, [currentUser]);

  // -------------------------------------------------------------
  // SUBMISSIONS STATE (User Bios, Team Bios, Works)
  // -------------------------------------------------------------
  const [bioSubmissions, setBioSubmissions] = useState<UserBioSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_user_bios_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'bio-1',
        userId: 'user-raj',
        userName: 'Raj Alamin',
        name: 'Raj Alamin',
        startedOn: '2018',
        selectTeam: 'Dark Shadow Hackers',
        aboutYou: 'Mass reporting commander & tactical social defense operator.',
        status: 'pending',
        submittedAt: '2026-10-01',
      },
    ];
  });

  const [teamSubmissions, setTeamSubmissions] = useState<TeamBioSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_team_bios_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [works, setWorks] = useState<WorkSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_works_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'work-1',
        userId: 'user-raj',
        userName: 'Raj Alamin',
        title: 'Anik এর আইডি সাসপেন্ড করেছি',
        selectPlatform: 'Facebook',
        typeOfWork: 'ID Suspension',
        successDate: '2026-09-28',
        selectTeam: 'Dark Shadow Hackers',
        victimUrl: 'https://facebook.com/anik.hostile',
        postViews: 146,
        postLink: 'https://darkhub.io/work/w84920',
        status: 'approved',
        submittedAt: '2026-09-28',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('darkhub_user_bios_v3', JSON.stringify(bioSubmissions));
  }, [bioSubmissions]);

  useEffect(() => {
    localStorage.setItem('darkhub_team_bios_v3', JSON.stringify(teamSubmissions));
  }, [teamSubmissions]);

  useEffect(() => {
    localStorage.setItem('darkhub_works_v3', JSON.stringify(works));
  }, [works]);

  // -------------------------------------------------------------
  // SPAMMERS & TEAMS DIRECTORY STATE
  // -------------------------------------------------------------
  const [teams, setTeams] = useState<TeamProfile[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_teams_v3');
      return saved ? JSON.parse(saved) : INITIAL_TEAMS;
    } catch {
      return INITIAL_TEAMS;
    }
  });

  const [spammers, setSpammers] = useState<SpammerProfile[]>(() => {
    try {
      const saved = localStorage.getItem('darkhub_spammers_v3');
      return saved ? JSON.parse(saved) : INITIAL_SPAMMERS;
    } catch {
      return INITIAL_SPAMMERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('darkhub_teams_v3', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('darkhub_spammers_v3', JSON.stringify(spammers));
  }, [spammers]);

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

    // Allow demo login for entered email
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
  // USER DASHBOARD SUBMISSIONS
  // -------------------------------------------------------------
  const handleSubmitUserBio = (bioData: Omit<UserBioSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>) => {
    const newSubmission: UserBioSubmission = {
      id: `bio-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || bioData.name,
      ...bioData,
      status: 'pending',
      submittedAt: new Date().toISOString().slice(0, 10),
    };
    setBioSubmissions((prev) => [newSubmission, ...prev]);
  };

  const handleSubmitTeamBio = (teamData: Omit<TeamBioSubmission, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>) => {
    const newSubmission: TeamBioSubmission = {
      id: `team-sub-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || teamData.founder,
      ...teamData,
      status: 'pending',
      submittedAt: new Date().toISOString().slice(0, 10),
    };
    setTeamSubmissions((prev) => [newSubmission, ...prev]);
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

    // Push into Spammers directory
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
      bioEnglish: sub.aboutYou,
      famousOperations: [],
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

    // Push into Top Teams directory
    const newTeam: TeamProfile = {
      id: `team-${Date.now()}`,
      name: sub.teamName,
      alias: sub.teamName.slice(0, 3).toUpperCase(),
      founded: sub.startedOn || '2024',
      origin: 'Bangladesh',
      status: sub.applyForTopTeam ? 'Legendary' : 'Active',
      memberCount: 20,
      totalOps: 5,
      respectCount: 15,
      manifestoBangla: sub.about,
      manifestoEnglish: sub.about,
      leader: sub.founder,
      keyMembers: [sub.founder],
      notableOps: [],
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
    if (selectedSpammer && selectedSpammer.id === id) {
      setSelectedSpammer((prev) => (prev ? { ...prev, respectCount: prev.respectCount + 1 } : null));
    }
  };

  const handleRespectTeam = (id: string) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, respectCount: t.respectCount + 1 } : t))
    );
    if (selectedTeam && selectedTeam.id === id) {
      setSelectedTeam((prev) => (prev ? { ...prev, respectCount: prev.respectCount + 1 } : null));
    }
  };

  // Navigation Handler
  const handleNavigate = (page: ActivePage) => {
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

  // Search Results
  const isSearching = searchQuery.trim().length > 0;
  const q = searchQuery.toLowerCase().trim();

  const searchSpammers = isSearching
    ? spammers.filter(
        (s) =>
          s.alias.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.team.toLowerCase().includes(q)
      )
    : [];

  const searchTeams = isSearching
    ? teams.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.alias.toLowerCase().includes(q) ||
          t.leader.toLowerCase().includes(q)
      )
    : [];

  const totalMatches = searchSpammers.length + searchTeams.length;

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center">
      {/* Centered Mobile/Desktop Container matching the exact mockup frame */}
      <div className="w-full max-w-xl min-h-screen bg-white shadow-xl flex flex-col justify-between relative overflow-x-hidden">
        {/* Top Header strictly matching Image 1 */}
        {currentPage !== 'signin' && currentPage !== 'register' && currentPage !== 'user-dashboard' && currentPage !== 'admin-dashboard' && (
          <Header
            onOpenMenu={() => setIsMenuOpen(true)}
            onNavigateHome={() => {
              setCurrentPage('home');
              setSearchQuery('');
            }}
          />
        )}

        {/* Main Body */}
        <main className="flex-1 w-full">
          {/* HOME VIEW: Exactly matching Image 1 */}
          {currentPage === 'home' && (
            <div className="relative pb-8">
              <HeroPuppetSection
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSubmitSearch={() => {}}
                onSelectCategory={(category) => {
                  setActiveCategoryPillar(category);
                }}
              />

              {/* Instant Search Results Overlay when typing */}
              {isSearching && (
                <div className="px-4 sm:px-6 pt-2 pb-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-zinc-50 border-2 border-black rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                        <h4 className="text-sm font-black text-black">
                          Search Results: "{searchQuery}"
                        </h4>
                      </div>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs font-bold text-zinc-500 hover:text-black"
                      >
                        ✕ Clear
                      </button>
                    </div>

                    {totalMatches === 0 ? (
                      <div className="py-6 text-center space-y-2">
                        <p className="text-xs sm:text-sm text-zinc-600 font-medium">
                          কোনো রেকর্ড পাওয়া যায়নি।
                        </p>
                        <button
                          onClick={() => {
                            if (currentUser) {
                              setCurrentPage('user-dashboard');
                            } else {
                              setCurrentPage('signin');
                            }
                          }}
                          className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg shadow-xs"
                        >
                          + এই নামে বায়োডাটা জমা দিন
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {searchSpammers.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => setSelectedSpammer(s)}
                            className="p-2.5 bg-white border border-zinc-200 hover:border-black rounded-lg cursor-pointer transition-colors flex items-center justify-between"
                          >
                            <div>
                              <span className="text-[10px] font-bold text-red-600 uppercase">
                                Spammer
                              </span>
                              <div className="text-sm font-black text-zinc-950">
                                {s.alias}
                              </div>
                              <div className="text-xs text-zinc-500">
                                {s.team} · {s.origin}
                              </div>
                            </div>
                            <span className="text-xs font-bold text-red-600">Dossier →</span>
                          </div>
                        ))}

                        {searchTeams.map((t) => (
                          <div
                            key={t.id}
                            onClick={() => setSelectedTeam(t)}
                            className="p-2.5 bg-white border border-zinc-200 hover:border-black rounded-lg cursor-pointer transition-colors flex items-center justify-between"
                          >
                            <div>
                              <span className="text-[10px] font-bold text-black uppercase">
                                Team
                              </span>
                              <div className="text-sm font-black text-zinc-950">
                                {t.name} [{t.alias}]
                              </div>
                              <div className="text-xs text-zinc-500">
                                Leader: {t.leader} · Est. {t.founded}
                              </div>
                            </div>
                            <span className="text-xs font-bold text-black">Archive →</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Pillar Category Popover */}
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

          {/* SIGN IN VIEW (Exact match of Image 3) */}
          {currentPage === 'signin' && (
            <SignInView
              onSignIn={handleSignIn}
              onNavigateRegister={() => setCurrentPage('register')}
              onNavigateHome={() => setCurrentPage('home')}
              onOpenMenu={() => setIsMenuOpen(true)}
            />
          )}

          {/* REGISTRATION VIEW (Exact match of Image 4) */}
          {currentPage === 'register' && (
            <RegistrationView
              onRegister={handleRegister}
              onNavigateSignIn={() => setCurrentPage('signin')}
              onNavigateHome={() => setCurrentPage('home')}
              onOpenMenu={() => setIsMenuOpen(true)}
            />
          )}

          {/* USER DASHBOARD VIEW (Exact match of Image 5, 6, 7) */}
          {currentPage === 'user-dashboard' && currentUser && (
            <UserDashboardView
              currentUser={currentUser}
              onSignOut={handleSignOut}
              onNavigateHome={() => setCurrentPage('home')}
              onSubmitUserBio={handleSubmitUserBio}
              onSubmitTeamBio={handleSubmitTeamBio}
              onSubmitWork={handleSubmitWork}
              works={works}
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
              onSelectTeam={setSelectedTeam}
              onRespectTeam={handleRespectTeam}
              lang="bn"
            />
          )}

          {/* TOP SPAMMERS VIEW */}
          {currentPage === 'top-spammers' && (
            <TopSpammersView
              spammers={spammers}
              onSelectSpammer={setSelectedSpammer}
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

        {/* Slide-over Crimson Navigation Drawer (Image 2 & 4) */}
        <DrawerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          currentUser={currentUser}
        />

        {/* Spammer Profile Dossier Modal */}
        <SpammerProfileModal
          spammer={selectedSpammer}
          onClose={() => setSelectedSpammer(null)}
          onRespect={handleRespectSpammer}
          lang="bn"
        />

        {/* Team Detail Modal */}
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
