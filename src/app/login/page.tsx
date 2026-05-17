'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser(email, password);
    router.push('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-[34px] p-8 space-y-5 border border-white/10">
        <h1 className="text-3xl font-extrabold text-center">Login</h1>
        <p className="text-center text-slate-400 text-sm">Use your email and password.</p>

        <input
          className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
          placeholder="Email"
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

        <button className="w-full accent py-4 rounded-2xl font-bold">Sign In</button>

        <p className="text-center text-slate-400 text-sm">
          New user? <Link href="/register" className="text-indigo-300">Create account</Link>
        </p>

        <p className="text-center text-slate-500 text-xs">
          Admin panel auto-shows only for admin emails.
        </p>
      </form>
    </main>
  );
}
