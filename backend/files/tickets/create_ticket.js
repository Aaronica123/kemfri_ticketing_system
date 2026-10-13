import { client } from "../supabase.js";
import amqp from "amqplib"
import { classifyTicket } from "./ai.js";
import { configDotenv } from "dotenv";
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
            console.log(error)
            rec.ack(data,true);
        }
        else if(status?.status==500)
        {
            rec.nack(data,false,false)
            
        }
    },{noAck:false})
}
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
    await Ticket_Message({ticket_id:ticket_id,description:description});
    return res.status(200).json({message:"Ticket created"})
}catch(error){
    console.log(error);
    return res.status(500).json({message:"Server error"})
}
}

