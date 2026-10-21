import { client } from "../supabase.js";
import amqp from "amqplib"
import { classifyTicket } from "./ai.js";
import { configDotenv } from "dotenv";
import Auth from "../auth.js";
import { randomUUID } from "crypto";
configDotenv();
async function Ticket_Message(data){
    const connect=await amqp.connect(process.env.rabbitmq);
    const mes=await connect.createChannel();
    await mes.assertExchange("ai_message",'direct');
    await mes.assertQueue("ai_queue",{durable:true,autoDelete:false});
    await mes.bindQueue('ai_queue','ai_message','ai_describe');
    mes.publish('ai_message','ai_describe',Buffer.from(JSON.stringify(data)));
    await mes.close();
    await connect.close();
}

export async function Ticket_Recieve(){
    const mes=await amqp.connect(process.env.rabbitmq);
    const rec=await mes.createChannel();
    await rec.assertQueue('ai_queue',{durable:true})
    await rec.prefetch(1);
    await rec.consume('ai_queue',async(data)=>{
        const status=await classifyTicket(JSON.parse(data.content))
        console.log(status);
        if(status?.status==200){
            const{data:da,error}=await client.schema("usecase_kemfri").from("tickets").update({urgency:String(status?.data?.urgency).toLowerCase()}).eq('ticket_id',JSON.parse(data.content)?.ticket_id);
            console.log(da);
            console.log(error);
            const{data:new_data,error:new_error}=await client.schema("usecase_kemfri").from(`branch_${JSON.parse(data.content)?.branch}`).select("staff_id").eq('staff_category',JSON.parse(data.content)?.category).eq('state',false).limit(1);
            console.log(new_data[0]?.staff_id);
            if(new_data[0]?.staff_id){
                await client.schema("usecase_kemfri").from("tickets").update({staff_id:new_data[0]?.staff_id,ticket_state:"assigned"}).eq("ticket_id",JSON.parse(data.content)?.ticket_id);
                await client.schema("usecase_kemfri").from("staff").update({state:true}).eq("staff_id",new_data[0].staff_id);
            }else{
                console.log("All staff are occupied");
            }
            console.log(new_error);
            rec.ack(data,true);
        }
        else if(status?.status==500)
        {
            rec.nack(data,false,false)
            
        }
    },{noAck:false})
}
export default async function Create_Ticket(req,res){
if(await Auth(req)){
try{
    const{ticket_type,description,branch,user_id}=req?.body;
    if(!ticket_type||!description||!branch||!user_id){
        return res.status(409).json({message:"Check user input"});
    }
    const ticket_id=randomUUID().replace(/-/g,'').slice(0,6).toUpperCase();
    const{data,error}=await client.schema("usecase_kemfri").from("tickets").insert({
        ticket_id:ticket_id,
        ticket_type:ticket_type,
        description:description,
        ticket_state:"pending",
        urgency:null,
        team:ticket_type,
        user_id:user_id,
        branch:branch,
        created:new Date().toLocaleString()
    })
    if(data){
        console.log(data)
    }
    if(error){
        console.log(error)
    }
    if(req?.body?.test){
        console.log("test success")
        return res.status(200).json({message:"Ticket created"})
    }
    else{
    await Ticket_Message({ticket_id:ticket_id,description:description,branch:branch,category:ticket_type});
    return res.status(200).json({message:"Ticket created"})
    }
}catch(error){
    console.log(error);
    return res.status(500).json({message:"Server error"})
}}
else{
    return res.status(409).json({message:"Unauthenticated"})
}
}

