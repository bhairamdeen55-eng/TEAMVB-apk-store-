'use client';

import { useEffect, useState } from 'react';
import { getAppById, incrementDownload } from '@/lib/db';
import type { ApkItem } from '@/types';

export default function ApkDetailPage({ params }: { params: { slug: string } }) {
  const [app, setApp] = useState<ApkItem | null>(null);

  useEffect(() => {
    getAppById(params.slug).then(setApp);
  }, [params.slug]);

  if (!app) return <div className="p-6 text-white">Loading...</div>;

  const download = async () => {
    await incrementDownload(app.id);
    window.open(app.apkUrl, '_blank');
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto glass rounded-[38px] p-6 border border-white/10">
        <img src={app.iconUrl} className="w-full h-80 object-cover rounded-[30px]" alt={app.title} />
        <div className="mt-5 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">{app.title}</h1>
            <p className="text-slate-400 mt-3">{app.description}</p>
            <div className="mt-4 text-sm text-slate-300">
              Category: {app.category} · Version: {app.version} · Size: {app.size} · Downloads: {app.downloads}
            </div>
          </div>
          <button onClick={download} className="accent px-6 py-4 rounded-2xl font-bold">
            Download APK
          </button>
        </div>
      </div>
    </main>
  );
}
