'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchAppsByCategorySlug } from '@/lib/db';
import type { ApkItem } from '@/types';
import { useParams } from 'next/navigation';
import ApkCard from '@/components/ApkCard';

const prettyName = (slug: string) =>
  slug
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

export default function CategoryPage() {
  const params = useParams<{ name: string }>();
  const categorySlug = params.name;
  const categoryName = useMemo(() => prettyName(categorySlug), [categorySlug]);

  const [apps, setApps] = useState<ApkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppsByCategorySlug(categorySlug)
      .then(setApps)
      .finally(() => setLoading(false));
  }, [categorySlug]);

  return (
    <main className="min-h-screen text-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass rounded-[38px] p-6 sm:p-8 border border-white/10">
          <p className="text-sm uppercase tracking-[0.25em] text-indigo-300">Category</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-3">{categoryName}</h1>
          <p className="text-slate-400 mt-4 max-w-2xl">
            Is category ke apps yahan tabhi dikhenge jab user is category par click karega.
          </p>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="text-slate-400">Loading...</div>
          ) : apps.length === 0 ? (
            <div className="glass rounded-[32px] p-8 text-center text-slate-400 border border-white/10">
              Is category me abhi koi APK nahi hai.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.map(app => (
                <ApkCard key={app.id} app={app} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
