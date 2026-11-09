import { client } from "../../supabase.js";
import Auth from "../../auth.js";
export default async function Assigned_ticket(req,res) {
    let data=await Auth(req);
    if(data.state){
    await client.schema("usecase_kemfri").from("tickets").select("*").eq("staff_id",data.data.user_metadata.staff_id).eq("ticket_state","assigned");
    }    
}
export async function Update_Ticket(req,res){
    const {state,ticket_id}=req.body
     const {data,error}=await client.schema("usecase_kemfri").from("tickets").update({"ticket_state":state,"resolved":new Date().toLocaleString()}).eq("staff_id",120191).eq("ticket_id",ticket_id).select
     ();
    console.log(data);
    if(data.length>0){
        await client.schema("usecase_kemfri").from("staff").update({"state":false}).eq("staff_id",120191).select();
;    }
    console.log(error);
    return res.status(200).json({message:"Done"})  
}