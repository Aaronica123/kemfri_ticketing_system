import Execute_Button, { Load_button, Nav_button } from "./buttons";
import {Menu, TicketPlusIcon} from "lucide-react";
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
export default function Nav_bar({children}){
const nav=useNavigate();
const{group,authenticated,loading,user_id}=CheckContxt();

console.log(group,user_id);
const [track,settrack]=useState(false);
const [lg,setlg]=useState(false);
const [count,setcount]=useState(0);
const [btn,trackbtn]=useState({btn1:false,btn2:true,btn3:false,btn4:false})
const update=()=>{
    settrack(!track);
}
const usr=user_id;
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
    trackbtn(()=>({btn1:false,btn2:false,btn3:true,btn4:false}))
}
const notify=()=>{nav('/notifications');
    trackbtn(()=>({btn1:false,btn2:false,btn:false,btn4:true}))

};
const dir=(value)=>{
    if(value==1){
        nav('/dashboard');
        trackbtn(()=>({btn1:true,btn2:false,btn3:false,btn4:false}))
    }
    else{
        nav('/submit');
        trackbtn(()=>({btn1:false,btn2:true,btn3:false,btn4:false}))
        
       
    }
}

    console.log('');
if(loading){
    return (
    <p>Loading Please Wait</p>)
}
else if(!authenticated){
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

return(<>
<div style={{width:"100vw",height:"100vh", display:"flex",flexDirection:"row"}}>
    {!track?
    <div style={{flex:0,width:"100%",display:"flex",height:"100%",flexDirection:"column",justifyContent:"left",
        background:"#03103B 90%",flexGrow:"none",transition: "all 0.5s ease-out"

       }}className="anim" >
        
            <div style={{width:"100%",height:"fit-content",display:'flex',justifyContent:"left",padding:"10px",gap:"5px",marginTop:"15px"}}>
            {/* <Avatar fallback="KM" size={"4"} src="" color="blue" radius="medium"></Avatar>  */}
            {/* <div style={{width:"fit-content"}}>
                 <div style={{background:"#0765E0",padding:"10px",borderRadius:"10px"}}>
                    <Text size={"5"} weight={"bold"} style={{color:"white"}}>KM</Text>
                </div> 
            </div> */}
            <div style={{width:"100%",justifyContent:"center",alignItems:"center",display:"flex"}}>
            <Button variant="ghost">
            <SidebarOpen size={"25"} onClick={update} color="#BEBEBE"style={{width:"fit-content",height:"fit-content",cursor:"pointer"}}></SidebarOpen>
            </Button>  
            </div>
            </div> 
            
            {/* <div style={{width:"100%",height:"fit-content", display:"flex",justifyContent:'left',flexWrap:"wrap",padding:"10px",marginTop:"-5px"}}>
            <Heading weight={"bold"} style={{color:"#BEBEBE",fontSize:"20px"}}>ICT Help Desk</Heading> 
            </div> */}
            <div style={{width:"100%",height:"100%",display:"flex",
                flexDirection:"column",flexWrap:"nowrap",overflow:'auto',gap:"15px",
                border:"single 2px grey",
                borderLeft:"0px",borderRight:"0px",borderWidth:"100%",padding:"10px"}}>
            <ScrollArea type="always" scrollbars="vertical" size={"1"} style={{display:"flex",wdith:"100%",padding:"10px"}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"left",
                height:"fit-content",width:"100%",gap:"5px"
            }}>
                {/* <div style={{display:"flex",padding:"5px"}}>
                <Text weight={"medium"} style={{color:"#BEBEBE"}}>Main</Text>
                </div> */}
                <Separator size={"4"} orientation={"horizontal"} ></Separator>
                <div style={{display:"flex",flexDirection:"column",width:"100%",height:"fit-content",
                    gap:"20px",
                    padding:"10px"
                }}>
                    {btn.btn1?
                     <Button className="btn12_active"  variant="ghost"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",outline:"none",background:"#132CB5 80%"
    }} onClick={()=>{dir(1)}}><LayoutDashboard color="white"></LayoutDashboard>
    {/* <Text weight={"medium"} style={{color:"#E2E2E5"}}>Dashboard</Text> */}
    </Button>
:
<Button   variant="ghost"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",outline:"none",
    }} onClick={()=>{dir(1)}}><LayoutDashboard color="white"></LayoutDashboard>
    {/* <Text weight={"medium"} style={{color:"#E2E2E5"}}>Dashboard</Text> */}
    </Button>
}
{btn.btn2?
     <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"10px",padding:"5px",flexDirection:"row",background:"#132CB5 80%"
    }} onClick={()=>{dir(2);}}><TicketPlus color="whitesmoke"/>
    {/* <Text weight={"medium"} style={{color:"#E2E2E5"}}>Submit Ticket</Text> */}
    </Button>:
    <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"10px",padding:"5px",flexDirection:"row"
    }} onClick={()=>{dir(2);}}><TicketPlus color="whitesmoke"/>
    {/* <Text weight={"medium"} style={{color:"#E2E2E5"}}>Submit Ticket</Text> */}
    </Button>
}
{btn.btn3?
<Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",background:"#132CB5 80%"
    }} onClick={()=>{tickets();}} ><ListTodo color="whitesmoke"/>
     {/* <Text weight={"medium"} style={{color:"#E2E2E5"}}>My Tickets</Text> */}
     </Button>
