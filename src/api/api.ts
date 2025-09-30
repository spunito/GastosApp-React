import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://gastosapp-nestjs.onrender.com', // http://localhost:10000
    headers: {
        'Content-Type': 'application/json',
        
    },
})


