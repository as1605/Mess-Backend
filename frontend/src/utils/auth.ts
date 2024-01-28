import { createContext } from 'react';
import { Admin } from './types';

export const AuthContext = createContext<{ user: Admin | null; setUser: (u: Admin | null) => void }>({
  user: null,
  setUser: () => null,
});
