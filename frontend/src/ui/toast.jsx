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
    const mt=q[0];
return(
    <Toast_context.Provider value={{set_q}}>
        {children}
        <Toast.Provider duration={3000} >
        {mt&&(
<Toast.Root key={mt.id}open={mt.state} onOpenChange={(open)=>(!open?rm_q(mt.id):"")} style={{background:"linear-gradient(100deg,rgba(12, 201, 53, 0.22),rgba(7, 250, 59, 0.42))",display:"flex",width:"100%",borderRadius:"10px"}}>
                    <Toast.Description style={{fontFamily:"ui-sans-serif",fontWeight:"normal", fontSize:"20px",padding:"10px"}}>
                        {mt.message}
                    </Toast.Description>
                    <Toast.Close/>
                </Toast.Root>
        )
        }
        {/* <div style={{backgroundColor:"yellow",width:"fit-content",height:"fit-content",display:"flex",overflow:"hidden",flexWrap:"nowrap",flexDirection:"column"}}> */}
        <Toast.Viewport
        style={{display:"flex",position:"fixed",zIndex:999, 
            top:0,right:20,margin:"20px",gap:"10px",overflow:"hidden",width:"fit-content"}}
        />
        {/* </div> */}

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