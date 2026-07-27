import { Nav_button } from "../ui/buttons"
import { ArrowLeftIcon } from "lucide-react"
import Main_Text, { Head_Mess, Head_Text, Input_Field } from "../ui/text"
import { Button, Card, DropdownMenu, TextArea } from "@radix-ui/themes/dist/cjs/index.js"
import { useState } from "react";
import con from "../axios/axios";
import { useEffect } from "react";
export default function SubmitForm(){
    const [set,setf]=useState({data_m:"options"})
    const [cat,setcat]=useState({data_m:"options"})
    const [def,setdefault]=useState("Select Options")
    const [defcat,setdefcat]=useState("default");
    const [arr,setarr]=useState([]);
    const [priority_arr,set_priority_array]=useState([]);
    
    const change=(e)=>{
       
        setdefault(e)
        setf((data)=>({
            ...data,
            [set.data_m]:e
        }))
    }
    
    const change_cat=(e)=>{
       
        setdefcat(e)
        setcat((data)=>({
            ...data,
            [cat.data_m]:e
        }))
    }
    async function FetchPriority(){
        await con().get("/fetch_priority").then((data)=>{
            set_priority_array(data.data.data);
        })
    }
    async function Submit(e){
        e.preventDefault();
        await con().post('/submit',{category_id:1,priority_id:1,user_id:102,staff_id:121}).then(()=>{
            alert("data saved successfully");
            change_cat("Default Options")
            change("Default Priority")
        }).catch((error)=>{
            console.log(error);
            alert("An error occured");
        })
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
            gap:"5px",marginLeft:"55px"
        }}>
            <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"row",padding:"5px",gap:"15px"
            }}>
                <div style={{display:"flex",height:"100%",justifyContent:"center",alignItems:"center"}}>
                    <Nav_button><ArrowLeftIcon/></Nav_button>
                </div>
                <div style={{width:"100%",
                    flexDirection:"column",display:"flex",height:"fit-content"
                }}>
                    <Head_Text>Submit ICT Support Request</Head_Text>
                    <Main_Text>Describe Issue and Submit Ticket</Main_Text>

                </div>
            </div>
            <div style={{display:"flex",width:"100%",height:"100%",justifyContent:"left"}}>
                <Card style={{display:"flex",flexDirection:"column",
                    justifyContent:'left',width:"100%",height:"fit-content",padding:"20px",
                    gap:"10px"
                }}>
                    <Head_Mess>Issue Details</Head_Mess>
                    <div style={{display:"flex",
                        flexDirection:"column",gap:"10px",width:"100%",
                        height:"fit-content"
                    }}>
                        <Head_Text>Subject *</Head_Text>
                        <Input_Field placeholder={'Subject'}></Input_Field>  
                    </div>
                    <div style={{display:"flex",flexDirection:"row",
                        width:"fit-content",height:"fit-content",
                        flexWrap:"wrap",gap:"10px"
                    }}>
                        <div style={{width:"fit-content",justifyContent:"left",height:"fit-content",
                            flexDirection:"column",display:'flex' ,gap:"10px"
                        }}>
                            <Head_Text>Category *</Head_Text>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                <Button size={"3"} style={{cursor:"pointer"}} type="button" variant="soft" color="gray"><Main_Text>{defcat}</Main_Text></Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    {priority_arr.map((item)=>(
                                        <DropdownMenu.Item onClick={()=>change_cat(item.priority)} 
                                        key={item.id_}>
                                            {item.priority}
                                        </DropdownMenu.Item>
                                    ))}
                                    {/* <DropdownMenu.Item onClick={()=>change_cat("Network")}>Network</DropdownMenu.Item>
                                     <DropdownMenu.Item onClick={()=>change_cat("Software")}>Software</DropdownMenu.Item> */}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>
                        <div style={{width:"fit-content",justifyContent:"left",height:"fit-content",
                            flexDirection:"column",display:'flex',gap:"10px"
                        }}>
                            <Head_Text>Priority *</Head_Text>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                <Button size={"3"} type="button" style={{cursor:"pointer"}} variant="soft" color="gray"><Main_Text>{def}</Main_Text></Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    {arr.map((item)=>(
                                    <DropdownMenu.Item onClick={()=>change(item.category_name)} 
                                    key={item.category_id}>{item.category_name}</DropdownMenu.Item>

                                    ))}
                                    
                                    {/* <DropdownMenu.Item onClick={()=>change("low")} >Low</DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={()=>change("medium")} >Medium</DropdownMenu.Item> */}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>
                    </div>
                    <div style={{width:"100%",height:"fit-content",justifyContent:"left",flexDirection:"column",display:"flex"}}>
                        <Head_Text>Description *</Head_Text>
                       <TextArea ></TextArea>
                    </div>
                    <Button size={"3"} variant="classic" style={{width:"fit-content",cursor:"pointer"}} onClick={Submit}>Submit</Button>
                </Card>

            </div>

        </div>
        </>
    )
}