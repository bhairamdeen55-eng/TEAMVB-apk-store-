'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, isAdminEmail } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await loginUser(email, password);

    if (!isAdminEmail(user.email)) {
      alert('Admin only');
      router.push('/');
      return;
    }

    router.push('/admin/dashboard');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-[34px] p-8 space-y-5 border border-white/10">
        <h1 className="text-3xl font-extrabold text-center">Admin Login</h1>
        <input
          className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
          placeholder="Admin Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full accent py-4 rounded-2xl font-bold">Enter Admin</button>
      </form>
    </main>
  );
}
