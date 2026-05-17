import Link from 'next/link';
import type { ApkItem } from '@/types';

export default function ApkCard({ app }: { app: ApkItem }) {
  return (
    <div className="glass rounded-[34px] overflow-hidden border border-white/10 hover:-translate-y-1 transition">
      <div className="h-48 bg-slate-900 overflow-hidden">
        <img src={app.iconUrl} alt={app.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold text-white">{app.title}</h3>
            <p className="text-slate-400 text-sm mt-1 line-clamp-2">{app.description}</p>
          </div>
          {app.featured ? (
            <span className="text-xs px-2 py-1 rounded-full bg-fuchsia-500/15 text-fuchsia-300">
              Featured
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
          <span>{app.category}</span>
          <span>v{app.version}</span>
        </div>
        <div className="mt-2 text-sm text-slate-400">{app.size}</div>

        <Link href={`/app/${app.id}`} className="inline-flex mt-5 accent px-5 py-3 rounded-2xl font-semibold">
          Download
        </Link>
      </div>
    </div>
  );
}
