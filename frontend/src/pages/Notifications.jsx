//use tab roots and tabs tabs on radix to create notifications
import { Button, Table, Tabs } from "@radix-ui/themes/dist/cjs/index.js";
import { Head_Mess } from "../ui/text";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { CheckCircle } from "lucide-react";
export default function Notify(){
    const [arr,setarr]=useState([]);
    const [tr,settr]=useState([]);
    
    const Connection=()=>{
        console.log("get connection")
        const pth = new WebSocket("ws://localhost:3009/get_false");
        
        pth.onopen=()=>{
            if(pth.readyState){
                pth.send(JSON.stringify({user_id:4561}))
            }
        }
        pth.onmessage=(data)=>{
           // console.log(data.data);
            const final=JSON.parse(data.data).data.map((value)=>Object.values(value));
            setarr(final);
            pth.onclose=()=>{
                console.log("Is closed")
            }
        }

    }
    const Read=()=>{
       console.log("Read connection")
            const path=new WebSocket('ws://localhost:3009/get_true');
        
        
        path.onopen=()=>{
            if(path.readyState){
                path.send(JSON.stringify({user_id:4561}))
            }
        }
        path.onmessage=(data)=>{
            console.log(JSON.parse(data.data).length);
            console.log(JSON.parse(data.data).data);
            
        
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
                        <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
                        <Tabs.Trigger value="read" onClick={Read}>Read</Tabs.Trigger>
                        <Tabs.Trigger value="general">General</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="pending" style={{display:"flex",height:"100%"}}>
                    <Table.Root size={"3"} variant="surface" style={{height:"100%"}} >
                        <Table.Header style={{height:"fit-content"}}>
                            <Table.Row>
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
                                        <Table.Cell key={index}>{index==2?data==true?<CheckCircle ></CheckCircle>:<XCircle color="red"></XCircle>:data}</Table.Cell>
                                    ))}
                                    
                                    <Table.Cell>
                                        <Button size={"1"} variant="classic">Mark Done</Button>
                                    </Table.Cell>
                                    
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