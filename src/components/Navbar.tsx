'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { isAdminUser } from '@/lib/admin';

export default function Navbar() {
  const { user } = useAuth();
  const admin = isAdminUser(user);

  return (
    <header className="sticky top-0 z-40 p-4">
      <div className="glass max-w-7xl mx-auto rounded-[30px] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <div className="h-12 w-12 rounded-2xl accent flex items-center justify-center shadow-glow overflow-hidden">
            <img src="/logo.png" alt="TEAMVB" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-white leading-tight text-lg sm:text-xl truncate">
              {process.env.NEXT_PUBLIC_TEAM_NAME || 'TEAMVB APK Store'}
            </div>
            <div className="text-xs sm:text-sm text-slate-400 truncate">
              {process.env.NEXT_PUBLIC_TEAM_SUBTITLE || 'Deployed by Bhairamdeen Kushwaha and Vikas Vishwakarma'}
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
            title="Login"
          >
            👤
          </Link>

          {admin ? (
            <Link
              href="/admin/dashboard"
              className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
              title="Admin Panel"
            >
              ⚙
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
