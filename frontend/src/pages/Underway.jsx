import { useState } from "react"
import { connect } from "../axios/axios"
import { useEffect } from "react"
import { Badge, Card, Text } from "@radix-ui/themes/dist/cjs/index.js"
import { Child_text1,Label_txt } from "../../reusable/text"
import { Plus } from "lucide-react"
export default function Underway_tickets(){
    const [data,setdata]=useState([])
    const[image,setimage]=useState(null)
    const [state,setstate]=useState(false)
    const [form,setform]=useState({upd:""})
    const change=(e)=>{
        const {name,value}=e.target;
        setform((data)=>({
            ...data,
            [name]:value
        }))
    }

    const submit=async()=>{
        console.log(data);
        console.log(data[0][1])
        const da=await connect.post("/update_ticket",{
            ticket_id:data[0][1],
            state:form.upd
        })
        if(da.status==200||da.status==201){
            alert("Ticket state Updated")
        }
    }
    const f=async()=>{
        
        const dat=await connect.get("/underway_tickets",)
        
        console.log(dat.data)
        const fetched=dat.data.data.map((val)=>Object.values(val));
        console.log(fetched)
        setdata(fetched)
        if(dat.status==200){
           const img=await connect.get("/image_download?type=underway",{
            responseType:"blob"
        });
           const objectUrl = URL.createObjectURL(img.data);
           console.log("image fetched is ")
           console.log(objectUrl)
           setimage(objectUrl);
        }
    }
    useEffect(()=>{
        f();
    },[])
    return(
        <>
        <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column"}}>
            <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column"}}>
            <Text size={"7"} style={{color:"#172C50",fontFamily:"Inter" }} weight={"medium"}>Underway Tickets</Text>
                             <Child_text1>Expand to view your Underway ticket</Child_text1>
        </div>
        <Card size={"2"} style={{width:"432px", height:"fit-content",display:'flex',flexDirection:"column"}}>
            <div style={{width:'100%',height:"fit-content",display:"flex",flexDirection:"row"}}>
            <div style={{width:"100%",height:'100%'}}>
            {data.map((val)=>(
                <div style={{width:"100%",display:"flex",flexDirection:"row",gap:"5px"}}>
        {val.map((da,key)=>(
            
            key==1||key==2?
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
            <Text size={"2"} style={{color:"#62758D",fontFamily:"Inter"}}>{key==1?"Ticket ID":"Category"}</Text >
            <Text weight={key==1?"bold":"regular"} size={"4"} style={{color:"#152C4A",fontFamily:"Inter"}}>
            {da}
            </Text>
            </div>:""
            
        ))}
        </div>
    ))}
    </div>
    <div>
        <button onClick={()=>setstate(!state)} style={{background:"#EDF4FF",width:"98px",padding:"5px",borderRadius:"5px"}}>
            
            <Text size={"4"} style={{color:"#2362DF",fontFamily:"Inter",gap:"5px",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}} >
            
                Expand <Plus size={"15px"} style={{fontWeight:"lighter"}}></Plus>
                </Text>
                
            </button>
    </div>
    
    </div>
    {state?
    <div style={{marginTop:"8px",width:"100%",height:"fit-content",display:"flex",flexDirection:"column",gap:"5px"}}>
        <div style={{width:'100%',height:"fit-content",display:"flex",flexDirection:"column"}}>
            {data.map((val)=>(
         <div style={{display:"flex",flexDirection:"column",width:"100%",height:"fit-content"}}>      
        {val.map((da,key)=>(
            key==1||key==2||key==0||key==8?"":
           key==3? 
            <div style={{display:'flex',width:"100%",flexDirection:"column"}}>
            <Text size={"2"} style={{color:"#62758D",marginBottom:"-2px",fontFamily:"Inter"}}>{key==3?"Description":"Category"}</Text >
            <Text size={"4"} style={{color:"#152C4A",fontFamily:"Inter"}}>
            {da}
            </Text>
            
            </div>
            :""
        ))}
        </div> 
        
    ))}
    {data.map((val)=>(
         <div style={{marginTop:"5px",display:"flex",flexDirection:"row",width:"100%",height:"fit-content"}}>      
        {val.map((da,key)=>(
            key==1||key==2||key==0||key==8?"":
           key==4||key==5? 
            <div style={{display:'flex',width:"100%",gap:"2px",flexDirection:"column",justifyContent:"center"}}>
            <Text size={"2"} style={{color:"#62758D",marginBottom:"-2px",fontFamily:"Inter"}}>{key==4?"State":"Urgency"}</Text >
            <Text size={"4"} style={{color:"#152C4A",fontFamily:"Inter"}}>
            {key==4? 
            <Badge color="yellow" size={"2"}>
            {da}
            </Badge>
            :da}

            </Text>
            
            </div>
            :""
        ))}
        </div> 
        
    ))}
    {data.map((val)=>(
         <div style={{marginTop:"5px",display:"flex",flexDirection:"row",width:"100%",height:"fit-content"}}>      
        {val.map((da,key)=>(
            key==1||key==2||key==0||key==8?"":
           key==10||key==11? 
            <div style={{display:'flex',width:"100%",gap:"2px",flexDirection:"column"}}>
            <Text size={"2"} style={{color:"#62758D",marginBottom:"-2px",fontFamily:"Inter"}}>{key==10?"Created":"Updated"}</Text >
            <Text size={"4"} style={{color:"#152C4A",fontFamily:"Inter"}}>
            {new Date(da).toLocaleDateString('en-Us',{
                day:"numeric",month:"numeric",year:"numeric"
            })}
            </Text>
            
            </div>
            :""
        ))}
        </div> 
        
    ))}
    
        </div>
        <div style={{marginTop:"8px",width:"320px",height:'140px',display:"flex",flexDirection:"column",justifyContent:"center",gap:"3px"}}>
<Text size={"2"} style={{color:"#62758D",fontFamily:"Inter"}}>Image</Text >
           
           {image?
        <img src={image} alt="Image ticket" style={{objectFit:"cover",height:"100%",width:"100%",borderRadius:'10px'}}/>
    :""
    }
        </div>

         <div style={{marginTop:"10px",width:"100%",display:"flex",flexDirection:"column",gap:"3px"}}>
            <Text size={"2"} style={{color:"#62758D",fontFamily:"Inter",justifyContent:"center"}}>Choose Action</Text >
        
        <select onChange={change} name="upd" style={{border:"solid 1px black",borderRadius:"5px"}}>
        <option value={""}>
            Default
        </option>
        <option value={"resolved"}>
            Resolved
        </option>
        
        <option value={"escalated"}>
            Escalated
        </option>
    </select>
    </div>  
        <div style={{width:"100%",display:"flex",marginTop:"10px"}}>
            <button onClick={submit} style={{width:'100%',background:"#2362DF",padding:"5px",borderRadius:"3px"}}>
                <Text style={{color:"#FFFFFF",fontFamily:"inter"}}>Update
                    </Text>
                </button>
        </div>
        
    </div>:""}
    
        </Card>
        </div>
        {/* <Card size={"2"} style={{width:"432px", height:"fit-content",display:'flex',flexDirection:"column"}}>
            <div style={{width:'100%',height:"fit-content",display:"flex",flexDirection:"row"}}>
            <div style={{width:"100%",height:'100%'}}>
            {data.map((val)=>(
                <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
        {val.map((da,key)=>(
            
            key==1||key==2?
            <Text>
            {da}
            </Text>:""
            
        ))}
        </div>
    ))}
    </div>
    <div>
        <button onClick={()=>setstate(!state)}>Expand</button>
    </div>
    
    </div>
    {state?
    <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column"}}>
        <div style={{width:'100%',height:"fit-content",display:"flex",flexDirection:"column"}}>
            {data.map((val)=>(
         <div style={{display:"flex",flexDirection:"column",width:"100%",height:"fit-content"}}>      
        {val.map((da,key)=>(
            key==1||key==2?"":<Text>{da}</Text>
        ))}
        </div> 
    ))}
    <select onChange={change} name="upd">
        <option value={""}>
            Choose Action to Take
        </option>
        <option value={"resolved"}>
            Resolved
        </option>
        <option value={"underway"}>
            Underway
        </option>
        <option value={"escalated"}>
            Escalated
        </option>
    </select>
        </div>
        <div style={{width:"320px",height:'140px',display:"flex"}}>
           {image?
        <img src={image} alt="Image ticket" style={{objectFit:"cover",height:"100%",width:"100%"}}/>
    :""
    }
        </div>
        <div>
            <button onClick={submit}>Update</button>
        </div>
        
    </div>:""}
    
        </Card> */}
        {/* <div >
        {image?
        <img src={image} alt="Image ticket" style={{objectFit:"cover",height:"100%",width:"100%"}}/>
    :""
    }
    </div>
    {data.map((val)=>(
        val.map((da)=>(
            da
        ))
    ))}
        <button onClick={()=>f}>Fetch</button> */}
        </>
    )
}