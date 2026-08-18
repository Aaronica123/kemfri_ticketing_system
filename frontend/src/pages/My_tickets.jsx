import { AlertDialog, Button, DropdownMenu, Spinner, Table } from "@radix-ui/themes/dist/cjs/index.js";
import Main_Text, { Head_Text, Input_Field } from "../ui/text";
import { useState } from "react";
import con from "../axios/axios";
import { useEffect } from "react";
import {AlertTriangle} from "lucide-react";
import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";
import { Badge } from "@radix-ui/themes/dist/cjs/index.js";
import { Search } from "lucide-react";
export default function MyTickets(){
    
    const [final,setfinal]=useState([]);
    const [index,setindex]=useState(1);
    const [total,settotal]=useState("");
    const[track,settrack]=useState(false);
    const [input,setinput]=useState({ticket_id:""})
    

    const change=(e)=>{
        const {name,value}=e.target;
        setinput((data)=>({
            ...data,
            [name]:value
        }))
    }
    const next=async()=>{
        if(index<total){
            setindex(index+1)
        }
        // await fetch();
        // set_final_index(index);
    }
    const back=async()=>{
        if(index>1 &&index<=total){
            setindex(index-1)
        }
        // await fetch();
        // set_final_index(index);
    }
    const fetch=async()=>{
        await con().get(`/get_tickets?ind=${index}`).then((data)=>{
            // alert('Data fetched');            
           const transformedData = data.data.data.map(item => Object.values(item));
           setfinal(transformedData);
          console.log(data.data.total)
          settotal(data.data.total)
          settrack(true);
        
            
        }).catch((error)=>{
            console.log(error);
            settrack(true);
            // alert('failed to fetch')
        })
    }
    const filter=async(e)=>{
        e.preventDefault();
        settrack(false);
        console.log(input.ticket_id)
        await con().get(`/filter_tickets?filter=${input.ticket_id}`).then((data)=>{
            console.log(data.data);
            const fetched=data.data.data.map((value)=>Object.values(value));
            setfinal(fetched);
            settrack(true);
            if(fetched.length>0){
                setinput({ticket_id:""})
            }

            

        }).catch((error)=>{
            settrack(true);
            console.log(error);
        })
    }
    useEffect(()=>{
        fetch();
    },[index]);

    // const ft=()=>{
    //     console.log(Object.values(arr[0]));
    //     arr.forEach((item)=>{
    //         final.push(Object.values(item))
    //     })
    //     console.log(final)
    // }

    return (
        <>
        {/* <Button onClick={ft}>Click</Button> */}
        <div style={{width:"100%",height:"100%",display:"flex",
            flexDirection:"column",justifyContent:"left",gap:"10px",marginLeft:"25px"
        }}>
            {/* <div><Main_Text>{total}</Main_Text></div> */}
            <div style={{display:"flex",flexDirection:"column",gap:"2px",
                justifyContent:"left",width:"100%",height:"fit-content"
            }}>
                <Head_Text>My Tickets</Head_Text>
                <Main_Text>Track status</Main_Text>
            </div>
            <div style={{display:"flex",flexDirection:"column",flexWrap:"nowrap",
                width:"100%",height:"fit-content",gap:"15px"
            }}>
                <div style={{display:"flex",width:"50%",flex:1,height:"fit-content",gap:"5px"}}>
                    <Input_Field placeholder={"Search Tickets..."} name={"ticket_id"} value={input.ticket_id} change={change}>
                    </Input_Field>
                    <Button variant="classic" highContrast color="blue" style={{cursor:"pointer"}} onClick={filter}><Search></Search></Button>
                </div>
                <div style={{display:"flex",flexDirection:"row",width:"100%",height:"fit-content",gap:"10px"}}>
                <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                    <DropdownMenu.Root >
                    <DropdownMenu.Trigger>
                        <Button variant="soft" color="gray">All Categories</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <DropdownMenu.Item>Others</DropdownMenu.Item>
                    </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
                <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                    <DropdownMenu.Root >
                    <DropdownMenu.Trigger>
                        <Button variant="soft" color="gray">All Categories</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <DropdownMenu.Item>Others</DropdownMenu.Item>
                    </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
                <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                    <DropdownMenu.Root >
                    <DropdownMenu.Trigger>
                        <Button variant="soft" color="gray">All Categories</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                        <DropdownMenu.Item>Others</DropdownMenu.Item>
                    </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
                </div>
            </div>
            <div style={{display:"flex",width:"100%",height:"100%"}}>
                <Table.Root size={"3"} variant="surface">
                    <Table.Header >
                        <Table.Row>
                            <Table.Cell>Ticket</Table.Cell>
                            <Table.Cell>Subject</Table.Cell>
                            <Table.Cell>Category</Table.Cell>
                            <Table.Cell>Priority</Table.Cell>
                            <Table.Cell>Pending</Table.Cell>
                            <Table.Cell>Resolved</Table.Cell>
                            <Table.Cell>Date</Table.Cell>
                            <Table.Cell>Time</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    {!track?
                    <div style={{display:"flex",position:"fixed",justifyContent:"center",padding:"10px",width:"100%"}}>
                    <Spinner size={"3"}></Spinner>
                    </div>:
                    <Table.Body>
                        
                        {final.map((item,index)=>(
                            <AlertDialog.Root>
                            <AlertDialog.Trigger>
                            <Table.Row key={index} style={{cursor:"pointer"}} className="row">
                            {item.map((value,ind)=>(
                                <Table.Cell key={ind}>{ind==4?value==true?
                                <AlertTriangle size={"20"} color="red"></AlertTriangle>:<CheckCircle size={"20"} color="green"></CheckCircle>:
                                ind==5?value==true?
                                <CheckCircle size={"20"} color="green"></CheckCircle>:<XCircle size={"20"} color="red"></XCircle>:
                                ind==3?<Badge variant="soft" size="3"color={value=="High"?"red":value=="Medium"?"orange":"teal"}>{value}</Badge>:value}</Table.Cell>
                            ))}
                             </Table.Row>
                             </AlertDialog.Trigger>
                             <AlertDialog.Content style={{justifyContent:"center", display:"flex",width:"fit-content",flexDirection:"column",gap:"15px"}}>
                                <AlertDialog.Description style={{cursor:"default",justifyContent:"center",display:'flex',flexDirection:"row",gap:"30px",padding:"5px",width:"fit-content"}}>
                                    <div style={{display:"flex",flexDirection:"column",gap:"20px",width:"fit-content"}}>
                                    <Head_Text>Ticket</Head_Text>
                                    <Head_Text>Subject</Head_Text>
                                    <Head_Text>Category</Head_Text>
                                    <Head_Text>Priority</Head_Text>
                                    <Head_Text>Pending</Head_Text>
                                    <Head_Text>Resolved</Head_Text>
                                    <Head_Text>Date</Head_Text>
                                    <Head_Text>Time</Head_Text>
                                    </div>
                                    <div style={{display:"flex",flexDirection:"column",gap:"20px",width:"100%"}}>
                                        {item.map((value,ind)=>(
                                <Main_Text key={ind}>{ind==4?value==true?
                                <AlertTriangle size={"20"} color="red"></AlertTriangle>:<CheckCircle size={"20"} color="green"></CheckCircle>:
                                ind==5?value==true?
                                <CheckCircle size={"20"} color="green"></CheckCircle>:<XCircle size={"20"} color="red"></XCircle>:
                            ind==3?<Badge variant="soft" size="3"color={value=="High"?"red":value=="Medium"?"orange":"teal"}>{value}</Badge>:value}</Main_Text>
                            ))}
                                    </div>
                                </AlertDialog.Description>
                                <AlertDialog.Cancel style={{display:"flex",width:"fit-content",cursor:"pointer"}}>
                                    <Button>Go Back</Button>
                                </AlertDialog.Cancel>
                             </AlertDialog.Content>
                             </AlertDialog.Root>
                        ))}
                       
                       
                    </Table.Body>
}
                    <div style={{position:"fixed",bottom:"1px",left:"5px",display:"flex",flexDirection:"row",height:"fit-content",gap:"5px"}}>
                        <Main_Text color={"teal"}>Current page {index}</Main_Text>
                        <Button color={"teal"} onClick={back}style={{cursor:"pointer"}}>Back</Button>
                        <Button color={"teal"} onClick={next} style={{cursor:"pointer"}}>Next</Button>
                       </div>
                </Table.Root>
            </div>
        </div>
        </>
    )
}