import axios from 'axios';

export const api = axios.create({
    // baseURL: 'http://localhost:10000', 
    baseURL:'https://gastosapp-nestjs.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        
    },
})


