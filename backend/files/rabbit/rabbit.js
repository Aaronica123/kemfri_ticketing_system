import amqp from "amqplib";

export default async function Rabbit(){
 const conn=await amqp.connect('amqp://switchback.proxy.rlwy.net:24754');
 const chan=await conn.createChannel()
 const test='test_queue'
 await chan.assertQueue(test,{durable:true,autoDelete:false})
const body={
    user_id:4561,
    notify_id:2109,
    name:"Ticket has been submitted",
    issue:"submit",
    status:false
}
 const bf=Buffer.from(JSON.stringify(body));
 const y=chan.sendToQueue(test,bf,{persistent:true});
if(y){
    console.log("Sent to rabbit")
}else{
    console.log("Not sent")
}
await chan.close();
await conn.close();
console.log("Rabbit closed")
}

export async function RabbitReceive(){
    const conn=await amqp.connect('amqp://switchback.proxy.rlwy.net:24754');
    const chan=await conn.createChannel();
    const test='test'
    await chan.assertQueue(test,{durable:true})
    const result=chan.consume(test,(output)=>{
        if(output){
            const out=output.content.toString();
            console.log(out);
            chan.ack(output);
        }
    },{noAck:false})
    if(result){
        console.log("Message received");
    }
    else{
        console.log("message not found");
    }
}