:
     <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }} onClick={()=>{tickets();}} ><ListTodo color="whitesmoke"/>
     {/* <Text weight={"medium"} style={{color:"#E2E2E5"}}>My Tickets</Text> */}
     </Button>
}
{btn.btn4?
<Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",flexDirection:"row",background:"#132CB5 80%"
    }} onClick={()=>{notify();}} >
        <div style={{display:"flex",width:"fit-content"}}>
            <Bell size={"25"} color="whitesmoke"></Bell></div>
     {/* <Text weight={"medium"} style={{color:"#E2E2E5"}}>Notifications</Text> */}
    </Button>
:

    <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }} onClick={()=>{notify();}} >
        <div style={{display:"flex",width:"fit-content"}}>
            <Bell size={"25"} color="whitesmoke"></Bell></div>
     {/* <Text weight={"medium"} style={{color:"#E2E2E5"}}>Notifications</Text> */}
    </Button>
}
    {group=='ICT'?
    <div style={{display:"flex",width:"100%",flexDirection:"column",gap:"15px"}}>
    <div style={{display:"flex",flexDirection:"column",width:"100%",gap:"5px"}}>
     {/* <Text weight={"medium"} style={{color:"#BEBEBE",fontSize:"16px"}}>Staff</Text> */}
    <Separator size={"4"} orientation={"horizontal"} ></Separator>
    </div>
     <Button className="btn12"variant="ghost" style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }}
    onClick={()=>{nav('/staff_dashboard'); }} ><BookOpenCheck color="whitesmoke"/>
     {/* <Text weight={"medium"} style={{color:"#E2E2E5"}}>Submit Ticket</Text> */}
    </Button>
    </div>
    :""}
                </div>


            </div>
            </ScrollArea>
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
                    {/* <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column",justifyContent:"left",gap:"8px"}}> */}
                        {/* <div style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"center",width:"100%",height:"fit-content",flexWrap:"nowrap",
                            gap:"2px"
                        }}>
                        <Text weight={"medium"} style={{width:"100%",fontSize:"15px",color:"#FFFFFF",fontFamily:"sans-serif",flexDirection:"row"}}>
                            Logging Out
                        </Text> */}
                        
                         {/* <br></br> */}
                         {/* <Main_Text>Otieno</Main_Text>  */}
                      {/* <Main_Text>{localStorage.getItem('lastname')}</Main_Text>  */}
                        {/* </div> */}
                        {/* <Text weight={"medium"} style={{fontSize:"12px",color:"#7F7F7F",fontFamily:"sans-serif"}}>{localStorage.getItem("firstname")}</Text> */}
                    {/* </div> */}
                </div>
               :
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <div className="crd" style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"row",gap:"8px",cursor:"pointer",background:"#07014F 100%",padding:'8px',borderRadius:"10px"
                }}>
                    <div style={{width:"fit-content",height:"fit-content",justifyContent:"center",alignItems:"center",display:"flex"}}>
                        <div style={{width:"fit-content"}}>
                            
                 <div style={{background:"#0765E0",padding:"10px",borderRadius:"10px"}}>
                    <Text size={"5"} weight={"bold"} style={{color:"white",fontFamily:"sans-serif"}}>KM</Text>
                </div> 
            </div>
                        
                    </div>
                    {/* <div style={{width:"fit-content",height:"fit-content",display:"flex",flexDirection:"column",justifyContent:"left",gap:"8px"}}>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"fit-content",height:"fit-content",flexWrap:"nowrap",
                            gap:"2px"
                        }}>
                        <Text weight={"medium"} style={{fontSize:"17px",color:"#FFFFFF"}}>
                            {localStorage.getItem('firstname')}
                        </Text>
                        
                         <br></br>
                         <Main_Text>Otieno</Main_Text> 
                      <Main_Text>{localStorage.getItem('lastname')}</Main_Text> 
                        </div>
                        <Text weight={"medium"} style={{fontSize:"12px",color:"#7F7F7F"}}>{localStorage.getItem("firstname")}</Text>
                    </div> */}
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
            flexDirection:"row",gap:"5px",cursor:"pointer"}} onClick={logout}>Log Out</Button>
    </AlertDialog.Action>
    {/* <Load_button text={"logging out"}></Load_button> */}
    </div>
    
