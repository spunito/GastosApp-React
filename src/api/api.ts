import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:10000', 
    withCredentials: true,
    // https://gastosapp-nestjs.onrender.com
    headers: {
        'Content-Type': 'application/json',
        
    },
})


