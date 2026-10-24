import { Nav_button } from "../ui/buttons"
import { ArrowLeftIcon, Badge } from "lucide-react"
import Main_Text, { Head_Mess, Head_Text, Input_Field } from "../ui/text"
import { Button, Card, DropdownMenu, Heading, Spinner, Text, TextArea } from "@radix-ui/themes/dist/cjs/index.js"
import { useState } from "react";
import con, { connect } from "../axios/axios";
import { useEffect } from "react";
import { Load_button } from "../ui/buttons";
import { TextField } from "@radix-ui/themes/dist/cjs/index.js";
import { Check_auth } from "../auth/new_auth";
export default function SubmitForm(){
    const [set,setf]=useState({data_m:"options"})
    const [cat,setcat]=useState({data_m:"options"})
    const [def,setdefault]=useState("Select Options")
    const [defcat,setdefcat]=useState("default");
    const [arr,setarr]=useState([]);
    const [priority_arr,set_priority_array]=useState([]);
    const [val_priority,set_valuepriority]=useState("")
    const[val_category,set_valuecategory]=useState("");
    const[form,setform]=useState({ticket_issue:"",category:""})
    const [frm,setfrm]=useState({ticket_issue:""})
    const[input,setinput]=useState({file:null})
    const {user}=Check_auth();
    const change=(e)=>{
        const{name,value}=e.target;
        setfrm(()=>({
            [name]:value
        }))
    }
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
       
        await connect.post('/api/upload_file',hold,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    }
    const [track,settrack]=useState(false);
    
    const category_drop=(value,category_id)=>{
       
        setdefault(value)
        setf((data)=>({
            ...data,
            [set.data_m]:value
        }))
        set_valuecategory(category_id)
    }
    
    const priority_drop=(value,id)=>{
       
        setdefcat(value)
        setcat((data)=>({
            ...data,
            [cat.data_m]:value
        }))
        set_valuepriority(id)
    }
    async function FetchPriority(){
        await con().get("/fetch_priority").then((data)=>{
console.log(data.data);            
set_priority_array(data.data.data);
        })
    }
    async function Submit(e){
        console.log(val_category);
        console.log(val_priority)
        console.log(frm.ticket_issue)
        e.preventDefault();
        settrack(true);
        await con().post('/submit',{category_id:val_category,priority_id:val_priority,ticket_issue:frm.ticket_issue}).then(()=>{
            alert("data saved successfully");
            priority_drop("Default Priority")
            category_drop("Default Category")
            setfrm({ticket_issue:""});
            settrack(false);
        }).catch((error)=>{
            console.log(error);
            settrack(false);
            // alert("An error occured");
        })
    }
    const create_ticket=async(e)=>{
        e.preventDefault();
        const data=await connect.post('/api/create_ticket',{
            description:form.ticket_issue,
            ticket_type:form.category,
            branch:user.branch,
            user_id:user.user_id
        })
        if(data.status==200){
            alert("Ticket has been created");
            setform({ticket_issue:"",category:""})
            await file_upload();
        }
    }
    async function fetch(){
        
            await con().get('/fetch_category').then((data)=>{
               var c=data.data.data;
               setarr(c);               
            }).catch((error)=>{console.log(error)})
        
    }
    useEffect(()=>{
        fetch();
        FetchPriority();
    },[])
    


    return(
        <>
        <div style={{width:"80%", height:"100%",
            display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center",
            gap:"5px",marginLeft:"25px"
        }}>
            <div style={{display:"flex",flexDirection:"column",width:"100%",justifyContent:"left"}}>
            <div style={{width:"100%",height:"fit-content",justifyContent:"left",flexDirection:"column",
                            display:"flex",gap:"5px",alignItems:"start"
                        }}>
                            {/* <Head_Mess>Welcome Back , {localStorage.getItem('firstname')}</Head_Mess>
                            <Main_Text>System Overview and Admin</Main_Text>*/}
                            <div style={{width:"fit-content",
                   flexDirection:"row",display:"flex",height:"fit-content"
                 }}> 
                 <Heading weight={"bold"} style={{fontSize:"20px",fontFamily:"sans-serif"}} color="black">Submit Ticket</Heading>
                </div>
            {/* <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"row",padding:"5px",gap:"15px"
            }}>
                {/* <div style={{display:"flex",height:"100%",justifyContent:"center",alignItems:"center"}}>
                    <Nav_button><ArrowLeftIcon/></Nav_button>
                </div> */}
                
            </div> 
            </div>
            <div style={{display:"flex",width:"100%",height:"100%",justifyContent:"left"}}>
                <Card style={{display:"flex",flexDirection:"column",
                    justifyContent:'left',width:"100%",height:"fit-content",padding:"20px",
                    gap:"15px"
                }}> 
                    
                    <Text weight={"regular"} style={{fontSize:'17px',fontFamily:"sans-serif",color:"darkgray"}}>Image Upload</Text>
                    <div style={{width:"fit-content",display:"flex",flexDirection:"row",gap:"10px"}}>
                     <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"15px",color:"gray"}}>Upload</Text>
                    <input type="file"  onChange={file_change} multiple style={{width:"fit-content",flexWrap:"wrap"}}></input>
                    </div>
                   
                    <Text weight={"regular"} style={{fontSize:'17px',fontFamily:"sans-serif",color:"darkgray"}}>Issue Details</Text>
                    {/* <div style={{display:"flex",
                        flexDirection:"column",gap:"10px",width:"100%",
                        height:"fit-content"
                    }}>
                        <Head_Text>Subject </Head_Text>
                        <Input_Field placeholder={'Subject'}></Input_Field>  
                    </div> */}
                    <div style={{display:"flex",flexDirection:"row",
                        width:"fit-content",height:"fit-content",
                        flexWrap:"wrap",gap:"15px"
                    }}>
                        <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"15px",color:"gray"}}>Category</Text>
                        <select onChange={form_change} name="category" required>
                            <option value={""}>Choose Category</option>
                            <option value={"hardware"}>Hardware</option>
                            <option value={"software"}>Software</option>
                            <option value={"networking"}>Networking</option>
                            <option value={"security"}>Security</option>
                        </select>
                        {/* <div style={{width:"fit-content",justifyContent:"left",height:"fit-content",
                            flexDirection:"column",display:'flex' ,gap:"10px"
                        }}>
                            <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"15px",color:"gray"}}>Priority</Text>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                <Button size={"3"} style={{cursor:"pointer",color:"black"}} type="button" variant="outline" color="gray"> */}
                                    {/* <Main_Text>{defcat}</Main_Text> */}
                                    {/* <Text weight={"medium"} style={{fontSize:"16px",color:"black"}}>{defcat}</Text>
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    {priority_arr.map((item,index)=>(
                                        <DropdownMenu.Item onClick={()=>priority_drop(item.priority,item.id_)} 
                                        key={index}>
                                            {item.priority}
                                        </DropdownMenu.Item>
                                    ))} */}
                                    {/* <DropdownMenu.Item onClick={()=>change_cat("Network")}>Network</DropdownMenu.Item>
                                     <DropdownMenu.Item onClick={()=>change_cat("Software")}>Software</DropdownMenu.Item> */}
                                {/* </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div> */}
                        {/* <div style={{width:"fit-content",justifyContent:"left",height:"fit-content",
                            flexDirection:"column",display:'flex',gap:"10px"
                        }}>
                            <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"15px",color:"gray"}}>Category</Text>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                <Button size={"3"} type="button" style={{cursor:"pointer",color:"black"}} variant="outline" color="gray">
                                    <Text weight={"medium"} style={{fontSize:"16px",color:"black"}}>{def}</Text>
                                </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content onChange={form_change}> */}
                                    {/* {arr.map((item)=>(
                                    <DropdownMenu.Item onClick={()=>category_drop(item.category_name,item.category_id)} 
                                    key={item.category_id}>{item.category_name}</DropdownMenu.Item>

                                    ))} */}
                                    
                                    
                                    {/* <DropdownMenu.Item onClick={()=>change("low")} >Low</DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={()=>change("medium")} >Medium</DropdownMenu.Item> */}
                                {/* </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div> */}
                    </div>
                    <div style={{width:"100%",height:"fit-content",justifyContent:"left",flexDirection:"column",display:"flex",gap:"10px"}}>
                       <Text weight={"medium"} style={{fontFamily:"sans-serif",fontSize:"15px",color:"gray"}}>Description</Text>
                       <TextArea required value={form.ticket_issue} variant="surface" size={"3"} color="black" resize={"vertical"} placeholder="Describe Issue" onChange={form_change} name="ticket_issue"  style={{width:"100%",height:"100%",fontSize:"20px",color:"black",fontWeight:"bold"}} >
                       </TextArea>
                    </div>
                    {track?
                    <Button size="3" variant="classic" color="blue" style={{width:"fit-content"}}><Spinner></Spinner>Submitting</Button>
                    :
                    <Button size={"3"} variant="classic" color="blue" style={{width:"fit-content",cursor:"pointer"}} onClick={create_ticket}>Create</Button>
}
                </Card>

            </div>

        </div>
        </>
    )
}
