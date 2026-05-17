'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signupUser } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signupUser({ firstName, secondName, email, password });
    router.push('/login');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-[34px] p-8 space-y-5 border border-white/10">
        <h1 className="text-3xl font-extrabold text-center">Sign Up</h1>

        <input
          className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />

        <input
          className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
          placeholder="Second Name"
          value={secondName}
          onChange={e => setSecondName(e.target.value)}
        />

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

        <button className="w-full accent py-4 rounded-2xl font-bold">Create Account</button>
      </form>
    </main>
  );
}
