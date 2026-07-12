import { Head_Mess } from "../ui/text";
import { Clock } from "lucide-react";
import Main_Text from "../ui/text";
import { Ticket } from "lucide-react";
import { Avatar, Card } from "@radix-ui/themes/dist/cjs/index.js";
export default function Dashboard(){
    return(<>
    <div style={{width:"100%",height:"100%",display:"flex",
        flexDirection:"column",flexWrap:"nowrap",justifyContent:"left",gap:"20px"}}>
        <div style={{width:"100%",height:"fit-content",justifyContent:"left",flexDirection:"column",
                display:"flex",gap:"5px",alignItems:"start"
            }}>
                <Head_Mess>Welcome Back , User</Head_Mess>
                <Main_Text>System Overview and Admin</Main_Text>
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"fit-content",
            gap:"15px",height:"fit-content",flexWrap:"wrap"
            }}>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",
                    flexDirection:"row",gap:"15px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Main_Text>Main Tickets</Main_Text>
                        <Main_Text>15</Main_Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <Avatar size={"5"} src={Clock} fallback="clock"/>
                    </div>
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",
                    flexDirection:"row",gap:"15px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Main_Text>Main Tickets</Main_Text>
                        <Main_Text>15</Main_Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <Avatar size={"5"}  fallback="clock"><div style={{borderRadius:"10px"}}><Clock></Clock></div></Avatar>
                    </div>
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",     flexDirection:"row",gap:"15px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Main_Text>Main Tickets</Main_Text>
                        <Main_Text>15</Main_Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <Avatar size={"5"} fallback="clock"></Avatar>
                    </div>
                </Card>
                <Card size={"3"} className="stat-card" style={{width:"fit-content",height:"fit-content",display:"flex",
                    flexDirection:"row", gap:"15px",cursor:"default"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'left',
                        flexWrap:"wrap",gap:"3px",width:"100%",height:"fit-content"
                    }}>
                        <Main_Text>Main Tickets</Main_Text>
                        <Main_Text>15</Main_Text>
                    </div>
                    <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <Avatar size={"5"} variant="soft"
                        src={Clock} fallback="clock"/>
                    </div>
                </Card>
            </div>
    </div>
    </>)
}