import { useReducer } from 'react';
import { AuthReducer } from './AuthReducer';
import { AuthContext, initialAuthState } from './AuthContext';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  );
}