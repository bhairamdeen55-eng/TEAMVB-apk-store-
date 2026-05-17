'use client';

import { useEffect, useState } from 'react';
import { fetchAllApps, fetchUsers } from '@/lib/db';
import type { ApkItem, UserProfile } from '@/types';
import Link from 'next/link';
import AdminGuard from '@/components/AdminGuard';

export default function AdminDashboardPage() {
  const [apps, setApps] = useState<ApkItem[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    fetchAllApps().then(setApps);
    fetchUsers().then(setUsers);
  }, []);

  const categories = Array.from(new Set(apps.map(a => a.category)));

  return (
    <AdminGuard>
      <main className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Admin Dashboard</h1>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-[30px] p-5">Total APKs: {apps.length}</div>
            <div className="glass rounded-[30px] p-5">Total Users: {users.length}</div>
            <div className="glass rounded-[30px] p-5">Categories: {categories.length}</div>
            <Link href="/admin/apps/add" className="accent rounded-[30px] p-5 text-center font-semibold">
              Add APK
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/admin/users" className="glass rounded-[30px] p-5 border border-white/10">
              Manage Users
            </Link>
            <Link href="/admin/apps" className="glass rounded-[30px] p-5 border border-white/10">
              Manage APKs
            </Link>
          </div>

          <div className="mt-8 glass rounded-[30px] p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-4">Categories in Store</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <span key={cat} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}
