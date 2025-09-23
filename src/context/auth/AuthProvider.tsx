// AuthProvider.tsx - TIPAR EXPLÍCITAMENTE
import { useEffect, useReducer, useCallback } from 'react';
import { AuthReducer } from './AuthReducer';
import { AuthContext, initialAuthState } from './AuthContext';
import type { LoginForm, LoginResponse } from '@/types/auth';
import { api } from '@/api/api';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);
  const navigate = useNavigate();

  const loadUserData = useCallback(async (): Promise<{ gastos: any[], ingresos: any[] }> => {
    if (!state.user?.token) {
      return { gastos: [] as any[], ingresos: [] as any[] };
    }

    try {
      const [gastosRes, ingresosRes] = await Promise.all([
      api.get('/gastos', {
        headers: { Authorization: `Bearer ${state.user.token}` } 
      }),
      api.get('/ingresos', {
        headers: { Authorization: `Bearer ${state.user.token}` } 
      })
      ]);

      return {
        gastos: (gastosRes.data as any[]) || ([] as any[]),
        ingresos: (ingresosRes.data as any[]) || ([] as any[])
      };
    } catch (error) {
      console.error('Error cargando datos del usuario:', error);
      return { gastos: [] as any[], ingresos: [] as any[] };
    }
  }, [state.user?.token]);

  // 1️⃣ Recuperar sesión al cargar la app
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await api.get<LoginResponse>('/users/session');
        dispatch({
          type: 'LOGIN',
          payload: {
            name: res.data.user.name,
            token: res.data.access_token,
            id: res.data.user.id,
            email: res.data.user.email,
          },
        });
      } catch (err) {
        dispatch({ type: 'LOGOUT' });
      }
    };

    fetchSession();
  }, []);

  // 2️⃣ Interceptor para enviar accessToken en cada request
  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (state.user?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${state.user.token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [state.user?.token]);

  // 3️⃣ Login
  const onLogin = async (data: LoginForm) => {
    try {
      const { email, password } = data;
      const res = await api.post<LoginResponse>('/users/login', { email, password });

      dispatch({
        type: 'LOGIN',
        payload: {
          name: res.data.user.name,
          token: res.data.access_token,
          id: res.data.user.id,
          email: res.data.user.email,
        },
      });

      navigate('/dashboard');
    } catch (error) {
      console.log('Error al iniciar sesión', error);
      Swal.fire({
        title: "Error de validación",
        text: "El email o contraseña son incorrectos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // 4️⃣ Logout
  const onLogout = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    } finally {
      dispatch({ type: 'LOGOUT' });
      navigate('/', { replace: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        onLogin,
        onLogout,
        loadUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};