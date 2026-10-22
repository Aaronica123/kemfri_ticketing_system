import { AlertDialog, Button, DropdownMenu, Spinner, Table, TextField } from "@radix-ui/themes/dist/cjs/index.js";
import Main_Text, { Head_Text, Input_Field } from "../ui/text";
import { useState } from "react";
import con, { connect } from "../axios/axios";
import { useEffect } from "react";
import {AlertTriangle} from "lucide-react";
import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";
import { Badge } from "@radix-ui/themes/dist/cjs/index.js";
import { Search } from "lucide-react";
import { RefreshCcw } from "lucide-react";
import { ListX } from "lucide-react";
import { Head_Mess } from "../ui/text";
import { Heading } from "@radix-ui/themes/dist/cjs/index.js";
import { Text } from "@radix-ui/themes/dist/cjs/index.js";
import { useMediaQuery } from "react-responsive";
import { Check_auth } from "../auth/new_auth";
export default function MyTickets(){
    
    const [final,setfinal]=useState([]);
    const [index,setindex]=useState(1);
    const [total,settotal]=useState("");
    const[track,settrack]=useState(false);
    const [input,setinput]=useState({ticket_id:""})
    const [load,setload]=useState(false);
    const min=useMediaQuery({maxWidth:"768px"})
    const[type,settype]=useState(null);
    const{user}=Check_auth();
    const[myfetch,setfetch]=useState([])
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
    const fetch_tickets=async(type)=>{
        settrack(false)
        settype(type)
        const data=await connect.post('/api/fetch_ticket',{
            index:index,
            type:type,
            user_id:user.user_id,
            role:user.role
        })
        
        console.log(data.data.data)
        if(data.data?.data){
        const fetched=data.data.data.map((val)=>Object.values(val))
         setfetch(fetched)
         settrack(true)
         setload(false)
        }
        else{
            setfinal([]);
            settrack(true)
            setload(true)
        }
       
    }

    const fetch=async()=>{
        settrack(false);
        await con().get(`/get_tickets?ind=${index}`).then((data)=>{
            // alert('Data fetched');            
           const transformedData = data.data.data.map(item => Object.values(item));
           setfinal(transformedData);
          console.log(data.data.total)
          settotal(data.data.total)
          settrack(true);
          
          if(transformedData.length>0){
                setinput({ticket_id:""})
                setload(false)
            }
            else{
                setload(true);
            }
            
        }).catch((error)=>{
            console.log(error);
            settrack(true);
            setload(true)
            // alert('failed to fetch')
        })
    }
    const filter=async(e)=>{
        e.preventDefault();
        settrack(false);
        console.log(input.ticket_id)
        await con().get(`/filter_tickets?filter=${input.ticket_id}`).then((data)=>{
            console.log(data.data);
            const fetched=data.data?.data?.map((value)=>Object.values(value));
            setfinal(fetched);
            settrack(true);
            if(fetched.length>0){
                setinput({ticket_id:""})
                setload(false)
            }
            else{
                setload(true);
            }

            

        }).catch((error)=>{
            settrack(true);
            setload(true)
            console.log(error);
        })
    }
    useEffect(()=>{
        fetch(type);
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
                <Heading weight={"bold"} style={{fontSize:"20px",fontFamily:"sans-serif"}} color="black">My Tickets</Heading>
                <Text weight={"light"} style={{fontSize:"18px",fontFamily:"sans-serif",color:"#6B7280"}}>Track status</Text>
            </div>
            <div style={{display:"flex",flexDirection:"column",flexWrap:"nowrap",
                width:"100%",height:"fit-content",gap:"15px"
            }}>
                <div style={{display:"flex",width:min?"100%":"50%",flex:1,height:"fit-content",gap:"5px"}}>
                    {/* <TextField.Root></TextField.Root> */}

                    <TextField.Root
                    size={"3"}
                    style={{width:"100%",color:"black"}}
                    placeholder={"Search Tickets..."} name={"ticket_id"} value={input.ticket_id} onChange={change}>
                    </TextField.Root>
                    <Button variant="classic" highContrast color="blue" style={{cursor:"pointer"}} onClick={filter}><Search></Search></Button>
                </div>
                <div style={{display:"flex",flexDirection:"row",width:"100%",height:"fit-content",gap:"10px"}}>
                <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                    <Button type="button" size={"2"} variant="classic" highContrast style={{width:"100%"}} onClick={()=>{settype(null);fetch_tickets(null)}}>All</Button>
                </div>
                <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                     <Button type="button" size={"2"} variant="classic" highContrast onClick={()=>{settype("pending");fetch_tickets("pending")}}>Pending</Button>
                    
                </div>
                <div style={{display:"flex",width:"fit-content",height:"fit-content"}}>
                     <Button type="button" size={"2"} variant="classic" highContrast style={{width:"100%"}} onClick={()=>{settype("assigned");fetch_tickets("assigned")}}>Assigned</Button>
                </div>
                
                </div>
            </div>
            <div style={{display:"flex",width:"100%",height:"100%"}}>
                <Table.Root size={"3"} variant="surface">
                    <Table.Header >
                        
                        
                            {min?
                            <Table.Row>
                            <Table.Cell>
                                Ticket
                            </Table.Cell>
                            <Table.Cell>
                                Category
                            </Table.Cell>
                            <Table.Cell>
                                State
                            </Table.Cell>
                            </Table.Row>:
                            <Table.Row>
                            <Table.Cell>Ticket</Table.Cell>
                            <Table.Cell>Subject</Table.Cell>
                            <Table.Cell>Description</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell>Team</Table.Cell>
                            <Table.Cell>Created</Table.Cell>
                            
                            </Table.Row>
                            }
                        
                    </Table.Header>
                    {!track?
                    <div style={{display:"flex",position:"fixed",justifyContent:"center",padding:"10px",width:"100%"}}>
                    <Spinner size={"3"}></Spinner>
                    </div>:
                    load?
                    <div style={{position:'fixed',width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",padding:"5px",gap:"10px"}}>
                        <ListX size={"50"} color="red"></ListX>
                        <Head_Mess>No Tickets Found</Head_Mess>
                    </div>:
                    <Table.Body>
                        {min?myfetch.map((item,index)=>(
                            <AlertDialog.Root>
                            <AlertDialog.Trigger>
                            
                            <Table.Row key={index} style={{cursor:"pointer"}} className="row">
                            {item.map((value,ind)=>(
                                ind==0||ind==1||ind==3?
                                <Table.Cell key={ind}>
                                    {ind==3?<Badge color={value=="assigned"?"yellow":value=="pending"?"red":"green"}>{value}</Badge>:value}
                                </Table.Cell>
                                :""
                            ))}
                             </Table.Row>
                             </AlertDialog.Trigger>
                             <AlertDialog.Content style={{justifyContent:"center", display:"flex",width:"fit-content",flexDirection:"column",gap:"15px"}}>
                                <AlertDialog.Description style={{cursor:"default",justifyContent:"center",display:'flex',flexDirection:"row",gap:"30px",padding:"5px",width:"fit-content"}}>
                                    
                                    <div style={{display:"flex",flexDirection:"column",gap:"10px",width:"100%"}}>
                                        {item.map((value,ind)=>(
                                ind==0?<div style={{flexDirection:"row",width:"100%",display:"flex",}}>
                                    <Head_Text>Ticket</Head_Text>
                                    <Main_Text key={ind}>
                                    {value}
                                </Main_Text>
                                </div>:ind==1?
                                <div style={{flexDirection:"row",display:"flex",}}>
                                    <Head_Text>Category</Head_Text>
                                    <Main_Text key={ind}>
                                    {value}
                                </Main_Text>
                                </div>
                                :ind==2?
                                 <div style={{flexDirection:"row",display:"flex",}}>
                                    <Head_Text>Description</Head_Text>
                                    <Main_Text key={ind}>
                                    {value}
                                </Main_Text>
                                </div>
                                :ind==3?
                                <div style={{flexDirection:"row",display:"flex",}}>
                                    <Head_Text>Status</Head_Text>
                                    <div style={{width:"100%"}}>
                                    <Badge size={"3"} color={value=="assigned"?"yellow":value=="pending"?"red":"green"} style={{width:"fit-content"}}>{value}</Badge>
                                    </div>
                                </div>
                                :ind==4?
                                <div style={{flexDirection:"row",display:"flex",}}>
                                    <Head_Text>Team</Head_Text>
                                    <Main_Text key={ind}>
                                    {value}
                                </Main_Text>
                                </div>
                                :    
                                 <div style={{flexDirection:"row",display:"flex",}}>
                                    <Head_Text>Date</Head_Text>
                                    <Main_Text key={ind}>
                                    {value}
                                </Main_Text>
                                </div>                        
                                
                            ))}
                                    </div>
                                </AlertDialog.Description>
                                <AlertDialog.Cancel style={{display:"flex",width:"fit-content",cursor:"pointer"}}>
                                    <Button>Go Back</Button>
                                </AlertDialog.Cancel>
                             </AlertDialog.Content>
                             </AlertDialog.Root>
                        ))
                        :
                        myfetch.map((item,index)=>(
                            <AlertDialog.Root>
                            <AlertDialog.Trigger>
                            
                            <Table.Row key={index} style={{cursor:"pointer"}} className="row">
                            {item.map((value,ind)=>(
                                
                                <Table.Cell key={ind}>
                                    {ind==3?<Badge color={value=="assigned"?"yellow":value=="pending"?"red":"green"}>{value}</Badge>:value}
                                </Table.Cell>
                                
                            ))}
                             </Table.Row>
                             </AlertDialog.Trigger>
                             <AlertDialog.Content style={{justifyContent:"center", display:"flex",width:"fit-content",flexDirection:"column",gap:"15px"}}>
                               <AlertDialog.Description style={{cursor:"default",justifyContent:"center",display:'flex',flexDirection:"row",gap:"30px",padding:"5px",width:"fit-content"}}>
                                    
                                    <div style={{display:"flex",flexDirection:"column",gap:"10px",width:"100%"}}>
                                        {item.map((value,ind)=>(
                                ind==0?<div style={{flexDirection:"row",width:"100%",display:"flex",}}>
                                    <Head_Text>Ticket</Head_Text>
                                    <Main_Text key={ind}>
                                    {value}
                                </Main_Text>
                                </div>:ind==1?
                                <div style={{flexDirection:"row",display:"flex",}}>
                                    <Head_Text>Category</Head_Text>
                                    <Main_Text key={ind}>
                                    {value}
                                </Main_Text>
                                </div>
                                :ind==2?
                                 <div style={{flexDirection:"row",display:"flex",}}>
                                    <Head_Text>Description</Head_Text>
                                    <Main_Text key={ind}>
                                    {value}
                                </Main_Text>
                                </div>
                                :ind==3?
                                <div style={{flexDirection:"row",display:"flex",}}>
                                    <Head_Text>Status</Head_Text>
                                    <div style={{width:"100%"}}>
                                    <Badge size={"3"} color={value=="assigned"?"yellow":value=="pending"?"red":"green"} style={{width:"fit-content"}}>{value}</Badge>
                                    </div>
                                </div>
                                :ind==4?
                                <div style={{flexDirection:"row",display:"flex",}}>
                                    <Head_Text>Team</Head_Text>
                                    <Main_Text key={ind}>
                                    {value}
                                </Main_Text>
                                </div>
                                :    
                                 <div style={{flexDirection:"row",display:"flex",}}>
                                    <Head_Text>Date</Head_Text>
                                    <Main_Text key={ind}>
                                    {value}
                                </Main_Text>
                                </div>                        
                                
                            ))}
                                    </div>
                                </AlertDialog.Description>
                                <AlertDialog.Cancel style={{display:"flex",width:"fit-content",cursor:"pointer"}}>
                                    <Button>Go Back</Button>
                                </AlertDialog.Cancel>
                             </AlertDialog.Content>
                             </AlertDialog.Root>
                        ))
                        }
                       
                       
                    </Table.Body>
}
{myfetch.length>0?
                    <div style={{position:"absolute",bottom:"1px",left:"5px",display:"flex",flexDirection:"row",width:"100%",height:"fit-content",padding:"5px"}}>
                         
                        <div style={{width:"fit-content",justifyContent:"center",alignItems:'center'}}>
                        <Badge size={"3"} color={"teal"} style={{height:"100%"}}>{index}</Badge>
                        </div>
                        <div style={{display:"flex",width:"100%",justifyContent:"right",gap:"10px",marginBottom:"3px",marginRight:"2px"}}>
                        <Button color={"bronze"} variant="outline" onClick={back}style={{cursor:"pointer"}}>Back</Button>
                        <Button color={"teal"} onClick={next} style={{cursor:"pointer"}}>Next</Button>
                        {track?
                         <Button style={{cursor:"pointer",display:"flex", gap:"5px"}} onClick={fetch}><RefreshCcw></RefreshCcw>
                        Refresh</Button>
                        :""
                        }
                        </div>
                        

                    
                       </div>
                       :
                       <div style={{position:"fixed",bottom:"1px",left:"5px",display:"flex",flexDirection:"row",height:"fit-content",gap:"5px",padding:"5px"}}>
                        <Badge size={"3"} color={"teal"}>{index}</Badge>
                       </div>
                       }
                </Table.Root>
            </div>
        </div>
        </>
    )
}