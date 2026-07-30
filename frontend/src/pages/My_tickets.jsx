import { Button, DropdownMenu, Table } from "@radix-ui/themes/dist/cjs/index.js";
import Main_Text, { Head_Text, Input_Field } from "../ui/text";
import { useState } from "react";
import con from "../axios/axios";
import { useEffect } from "react";
export default function MyTickets(){
    
    const [final,setfinal]=useState([]);
    const [index,setindex]=useState(1);
    const [total,settotal]=useState("");
    
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
        
            
        }).catch((error)=>{
            console.log(error);
            alert('failed to fetch')
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
            <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",
                width:"100%",height:"fit-content",gap:"15px"
            }}>
                <div style={{display:"flex",width:"100%",flex:1,height:"fit-content"}}>
                    <Input_Field placeholder={"Search Tickets..."}></Input_Field>
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
                    <Table.Body >
                        
                        {final.map((item,index)=>(
                            <Table.Row key={index}  >
                            {item.map((value,ind)=>(
                                <Table.Cell key={ind}>{ind==4||ind==5?value==true?"TRUE":"FALSE":value}</Table.Cell>
                            ))}
                             </Table.Row>
                        ))}
                       
                       
                    </Table.Body>
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