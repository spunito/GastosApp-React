import { useReducer } from 'react';
import { AuthReducer } from './AuthReducer';
import { AuthContext, initialAuthState } from './AuthContext';
import type { LoginForm, LoginResponse } from '@/types/auth';
import { api } from '@/api/api';
import { useNavigate } from 'react-router';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);
  const navigate = useNavigate();

    const onLogin = async (data: LoginForm) => {
    try {

      const {email , password} = data;

      const res = await api.post<LoginResponse>("/users/login", {
        email,
        password});

      dispatch({
        type: 'LOGIN',
        payload: {
          name: res.data.user.name,       
          token: res.data.access_token,
          id: res.data.user.id,
          email: res.data.user.email
        }
      });
      
      console.log(state)

      navigate('/dashboard');

    } catch (error) {
      console.log("Error al iniciar sesión" + error)
    }
  }

  const onLogout = () => {

    dispatch({type:'LOGOUT'})
    navigate('/',{replace:true})

  }
  

  return (
    <AuthContext.Provider value={{
      state,
      dispatch,
      onLogin,
      onLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}