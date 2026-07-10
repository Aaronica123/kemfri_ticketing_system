import { Nav_button } from "./buttons";
import {Menu} from "lucide-react";
import { Separator } from "@radix-ui/themes/dist/cjs/index.js";
import { Head_Text } from "./text";
import { Bell } from "lucide-react";

export default function Nav_bar({children}){
return(<>
<div style={{width:"100vw",height:"100vh", display:"flex",flexDirection:"column"}}>
        <div style={{width:"100%",height:"fit-content",display:"flex",
            flexDirection:"row",background:"linear-gradient(180deg, grey,white,grey)",padding:"10px",
            alignItems:"start",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px"}}>
            <div style={{width:"100%",height:"fit-content",display:"flex" ,margin:"15px",flex:2.5}}>
                <Nav_button variant={"ghost"}><Menu size={"30"} color="black"></Menu></Nav_button>
            </div>
            <div style={{width:"100%",height:"fit-content",display:"flex",
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
        <div style={{width:"100%", display:"flex",height:"100%"}}>
            {children}
        </div>
</div>
</>)
}