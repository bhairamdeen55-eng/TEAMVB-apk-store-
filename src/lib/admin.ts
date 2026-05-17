import type { User } from 'firebase/auth';

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map(s => s.trim().toLowerCase())
  .filter(Boolean);

export function isAdminUser(user: User | null) {
  return !!user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
}
