import Execute_Button, { Load_button, Nav_button } from "./buttons";
import {BarChart, Menu, TicketPlusIcon} from "lucide-react";
import { AlertDialog, Avatar, Button, Card, Separator, Spinner } from "@radix-ui/themes/dist/cjs/index.js";
import Main_Text, { Head_Text } from "./text";
import { Bell } from "lucide-react";
import { Badge } from "@radix-ui/themes/dist/cjs/index.js";
import { ChevronDown } from "lucide-react";
import { Text } from "@radix-ui/themes/dist/cjs/index.js";
import { LogOut } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Dash_btn } from "./buttons";
import { TicketPlus } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { ListTodo } from "lucide-react";
import con from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { CheckContxt } from "../auth/auth_context";
import { useState } from "react";
import { SidebarOpen } from "lucide-react";
import { SidebarClose } from "lucide-react";
import { ScrollArea } from "@radix-ui/themes/dist/cjs/index.js";

import { Heading } from "@radix-ui/themes/dist/cjs/index.js";
// import { useEffect } from "react";
// import user from "../auth/hold.js";
// import UserManager from "../auth/hold.js";
import { Check_auth } from "../auth/new_auth";
import { supabase } from "../auth/supabase";
export default function Nav_bar({children}){
const nav=useNavigate();
const{loading,user,error}=Check_auth();

console.log(user);
const [track,settrack]=useState(true);
const [lg,setlg]=useState(false);
const [count,setcount]=useState(0);
const [btn,trackbtn]=useState({btn1:false,btn2:true,btn3:false,btn4:false,btn5:false,btn6:false})
const update=()=>{
    settrack(!track);
}
const usr=user.user_id;
console.log(usr);
// const path=new WebSocket('ws://localhost:3009/get_notify')

const Connection=()=>{
try{
    const path=new WebSocket('wss://notify-production-a4da.up.railway.app/get_false')
path.onopen=()=>{
    console.log("Connected")
    path.send(JSON.stringify({user_id:usr}))
    
}
path.onmessage=(data_)=>{
    
    const v=JSON.parse(data_.data).data.map((value)=>Object.values(value));
    console.log(JSON.parse(data_.data).length)
    console.log(v);
    setcount(JSON.parse(data_.data).length);
    path.close();
}


}
catch(error){
    console.log(error)
}

}

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
async function logout(){
    setlg(true);
    await con().post('/logout',{}).then((data)=>{
        console.log(data.status);
        alert("Logout done");
       nav('/', { replace: true });
       localStorage.removeItem('lastname');
       localStorage.removeItem('firstname');
       setlg(false);
    }).catch((error)=>{
        console.log(error);
        setlg(false);
        // alert("An error has encountered");
    });
}

const tickets=()=>{nav('/my_tickets');
    trackbtn(()=>({btn1:false,btn2:false,btn3:true,btn4:false,btn5:false,btn6:false}))
}
const notify=()=>{nav('/notifications');
    trackbtn(()=>({btn1:false,btn2:false,btn:false,btn4:true,btn5:false,btn6:false}))

};
const dir=(value)=>{
    if(value==1){
        nav('/dashboard');
        trackbtn(()=>({btn1:true,btn2:false,btn3:false,btn4:false,btn5:false,btn6:false}))
    }
    else{
        nav('/submit');
        trackbtn(()=>({btn1:false,btn2:true,btn3:false,btn4:false,btn5:false,btn6:false}))
        
       
    }
}

    console.log('');
if(loading){
    return (
    <p>Loading Please Wait</p>)
}
else if(!user.authenticated){
    return (<p>User is not allowed</p>)
}
else{
    const{user_id}=CheckContxt();
    const Connection=()=>{
try{
    const path=new WebSocket('wss://notify-production-a4da.up.railway.app/get_false')
path.onopen=()=>{
    console.log("Connected")
    path.send(JSON.stringify({user_id:user_id}))
    
}
path.onmessage=(data_)=>{
    
    const v=JSON.parse(data_.data).data.map((value)=>Object.values(value));
    console.log(JSON.parse(data_.data).length)
    console.log(v);
    setcount(JSON.parse(data_.data).length);
    path.close();
}


}
catch(error){
    console.log(error)
}

}
Connection()
}
const handle=()=>{
    settrack(!track);
}
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

       }}className="anim" >
        
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
                    <button onClick={()=>{trackbtn({btn1:true,btn2:false,btn3:false,btn4:false,btn5:false,btn6:false});nav('/dashboard');settrack(false)}} style={{cursor:"pointer",borderRadius:"5px",background:btn.btn1?"#254B85":"",border:btn.btn1?"none":"none",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <LayoutDashboard color={btn.btn1?"#FFFFFF":"#BED0EB"}></LayoutDashboard>
                        <Text style={{width:"100%",display:"flex",color:btn.btn1?"#FFFFFF":"#BED0EB"}}>
                        Dashboard
                        </Text>
                        </button>
                    <button
                    onClick={()=>{trackbtn({btn1:false,btn2:true,btn3:false,btn4:false,btn5:false,btn6:false});nav('/submit');settrack(false)}}
                    style={{cursor:"pointer",borderRadius:"5px",background:btn.btn2?"#254B85":"",border:btn.btn2?"none":"none",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <BookOpenCheck color={btn.btn2?"#FFFFFF":"#BED0EB"}></BookOpenCheck>
                        <Text style={{width:"100%",display:"flex",color:btn.btn2?"#FFFFFF":"#BED0EB"}}>
                        Submit Ticket
                        </Text>
                    </button>
                    <button
                    onClick={()=>{trackbtn({btn1:false,btn2:false,btn3:true,btn4:false,btn5:false,btn6:false});nav('/my_tickets');settrack(false)}}
                    style={{cursor:"pointer",borderRadius:"5px",background:btn.btn3?"#254B85":"",border:btn.btn3?"none":"none",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <ListTodo color={btn.btn3?"#FFFFFF":"#BED0EB"}></ListTodo>
                        <Text style={{width:"100%",display:"flex",color:btn.btn3?"#FFFFFF":"#BED0EB"}}>
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
                    <button onClick={()=>{trackbtn({btn1:false,btn2:false,btn3:false,btn4:true,btn5:false,btn6:false});nav('/assigned_tickets');settrack(false)}} style={{cursor:"pointer",borderRadius:"5px",background:btn.btn4?"#254B85":"",border:btn.btn4?"none":"solid 1px #BED0EB",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <LayoutDashboard color={btn.btn4?"#FFFFFF":"#BED0EB"}></LayoutDashboard>
                        <Text style={{width:"100%",display:"flex",color:btn.btn4?"#FFFFFF":"#BED0EB"}}>
                        Assigned Tickets
                        </Text>
                        </button>
                    <button
                    onClick={()=>{trackbtn({btn1:false,btn2:false,btn3:false,btn4:false,btn5:true,btn6:false});nav('/underway_tickets');settrack(false)}}
                    style={{cursor:"pointer",borderRadius:"5px",background:btn.btn5?"#254B85":"",border:btn.btn5?"none":"solid 1px #BED0EB",width:"100%",padding:"5px",display:"flex"
                        ,flexDirection:"row",gap:"8px"}}>
                        <BookOpenCheck color={btn.btn5?"#FFFFFF":"#BED0EB"}></BookOpenCheck>
                        <Text style={{width:"100%",display:"flex",color:btn.btn5?"#FFFFFF":"#BED0EB"}}>
                        Underway Tickets
                        </Text>
                    </button>
                    
                </div>
                </div>   
                :""}       
            <div style={{width:"100%"}}></div>
            </div> 
            
            <div style={{width:"100%",height:"fit-content",display:"flex",padding:"15px"}}>
                {/* <Execute_Button variant={"solid"} type={"button"} color={"blue"} onClick={""}>Execute</Execute_Button> */}
                {lg?
                 <div className="crd" style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"row",gap:"8px",cursor:"pointer",background:"#07014F 100%",padding:'8px',borderRadius:"10px"
                }}>
                    <div style={{width:"fit-content",height:"fit-content",justifyContent:"center",alignItems:"center",display:"flex"}}>
                        <div style={{width:"fit-content"}}>
                            
                 <div style={{background:"#0765E0",padding:"10px",borderRadius:"10px"}}>
                    <Spinner></Spinner>
                </div> 
            </div>
                        
                    </div>
                    <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column",justifyContent:"left",gap:"8px"}}>
                        <div style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"center",width:"100%",height:"fit-content",flexWrap:"nowrap",
                            gap:"2px"
                        }}>
                        <Text weight={"medium"} style={{width:"100%",fontSize:"15px",color:"#FFFFFF",fontFamily:"sans-serif",flexDirection:"row"}}>
                            Logging Out
                        </Text>
                        
                         {/* <br></br> */}
                         {/* <Main_Text>Otieno</Main_Text>  */}
                      {/* <Main_Text>{localStorage.getItem('lastname')}</Main_Text>  */}
                        </div>
                        {/* <Text weight={"medium"} style={{fontSize:"12px",color:"#7F7F7F",fontFamily:"sans-serif"}}>{localStorage.getItem("firstname")}</Text> */}
                    </div>
                </div>
                :
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <div className="crd" style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"row",gap:"8px",cursor:"pointer",background:"#07014F 100%",padding:'8px',borderRadius:"10px"
                }}>
                    <div style={{width:"fit-content",height:"fit-content",justifyContent:"center",alignItems:"center",display:"flex"}}>
                        <div style={{width:"fit-content"}}>
                            
                 <div style={{background:"#0765E0",padding:"10px",borderRadius:"10px"}}>
                    <Text size={"5"} weight={"bold"} style={{color:"white"}}>KM</Text>
                </div> 
            </div>
                        
                    </div>
                    <div style={{width:"fit-content",height:"fit-content",display:"flex",flexDirection:"column",justifyContent:"left",gap:"8px"}}>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"fit-content",height:"fit-content",flexWrap:"nowrap",
                            gap:"2px"
                        }}>
                        <Text weight={"medium"} style={{fontSize:"17px",color:"#FFFFFF",fontFamily:"sans-serif"}}>
                            {localStorage.getItem('firstname')}
                        </Text>
                        
                         <br></br>
                         {/* <Main_Text>Otieno</Main_Text>  */}
                      {/* <Main_Text>{localStorage.getItem('lastname')}</Main_Text>  */}
                        </div>
                        <Text weight={"medium"} style={{fontSize:"12px",color:"#7F7F7F",fontFamily:"sans-serif"}}>{localStorage.getItem("firstname")}</Text>
                    </div>
                </div>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content 
    style={{
        gap:"20px",
        display:"flex",
        flexDirection:"column",
        width:"fit-content",
        height:"fit-content",
        backgroundColor:"white",
        
        borderRadius:"12px",
        boxShadow:"0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        padding:"30px"
       
    }}