</AlertDialog.Content>
</AlertDialog.Root>

        }
                 
            </div>
     </div> 
    :
    <div style={{flex:0,width:"100%",display:"flex",height:"100%",flexDirection:"column",justifyContent:"left",
        background:"#03103B 90%",flexGrow:"none",transition: "all 2.5s ease-in-out"

       }}className="anim" >
        
            <div style={{width:"100%",height:"fit-content",display:'flex',justifyContent:"left",padding:"10px",gap:"5px",marginTop:"15px"}}>
            {/* <Avatar fallback="KM" size={"4"} src="" color="blue" radius="medium"></Avatar>  */}
            <div style={{width:"fit-content"}}>
                 <div style={{background:"#0765E0",padding:"10px",borderRadius:"10px"}}>
                    <Text size={"5"} weight={"bold"} style={{color:"white"}}>KM</Text>
                </div> 
            </div>
            <div style={{width:"100%",justifyContent:"right",alignItems:"center",display:"flex"}}>
            <Button variant="ghost">
            <SidebarClose size={"25"} onClick={update} color="#BEBEBE"style={{width:"fit-content",height:"fit-content",cursor:"pointer"}}></SidebarClose>
            </Button>  
            </div>
            </div> 
            
            <div style={{width:"100%",height:"fit-content", display:"flex",justifyContent:'left',flexWrap:"wrap",padding:"10px",marginTop:"-5px"}}>
            <Heading weight={"bold"} style={{color:"#BEBEBE",fontFamily:"sans-serif",fontSize:"20px"}}>ICT Help Desk</Heading> 
            </div>
            <div style={{width:"100%",height:"100%",display:"flex",
                flexDirection:"column",flexWrap:"nowrap",overflow:'auto',gap:"15px",
                border:"single 2px grey",
                borderLeft:"0px",borderRight:"0px",borderWidth:"100%",padding:"10px"}}>
            <ScrollArea type="always" scrollbars="vertical" size={"1"} style={{display:"flex",wdith:"100%",padding:"10px"}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"left",
                height:"fit-content",width:"100%",gap:"5px"
            }}>
                <div style={{display:"flex",padding:"5px"}}>
                <Text weight={"medium"} style={{color:"#BEBEBE",fontFamily:"sans-serif"}}>Main</Text>
                </div>
                <Separator size={"4"} orientation={"horizontal"} ></Separator>
                <div style={{display:"flex",flexDirection:"column",width:"100%",height:"fit-content",
                    gap:"20px",
                    padding:"10px"
                }}>
                    {btn.btn1?
                     <Button className="btn12" variant="ghost"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",outline:"none",
        background:"#132CB5 80%"
    }} onClick={()=>{dir(1);update()}}><LayoutDashboard color="white"></LayoutDashboard>
    <Text weight={"medium"} style={{color:"#E2E2E5",fontFamily:"sans-serif"}}>Dashboard</Text>
    </Button>:
    <Button className="btn12" variant="ghost"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",outline:"none"
    }} onClick={()=>{dir(1);update()}}><LayoutDashboard color="white"></LayoutDashboard>
    <Text weight={"medium"} style={{color:"#E2E2E5",fontFamily:"sans-serif"}}>Dashboard</Text>
    </Button>
            
}
{btn.btn2?
<Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"10px",padding:"5px",flexDirection:"row",background:"#132CB5 80%"
    }} onClick={()=>{dir(2);update();}}><TicketPlus color="whitesmoke"/>
    <Text  weight={"medium"} style={{width:"100%",color:"#E2E2E5",fontFamily:"sans-serif"}}>Submit Ticket</Text>
    </Button>
