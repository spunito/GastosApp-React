import type { LoginForm } from '@/types/auth';
import { createContext } from 'react';

// Definición de tipos para el contexto de autenticación
export type AuthState = {
    isAuthenticated: boolean;
    user: { id: string; email: string; name: string; token: string } | null;
}

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    user:null
}

export type AuthContextProps = {
  state: AuthState;
  dispatch: React.Dispatch<any>;
  onLogin: (data:LoginForm) => Promise<void>;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);