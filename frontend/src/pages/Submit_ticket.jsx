import {  Card,  Spinner, Text, TextArea } from "@radix-ui/themes"
import { useState } from "react";
import  { connect } from "../axios/axios";
import { Check_auth } from "../auth/new_auth";
import { Child_text1,  Label_txt } from "../../reusable/text";
export default function SubmitForm(){
   
    const[form,setform]=useState({ticket_issue:"",category:""})
    
    const[input,setinput]=useState({file:null})
    const {user}=Check_auth();
    
    const form_change=(e)=>{
        const{value,name}=e.target;
        setform((data)=>({
            ...data,
            [name]:value
        }))
    }
    const file_change=(e)=>{
        setinput({file:e.target.files})
    }
    const file_upload=async()=>{
        console.log(input.file)
        const hold=new FormData();
        var x=0
        while(input.file.length>=x){
            hold.append('kemfri_images',input.file[x]);
            x++;
        }
        console.log(hold.get('kemfri_images'))
       
        const data=await connect.post('/upload_file',hold,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        if(data.status==200){
            alert("Image has been uploaded")
            return;
        }
        else{
            alert("Failed to uplaod image")
            console.log(data.data)
            return;
        }
        
    }
    const [track,settrack]=useState(false);
   
    const create_ticket=async(e)=>{
        
        e.preventDefault();
        settrack(true)
        console.log(form.category,form.ticket_issue,user.branch,user.user_id);
        const data=await connect.post('/create_ticket',{
            description:String(form.ticket_issue).toLowerCase(),
            ticket_type:String(form.category).toLowerCase(),
            branch:user.branch,
            user_id:user.user_id
        })
        if(data.status==200){
            settrack(false)
            alert("Ticket has been created");
            setform((data)=>({...data,ticket_issue:""}))
            if(input.file.length>0){
                await file_upload();
            }
            else{
                alert("no image uploaded")
            }
            
        }
        else{
            settrack(false)
            alert("An error occured");

        }
            
    }
   
    


    return(
        <>
        <div style={{width:"80%", height:"100%",
            display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center",
            gap:"15px",marginLeft:"25px"
        }}>
            <div style={{display:"flex",flexDirection:"column",width:"100%",justifyContent:"left"}}>
            <div style={{width:"100%",height:"fit-content",justifyContent:"left",flexDirection:"column",
                            display:"flex",gap:"5px",alignItems:"start"
                        }}>
                            
                            <div style={{width:"fit-content",
                   flexDirection:"column",display:"flex",height:"fit-content",gap:"1px"
                 }}> 
                 <Text size={"7"} style={{color:"#172C50",fontFamily:"Inter" }} weight={"medium"}>Submit Ticket</Text>
                 <Child_text1>Create a ticket using the form below</Child_text1>
                 
                </div>
          
                
            </div> 
            </div>
            <div style={{display:"flex",width:"100%",height:"100%",justifyContent:"left"}}>
                <Card style={{display:"flex",flexDirection:"column",
                    justifyContent:'left',width:"600px",height:"400px",padding:"20px",
                    gap:"15px"
                }}> 
                    <div style={{width:"fit-content",display:"flex",flexDirection:"row",gap:"10px"}}>
                     <Label_txt weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"15px",color:"gray"}}>Upload</Label_txt>
                    <input type="file"  onChange={file_change} multiple style={{width:"fit-content",flexWrap:"wrap"}}></input>
                    </div>
                   
                   
                    <div style={{display:"flex",flexDirection:"row",
                        width:"fit-content",height:"fit-content",
                        flexWrap:"wrap",gap:"15px"
                    }}>
                        <Label_txt weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"15px",color:"gray"}}>Category</Label_txt>
                        <select onChange={form_change} name="category" required>
                            <option value={""}>Choose A Category</option>
                            <option value={"hardware"}>Hardware</option>
                            <option value={"software"}>Software</option>
                            <option value={"networking"}>Networking</option>
                            <option value={"security"}>Security</option>
                        </select>
                     
                    </div>
                    <div style={{width:"100%",height:"100%",justifyContent:"left",flexDirection:"column",display:"flex",gap:"10px"}}>
                       <Label_txt weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"15px",color:"gray"}}>Description</Label_txt>
                       <TextArea required value={form.ticket_issue} variant="surface" size={"3"} color="black" resize={"vertical"} placeholder="Describe Issue" onChange={form_change} name="ticket_issue"  style={{width:"100%",height:"100%",fontSize:"20px",color:"black",fontWeight:"bold"}} >
                       </TextArea>
                    </div>
                    <button onClick={create_ticket} type="button" style={{width:"30%",backgroundColor:"#0865C4",padding:"8px",borderRadius:"8px",justifyContent:"center",alignItems:"center"}}>
                            {track?<Text weight={"regular"} size={"4"} style={{fontFamily:"Inter",color:"#FFFFFF",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"5px"}}>
                                
                               <Spinner></Spinner> 
                                Creating</Text>:
                            <Text weight={"regular"} size={"4"} style={{fontFamily:"Inter",color:"#FFFFFF"}}>
                                Create</Text>
}
                            </button>
                </Card>

            </div>

        </div>
        </>
    )
}