>
    <div style={{width:"fit-content",height:"100%",display:"flex"}}>
        
    <AlertDialog.Description style={{display:"flex",flexDirection:"column",gap:"15px",justifyContent:"center",alignItems:"center",width:"fit-content"}}>
        <LogOut size={"50"}/>
        <div style={{width:"100%",display:"flex"}}>
        <Main_Text>Are You Sure You Want To Log Out</Main_Text>
        </div>
    </AlertDialog.Description>
    </div>
     <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",gap:"25px",flexDirection:"row"}}>
    <AlertDialog.Cancel>
        <Button size="3" variant="outline" highContrast style={{cursor:"pointer",width:"fit-content",height:"fit-content",display:"flex",padding:"10px",}}>Cancel</Button>
    </AlertDialog.Cancel>
    
    <AlertDialog.Action>
        <Button size="3" variant="classic" color="red" highContrast style={{width:"fit-content",height:"fit-content",display:"flex",padding:"10px",
            flexDirection:"row",gap:"5px",cursor:"pointer"}} onClick={signout}>Log Out</Button>
    </AlertDialog.Action>
    {/* <Load_button text={"logging out"}></Load_button> */}
    </div>
    
</AlertDialog.Content>
</AlertDialog.Root>

        }
                 
            </div>
     </div> 

            <div style={{width:"100%",height:"100%",display:"flex",overflow:"auto",flexDirection:"column",flex:1}}> 
                
                 {/* <div style={{width:"100%",height:"fit-content",display:"flex",
                    justifyContent:"right",
                    padding:"30px",gap:"10px",
            flexDirection:"row",overflow:"hidden",background:"#F6F6F6 90%"
            }}>
                <div style={{width:"fit-content",height:"fit-content",display:"flex", 
                    justifyContent:"right",flexWrap:"wrap"}}>
                <Heading weight={"bold"} color="black" style={{fontFamily:"sans-serif",fontSize:"22px"}}>Kenya Marine And Research Institute</Heading>
                </div>
                <Separator orientation={"vertical"} size={"2"} style={{fontWeight:"bold"}}/> */}
                {/* <div style={{alignItems:"center",justifyContent:"center",display:"flex",width:"fit-content"
                    ,height:"fit-content"
                }}> */}
                {/* <Button variant="ghost" color="black" highContrast onClick={Connection} 
                style={{width:"fit-content",height:"fit-content", cursor:"pointer",justifyContent:"center",alignItems:"center",display:"flex"}}>
                <Bell size={"30"} color="black" style={{display:"flex",width:"fit-content"}}></Bell>
                <Badge variant="soft" radius="full" highContrast color="black" style={{marginTop:"-20px",marginLeft:"-12px"}}> */}
                    {/* {count} */}
                {/* </Badge>
                
                </Button> */}
                {/* </div> */}
            {/* </div>: */}
            {/* <div style={{width:"100%",height:"fit-content",display:"flex",
            flexDirection:"row",padding:"10px",background:"#F6F6F6 90%"
            }}> */}
                    
                    {/* <div style={{width:"100%",height:"fit-content",marginTop:"10px",display:"flex",
                flexDirection:"row",padding:"5px",gap:"10px"
            }}>
            <Avatar fallback="KM" size={"4"} src="" color="blue" radius="medium"></Avatar>     
            <SidebarOpen onClick={update} color="blue" size={"50"} style={{width:"fit-content",height:"fit-content",cursor:"pointer"}}></SidebarOpen>
            </div> */}
        
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
                {/* <Button variant="ghost" color="black" highContrast onClick={Connection} 
                style={{width:"fit-content",height:"fit-content", cursor:"pointer",justifyContent:"center",alignItems:"center",display:"flex"}}>
                <Bell size={"30"} color="black" style={{display:"flex",width:"fit-content"}}></Bell>
                <Badge variant="soft" radius="full" highContrast color="black" style={{marginTop:"-20px",marginLeft:"-12px"}}>
                    {count}
                </Badge>
                
                </Button> */}
                {/* </div> */}
            </div>
            
             </div>

        
       
        <div style={{width:"100%", display:"flex",height:"100%",overflow:"auto",padding:"10px",background:"#F5F7FC"}}>
            {children}
        </div>

        </div>
       
</div>
</>)
}
