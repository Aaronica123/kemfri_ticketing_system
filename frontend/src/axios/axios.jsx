
import axios from "axios";
import { supabase } from "../auth/supabase.js";
export const connect=axios.create({
baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`,
headers:{
    "Content-Type":"application/json"
},
withCredentials:true
})
connect.interceptors.request.use(async(value)=>{
    const{data,error}=await supabase.auth.getSession();
    value.headers.Authorization=data?.session?.access_token;
    value.withCredentials=true
    return value;
})
export default function con(){
    
    return connect;
}

