import { useContext,createContext } from "react"
import {supabase} from "./supabase.js"
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
const New_Auth=createContext();

export default function Auth({children}){
    const[loading,setloading]=useState(false);
    const[error,setError]=useState(false);
    const[user,setUser]=useState({role:null,user_id:null,authenticated:false})

    const fetch=useCallback(async()=>{
        setloading(true);
        const {data}=await supabase.auth.getUser();
        if(data?.user){
            setUser({role:data.user.user_metadata.role,user_id:data.user.user_metadata.staff_id,authenticated:true})
            setError(false);
            setloading(false);
        }
        else{
            setUser({});
            setloading(false);
            setError(true);
        }
    }
)
    useEffect(()=>{
        fetch();
    },[])
    return(
        <New_Auth value={{
            loading:loading,
            user:user,
            error:error,
            
        }}>
            {children}
        </New_Auth>
    )
}

export function Check_auth(){
    const v=useContext(New_Auth);
    if(!v){
        return "Unauthenticated"
    }
    else{
        return v;
    }
}