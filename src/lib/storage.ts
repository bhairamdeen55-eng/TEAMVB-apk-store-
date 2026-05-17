import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

function cleanName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export async function uploadStorageFile(folder: string, file: File) {
  const path = `${folder}/${Date.now()}_${cleanName(file.name)}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { path, url };
}

export async function deleteStorageFile(path?: string) {
  if (!path) return;
  try {
    await deleteObject(ref(storage, path));
  } catch {
    // ignore
  }
}
