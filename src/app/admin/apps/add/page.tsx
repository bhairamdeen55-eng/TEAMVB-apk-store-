'use client';

import { useState } from 'react';
import { createApk } from '@/lib/db';
import { uploadStorageFile } from '@/lib/storage';
import { makeSlug } from '@/lib/utils';
import AdminGuard from '@/components/AdminGuard';
import { useRouter } from 'next/navigation';

const CATEGORY_OPTIONS = [
  { label: 'Education', slug: 'education' },
  { label: 'Prank', slug: 'prank' },
  { label: 'Social Media', slug: 'social-media' },
  { label: 'Editors', slug: 'editors' },
];

export default function AddAppPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Education',
    categorySlug: 'education',
    version: '',
    size: '',
    featured: false,
    published: true,
  });

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [apkFile, setApkFile] = useState<File | null>(null);
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!iconFile || !apkFile) {
      alert('Icon aur APK file dono required hain');
      return;
    }

    setLoading(true);
    try {
      const slug = makeSlug(form.title || 'apk');

      const icon = await uploadStorageFile(`apps/${slug}/icon`, iconFile);
      const apk = await uploadStorageFile(`apps/${slug}/apk`, apkFile);
      const screenshots = await Promise.all(
        screenshotFiles.map((file) => uploadStorageFile(`apps/${slug}/screenshots`, file))
      );

      await createApk({
        title: form.title,
        description: form.description,
        category: form.category,
        categorySlug: form.categorySlug,
        version: form.version,
        size: form.size,
        iconUrl: icon.url,
        iconPath: icon.path,
        apkUrl: apk.url,
        apkPath: apk.path,
        screenshots: screenshots.map(s => s.url),
        screenshotPaths: screenshots.map(s => s.path),
        featured: form.featured,
        published: form.published,
      });

      alert('APK added successfully');
      router.push('/admin/apps');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <main className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add APK</h1>

          <form onSubmit={submit} className="grid gap-4">
            <input
              className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none min-h-32"
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />

            <select
              className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
              value={form.categorySlug}
              onChange={e => {
                const option = CATEGORY_OPTIONS.find(c => c.slug === e.target.value);
                setForm({
                  ...form,
                  categorySlug: e.target.value,
                  category: option?.label || 'Education',
                });
              }}
            >
              {CATEGORY_OPTIONS.map(cat => (
                <option key={cat.slug} value={cat.slug}>{cat.label}</option>
              ))}
            </select>

            <input
              className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
              placeholder="Version"
              value={form.version}
              onChange={e => setForm({ ...form, version: e.target.value })}
            />

            <input
              className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
              placeholder="Size"
              value={form.size}
              onChange={e => setForm({ ...form, size: e.target.value })}
            />

            <label className="text-sm text-slate-300">Icon File</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setIconFile(e.target.files?.[0] || null)}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <label className="text-sm text-slate-300">APK File</label>
            <input
              type="file"
              accept=".apk"
              onChange={e => setApkFile(e.target.files?.[0] || null)}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <label className="text-sm text-slate-300">Screenshots (multiple)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={e => setScreenshotFiles(Array.from(e.target.files || []))}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => setForm({ ...form, featured: e.target.checked })}
              />
              Featured
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.published}
                onChange={e => setForm({ ...form, published: e.target.checked })}
              />
              Published
            </label>

            <button disabled={loading} className="accent py-4 rounded-2xl font-bold disabled:opacity-60">
              {loading ? 'Uploading...' : 'Save APK'}
            </button>
          </form>
        </div>
      </main>
    </AdminGuard>
  );
                                        }