:
     <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"10px",padding:"5px",flexDirection:"row"
    }} onClick={()=>{dir(2);update();}}><TicketPlus color="whitesmoke"/>
    <Text  weight={"medium"} style={{width:"100%",color:"#E2E2E5",fontFamily:"sans-serif"}}>Submit Ticket</Text>
    </Button>
}
{btn.btn3?
<Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",background:"#132CB5 80%"
    }} onClick={()=>{tickets();update()}} ><ListTodo color="whitesmoke"/>
     <Text weight={"medium"} style={{color:"#E2E2E5",fontFamily:"sans-serif"}}>My Tickets</Text>
     </Button>
:
     <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }} onClick={()=>{tickets();update()}} ><ListTodo color="whitesmoke"/>
     <Text weight={"medium"} style={{color:"#E2E2E5",fontFamily:"sans-serif"}}>My Tickets</Text>
     </Button>
}
{btn.btn4?

<Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",flexDirection:"row",background:"#132CB5 80%"
    }} onClick={()=>{notify();update()}} >
        <div style={{display:"flex",width:"fit-content"}}>
            <Bell size={"25"} color="whitesmoke"></Bell></div>
     <Text weight={"medium"} style={{color:"#E2E2E5",fontFamily:"sans-serif"}}>Notifications</Text>
    </Button>:
    <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",flexDirection:"row"
    }} onClick={()=>{notify();update()}} >
        <div style={{display:"flex",width:"fit-content"}}>
            <Bell size={"25"} color="whitesmoke"></Bell></div>
     <Text weight={"medium"} style={{color:"#E2E2E5",fontFamily:"sans-serif"}}>Notifications</Text>
    </Button>
}
    {group=='ICT'?
    <div style={{display:"flex",width:"100%",flexDirection:"column",gap:"15px"}}>
    <div style={{display:"flex",flexDirection:"column",width:"100%",gap:"5px"}}>
     <Text weight={"medium"} style={{color:"#BEBEBE",fontFamily:"sans-serif",fontSize:"16px"}}>Staff</Text>
    <Separator size={"4"} orientation={"horizontal"} ></Separator>
    </div>
     <Button className="btn12"variant="ghost" style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }}
    onClick={()=>{nav('/staff_dashboard'); update()}} ><BookOpenCheck color="whitesmoke"/>
     <Text weight={"medium"} style={{color:"#E2E2E5",fontFamily:"sans-serif"}}>Submit Ticket</Text>
    </Button>
    </div>
    :""}
                </div>


            </div>
            </ScrollArea>
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
            flexDirection:"row",gap:"5px",cursor:"pointer"}} onClick={logout}>Log Out</Button>
    </AlertDialog.Action>
    {/* <Load_button text={"logging out"}></Load_button> */}
    </div>
    
</AlertDialog.Content>
</AlertDialog.Root>

        }
                 
            </div>
     </div> 
}
            <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",flex:1}}> 
                {track?
                 <div style={{width:"100%",height:"fit-content",display:"flex",
                    justifyContent:"right",
                    padding:"30px",gap:"10px",
            flexDirection:"row",overflow:"hidden",background:"#F6F6F6 90%"
            }}>
                <div style={{width:"fit-content",height:"fit-content",display:"flex", 
                    justifyContent:"right",flexWrap:"wrap"}}>
                <Heading weight={"bold"} color="black" style={{fontFamily:"sans-serif",fontSize:"22px"}}>Kenya Marine And Research Institute</Heading>
                </div>
                <Separator orientation={"vertical"} size={"2"} style={{fontWeight:"bold"}}/>
                {/* <div style={{alignItems:"center",justifyContent:"center",display:"flex",width:"fit-content"
                    ,height:"fit-content"
                }}> */}
                <Button variant="ghost" color="black" highContrast onClick={Connection} 
                style={{width:"fit-content",height:"fit-content", cursor:"pointer",justifyContent:"center",alignItems:"center",display:"flex"}}>
                <Bell size={"30"} color="black" style={{display:"flex",width:"fit-content"}}></Bell>
                <Badge variant="soft" radius="full" highContrast color="black" style={{marginTop:"-20px",marginLeft:"-12px"}}>
                    {count}
                </Badge>
                
                </Button>
                {/* </div> */}
            </div>:
            <div style={{width:"100%",height:"fit-content",display:"flex",
            flexDirection:"row",padding:"10px",background:"#F6F6F6 90%"
            }}>
                    
                    {/* <div style={{width:"100%",height:"fit-content",marginTop:"10px",display:"flex",
                flexDirection:"row",padding:"5px",gap:"10px"
            }}>
            <Avatar fallback="KM" size={"4"} src="" color="blue" radius="medium"></Avatar>     
            <SidebarOpen onClick={update} color="blue" size={"50"} style={{width:"fit-content",height:"fit-content",cursor:"pointer"}}></SidebarOpen>
            </div> */}
        
            <div style={{width:"100%",height:"fit-content",display:"flex",justifyContent:"right",
               flexDirection:"row",gap:"10px",padding:'20px'}}>
                <div style={{width:"100%",height:"fit-content",display:"flex", 
                    justifyContent:"right",flexWrap:"wrap"}}>
                <Heading weight={"bold"} color="black" style={{fontFamily:"sans-serif",fontSize:"22px"}}>Kenya Marine And Research Institute</Heading>
                </div>
                <Separator orientation={"vertical"} size={"2"} style={{fontWeight:"bold"}}/>
                {/* <div style={{alignItems:"center",justifyContent:"center",display:"flex",width:"fit-content"
                    ,height:"fit-content"
                }}> */}
                <Button variant="ghost" color="black" highContrast onClick={Connection} 
                style={{width:"fit-content",height:"fit-content", cursor:"pointer",justifyContent:"center",alignItems:"center",display:"flex"}}>
                <Bell size={"30"} color="black" style={{display:"flex",width:"fit-content"}}></Bell>
                <Badge variant="soft" radius="full" highContrast color="black" style={{marginTop:"-20px",marginLeft:"-12px"}}>
                    {count}
                </Badge>
                
                </Button>
                {/* </div> */}
            </div>
            
             </div>
}
        
        {track?<div style={{display:"flex",width:"100%",flexWrap:"wrap"}}><p>Please choose one from the sidebar</p></div>:
        <div style={{width:"100%", display:"flex",height:"100%",overflow:"auto",padding:"10px",background:"#ebebefdc 10%"}}>
            {children}
        </div>
}
        </div>
       
</div>
</>)
}
