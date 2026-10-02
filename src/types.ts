export type SpammerSpecialty = 
  | 'Mass Report'
  | 'Social Engineering'
  | 'Traffic Flooding / DDoS'
  | 'Page Takeover'
  | 'Deface & Recon'
  | 'Botnet & Automation'
  | 'OSINT & Doxx'
  | 'Account Recovery & Defense';

export type TeamStatus = 'Legendary' | 'Active' | 'Underground' | 'Retired';

export interface SpammerProfile {
  id: string;
  name: string;
  alias: string;
  avatarUrl?: string;
  team: string;
  teamId?: string;
  origin: string;
  activePeriod: string;
  specialty: SpammerSpecialty[];
  status: 'Active' | 'Legend' | 'Inactive' | 'Undercover';
  respectCount: number;
  verified: boolean;
  bioBangla: string;
  bioEnglish: string;
  famousOperations: {
    year: string;
    title: string;
    description: string;
  }[];
  socials?: {
    telegram?: string;
    facebook?: string;
    discord?: string;
    github?: string;
  };
  submittedAt?: string;
}

export interface TeamProfile {
  id: string;
  name: string;
  alias: string;
  founded: string;
  origin: string;
  status: TeamStatus;
  memberCount: number;
  totalOps: number;
  respectCount: number;
  manifestoBangla: string;
  manifestoEnglish: string;
  leader: string;
  keyMembers: string[];
  notableOps: {
    year: string;
    opName: string;
    impact: string;
  }[];
}

export type ActivePage = 
  | 'home'
  | 'submit-biodata'
  | 'signin'
  | 'register'
  | 'user-dashboard'
  | 'admin-dashboard'
  | 'top-teams'
  | 'top-spammers'
  | 'terms'
  | 'privacy'
  | 'about';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
  registeredAt: string;
  status: 'active' | 'suspended';
}

export interface UserBioSubmission {
  id: string;
  userId: string;
  userName: string;
  name: string;
  startedOn: string;
  selectTeam: string;
  aboutYou: string;
  profileImage?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface TeamBioSubmission {
  id: string;
  userId: string;
  userName: string;
  teamName: string;
  startedOn: string;
  founder: string;
  about: string;
  profileImage?: string;
  applyForTopTeam: boolean;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface WorkSubmission {
  id: string;
  userId: string;
  userName: string;
  title: string;
  selectPlatform: string;
  typeOfWork: string;
  successDate: string;
  selectTeam: string;
  victimUrl: string;
  screenShotUrl?: string;
  postViews: number;
  postLink: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}
