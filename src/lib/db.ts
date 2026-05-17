import { db } from './firebase';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import type { ApkItem, UserProfile } from '@/types';
import { deleteStorageFile } from './storage';
import { tsToMs } from './utils';

function sortNewest<T extends { createdAt?: any }>(items: T[]) {
  return [...items].sort((a, b) => tsToMs(b.createdAt) - tsToMs(a.createdAt));
}

export async function createApk(data: Omit<ApkItem, 'id' | 'downloads'>) {
  return addDoc(collection(db, 'apps'), {
    ...data,
    downloads: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateApk(id: string, data: Partial<ApkItem>) {
  return updateDoc(doc(db, 'apps', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteApkWithAssets(id: string) {
  const snap = await getDoc(doc(db, 'apps', id));
  if (snap.exists()) {
    const data = snap.data() as Partial<ApkItem>;
    await deleteStorageFile(data.iconPath);
    await deleteStorageFile(data.apkPath);
    if (Array.isArray(data.screenshotPaths)) {
      for (const p of data.screenshotPaths) await deleteStorageFile(p);
    }
  }
  return deleteDoc(doc(db, 'apps', id));
}

export async function fetchAllApps() {
  const snap = await getDocs(collection(db, 'apps'));
  return sortNewest(snap.docs.map(d => ({ id: d.id, ...d.data() })) as ApkItem[]);
}

export async function fetchPublishedApps() {
  const all = await fetchAllApps();
  return all.filter(a => a.published);
}

export async function fetchAppsByCategorySlug(categorySlug: string) {
  const all = await fetchPublishedApps();
  return all.filter(a => a.categorySlug === categorySlug);
}

export async function getAppById(id: string) {
  const snap = await getDoc(doc(db, 'apps', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as ApkItem;
}

export async function incrementDownload(id: string) {
  return updateDoc(doc(db, 'apps', id), { downloads: increment(1) });
}

export async function fetchUsers() {
  const snap = await getDocs(collection(db, 'users'));
  return sortNewest(snap.docs.map(d => ({ uid: d.id, ...d.data() })) as UserProfile[]);
}
