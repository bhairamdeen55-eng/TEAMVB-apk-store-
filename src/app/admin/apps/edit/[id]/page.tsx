'use client';

import { useEffect, useState } from 'react';
import { getAppById, updateApk } from '@/lib/db';
import { uploadStorageFile, deleteStorageFile } from '@/lib/storage';
import { makeSlug } from '@/lib/utils';
import AdminGuard from '@/components/AdminGuard';
import { useRouter } from 'next/navigation';

const CATEGORY_OPTIONS = [
  { label: 'Education', slug: 'education' },
  { label: 'Prank', slug: 'prank' },
  { label: 'Social Media', slug: 'social-media' },
  { label: 'Editors', slug: 'editors' },
];

export default function EditAppPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [newIconFile, setNewIconFile] = useState<File | null>(null);
  const [newApkFile, setNewApkFile] = useState<File | null>(null);
  const [newScreenshotFiles, setNewScreenshotFiles] = useState<File[]>([]);

  useEffect(() => {
    getAppById(params.id).then(setForm);
  }, [params.id]);

  if (!form) {
    return (
      <AdminGuard>
        <div className="p-6">Loading...</div>
      </AdminGuard>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let iconUrl = form.iconUrl;
      let iconPath = form.iconPath;
      let apkUrl = form.apkUrl;
      let apkPath = form.apkPath;
      let screenshots = Array.isArray(form.screenshots) ? form.screenshots : [];
      let screenshotPaths = Array.isArray(form.screenshotPaths) ? form.screenshotPaths : [];

      const slug = makeSlug(form.title || 'apk');

      if (newIconFile) {
        await deleteStorageFile(iconPath);
        const uploaded = await uploadStorageFile(`apps/${slug}/icon`, newIconFile);
        iconUrl = uploaded.url;
        iconPath = uploaded.path;
      }

      if (newApkFile) {
        await deleteStorageFile(apkPath);
        const uploaded = await uploadStorageFile(`apps/${slug}/apk`, newApkFile);
        apkUrl = uploaded.url;
        apkPath = uploaded.path;
      }

      if (newScreenshotFiles.length > 0) {
        for (const p of screenshotPaths) await deleteStorageFile(p);
        const uploadedShots = await Promise.all(
          newScreenshotFiles.map(file => uploadStorageFile(`apps/${slug}/screenshots`, file))
        );
        screenshots = uploadedShots.map(s => s.url);
        screenshotPaths = uploadedShots.map(s => s.path);
      }

      await updateApk(params.id, {
        title: form.title,
        description: form.description,
        category: form.category,
        categorySlug: form.categorySlug,
        version: form.version,
        size: form.size,
        iconUrl,
        iconPath,
        apkUrl,
        apkPath,
        screenshots,
        screenshotPaths,
        featured: !!form.featured,
        published: !!form.published,
      });

      alert('APK updated');
      router.push('/admin/apps');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <main className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Edit APK</h1>

          <form onSubmit={submit} className="grid gap-4">
            <input className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" />
            <textarea className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none min-h-32" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />

            <select className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none" value={form.categorySlug || 'education'} onChange={e => {
              const option = CATEGORY_OPTIONS.find(c => c.slug === e.target.value);
              setForm({
                ...form,
                categorySlug: e.target.value,
                category: option?.label || 'Education',
              });
            }}>
              {CATEGORY_OPTIONS.map(cat => <option key={cat.slug} value={cat.slug}>{cat.label}</option>)}
            </select>

            <input className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none" value={form.version || ''} onChange={e => setForm({ ...form, version: e.target.value })} placeholder="Version" />
            <input className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none" value={form.size || ''} onChange={e => setForm({ ...form, size: e.target.value })} placeholder="Size" />

            <label className="text-sm text-slate-300">Change Icon (optional)</label>
            <input type="file" accept="image/*" onChange={e => setNewIconFile(e.target.files?.[0] || null)} className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none" />

            <label className="text-sm text-slate-300">Change APK (optional)</label>
            <input type="file" accept=".apk" onChange={e => setNewApkFile(e.target.files?.[0] || null)} className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none" />

            <label className="text-sm text-slate-300">Replace Screenshots (optional)</label>
            <input type="file" accept="image/*" multiple onChange={e => setNewScreenshotFiles(Array.from(e.target.files || []))} className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none" />

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input type="checkbox" checked={!!form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
              Featured
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input type="checkbox" checked={!!form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
              Published
            </label>

            <button disabled={loading} className="accent py-4 rounded-2xl font-bold disabled:opacity-60">
              {loading ? 'Updating...' : 'Update APK'}
            </button>
          </form>
        </div>
      </main>
    </AdminGuard>
  );
}
