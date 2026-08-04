import { Button, Card } from "@radix-ui/themes/dist/cjs/index.js";
import { Table } from "@radix-ui/themes/dist/cjs/index.js";
import { Head_Mess } from "../ui/text";
import con from "../axios/axios";
import { useEffect, useState } from "react";
export default function StaffDashboard(){
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
            alert("failed to fetch")
        }
    }
    useEffect(()=>{
        f();
    },[]);

    return(
        <>
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
                            <Table.Cell>Pending</Table.Cell>
                            <Table.Cell>Resolved</Table.Cell>
                            <Table.Cell>Actions</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body >
                        {data_.map((value)=>(
                           <Table.Row>
                            {value.map((data)=>(
                                <Table.Cell>{data}</Table.Cell>
                            ))}
                            <Table.Cell style={{width:"fit-content",height:"100%",display:"flex",padding:"5px"}}>
                            <Button>Resolve</Button>
                            </Table.Cell>
                           </Table.Row> 
                        ))}
                        
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
        </>
    )
}