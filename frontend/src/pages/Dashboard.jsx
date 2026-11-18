import { Head_Mess } from "../ui/text";
import { Clock } from "lucide-react";
import Main_Text from "../ui/text";
import { Ticket } from "lucide-react";
import { Avatar, Card } from "@radix-ui/themes/dist/cjs/index.js";
import con from "../axios/axios";
import { useEffect, useState } from "react";
import { Spinner } from "@radix-ui/themes/dist/cjs/index.js";
import { Heading } from "@radix-ui/themes/dist/cjs/index.js";
import { Text } from "@radix-ui/themes/dist/cjs/index.js";
import { Child_text1 } from "../../reusable/text";
import { supabase } from "../auth/supabase.js";
import { Check_auth } from "../auth/new_auth.jsx";
export default function Dashboard(){
    const{user}=Check_auth();
    const [states,setstates]=useState({total:false,assigned:false,underway:false,pending:false,resolved:false,escalated:false})
    
    const[db,setdb]=useState({total:0,pending:0,assigned:0,underway:0,resolved:0,escalated:0})
    const total=async()=>{
        console.log(user)
        setstates((data)=>({
            ...data,
            total:true
        }))
        const data=await supabase.schema("usecase_kemfri").from("tickets").select("*",{count: "exact", head: true }).like("user_id",user.user_id);
        console.log(data);
        if(data.count){
            setdb((da)=>({
                ...da,
                total:data.count
            }))
            
        }
        setstates((data)=>({
            ...data,
            total:false
        }))
        // console.log(data.count);
    }
    const pending_ticket=async()=>{
        console.log(user)
        setstates((data)=>({
            ...data,
            pending:true
        }))
        const data=await supabase.schema("usecase_kemfri").from("tickets").select("*",{count: "exact", head: true }).like("user_id",user.user_id).in("ticket_state",["pending"]);
        console.log(data);
        if(data.count){
            setdb((da)=>({
                ...da,
                pending:data.count
            }))
           
        }
         setstates((data)=>({
            ...data,
            pending:false
        }))
        // console.log(data.count);
    }
     const escalated=async()=>{
        console.log(user)
        setstates((data)=>({
            ...data,
            escalated:true
        }))
        const data=await supabase.schema("usecase_kemfri").from("tickets").select("*",{count: "exact", head: true }).like("user_id",user.user_id).in("ticket_state",["escalated"]);
        console.log(data);
        if(data.count){
            setdb((da)=>({
                ...da,
                pending:data.count
            }))
        }
        setstates((data)=>({
            ...data,
            escalated:false
        }))
        // console.log(data.count);
    }
    const underway=async()=>{
        console.log(user)
        setstates((data)=>({
            ...data,
            underway:true
        }))
        const data=await supabase.schema("usecase_kemfri").from("tickets").select("*",{count: "exact", head: true }).like("user_id",user.user_id).in("ticket_state",["underway"]);
        console.log(data);
        if(data.count){
            setdb((da)=>({
                ...da,
                underway:data.count
            }))
            
        }
         setstates((data)=>({
            ...data,
            underway:false
        }))
        // console.log(data.count);
    }
    const assigned=async()=>{
        console.log(user)
        setstates((data)=>({
            ...data,
            assigned:true
        }))
        const data=await supabase.schema("usecase_kemfri").from("tickets").select("*",{count: "exact", head: true }).like("user_id",user.user_id).in("ticket_state",["assigned"]);
        console.log(data);
        if(data.count){
            setdb((da)=>({
                ...da,
                assigned:data.count
            }))
        }
         setstates((data)=>({
            ...data,
            assigned:false
        }))
        // console.log(data.count);
    }
    const resolved=async()=>{
        console.log(user)
        setstates((data)=>({
            ...data,
            resolved:true
        }))
        const data=await supabase.schema("usecase_kemfri").from("tickets").select("*",{count: "exact", head: true }).like("user_id",user.user_id).in("ticket_state",["resolved"]);
        console.log(data);
        if(data.count){
            setdb((da)=>({
                ...da,
                resolved:data.count
            }))
           
        }
         setstates((data)=>({
            ...data,
           resolved:false
        }))
        // console.log(data.count);
    }
    const analysis=async()=>{
        const data=await supabase.schema("usecase_kemfri").from("tickets_analysis").select("*").like("user_id",user.user_id);
        console.log("Analysis data below")
        console.log(data) 
    }

    useEffect(()=>{
        total();
        pending_ticket();
        assigned();
        resolved();
        underway();
        escalated();
        analysis();

    },[])
    return(<>
    <div style={{width:"100%",height:"100%",display:"flex",
        flexDirection:"column",flexWrap:"nowrap",justifyContent:"left",gap:"20px",marginLeft:"25px"}}>
        <div style={{width:"100%",height:"fit-content",justifyContent:"left",flexDirection:"column",
                display:"flex",gap:"5px",alignItems:"start"
            }}>
                <Text size={"7"} style={{color:"#172C50",fontFamily:"Inter" }} weight={"medium"}>Dashboard</Text>
                                 <Child_text1>View Tickets Summary using the card below</Child_text1>
                {/* <Heading weight={"bold"} style={{fontSize:"20px",fontFamily:"sans-serif"}} color="black">Dashboard</Heading>
                <Text weight={"light"} style={{fontSize:"18px",fontFamily:"sans-serif",color:"#6B7280"}}>
                    Welcome Back  {localStorage.getItem('firstname')}
                </Text> */}
                {/* <Head_Mess>Welcome Back , {localStorage.getItem('firstname')}</Head_Mess> */}
                {/* <Text weight={"light"} style={{fontSize:"15px",color:"black"}}>
                   Dashboard Tickets
                </Text> */}
            </div>
            <Text weight={"light"} style={{color:"#172C50",fontFamily:"Inter"}}>
                   Dashboard Tickets
                </Text>
            <div style={{display:"flex",flexDirection:"row",width:"fit-content",
            gap:"20px",height:"fit-content",flexWrap:"wrap"
            }}>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",
                    flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"20px"}}>Total Tickets</Text>
                        {/* <Main_Text>Total Tickets</Main_Text> */}
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"18px"}}>{db.total}</Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",background:"rgba(9, 41, 147, 0.29)",borderRadius:"10px"}}>
                            {!states.total?<Clock size="30" color="rgb(0, 0, 0)"></Clock>:<Spinner></Spinner>}
                            
                        </div>
                    </div>
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",
                    flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"20px"}}>Pending Tickets</Text>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"18px"}}>{db.pending}</Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",background:"rgba(9, 41, 147, 0.29)",borderRadius:"10px"}}>
                            {!states.pending?<Clock size="30" color="rgb(0, 0, 0)"></Clock>:<Spinner></Spinner>}
                            
                        </div>
                    </div>
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",     flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"20px"}}>Resolved Tickets</Text>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"18px"}}>{db.resolved}</Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",background:"rgba(9, 41, 147, 0.29)",borderRadius:"10px"}}>
                           {!states.resolved?<Clock size="30" color="rgb(0, 0, 0)"></Clock>:<Spinner></Spinner>}
                            
                        </div>
                    </div>
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",     flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"20px"}}>Underway Tickets</Text>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"18px"}}>{db.underway}</Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",background:"rgba(9, 41, 147, 0.29)",borderRadius:"10px"}}>
                           {!states.underway?<Clock size="30" color="rgb(0, 0, 0)"></Clock>:<Spinner></Spinner>}
                            
                        </div>
                    </div>
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",     flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"20px"}}>Assigned Tickets</Text>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"18px"}}>{db.assigned}</Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",background:"rgba(9, 41, 147, 0.29)",borderRadius:"10px"}}>
                           {!states.assigned?<Clock size="30" color="rgb(0, 0, 0)"></Clock>:<Spinner></Spinner>}
                            
                        </div>
                    </div>
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",     flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"20px"}}>Escalated Tickets</Text>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"18px"}}>{db.escalated}</Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",background:"rgba(9, 41, 147, 0.29)",borderRadius:"10px"}}>
                           {!states.escalated?<Clock size="30" color="rgb(0, 0, 0)"></Clock>:<Spinner></Spinner>}
                            
                        </div>
                    </div>
                </Card>
                {/* <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",
                    flexDirection:"row", gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Main_Text>Main Tickets</Main_Text>
                        <Main_Text>15</Main_Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                   <div style={{width:"fit-content",height:"fit-content",padding:"10px",background:"rgba(9, 41, 147, 0.29)",borderRadius:"10px"}}>
                            <Clock size="30" color="rgb(0, 0, 0)"></Clock>
                        </div>
                    </div>
                </Card> */}
            </div>
    </div>
    </>)
}