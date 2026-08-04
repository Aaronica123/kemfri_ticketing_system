import { AlertDialog, Badge, Button, Card, Text } from "@radix-ui/themes/dist/cjs/index.js";
import { Table } from "@radix-ui/themes/dist/cjs/index.js";
import Main_Text, { Head_Mess } from "../ui/text";
import con from "../axios/axios";
import { useEffect, useState } from "react";
import { CheckContxt } from "../auth/auth_context";
export default function StaffDashboard(){
    const{group,loading}=CheckContxt();
    const [data_,setdata]=useState([]);
    
    const f=async()=>{
        try{
            await con().get('/staff_tickets').then((data)=>{
                const da=data.data.data.map((values)=>Object.values(values));
                setdata(da);
                console.log(da);
                
                // alert("fetched")
            }).catch((error)=>{
                console.log(error);
            });
        }
        catch(error){
            console.log(error);
            // alert("failed to fetch")
        }
    }
    useEffect(()=>{
        f();
    },[]);
    if(loading){
        return (
            <div>Loading Please wait</div>
        )
    }
    else
    return(
        <>{
            group=='ICT'?
        <div style={{width:'100%',height:"100%",display:"flex",flexDirection:"column"}}>
            <div style={{width:"100%",display:"flex",height:"fit-content"}}><Head_Mess>
                Welcome Back {localStorage.getItem('firstname')}
                </Head_Mess>
            </div>
            <div style={{width:"100%",display:"flex"}}>
                <Table.Root size={"3"}>
                    <Table.Header >
                        <Table.Row>
                            <Table.Cell>Ticket ID</Table.Cell>
                            <Table.Cell>Ticket Issue</Table.Cell>
                            <Table.Cell>User ID</Table.Cell>
                            <Table.Cell>Category</Table.Cell>
                            <Table.Cell>Urgency</Table.Cell>
                            <Table.Cell>Actions</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body >
                        {data_.map((value,index)=>(
                           <Table.Row key={index}>
                            {value.map((data,index)=>(
                                <Table.Cell key={index}>{data}</Table.Cell>
                            ))}
                            <Table.Cell style={{width:"fit-content",height:"100%",display:"flex",padding:"5px"}}>
                            <AlertDialog.Root>
                                <AlertDialog.Trigger>
                                     <Button>Resolve</Button>
                                </AlertDialog.Trigger>
                                <AlertDialog.Content>
                                    {value.map((data,index)=>(
                                    <AlertDialog.Description style={{display:"flex",flexDirection:"row",width:"100%",padding:"10px"}}>
                                        {index==0?<Main_Text >TicketID</Main_Text>:
                                        index==1?<Main_Text>Ticketissue</Main_Text>:
                                        index==2?<Main_Text>User ID</Main_Text>:
                                        index==3?<Main_Text>Pending</Main_Text>:
                                        index==4?<Main_Text>Status</Main_Text>:''}
                                       
                                      
                                       {index==3?
                                       <div style={{width:"100%",display:"flex"}}>
                                       <Badge size="3"
                                       
                                       style={{width:"fit-content",display:'flex'}} variant="outline" color="blue">{data}</Badge>
                                       </div>:index==4?
                                        <div style={{width:"100%",display:"flex"}}>
                                       <Badge size="3"
                                       
                                       style={{width:"fit-content",display:'flex'}} variant="outline" color="teal">{data}</Badge>
                                       </div>
                                       :<Main_Text>{data}</Main_Text>}
                                       
                                       {/* <Badge variant="outline" color="blue">{data}</Badge> */}
                                    </AlertDialog.Description>
                                    ))}
                                    <AlertDialog.Description>
                                        
                                    </AlertDialog.Description>
                                    
                                    <AlertDialog.Cancel >
                                    <Button style={{width:"fit-content",display:'flex'}} size="3">Cancel</Button>
                                </AlertDialog.Cancel>
                               
                                </AlertDialog.Content>
                                
                            </AlertDialog.Root>
                            {/* <Button>Resolve</Button> */}
                            </Table.Cell>
                           </Table.Row> 
                        ))}
                        
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
        :<p>Denied access</p>
        }
        </>
    )
}