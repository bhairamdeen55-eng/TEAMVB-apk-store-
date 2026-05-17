'use client';

import { useEffect, useState } from 'react';
import { deleteApkWithAssets, fetchAllApps } from '@/lib/db';
import type { ApkItem } from '@/types';
import Link from 'next/link';
import AdminGuard from '@/components/AdminGuard';

export default function AdminAppsPage() {
  const [apps, setApps] = useState<ApkItem[]>([]);

  useEffect(() => {
    fetchAllApps().then(setApps);
  }, []);

  const del = async (id: string) => {
    if (!confirm('Delete APK with files?')) return;
    await deleteApkWithAssets(id);
    setApps(prev => prev.filter(x => x.id !== id));
  };

  return (
    <AdminGuard>
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Manage APKs</h1>
            <Link href="/admin/apps/add" className="accent px-5 py-3 rounded-2xl font-semibold">
              Add APK
            </Link>
          </div>

          <div className="grid gap-4">
            {apps.map(app => (
              <div key={app.id} className="glass rounded-[30px] p-4 flex items-center justify-between gap-4 border border-white/10">
                <div className="flex items-center gap-4">
                  <img src={app.iconUrl} className="w-16 h-16 rounded-2xl object-cover" alt={app.title} />
                  <div>
                    <h3 className="font-bold text-lg">{app.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {app.category} · {app.version} · {app.size}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/admin/apps/edit/${app.id}`} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    Edit
                  </Link>
                  <button onClick={() => del(app.id)} className="bg-red-500/20 text-red-200 px-4 py-2 rounded-xl">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}
