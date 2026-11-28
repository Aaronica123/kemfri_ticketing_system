
import {BarChart} from "lucide-react";
import {  Button, Separator, Spinner,  } from "@radix-ui/themes";


import { Text } from "@radix-ui/themes";
import { LogOut } from "lucide-react";
import { LayoutDashboard } from "lucide-react";

import { BookOpenCheck } from "lucide-react";
import { ListTodo } from "lucide-react";

import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";

import { SidebarClose } from "lucide-react";


import { Check_auth } from "../auth/new_auth";
import { supabase } from "../auth/supabase";
export default function Nav_bar({children}){
const nav=useNavigate();
const{user,loading,error}=Check_auth();

const location = useLocation();
const isActive = (path) => {
    if(location.pathname === path){
        return true;
    }
    else{
        return false;
    }

};

const go = (path) => () => {
  if (location.pathname !== path) nav(path);
  settrack(false);
};
console.log(user);
const [track,settrack]=useState(true);
const [lg,setlg]=useState(false);

const update=()=>{
    settrack(!track);
}
const usr=user.user_id;
console.log(usr);


const signout=async()=>{
    const {data,error}=await supabase.auth.signOut({scope:"local"})
    
        alert("Signed out successfully");
        nav('/', { replace: true });
       localStorage.removeItem('lastname');
       localStorage.removeItem('firstname');
       setlg(false);
       console.log(data);
       console.log(error)
 

}

const handle=()=>{
    settrack(!track);
}
if(loading){
    return(
        <div>
        <Spinner size={"3"}></Spinner>
        <p>Loading</p>
        </div>
    )
}else if(error){
     return(
        <div>
        
        <p>An error occured</p>
        </div>
    )
}
else{
return(<>

<div style={{width:"100vw",height:"100vh", display:"flex",flexDirection:"row"}}>
    <div style={{
    position:"absolute",
    zIndex:1,
    inset:0,
    backdropFilter:"blur(5px)",
    background:"rgba(0,0,0,0.15)",
    opacity:track?1:0,
    pointerEvents:track?"auto":"none"
    
    

}} onClick={handle}></div>

    <div style={{flex:0,width:"fit-content",display:"flex",height:"100%",
        flexDirection:"column",justifyContent:"left",
        position:"absolute",
        zIndex:2,inset:0,backdropFilter:"blur(10px)",
        transform:track?"translateX(0)":"translateX(-100%)",
        background:"#03103B 90%",flexGrow:"none",transition: "transform 300ms ease-in-out"

       }} >
        
            <div style={{width:"100%",height:"fit-content",display:'flex',justifyContent:"left",padding:"10px",gap:"5px",marginTop:"15px",borderBottom:"solid 1px #BED0EB"}}>
            {/* <Avatar fallback="KM" size={"4"} src="" color="blue" radius="medium"></Avatar>  */}
            <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                 <div style={{width:"fit-content",height:"fit-content",background:"#152C54",padding:"10px",borderRadius:"10px"}}>
                    <Text size={"2"} weight={"bold"} style={{color:"white"}}>KM</Text>
                </div> 
            
            <Text weight={"medium"} size={"5"} style={{width:"100%",height:"fit-content",color:"#A8BFDF",fontFamily:"Inter"}}>
                ICT Help Desk
            </Text>
            </div>
            <div style={{width:"fit-content",justifyContent:"right",alignItems:"center",display:"flex",marginLeft:"15px"}}>
            <Button variant="ghost">
            <SidebarClose size={"25"} onClick={update} color="#A8BFDF"style={{width:"fit-content",height:"fit-content",cursor:"pointer"}}></SidebarClose>
            </Button>  
            </div>
            </div> 
            
            
            <div style={{width:"100%",height:"100%",display:"flex",
                flexDirection:"column",overflowX:"hidden",overflowY:"auto"}}>
            <div style={{
                width:"100%",height:"fit-content",display:"flex",
                flexDirection:"column"
            }}>
                <Text size={"2"} style={{padding:"10px",color:"#BED0EB",fontFamily:"inter" }}> Users</Text>
                <div style={{width:"100%",height:"fit-content",display:"flex",
                flexDirection:"column",padding:"10px",gap:"12px",marginTop:"-8px"}}>
                    <button onClick={go("/dashboard")} style={{cursor:"pointer",borderRadius:"5px",background:isActive("/dashboard")?"#254B85":"",border:isActive("/dashboard")?"none":"none",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <LayoutDashboard color={isActive("/dashboard")?"#FFFFFF":"#BED0EB"}></LayoutDashboard>
                        <Text style={{width:"100%",display:"flex",color:isActive("/dashboard")?"#FFFFFF":"#BED0EB"}}>
                        Dashboard
                        </Text>
                        </button>
                    <button
                   onClick={go("/submit")}
                    style={{cursor:"pointer",borderRadius:"5px",background:isActive("/submit")?"#254B85":"",border:isActive("/submit")?"none":"none",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <BookOpenCheck color={isActive("/submit")?"#FFFFFF":"#BED0EB"}></BookOpenCheck>
                        <Text style={{width:"100%",display:"flex",color:isActive("/submit")?"#FFFFFF":"#BED0EB"}}>
                        Submit Ticket
                        </Text>
                    </button>
                    <button
                    onClick={go("/my_tickets")}
                    style={{cursor:"pointer",borderRadius:"5px",background:isActive("/my_tickets")?"#254B85":"",border:isActive("/my_tickets")?"none":"none",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <ListTodo color={isActive("/my_tickets")?"#FFFFFF":"#BED0EB"}></ListTodo>
                        <Text style={{width:"100%",display:"flex",color:isActive("/my_tickets")?"#FFFFFF":"#BED0EB"}}>
                        User Tickets
                        </Text>
                    </button>
                </div>
                </div>        
            {user.role=="STAFF"?   
            <div style={{
                width:"100%",height:"fit-content",display:"flex",
                flexDirection:"column"
            }}>
                <Text size={"2"} style={{padding:"10px",color:"#BED0EB" }}> Staff</Text>
                <div style={{width:"100%",height:"fit-content",display:"flex",
                flexDirection:"column",padding:"10px",gap:"12px",marginTop:"-8px"}}>
                    
                    <button 
                    onClick={go("/assigned_tickets")}
                    style={{cursor:"pointer",borderRadius:"5px",background:isActive("/assigned_tickets")?"#254B85":"",border:isActive("/assigned_tickets")?"none":"none",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <LayoutDashboard color={isActive("/assigned_tickets")?"#FFFFFF":"#BED0EB"}></LayoutDashboard>
                        <Text style={{width:"100%",display:"flex",color:isActive("/assigned_tickets")?"#FFFFFF":"#BED0EB"}}>
                        Assigned Tickets
                        </Text>
                        </button>
                    <button
                    onClick={go("/underway_tickets")}
                    
                    style={{cursor:"pointer",borderRadius:"5px",background:isActive("/underway_tickets")?"#254B85":"",border:isActive("/underway_tickets")?"none":"none",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <BookOpenCheck color={isActive("/underway_tickets")?"#FFFFFF":"#BED0EB"}></BookOpenCheck>
                        <Text style={{width:"100%",display:"flex",color:isActive("/underway_tickets")?"#FFFFFF":"#BED0EB"}}>
                        Underway Tickets
                        </Text>
                    </button>
                    
                </div>
                </div>   
                :""}       
            <div style={{width:"100%"}}></div>
            </div> 
            
            <div style={{width:"100%",height:"fit-content",display:"flex",padding:"15px"}}>
                 <button
                   onClick={signout}
                    style={{cursor:"pointer",borderRadius:"5px",background:"#254B85",border:"solid 1px #BED0EB",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <LogOut color={"#FFFFFF"}></LogOut>
                        <Text style={{width:"100%",display:"flex",color:"#FFFFFF"}}>
                        Log out
                        </Text>
                    </button>
                   
                 
            </div>
     </div> 

            <div style={{width:"100%",height:"100%",display:"flex",overflow:"auto",flexDirection:"column",flex:1}}> 
               
            <div style={{width:"100%",height:"fit-content",display:"flex",justifyContent:"right",
               flexDirection:"row",gap:"10px",padding:'20px',background:"#FFFFFF"}}>
                <div style={{cursor:"pointer",width:"fit-content",height:"fit-content",color:"whitesmoke",padding:"3px",borderRadius:"5px"}} >
                    <BarChart color="black" onClick={()=>settrack(true)}></BarChart>
                </div>
                <div style={{width:"100%",height:"fit-content",display:"flex", 
                    justifyContent:"right",flexWrap:"wrap"}}>
                <Text weight={"bold"} size={"3"} style={{fontFamily:"Inter",color:"#0865C4"}}>
                            {String("Kenya Marine And Fisheries Research Institute").toUpperCase()}
                        </Text>
                </div>
                <Separator orientation={"vertical"} size={"2"} style={{fontWeight:"bold"}}/>
                <div style={{alignItems:"center",justifyContent:"center",display:"flex",width:"fit-content"
                    ,height:"fit-content"
                }}>
                
            </div>
            
             </div>

        
       
        <div style={{width:"100%", display:"flex",height:"100%",overflow:"auto",padding:"10px",background:"#F5F7FC"}}>
            {children}
        </div>

        </div>
       
</div>
</>)
}
}
