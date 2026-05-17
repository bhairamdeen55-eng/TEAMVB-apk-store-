import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import type { UserProfile } from '@/types';

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map(s => s.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email?: string | null) {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function signupUser(data: {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}) {
  const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);

  await updateProfile(credential.user, {
    displayName: `${data.firstName} ${data.secondName}`,
  });

  const role = isAdminEmail(data.email) ? 'admin' : 'user';

  const profile: UserProfile = {
    uid: credential.user.uid,
    firstName: data.firstName,
    secondName: data.secondName,
    email: data.email,
    role,
    createdAt: new Date().toISOString(),
    status: 'active',
  };

  await setDoc(doc(db, 'users', credential.user.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });

  return credential.user;
}

export async function loginUser(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export function observeAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
