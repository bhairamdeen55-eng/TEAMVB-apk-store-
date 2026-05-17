'use client';

import { useEffect, useState } from 'react';
import { fetchUsers } from '@/lib/db';
import type { UserProfile } from '@/types';
import AdminGuard from '@/components/AdminGuard';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <AdminGuard>
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">Users</h1>
        <div className="glass rounded-[30px] overflow-hidden border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.uid} className="border-t border-white/10">
                  <td className="p-4">{u.firstName} {u.secondName}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">{u.role}</td>
                  <td className="p-4">{u.status || 'active'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </AdminGuard>
  );
}
