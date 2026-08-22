//use tab roots and tabs tabs on radix to create notifications
import { AlertDialog, Button, Table, Tabs } from "@radix-ui/themes/dist/cjs/index.js";
import Main_Text, { Head_Mess } from "../ui/text";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { CheckCircle } from "lucide-react";
// import user from "../auth/hold.js";
// import UserManager from "../auth/hold";
import { CheckContxt } from "../auth/auth_context";
import { Spinner } from "@radix-ui/themes/dist/cjs/index.js";

export default function Notify(){
    const [arr,setarr]=useState([]);
    const [tr,settr]=useState([]);
    const [general,setgeneral]=useState([]);
    const[load,setload]=useState(false);
    const{user_id}=CheckContxt();
    console.log(user_id);
    const usr=user_id;
    const Connection=()=>{

        console.log("get connection")
        const pth = new WebSocket("wss://notify-production-a4da.up.railway.app/get_false");
       
        pth.onopen=()=>{
            if(pth.readyState){
                pth.send(JSON.stringify({user_id:usr}));
                
            }
        }
        pth.onmessage=(data)=>{
           // console.log(data.data);
           console.log(data)
            const final=JSON.parse(data.data).data.map((value)=>Object.values(value));
            setarr(final);
            
            pth.onclose=()=>{
                console.log("Is closed")
            }
        }

    }
    const update=(value)=>{
        const path=new WebSocket('wss://notify-production-a4da.up.railway.app/update_state')
        const notify_id=value
        console.log(arr)
        console.log("path is "+notify_id)
         path.onopen=()=>{
            console.log("Connected");
            if(path.readyState){
                
                path.send(JSON.stringify({user_id:usr,notify_id:notify_id}))
                setload(true);
            }
        }
        path.onmessage=(data)=>{
            setload(false);
            console.log(data.data);

        }
        

    }
    const Read=()=>{
       console.log("Read connection")
            const path=new WebSocket('wss://notify-production-a4da.up.railway.app/get_true');
        
        
        path.onopen=()=>{
            if(path.readyState){
                path.send(JSON.stringify({user_id:usr}))
            }
        }
        path.onmessage=(data)=>{
            // console.log(JSON.parse(data.data).length);
            // console.log(JSON.parse(data.data).data);
            const final=JSON.parse(data.data).data.map((value)=>Object.values(value))
            settr(final);
            console.log(tr);
        
    }
    }
    const General=()=>{
        const path=new WebSocket('wss://notify-production-a4da.up.railway.app/get_notify');
        path.onopen=()=>{
            console.log("Open");
            if(path.readyState){
                path.send(JSON.stringify({user_id:usr}))
            }
        }
        path.onmessage=(data)=>{
            const da=JSON.parse(data.data).data.map((value)=>Object.values(value));
            console.log(da);
            setgeneral(da);
        }
    }
    useEffect(()=>{
        Connection();
        Read();
        
        
    },[])
    return(
        <>
        <div style={{width:"100%",height:"100%",flexDirection:"column"}}>
            <div style={{height:"fit-content",width:"100%",display:"flex"}}>
                <Head_Mess>View Notifications</Head_Mess>
            </div>
            {/* <div style={{width:"fit-content",height:"100%"}}> */}
                <Tabs.Root defaultValue="pending" style={{width:"fit-content",height:"100%",overflow:"hidden"}} >
                    <Tabs.List style={{height:"fit-content"}}>
                        <Tabs.Trigger value="pending" onClick={Connection}>Pending</Tabs.Trigger>
                        <Tabs.Trigger value="read" onClick={Read}>Read</Tabs.Trigger>
                        <Tabs.Trigger value="general" onClick={General}>General</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="pending" style={{display:"flex",height:"100%"}}>
                    <Table.Root size={"3"} variant="surface" style={{height:"100%"}} >
                        <Table.Header style={{height:"fit-content"}}>
                            <Table.Row>
                            <Table.Cell>ID</Table.Cell>
                            <Table.Cell>Issue</Table.Cell>
                            <Table.Cell>Name</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell>Date</Table.Cell>
                            <Table.Cell>Actions</Table.Cell>
                            </Table.Row>
                        </Table.Header>
                        {/* <Tabs.Content value="pending"> */}
                        <Table.Body style={{height:"100%"}}>
                            {arr.map((value,index)=>(
                                <Table.Row key={index} style={{width:"100%"}}>
                                    {value.map((data,index)=>(
                                        <Table.Cell key={index}>{index==3?data==true?<CheckCircle ></CheckCircle>:<XCircle color="red"></XCircle>:data}</Table.Cell>
                                    ))}
                                    
                                    <Table.Cell>
                                        
                                        <AlertDialog.Root>
                                        <AlertDialog.Trigger>
                                        <Button size={"1"} variant="classic" onClick={()=>update(value[0])}>Mark Done</Button>
                                        </AlertDialog.Trigger>
                                        <AlertDialog.Content>
                                        {load?
                                        <AlertDialog.Description style={{width:"100%",height:"100%",display:"flex",flexDirection:"column"}}>
                                            <Spinner size={"3"}></Spinner>
                                            <Main_Text>Updating notification status</Main_Text>
                                        </AlertDialog.Description>
                                        :

                                        <AlertDialog.Description style={{display:"Flex",flexDirection:"column",width:"100%",height:"100%"}}>
                                            <CheckCircle></CheckCircle>
                                            <Main_Text>Notification has been marked as done you can exit</Main_Text>
                                        </AlertDialog.Description>
}
                                        {load?"":
                                        <AlertDialog.Cancel>
                                                <Button>Back</Button>
                                        </AlertDialog.Cancel>
}
                                        </AlertDialog.Content>
                                        </AlertDialog.Root>
                                        
                                        </Table.Cell>
                                    
                                </Table.Row>
                                
                            ))}
                            
                        
                            </Table.Body> 
                            </Table.Root>
                            
                            </Tabs.Content>
                    <Tabs.Content value="read" style={{display:"flex",height:"100%"}}>
                    <Table.Root size={"3"} variant="surface" style={{height:"100%"}} >
                        <Table.Header style={{height:"fit-content"}}>
                            <Table.Row>
                            <Table.Cell>ID</Table.Cell>
                            <Table.Cell>Issue</Table.Cell>
                            <Table.Cell>Name</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell>Date</Table.Cell>
                            <Table.Cell>Actions</Table.Cell>
                            </Table.Row>
                        </Table.Header>
                        {/* <Tabs.Content value="pending"> */}
                        <Table.Body style={{height:"100%"}}>
                            {tr.map((value,index)=>(
                                <Table.Row key={index} style={{width:"100%"}}>
                                    {value.map((data,index)=>(
                                        <Table.Cell key={index}>{index==3?data==true?<CheckCircle color="green" ></CheckCircle>:<XCircle color="red"></XCircle>:data}</Table.Cell>
                                    ))}
                                    
                                    <Table.Cell>
                                        <Button disabled  size={"1"} variant="classic">Done</Button>
                                    </Table.Cell>
                                    
                                </Table.Row>
                                
                            ))}
                            
                        
                            </Table.Body> 
                            </Table.Root>
                            
                            </Tabs.Content>

                    <Tabs.Content value="general" style={{display:"flex",height:"100%"}}>
                    <Table.Root size={"3"} variant="surface" style={{height:"100%"}} >
                        <Table.Header style={{height:"fit-content"}}>
                            <Table.Row>
                            <Table.Cell>ID</Table.Cell>
                            <Table.Cell>Issue</Table.Cell>
                            <Table.Cell>Name</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell>Date</Table.Cell>
                            <Table.Cell>Actions</Table.Cell>
                            </Table.Row>
                        </Table.Header>
                        {/* <Tabs.Content value="pending"> */}
                        <Table.Body style={{height:"100%"}}>
                            {general.map((value,index)=>(
                                <Table.Row key={index} style={{width:"100%"}}>
                                    {value.map((data,index)=>(
                                        <Table.Cell key={index}>{index==3?data==true?<CheckCircle color="green" ></CheckCircle>:<XCircle color="red"></XCircle>:data}</Table.Cell>
                                    ))}
                                    {value[3]==true?
                                <Table.Cell>
                                        <Button disabled  size={"1"} variant="classic">Done</Button>
                                    </Table.Cell>:
                                 <Table.Cell>
                                        <Button size={"1"} variant="classic" onClick={()=>update(value[0])}>Mark Done</Button>
                                    </Table.Cell>       
                                }
                                    
                                </Table.Row>
                                
                            ))}
                            
                        
                            </Table.Body> 
                            </Table.Root>
                            
                            </Tabs.Content>                        
                </Tabs.Root>
                
            </div>
        {/* </div> */}
        </>
    )
}