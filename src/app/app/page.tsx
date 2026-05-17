'use client';

import { useEffect, useState } from 'react';
import { fetchPublishedApps } from '@/lib/db';
import type { ApkItem } from '@/types';
import ApkCard from '@/components/ApkCard';

export default function AppHomePage() {
  const [apps, setApps] = useState<ApkItem[]>([]);

  useEffect(() => {
    fetchPublishedApps().then(setApps);
  }, []);

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All APKs</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map(app => <ApkCard key={app.id} app={app} />)}
        </div>
      </div>
    </main>
  );
}
