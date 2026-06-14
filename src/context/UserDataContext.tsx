import { createContext, useContext, type ReactNode } from 'react';
import { useUserData } from '../hooks/useUserData';
import type { UserProfile } from '../lib/userApi';

type UserDataContextValue = ReturnType<typeof useUserData>;

const UserDataContext = createContext<UserDataContextValue | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const value = useUserData();
  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}

export function useUserDataContext(): UserDataContextValue {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error('useUserDataContext must be used inside UserDataProvider');
  return ctx;
}

export type { UserProfile };
