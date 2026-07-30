import { Head_Mess } from "../ui/text";
import { Clock } from "lucide-react";
import Main_Text from "../ui/text";
import { Ticket } from "lucide-react";
import { Avatar, Card } from "@radix-ui/themes/dist/cjs/index.js";
import con from "../axios/axios";
import { useEffect, useState } from "react";
export default function Dashboard(){
  
    const [count,setcount]=useState({total:0,pending:0,solved:0})
    const total_fetch=async()=>{
        await con().get('/total_tickets').then((data)=>{
            setcount((data_)=>({...data_,
                total:data.data.count}))
        }).catch((error)=>{
            console.log(error);
            alert("an error occured");
        })
    }
    const pending_fetch=async()=>{
        await con().get('/pending_tickets').then((data)=>{
             setcount((data_)=>({...data_,
                pending:data.data.count}))
        }).catch((error)=>{
            console.log(error);
            alert("an error occured");
        })
    }
    const resolved_fetch=async()=>{
        await con().get('/resolved_tickets').then((data)=>{
            setcount((data_)=>({...data_,
                solved:data.data.count}))
        }).catch((error)=>{
            console.log(error);
            alert("an error occured");
        })
    }
    useEffect(()=>{
        total_fetch();
        pending_fetch();
        resolved_fetch();
    },[])
    return(<>
    <div style={{width:"100%",height:"100%",display:"flex",
        flexDirection:"column",flexWrap:"nowrap",justifyContent:"left",gap:"20px",marginLeft:"25px"}}>
        <div style={{width:"100%",height:"fit-content",justifyContent:"left",flexDirection:"column",
                display:"flex",gap:"5px",alignItems:"start"
            }}>
                <Head_Mess>Welcome Back , {localStorage.getItem('firstname')}</Head_Mess>
                <Main_Text>System Overview and Admin</Main_Text>
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"fit-content",
            gap:"20px",height:"fit-content",flexWrap:"wrap"
            }}>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",
                    flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Main_Text>Total Tickets</Main_Text>
                        <Main_Text>{count.total}</Main_Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",background:"rgba(9, 41, 147, 0.29)",borderRadius:"10px"}}>
                            <Clock size="30" color="rgb(0, 0, 0)"></Clock>
                        </div>
                    </div>
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",
                    flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Main_Text>Pending Tickets</Main_Text>
                        <Main_Text>{count.pending}</Main_Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",background:"rgba(9, 41, 147, 0.29)",borderRadius:"10px"}}>
                            <Clock size="30" color="rgb(0, 0, 0)"></Clock>
                        </div>
                    </div>
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",     flexDirection:"row",gap:"25px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Main_Text>Resolved Tickets</Main_Text>
                        <Main_Text>{count.solved}</Main_Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <div style={{width:"fit-content",height:"fit-content",padding:"10px",background:"rgba(9, 41, 147, 0.29)",borderRadius:"10px"}}>
                            <Clock size="30" color="rgb(0, 0, 0)"></Clock>
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