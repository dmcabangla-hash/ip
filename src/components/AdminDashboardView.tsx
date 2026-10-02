import React, { useState } from 'react';
import { UserAccount, UserBioSubmission, TeamBioSubmission, WorkSubmission } from '../types';

interface AdminDashboardViewProps {
  users: UserAccount[];
  bioSubmissions: UserBioSubmission[];
  teamSubmissions: TeamBioSubmission[];
  workSubmissions: WorkSubmission[];
  onToggleUserStatus: (userId: string) => void;
  onApproveBio: (submissionId: string) => void;
  onRejectBio: (submissionId: string) => void;
  onApproveTeam: (submissionId: string) => void;
  onRejectTeam: (submissionId: string) => void;
  onApproveWork: (submissionId: string) => void;
  onRejectWork: (submissionId: string) => void;
  onNavigateHome: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  users,
  bioSubmissions,
  teamSubmissions,
  workSubmissions,
  onToggleUserStatus,
  onApproveBio,
  onRejectBio,
  onApproveTeam,
  onRejectTeam,
  onApproveWork,
  onRejectWork,
  onNavigateHome,
}) => {
  const [adminTab, setAdminTab] = useState<'users' | 'bios' | 'teams' | 'works'>('users');
  const [searchUser, setSearchUser] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between select-none">
      <div>
        {/* Header */}
        <header className="w-full bg-[#f4f4f4] select-none border-b border-zinc-200">
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

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs sm:text-sm font-black text-black tracking-wider uppercase">
                ADMIN 01 CONSOLE
              </span>
            </div>
          </div>

          <div className="h-[3.5px] w-full bg-[#E50914]" />
        </header>

        {/* Dashboard Title & Quick Stats */}
        <div className="w-full max-w-4xl mx-auto px-4 pt-6 pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                DarkHUB User Management & Approvals
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                Chief Administrator Panel · Central Governance
              </p>
            </div>

            <button
              onClick={onNavigateHome}
              className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-zinc-800 transition-colors self-start sm:self-auto"
            >
              ← Back to Site
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3 bg-[#F7ECEB] rounded-xl border border-red-200/60 text-center">
              <span className="block text-2xl font-black text-black tabular-nums">
                {users.length}
              </span>
              <span className="text-xs font-bold text-zinc-600">Total Users</span>
            </div>
            <div className="p-3 bg-[#F7ECEB] rounded-xl border border-red-200/60 text-center">
              <span className="block text-2xl font-black text-black tabular-nums">
                {bioSubmissions.filter((b) => b.status === 'pending').length}
              </span>
              <span className="text-xs font-bold text-zinc-600">Pending Bios</span>
            </div>
            <div className="p-3 bg-[#F7ECEB] rounded-xl border border-red-200/60 text-center">
              <span className="block text-2xl font-black text-black tabular-nums">
                {teamSubmissions.filter((t) => t.status === 'pending').length}
              </span>
              <span className="text-xs font-bold text-zinc-600">Pending Teams</span>
            </div>
            <div className="p-3 bg-[#F7ECEB] rounded-xl border border-red-200/60 text-center">
              <span className="block text-2xl font-black text-black tabular-nums">
                {workSubmissions.length}
              </span>
              <span className="text-xs font-bold text-zinc-600">Total Works</span>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="w-full max-w-4xl mx-auto px-4 py-4">
          <div className="bg-[#800000] text-white rounded-lg p-1 flex items-center justify-between shadow-sm text-xs sm:text-sm font-bold">
            <button
              onClick={() => setAdminTab('users')}
              className={`flex-1 py-2 px-2 text-center rounded-md transition-all ${
                adminTab === 'users'
                  ? 'bg-[#980000] border border-white/60 shadow-xs'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setAdminTab('bios')}
              className={`flex-1 py-2 px-2 text-center rounded-md transition-all ${
                adminTab === 'bios'
                  ? 'bg-[#980000] border border-white/60 shadow-xs'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              User Bios ({bioSubmissions.length})
            </button>
            <button
              onClick={() => setAdminTab('teams')}
              className={`flex-1 py-2 px-2 text-center rounded-md transition-all ${
                adminTab === 'teams'
                  ? 'bg-[#980000] border border-white/60 shadow-xs'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              Team Bios ({teamSubmissions.length})
            </button>
            <button
              onClick={() => setAdminTab('works')}
              className={`flex-1 py-2 px-2 text-center rounded-md transition-all ${
                adminTab === 'works'
                  ? 'bg-[#980000] border border-white/60 shadow-xs'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              Contributions ({workSubmissions.length})
            </button>
          </div>
        </div>

        {/* TAB 1: USER MANAGEMENT */}
        {adminTab === 'users' && (
          <div className="w-full max-w-4xl mx-auto px-4 py-2 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Search user by name or mail..."
                className="w-full max-w-xs h-10 px-3.5 text-xs sm:text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
              <span className="text-xs text-zinc-500 font-medium">
                Showing {filteredUsers.length} of {users.length} users
              </span>
            </div>

            <div className="bg-[#F7ECEB] rounded-2xl p-4 sm:p-5 shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-black">
                <thead>
                  <tr className="border-b border-zinc-300/80">
                    <th className="pb-3 font-bold">User</th>
                    <th className="pb-3 font-bold">Role</th>
                    <th className="pb-3 font-bold">Joined</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-black/5 transition-colors">
                      <td className="py-3 pr-2">
                        <div className="font-bold text-zinc-950">{u.name}</div>
                        <div className="text-xs text-zinc-500 font-mono">{u.email}</div>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-black ${
                            u.role === 'admin'
                              ? 'bg-red-600 text-white'
                              : 'bg-zinc-200 text-zinc-800'
                          }`}
                        >
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-zinc-600 text-xs">
                        {u.registeredAt}
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            u.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 pl-2 text-right">
                        <button
                          onClick={() => onToggleUserStatus(u.id)}
                          className={`px-3 py-1 rounded text-xs font-bold transition-all shadow-2xs ${
                            u.status === 'active'
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {u.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: USER BIO SUBMISSIONS */}
        {adminTab === 'bios' && (
          <div className="w-full max-w-4xl mx-auto px-4 py-2 space-y-4">
            {bioSubmissions.length === 0 ? (
              <div className="p-8 text-center bg-[#F7ECEB] rounded-2xl text-zinc-600 text-sm">
                No user bio submissions logged yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bioSubmissions.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#F7ECEB] rounded-2xl p-5 border border-red-200/50 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-red-600 uppercase">
                          Bio Submission #{b.id.slice(-4)}
                        </span>
                        <h4 className="text-lg font-black text-black">{b.name}</h4>
                        <div className="text-xs text-zinc-500">
                          By: {b.userName} · Started: {b.startedOn} · Team: {b.selectTeam}
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          b.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'rejected'
                            ? 'bg-zinc-200 text-zinc-600'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white p-3 rounded-lg border border-zinc-200">
                      {b.aboutYou}
                    </p>

                    {b.profileImage && (
                      <div className="flex items-center gap-2">
                        <img
                          src={b.profileImage}
                          alt="Profile Preview"
                          className="w-12 h-12 rounded object-cover border border-zinc-300"
                        />
                        <span className="text-xs text-zinc-500">Uploaded Avatar</span>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-300/60">
                      {b.status !== 'approved' && (
                        <button
                          onClick={() => onApproveBio(b.id)}
                          className="px-4 py-1.5 bg-[#800000] hover:bg-[#960000] text-white text-xs font-bold rounded-lg shadow-2xs transition-all"
                        >
                          Approve & Publish to Spammers
                        </button>
                      )}
                      {b.status !== 'rejected' && (
                        <button
                          onClick={() => onRejectBio(b.id)}
                          className="px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-bold rounded-lg transition-all"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TEAM BIO SUBMISSIONS */}
        {adminTab === 'teams' && (
          <div className="w-full max-w-4xl mx-auto px-4 py-2 space-y-4">
            {teamSubmissions.length === 0 ? (
              <div className="p-8 text-center bg-[#F7ECEB] rounded-2xl text-zinc-600 text-sm">
                No team bio submissions yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamSubmissions.map((t) => (
                  <div
                    key={t.id}
                    className="bg-[#F7ECEB] rounded-2xl p-5 border border-red-200/50 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-red-600 uppercase">
                          Team Profile #{t.id.slice(-4)}
                        </span>
                        <h4 className="text-lg font-black text-black">{t.teamName}</h4>
                        <div className="text-xs text-zinc-500">
                          Founder: {t.founder} · Started: {t.startedOn}
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          t.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : t.status === 'rejected'
                            ? 'bg-zinc-200 text-zinc-600'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {t.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white p-3 rounded-lg border border-zinc-200">
                      "{t.about}"
                    </p>

                    {t.applyForTopTeam && (
                      <span className="inline-block text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded">
                        ★ Applied for Top Team Showcase
                      </span>
                    )}

                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-300/60">
                      {t.status !== 'approved' && (
                        <button
                          onClick={() => onApproveTeam(t.id)}
                          className="px-4 py-1.5 bg-[#800000] hover:bg-[#960000] text-white text-xs font-bold rounded-lg shadow-2xs transition-all"
                        >
                          Approve & Publish to Top Teams
                        </button>
                      )}
                      {t.status !== 'rejected' && (
                        <button
                          onClick={() => onRejectTeam(t.id)}
                          className="px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-bold rounded-lg transition-all"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: WORK SUBMISSIONS & CONTRIBUTIONS */}
        {adminTab === 'works' && (
          <div className="w-full max-w-4xl mx-auto px-4 py-2 space-y-4">
            <div className="bg-[#F7ECEB] rounded-2xl p-5 shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-black">
                <thead>
                  <tr className="border-b border-zinc-300/80">
                    <th className="pb-3 font-bold">Title</th>
                    <th className="pb-3 font-bold">Platform / Type</th>
                    <th className="pb-3 font-bold">Victim / Target</th>
                    <th className="pb-3 font-bold">Views</th>
                    <th className="pb-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {workSubmissions.map((w) => (
                    <tr key={w.id} className="hover:bg-black/5 transition-colors">
                      <td className="py-3 pr-2">
                        <div className="font-bold text-zinc-950">{w.title}</div>
                        <div className="text-xs text-zinc-500">By: {w.userName} · {w.successDate}</div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="font-medium text-black">{w.selectPlatform}</div>
                        <div className="text-xs text-zinc-500">{w.typeOfWork}</div>
                      </td>
                      <td className="py-3 px-2 font-mono text-xs max-w-[160px] truncate text-zinc-600">
                        {w.victimUrl || 'N/A'}
                      </td>
                      <td className="py-3 px-2 font-mono font-bold tabular-nums">
                        {w.postViews}
                      </td>
                      <td className="py-3 pl-2 text-right">
                        <button
                          onClick={() => onApproveWork(w.id)}
                          className="px-3 py-1 bg-[#800000] hover:bg-[#960000] text-white text-xs font-bold rounded shadow-2xs"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="h-8" />
    </div>
  );
};
