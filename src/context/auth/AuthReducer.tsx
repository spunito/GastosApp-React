
import type { AuthState } from "./AuthContext";


type AuthAction =
  | { type: 'LOGIN'; payload: { name: string; token: string , id: string; email: string;} }
  | { type: 'LOGOUT' }
  | {type: 'SET_LOADING' ; payload : {loading:boolean}};


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
    case 'SET_LOADING':
        return {
          ...state,
          isLoading: action.payload.loading, // usar .loading
        };
    default:
      return state;
  }
};

