
import type { AuthState } from "./AuthContext";


type AuthAction =
  | { type: 'LOGIN'; payload: { name: string; token: string , id: string; email: string;} }
  | { type: 'LOGOUT' };


export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload 
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

