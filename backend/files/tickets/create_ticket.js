import { client } from "../supabase.js";
export default async function Create_Ticket(req,res){
try{
    const{ticket_id,ticket_type,description}=req?.body;
    if(!ticket_id||!ticket_type||!description){
        return res.status(409).json({message:"Check user input"});
    }
    const{data,error}=await client.schema("usecase_kemfri").from("tickets").insert({
        ticket_id:ticket_id,
        ticket_type:ticket_type,
        description:description,
        ticket_state:"pending",
        urgency:null,
        team:ticket_type,
        created:new Date().toLocaleString()
    })
    if(data){
        console.log(data)
    }
    if(error){
        console.log(error)
    }
    return res.status(200).json({message:"Ticket created"})
}catch(error){
    console.log(error);
    return res.status(500).json({message:"Server error"})
}
}