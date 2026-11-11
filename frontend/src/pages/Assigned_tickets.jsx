import { useState } from "react"
import { connect } from "../axios/axios"
import { useEffect } from "react"
import { Card, Text } from "@radix-ui/themes/dist/cjs/index.js"
export default function Assigned_tickets(){
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
        
        const dat=await connect.get("/assigned_tickets",)
        
        console.log(dat.data)
        const fetched=dat.data.data.map((val)=>Object.values(val));
        console.log(fetched)
        setdata(fetched)
        if(dat.status==200){
           const img=await connect.get("/image_download",{
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
        <Card size={"2"} style={{width:"fit-content", height:"fit-content",display:'flex',flexDirection:"column"}}>
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
    
        </Card>
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