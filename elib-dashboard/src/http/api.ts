import config from "@/config/config";
import axios from "axios";

const api = axios.create({
    baseURL:config.backendUri,
    headers:{
        "Content-Type":"application/json"
    },
})

export const login = async(data:{email:string,password:string})=>{
    return api.post('/users/login',data)
}

export const register = async(data:{name:string,email:string, password:string})=>{
    return api.post('/users/register', data)
}