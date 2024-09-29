// import config from "@/config/config";
// import axios from "axios";

// const api = axios.create({
//     baseURL:config.backendUri,
//     headers:{
//         "Content-Type":"application/json"
//     },
// })

// export const login = async(data:{email:string,password:string})=>{
//     return api.post('/users/login',data)
// }

// export const register = async(data:{name:string,email:string, password:string})=>{
//     return api.post('/users/register', data)
// }

import axios from 'axios';
import useTokenStore from '@/store';

const api = axios.create({
    // todo: move this value to env variable.
    baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (data: { email: string; password: string }) =>
    api.post('/users/login', data);

export const register = async (data: { name: string; email: string; password: string }) =>
    api.post('/users/register', data);

export const getBooks = async () => api.get('/books');

export const createBook = async (data: FormData) =>
    api.post('/books', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
export const getBookById = async (id: string) => api.get(`/books/${id}`);

export const deleteBook = async(id:string)=>api.delete(`/books/${id}`);
export const updateBook = async (id:string,data: FormData) =>
    api.put(`/books/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });