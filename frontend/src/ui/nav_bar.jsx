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
const update=()=>{
    settrack(!track);
}
const usr=user_id;
console.log(usr);
// const path=new WebSocket('ws://localhost:3009/get_notify')

const Connection=()=>{
try{
    const path=new WebSocket('ws://localhost:3009/get_false')
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
const tickets=()=>{nav('/my_tickets')}
const notify=()=>{nav('/notifications')};
const dir=(value)=>{
    if(value==1){
        nav('/dashboard')
    }
    else{
        nav('/submit')
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
    const path=new WebSocket('ws://localhost:3009/get_false')
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
   ""
    :
    <div style={{width:"fit-content",display:"flex",height:"100%",flexDirection:"column",justifyContent:"left",
        background:"linear-gradient(30deg,rgba(23, 32, 25, 0.614),rgba(227, 233, 229, 0.829),rgba(154, 174, 158, 0.836),rgba(23, 32, 25, 0.614))"

       }}className="anim" >
        
            <div style={{width:"100%",height:"fit-content",display:'flex',justifyContent:"left",padding:"10px",gap:"5px",marginTop:"15px"}}>
            <Avatar fallback="KM" size={"4"} src="" color="blue" radius="medium"></Avatar>    
            <SidebarClose size={"50"} onClick={update} color="blue"style={{width:"fit-content",height:"fit-content",cursor:"pointer"}}></SidebarClose>
            </div> 
            
            <div style={{width:"100%",height:"fit-content", display:"flex",justifyContent:'left',flexWrap:"wrap",padding:"10px",marginTop:"-5px"}}>
            <Head_Text>ICT Help Desk</Head_Text>    
            </div>
            <div style={{width:"100%",height:"100%", top:"10",display:"flex",
                flexDirection:"column",flexWrap:"nowrap",overflow:'auto',gap:"15px",
                border:"single 2px grey",
                borderLeft:"0px",borderRight:"0px",borderWidth:"100%",padding:"10px"}}>
            <ScrollArea type="always" scrollbars="vertical" size={"1"} style={{display:"flex",wdith:"100%",padding:"10px"}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"left",
                height:"fit-content",width:"100%",gap:"5px"
            }}>
                <div style={{display:"flex",padding:"5px"}}>
                <Main_Text>Main</Main_Text>
                </div>
                <Separator size={"4"} orientation={"horizontal"} ></Separator>
                <div style={{display:"flex",flexDirection:"column",width:"100%",height:"ft-content",
                    gap:"20px",
                    padding:"10px"
                }}>
                     <Button className="btn12" variant="ghost"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",outline:"none",
        color:"rgba(15, 15, 15, 0.733)"
    }} onClick={()=>{dir(1);update()}}><LayoutDashboard></LayoutDashboard>
    <Main_Text> Dashboard</Main_Text></Button>
     <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"10px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }} onClick={()=>{dir(2);update();}}><TicketPlus/>
    <Main_Text> Submit Ticket</Main_Text></Button>
     <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }} onClick={()=>{tickets();update()}} ><ListTodo/>
    <Main_Text> My Tickets</Main_Text></Button>
    <Button className="btn12"variant="ghost" color="black"style={{width:"fit-content",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }} onClick={()=>{notify();update()}} >
        <div style={{display:"flex",width:"fit-content",padding:"5px"}}>
            <Badge style={{marginRight:"-10px",marginTop:"-10px"}} radius="full" >{count}</Badge><Bell size={"25"}></Bell></div>
    <Main_Text>Notifications</Main_Text></Button>
    {group=='ICT'?
    <div style={{display:"flex",width:"100%",flexDirection:"column",gap:"15px"}}>
    <div style={{display:"flex",flexDirection:"column",width:"100%",gap:"5px"}}>
    <Main_Text>Staff</Main_Text>
    <Separator size={"4"} orientation={"horizontal"} ></Separator>
    </div>
     <Button className="btn12"variant="ghost" style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }}
    onClick={()=>{nav('/staff_dashboard'); update()}} ><BookOpenCheck />
    <Main_Text>Assigned Tickets</Main_Text>
    </Button>
    </div>
    :""}
                </div>


            </div>
            </ScrollArea>
            </div> 
            
            <div style={{width:"100%",height:"fit-content",display:"flex",padding:"15px",transform:"translate(10,20)"}}>
                {/* <Execute_Button variant={"solid"} type={"button"} color={"blue"} onClick={""}>Execute</Execute_Button> */}
                {lg?<Load_button text={"Logging out"} variant={"solid"} color={"blue"}></Load_button>:
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Card className="crd"size={"1"} style={{width:"fit-content",height:"fit-content",display:"flex",flexDirection:"row",gap:"8px",cursor:"pointer",backgroundColor:"white"
                }}>
                    <div style={{width:"fit-content",height:"fit-content",justifyContent:"center",alignItems:"center",display:"flex"}}>
                        <Avatar radius="full" fallback={"KM"} src="" color="blue"></Avatar>
                    </div>
                    <div style={{width:"fit-content",height:"fit-content",display:"flex",flexDirection:"column",justifyContent:"left",gap:"8px"}}>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"fit-content",height:"fit-content",flexWrap:"nowrap",
                            gap:"2px"
                        }}>
                       
                         <Main_Text>{localStorage.getItem('firstname')}</Main_Text> 
                         <br></br>
                         {/* <Main_Text>Otieno</Main_Text>  */}
                      {/* <Main_Text>{localStorage.getItem('lastname')}</Main_Text>  */}
                        </div>
                        <Badge variant="soft" size={"3"} style={{width:"fit-content",display:"flex"}}>{localStorage.getItem("firstname")}</Badge>
                    </div>
                </Card>
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
            <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column"}}> 
                {track?
                 <div style={{width:"100%",height:"fit-content",display:"flex",
                    justifyContent:"right",
                    padding:"30px",gap:"10px",
            flexDirection:"row",overflow:"hidden",background:"linear-gradient(to right,rgba(220, 225, 221, 0.84)25%)"
            }}>
                <div style={{width:"fit-content",height:"fit-content",display:"flex", 
                    justifyContent:"right",flexWrap:"wrap"}}>
                <Heading size={"5"} weight={"regular"}>Kenya Marine And Research Institute</Heading>
                </div>
                <Separator orientation={"vertical"} size={"2"} style={{fontWeight:"bold"}}/>
                {/* <div style={{alignItems:"center",justifyContent:"center",display:"flex",width:"fit-content"
                    ,height:"fit-content"
                }}> */}
                <Button variant="ghost" color="grass" highContrast onClick={Connection} style={{cursor:"pointer",justifyContent:"center",alignItems:"center",display:"flex"}}><Bell size={"30"} color="red" style={{display:"flex",marginRight:"-10px",marginTop:"13px"}}></Bell>
                <Badge variant="soft" radius="full" highContrast color="teal">
                    {count}
                </Badge>
                
                </Button>
                {/* </div> */}
            </div>:
            <div style={{width:"100%",height:"fit-content",display:"flex",
            flexDirection:"row",padding:"10px",background:"linear-gradient(to right,rgba(220, 225, 221, 0.84)25%)"
            }}>
                    
                    <div style={{width:"100%",height:"fit-content",marginTop:"10px",display:"flex",
                flexDirection:"row",padding:"5px",gap:"10px"
            }}>
            <Avatar fallback="KM" size={"4"} src="" color="blue" radius="medium"></Avatar>     
            <SidebarOpen onClick={update} color="blue" size={"50"} style={{width:"fit-content",height:"fit-content",cursor:"pointer"}}></SidebarOpen>
            </div>
        
            <div style={{width:"100%",height:"fit-content",display:"flex",justifyContent:"right",
               flexDirection:"row",gap:"10px",margin:"10px"}}>
                <div style={{width:"100%",height:"fit-content",display:"flex", 
                    justifyContent:"right",flexWrap:"wrap"}}>
                <Heading size={"5"} weight={"regular"}>Kenya Marine And Research Institute</Heading>
                </div>
                <Separator orientation={"vertical"} size={"2"} style={{fontWeight:"bold"}}/>
                {/* <div style={{alignItems:"center",justifyContent:"center",display:"flex",width:"fit-content"
                    ,height:"fit-content"
                }}> */}
                <Button variant="ghost" color="grass" highContrast onClick={Connection} style={{cursor:"pointer",justifyContent:"center",alignItems:"center",display:"flex"}}><Bell size={"30"} color="red" style={{display:"flex",marginRight:"-10px",marginTop:"13px"}}></Bell>
                <Badge variant="soft" radius="full" highContrast color="teal">
                    {count}
                </Badge>
                
                </Button>
                {/* </div> */}
            </div>
            
             </div>
}
        
        {track?<div style={{display:"flex",width:"100%",flexWrap:"wrap"}}><p>Please choose one from the sidebar</p></div>:
        <div style={{width:"100%", display:"flex",height:"100%",overflow:"auto",padding:"10px",background:"linear-gradient(to right,rgba(154, 174, 158, 0.836)25%)"}}>
            {children}
        </div>
}
        </div>
       
</div>
</>)
}
