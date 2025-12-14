import axios from 'axios';
import { getToken } from '../utils/common';

const instance = axios.create({
    baseURL:'https://ice-library-server.onrender.com'
});

instance.interceptors.request.use((config)=>{
     const token = getToken();
     if(token){
        config.headers.Authorization = `Bearer ${token}`;
     }
     return config;

    } , (error)=>{
        return Promise.reject(error);
});

export default instance;
