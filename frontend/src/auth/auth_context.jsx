import { createContext,useContext, useEffect, useState,useCallback } from "react";
import con from "../axios/axios";
const Auth=createContext();
export default function AuthContext({children}){
    const [values,setvalues]=useState({
        group_role:null,
        role:null,
        loading:true,
        authenticated:false
    })
    const f=useCallback(async()=>{
        try{
            await con().get('/get_login_status').then((data)=>{
                console.log(data.data.user);
                if(data.data.user.group&&data.data.user.role){
                    console.log("values set")
                    setvalues({group_role:data.data.user.group,role:data.data.user.role,authenticated:true,loading:false})
                }
                else{
                    console.log("unaunthenticated");
                    setvalues({group_role:null,role:null,authenticated:false,loading:false})
                }
            })
        }
        catch(error){
            console.log(error);
            // alert("An error occured");
            setvalues({group_role:null,role:null,authenticated:false,loading:false})
        }},[])
    useEffect(()=>{
        f();
    },[f])
    return(
        <Auth.Provider value={{
            group:values.group_role,
            role:values.role,
            loading:values.loading,
            authenticated:values.authenticated
        }}>
            {children}

        </Auth.Provider>
    )

}

export function CheckContxt(){
        const context=useContext(Auth);
        if(!context){
          return {loading:false,authenticated:false,group:null,role:null} 
        }
        return context;
    
}