import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  getDocFromServer,
} from 'firebase/firestore';
import {
  SpammerProfile,
  TeamProfile,
  UserAccount,
  UserBioSubmission,
  TeamBioSubmission,
  WorkSubmission,
} from './types';
import appletConfig from '../firebase-applet-config.json';

// Firebase Configuration for project: darkhub-1145c
const firebaseConfig = {
  apiKey: "AIzaSyBLSAvuW5kWoiar7WDa0Ji7zHOzrdvzlmY",
  authDomain: "darkhub-1145c.firebaseapp.com",
  projectId: "darkhub-1145c",
  storageBucket: "darkhub-1145c.firebasestorage.app",
  messagingSenderId: "726424326769",
  appId: "1:726424326769:web:fa12b17f8c20ab94e781d0"
};

// Initialize Firebase App instance safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore on default database
export const db = getFirestore(app);

// Connection test as required by Firestore standard integration
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firestore] Connected successfully to Cloud Firestore.');
    return true;
  } catch (error) {
    console.warn('[Firestore] Connected with local cache fallback:', error);
    return false;
  }
}

// -------------------------------------------------------------
// FIRESTORE SAVE / UPDATE FUNCTIONS (Admin & User Submissions)
// -------------------------------------------------------------

/** Save or update a Spammer Profile in Firestore */
export async function saveSpammerToFirestore(spammer: SpammerProfile): Promise<void> {
  try {
    const ref = doc(db, 'spammers', spammer.id);
    await setDoc(ref, spammer, { merge: true });
    console.log(`[Firestore] Spammer ${spammer.id} saved.`);
  } catch (err) {
    console.error(`[Firestore] Error saving spammer ${spammer.id}:`, err);
  }
}

/** Save or update a Team Profile in Firestore */
export async function saveTeamToFirestore(team: TeamProfile): Promise<void> {
  try {
    const ref = doc(db, 'teams', team.id);
    await setDoc(ref, team, { merge: true });
    console.log(`[Firestore] Team ${team.id} saved.`);
  } catch (err) {
    console.error(`[Firestore] Error saving team ${team.id}:`, err);
  }
}

/** Save a User Biodata Submission in Firestore */
export async function saveUserBioSubmissionToFirestore(bio: UserBioSubmission): Promise<void> {
  try {
    const ref = doc(db, 'user_bios', bio.id);
    await setDoc(ref, bio, { merge: true });
    console.log(`[Firestore] UserBio ${bio.id} saved.`);
  } catch (err) {
    console.error(`[Firestore] Error saving user bio ${bio.id}:`, err);
  }
}

/** Save a Team Bio Submission in Firestore */
export async function saveTeamBioSubmissionToFirestore(teamBio: TeamBioSubmission): Promise<void> {
  try {
    const ref = doc(db, 'team_bios', teamBio.id);
    await setDoc(ref, teamBio, { merge: true });
    console.log(`[Firestore] TeamBio ${teamBio.id} saved.`);
  } catch (err) {
    console.error(`[Firestore] Error saving team bio ${teamBio.id}:`, err);
  }
}

/** Save a Work / Task Submission in Firestore */
export async function saveWorkSubmissionToFirestore(work: WorkSubmission): Promise<void> {
  try {
    const ref = doc(db, 'work_submissions', work.id);
    await setDoc(ref, work, { merge: true });
    console.log(`[Firestore] WorkSubmission ${work.id} saved.`);
  } catch (err) {
    console.error(`[Firestore] Error saving work submission ${work.id}:`, err);
  }
}

/** Save a registered user account in Firestore */
export async function saveUserAccountToFirestore(user: UserAccount): Promise<void> {
  try {
    const ref = doc(db, 'users', user.id);
    await setDoc(ref, user, { merge: true });
    console.log(`[Firestore] User ${user.email} saved.`);
  } catch (err) {
    console.error(`[Firestore] Error saving user account:`, err);
  }
}

// -------------------------------------------------------------
// FIRESTORE REAL-TIME LISTENERS
// -------------------------------------------------------------

