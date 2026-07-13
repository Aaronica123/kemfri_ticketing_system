import Execute_Button, { Nav_button } from "./buttons";
import {Menu, TicketPlusIcon} from "lucide-react";
import { AlertDialog, Avatar, Button, Card, Separator } from "@radix-ui/themes/dist/cjs/index.js";
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

export default function Nav_bar({children}){

return(<>
<div style={{width:"100vw",height:"100vh", display:"flex",flexDirection:"row"}}>
    <div style={{width:"fit-content",display:"flex",height:"100%",flexDirection:"column",justifyContent:"left",
       }} className="bg1">
            <div style={{width:"100%",height:"fit-content",display:'flex',justifyContent:"left",padding:"10px"}}>
            <Avatar fallback="KM" size={"6"} src="" color="blue" radius="medium"></Avatar>    
            </div> 
            <div style={{width:"100%",height:"fit-content", display:"flex",justifyContent:'left',flexWrap:"wrap",padding:"10px",marginTop:"-5px"}}>
            <Head_Text>ICT Help Desk</Head_Text>    
            </div>
            <div style={{width:"100%",height:"100%", top:"10",display:"flex",
                flexDirection:"column",flexWrap:"nowrap",overflow:'auto',gap:"15px",
                border:"single 2px grey",borderLeft:"0px",borderRight:"0px",borderWidth:"100%",padding:"10px"}}>
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
    }} ><LayoutDashboard></LayoutDashboard>
    <Main_Text> Dashboard</Main_Text></Button>
     <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }} ><TicketPlus/>
    <Main_Text> Submit Ticket</Main_Text></Button>
     <Button className="btn12"variant="ghost" color="black"style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }} ><ListTodo/>
    <Main_Text> My Tickets</Main_Text></Button>
     <Button className="btn12"variant="ghost" style={{width:"100%",height:"fit-content",display:"flex",
        justifyContent:"left",gap:"12px",padding:"5px",flexDirection:"row",color:"rgba(15, 15, 15, 0.733)"
    }} ><BookOpenCheck/>
    <Main_Text>Knowledge Base</Main_Text></Button>
                </div>

            </div>
            </div> 
            <div style={{width:"100%",height:"fit-content",display:"flex",padding:"15px",transform:"translate(10,20)"}}>
                {/* <Execute_Button variant={"solid"} type={"button"} color={"blue"} onClick={""}>Execute</Execute_Button> */}
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Card className="crd"size={"1"} style={{width:"fit-content",height:"fit-content",display:"flex",flexDirection:"row",gap:"8px",cursor:"pointer",backgroundColor:"white"
                }}>
                    <div style={{width:"fit-content",height:"fit-content",justifyContent:"center",alignItems:"center",display:"flex"}}>
                        <Avatar radius="full" fallback="UR" src="" color="blue"></Avatar>
                    </div>
                    <div style={{width:"fit-content",height:"fit-content",display:"flex",flexDirection:"column",justifyContent:"left",gap:"8px"}}>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"fit-content",height:"fit-content",flexWrap:"nowrap"}}>
                       
                         <Main_Text>Hemstone</Main_Text> 
                         <br></br>
                         <Main_Text>Otieno</Main_Text> 
                       {/* <Main_Text> Hemstone</Main_Text> */}
                        </div>
                        <Badge variant="soft" size={"3"} style={{width:"fit-content",display:"flex"}}>User One</Badge>
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
    <AlertDialog.Description style={{display:"flex",flexDirection:"column",gap:"15px",justifyContent:"center",alignItems:"center",width:"100%"}}>
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
            flexDirection:"row",gap:"5px",cursor:"pointer"}} >Log Out</Button>
    </AlertDialog.Action>
    </div>
</AlertDialog.Content>
                </AlertDialog.Root>
                 
            </div>
     </div> 
            <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column"}}> 
                <div style={{width:"100%",height:"fit-content",display:"flex",
            flexDirection:"row",padding:"10px"
            }} className="bg2">
            
           
            {/* <div style={{width:"100%",height:"fit-content",display:"flex" ,margin:"15px",flex:2.5}}> */}
                {/* <Nav_button variant={"ghost"}><Menu size={"30"} color="black"></Menu></Nav_button> */}
            {/* </div> */}
            <div style={{width:"100%",height:"fit-content",display:"flex",justifyContent:"right",
               flexDirection:"row",gap:"30px",margin:"10px",alignItems:"flex-end",flex:1.5}}>
                    <div style={{width:"fit-content",height:"fit-content",display:"flex", 
                        alignItems:"center",gap:"10px"}}>
                <Head_Text>Kenya Marine And Research Institute</Head_Text>
                </div>
                <Separator orientation={"vertical"} size={"2"} style={{fontWeight:"bold"}}/>
                <div style={{alignItems:"center",justifyContent:"center",display:"flex",width:"fit-content"
                    ,height:"fit-content"
                }}>
                <Nav_button variant={"ghost"}><Bell size={"30"} color="black"></Bell></Nav_button>
                </div>
            </div>
             </div>
        
        <div className="bg"style={{width:"100%", display:"flex",height:"100%",overflow:"auto",padding:"10px"}}>
            {children}
        </div>
        </div>
       
</div>
</>)
}