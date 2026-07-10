import * as Toast from "@radix-ui/react-toast"
import { useContext,createContext, useState, useCallback } from "react";

const Toast_context=createContext(null);
export default function Toast_Provider({children}){
    const [q,setq]=useState([]);
    const set_q=useCallback((state,message)=>{
        setq((v)=>{
           return [...v,
                {
                    id:Date.now(),
                    state:state,
                    message:message
                }
            ]
        })
    },[])
    const rm_q=useCallback((id)=>{
        setq((v)=>{
           return v.filter((i)=>i.id!=id)
        })
    },[])
return(
    <Toast_context.Provider value={{set_q}}>
        {children}
        <Toast.Provider duration={3000}>
        {
            q.map((item)=>(
                <Toast.Root key={item.id}open={item.state} onOpenChange={(open)=>(!open?rm_q(item.id):"")}>
                    <Toast.Description style={{padding:"5px",display:'flex',fontFamily:"ui-sans-serif",fontWeight:"normal"}}>
                        {item.message}
                    </Toast.Description>
                    <Toast.Close/>
                </Toast.Root>
            ))
        }
        <Toast.Viewport
        style={{display:"flex",position:"fixed",zIndex:999,
            top:0,right:20,
            margin:"20px",backgroundColor:"gray", flexDirection:"column",
        width:"fit-content",height:"fit-content",flexWrap:"nowrap",overflow:"hidden"}}
        />
        </Toast.Provider>
    </Toast_context.Provider>
)
}

export function Toast_use(){
    const c=useContext(Toast_context);
    if(!c){
        return alert("User must be within auth provider")
    }
    return c;
}