export function subscribeToSpammers(callback: (spammers: SpammerProfile[]) => void) {
  const colRef = collection(db, 'spammers');
  return onSnapshot(
    query(colRef),
    (snapshot) => {
      if (!snapshot.empty) {
        const items: SpammerProfile[] = [];
        snapshot.forEach((d) => items.push(d.data() as SpammerProfile));
        callback(items);
      }
    },
    (err) => {
      console.warn('[Firestore] Error subscribing to spammers:', err);
    }
  );
}

export function subscribeToTeams(callback: (teams: TeamProfile[]) => void) {
  const colRef = collection(db, 'teams');
  return onSnapshot(
    query(colRef),
    (snapshot) => {
      if (!snapshot.empty) {
        const items: TeamProfile[] = [];
        snapshot.forEach((d) => items.push(d.data() as TeamProfile));
        callback(items);
      }
    },
    (err) => {
      console.warn('[Firestore] Error subscribing to teams:', err);
    }
  );
}

export function subscribeToWorkSubmissions(callback: (works: WorkSubmission[]) => void) {
  const colRef = collection(db, 'work_submissions');
  return onSnapshot(
    query(colRef),
    (snapshot) => {
      if (!snapshot.empty) {
        const items: WorkSubmission[] = [];
        snapshot.forEach((d) => items.push(d.data() as WorkSubmission));
        callback(items);
      }
    },
    (err) => {
      console.warn('[Firestore] Error subscribing to works:', err);
    }
  );
}

export function subscribeToUserBios(callback: (bios: UserBioSubmission[]) => void) {
  const colRef = collection(db, 'user_bios');
  return onSnapshot(
    query(colRef),
    (snapshot) => {
      if (!snapshot.empty) {
        const items: UserBioSubmission[] = [];
        snapshot.forEach((d) => items.push(d.data() as UserBioSubmission));
        callback(items);
      }
    },
    (err) => {
      console.warn('[Firestore] Error subscribing to user bios:', err);
    }
  );
}

export function subscribeToTeamBios(callback: (teamBios: TeamBioSubmission[]) => void) {
  const colRef = collection(db, 'team_bios');
  return onSnapshot(
    query(colRef),
    (snapshot) => {
      if (!snapshot.empty) {
        const items: TeamBioSubmission[] = [];
        snapshot.forEach((d) => items.push(d.data() as TeamBioSubmission));
        callback(items);
      }
    },
    (err) => {
      console.warn('[Firestore] Error subscribing to team bios:', err);
    }
  );
}

export function subscribeToUsers(callback: (users: UserAccount[]) => void) {
  const colRef = collection(db, 'users');
  return onSnapshot(
    query(colRef),
    (snapshot) => {
      if (!snapshot.empty) {
        const items: UserAccount[] = [];
        snapshot.forEach((d) => items.push(d.data() as UserAccount));
        callback(items);
      }
    },
    (err) => {
      console.warn('[Firestore] Error subscribing to users:', err);
    }
  );
}

// -------------------------------------------------------------
// INITIAL SEEDING TO FIRESTORE IF EMPTY
// -------------------------------------------------------------
export async function seedFirestoreIfEmpty(
  initialSpammers: SpammerProfile[],
  initialTeams: TeamProfile[],
  initialUsers: UserAccount[]
) {
  try {
    const spammersSnap = await getDocs(collection(db, 'spammers'));
    if (spammersSnap.empty) {
      console.log('[Firestore] Seeding initial spammers to Firestore...');
      for (const sp of initialSpammers) {
        await saveSpammerToFirestore(sp);
      }
    }

    const teamsSnap = await getDocs(collection(db, 'teams'));
    if (teamsSnap.empty) {
      console.log('[Firestore] Seeding initial teams to Firestore...');
      for (const tm of initialTeams) {
        await saveTeamToFirestore(tm);
      }
    }

    const usersSnap = await getDocs(collection(db, 'users'));
    if (usersSnap.empty) {
      console.log('[Firestore] Seeding initial users to Firestore...');
      for (const u of initialUsers) {
        await saveUserAccountToFirestore(u);
      }
    }
  } catch (error) {
    console.warn('[Firestore] Seeding skipped or cached:', error);
  }
}
