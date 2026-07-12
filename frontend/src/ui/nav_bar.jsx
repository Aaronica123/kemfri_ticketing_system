import Execute_Button, { Nav_button } from "./buttons";
import {Menu} from "lucide-react";
import { AlertDialog, Avatar, Button, Card, Separator } from "@radix-ui/themes/dist/cjs/index.js";
import Main_Text, { Head_Text } from "./text";
import { Bell } from "lucide-react";
import { Badge } from "@radix-ui/themes/dist/cjs/index.js";
import { ChevronDown } from "lucide-react";
import { Text } from "@radix-ui/themes/dist/cjs/index.js";
import { LogOut } from "lucide-react";

export default function Nav_bar({children}){
return(<>
<div style={{width:"100vw",height:"100vh", display:"flex",flexDirection:"row"}}>
    <div style={{width:"fit-content",display:"flex",height:"100%",flexDirection:"column",justifyContent:"left",
       }} className="bg1">
            <div style={{width:"100%",height:"fit-content",display:'flex',justifyContent:"left",padding:"10px"}}>
            <Avatar fallback="KM" size={"6"} src="" color="blue" radius="medium"></Avatar>    
            </div> 
            <div style={{width:"100%",height:"fit-content", display:"flex",justifyContent:'left',flexWrap:"wrap",padding:"15px"}}>
            <Head_Text>ICT Help Desk</Head_Text>    
            </div>
            <div style={{width:"100%",height:"100%", top:"10",display:"flex",
                flexDirection:"column",flexWrap:"nowrap",overflow:'auto',gap:"15px",
                border:"solid 2px grey",borderLeft:"0px",borderRight:"0px",borderWidth:"100%",padding:"10px"}}>
            
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
                    <div style={{alignItems:"center",flex:1,width:"fit-content",height:"fit-content",display:"flex",flexDirection:"column",justifyContent:"left",gap:"8px"}}>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"fit-content",height:"fit-content",flexWrap:"nowrap"}}>
                       
                         <Main_Text>Hemstone</Main_Text> 
                         <br></br>
                         <Main_Text>Otieno</Main_Text> 
                       {/* <Main_Text> Hemstone</Main_Text> */}
                        </div>
                        <Badge variant="soft" size={"3"}>User One</Badge>
                    </div>
                </Card>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content 
    style={{
        gap:"10px",
        display:"flex",
        flexDirection:"column",
        width:"100%",
        height:"fit-content",
        backgroundColor:"white",
        
        borderRadius:"12px",
        boxShadow:"0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        padding:"20px"
    }}
>
    <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"right"}}>
    <AlertDialog.Description>
        <p>Description</p>
    </AlertDialog.Description>
    </div>
     <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"right",alignItems:"center",gap:"25px",flexDirection:"row"}}>
    <AlertDialog.Cancel>
        <Button size="3" variant="ghost" highContrast style={{width:"fit-content",height:"fit-content",display:"flex",padding:"5px",}}>Cancel</Button>
    </AlertDialog.Cancel>
    <AlertDialog.Action>
        <Button size="3" variant="classic" color="red" highContrast style={{width:"fit-content",height:"fit-content",display:"flex",padding:"5px",
            flexDirection:"row",gap:"5px"}}>Log Out</Button>
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