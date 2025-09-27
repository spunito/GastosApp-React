import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://gastosapp-nestjs.onrender.com', // http://localhost:3000
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        
    },
})


