import { Head_Mess } from "../ui/text";
import { Clock } from "lucide-react";
import Main_Text from "../ui/text";
import { Ticket } from "lucide-react";
import { Avatar, Card } from "@radix-ui/themes";
import con from "../axios/axios";
import { useEffect, useState } from "react";
import { Spinner } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { Child_text1 } from "../../reusable/text";
import { supabase } from "../auth/supabase.js";
import { Check_auth } from "../auth/new_auth.jsx";
import { useMediaQuery } from "react-responsive";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig ={
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}
const chartConfig1 ={
  total: {
    label: "Total",
    color: "pink",
  },
}
export default function Dashboard(){
    const{user}=Check_auth();
    const [states,setstates]=useState({total:false,assigned:false,underway:false,pending:false,resolved:false,escalated:false})
    const min=useMediaQuery({maxWidth:"768px"})
    const[db,setdb]=useState({total:0,pending:0,assigned:0,underway:0,resolved:0,escalated:0})
    const [val,setval]=useState(null)
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
        const data=await supabase.schema("usecase_kemfri").from("tickets_analysis").select("date,total").like("user_id",user.user_id).order("date",{ascending:true});
        console.log("Analysis data below")
        console.log(data) 
        setval(data.data)
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
                <Child_text1>View Tickets Summary and Tickets Overview below</Child_text1>
               
            </div>
            <div style={{display:"flex",width:"fit-content",height:"fit-content",flexDirection:"column"}}>
    <Text weight={"light"} size={"4"} style={{color:"#172C50",fontFamily:"Inter"}}>
                   Ticket Summary
        </Text>             
    <Child_text1>Below is the summarry of tickets count according to ticket states</Child_text1>
    </div>  
            <div style={{display:"flex",flexDirection:"row",width:"100%",
            gap:"20px",height:"fit-content",flexWrap:min?"wrap":""
            }}>
                <Card size={"3"} className="stat-card" style={{width:"100%",height:"fit-content",display:"flex",
                    flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",borderRadius:"10px"}}>
                            {!states.total?"":<Spinner></Spinner>}
                            
                        </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'center',
                        flexWrap:min?"wrap":"",gap:"3px",width:"100%",height:"fit-content",alignItems:"flex-end"
                    }}>
                        {/* <Text weight={"light"} size={"3"} style={{fontFamily:"Inter",color:"#60798D"}}>Total Tickets</Text> */}
                        <Child_text1>Total Tickets</Child_text1>
                        {/* <Main_Text>Total Tickets</Main_Text> */}
                        <Text weight={"medium"} size={"8"} style={{fontFamily:"Inter"}}>{db.total}</Text>
                    </div>
                    
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"100%",height:"fit-content",display:"flex",
                    flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",borderRadius:"10px"}}>
                            {!states.pending?"":<Spinner></Spinner>}
                            
                        </div>
                    </div>
                     <div style={{display:"flex",flexDirection:"column",justifyContent:'center',
                        flexWrap:min?"wrap":"",gap:"3px",width:"100%",height:"fit-content",alignItems:"flex-end"
                    }}>
                        <Child_text1>Pending Tickets</Child_text1>
                        <Text weight={"medium"} size={"8"} style={{fontFamily:"Inter"}}>{db.pending}</Text>
                    </div>
                    
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"100%",height:"fit-content",display:"flex",     flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",borderRadius:"10px"}}>
                           {!states.resolved?"":<Spinner></Spinner>}
                            
                        </div>
                    </div>
                     <div style={{display:"flex",flexDirection:"column",justifyContent:'center',
                        flexWrap:min?"wrap":"",gap:"3px",width:"100%",height:"fit-content",alignItems:"flex-end"
                    }}>
                        <Child_text1>Resolved Tickets</Child_text1>
                        <Text weight={"medium"} size={"8"} style={{fontFamily:"Inter"}}>{db.resolved}</Text>
                    </div>
                    
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"100%",height:"fit-content",display:"flex",     flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",borderRadius:"10px"}}>
                           {!states.underway?"":<Spinner></Spinner>}
                            
                        </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'center',
                        flexWrap:min?"wrap":"",gap:"3px",width:"100%",height:"fit-content",alignItems:"flex-end"
                    }}>
                        <Child_text1>Underway Tickets</Child_text1>
                        <Text weight={"medium"} size={"8"} style={{fontFamily:"Inter"}}>{db.underway}</Text>
                    </div>
                    
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"100%",height:"fit-content",display:"flex",     flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",borderRadius:"10px"}}>
                           {!states.assigned?"":<Spinner></Spinner>}
                            
                        </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'center',
                        flexWrap:min?"wrap":"",gap:"3px",width:"100%",height:"fit-content",alignItems:"flex-end"
                    }}>
                        <Child_text1>Assigned Tickets</Child_text1>
                        <Text weight={"medium"} size={"8"} style={{fontFamily:"Inter"}}>{db.assigned}</Text>
                    </div>
                    
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"100%",height:"fit-content",display:"flex",     flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",borderRadius:"10px"}}>
                           {!states.escalated?"":<Spinner></Spinner>}
                            
                        </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'center',
                        flexWrap:min?"wrap":"",gap:"3px",width:"100%",height:"fit-content",alignItems:"flex-end"
                    }}>
                        <Child_text1>Escalated Tickets</Child_text1>
                        <Text weight={"medium"} size={"8"} style={{fontFamily:"Inter"}}>{db.escalated}</Text>
                    </div>
                    
                </Card>
               
            </div>
            <div style={{display:"flex",width:"fit-content",height:"fit-content",flexDirection:"column"}}>
    <Text weight={"light"} size={"4"} style={{color:"#172C50",fontFamily:"Inter"}}>
                   Ticket Trend
        </Text>             
    <Child_text1>Below is the trend of ticket submission over the past month</Child_text1>
    </div>    
             
     <div style={{display:"flex",width:"100%",height:"fit-content",flexDirection:"column",gap:"15px"}}>
          
<Card size="2" style={{display:"flex",width:"100%",height:"100%",flexDirection:"column",justifyContent:"right",alignItems:"flex-start"}}>
         
  <ChartContainer
    config={chartConfig1}
    style={{ width: "100%", height: 300,marginTop:"20px" }}
  >
          <AreaChart
            accessibilityLayer
            data={val?val:[{date:"",total:0}]}
            margin={{
              left: 12,
              right: 12,
            }}
            style={{padding:"10px"}}
          >
            <CartesianGrid vertical={false} />
           
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              style={{padding:"100px"}}
              tickFormatter={(value) =>
  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  
}
            />
           <YAxis
           dataKey="total"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          
        //  domain={["dataMin - 10", "dataMax + 10"]}
        />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="total"
              type="linear"
              fill="pink"
              fillOpacity={0.4}
              
            />
          </AreaChart>
        </ChartContainer>
        </Card>  
    </div>
    </div>
    </>)
}