import { initialAuthState } from '@/context/auth/AuthContext';
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        
    },
})

api.interceptors.request.use((config) => {
    const token = initialAuthState.token;
    if(token){
        config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
