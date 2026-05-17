'use client';

import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { observeAuth } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return observeAuth((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}
