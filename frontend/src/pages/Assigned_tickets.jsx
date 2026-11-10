import { useState } from "react"
import { connect } from "../axios/axios"
import { useEffect } from "react"

export default function Assigned_tickets(){
    const [data,setdata]=useState([])
    const[image,setimage]=useState(null)
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
        {image?
        <img src={image} alt="Image ticket"/>
    :""
    }
        <button onClick={()=>f}>Fetch</button>
        </>
    )
}