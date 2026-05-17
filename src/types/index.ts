export type Role = 'user' | 'admin';

export type UserProfile = {
  uid: string;
  firstName: string;
  secondName: string;
  email: string;
  role: Role;
  createdAt?: string;
  lastLoginAt?: string;
  avatar?: string;
  status?: 'active' | 'blocked';
};

export type ApkItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  version: string;
  size: string;
  apkUrl: string;
  apkPath?: string;
  iconUrl: string;
  iconPath?: string;
  screenshots: string[];
  screenshotPaths?: string[];
  downloads: number;
  featured: boolean;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};
