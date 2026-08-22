import amqp from "amqplib";

export default async function Rabbit(data){
const{user_id,name,tag}=data;
 const conn=await amqp.connect('amqp://switchback.proxy.rlwy.net:24754');
 const chan=await conn.createChannel()
 const bind_key='users'
 const exchange="kemfri"
 await chan.assertExchange(exchange,'direct');
 const ticket_create_bind='ticket_created'
 await chan.assertQueue(ticket_create_bind,{durable:true,autoDelete:false})

 await chan.bindQueue(ticket_create_bind,exchange,bind_key);
var rand=Math.floor(Math.random()*1000)
const body={
    user_id:user_id,
    notify_id:rand,
    name:name,
    issue:tag,
    status:false
}

 const bf=Buffer.from(JSON.stringify(body));

 const pb=chan.publish(exchange,bind_key,bf);
//  const y=chan.sendToQueue(test,bf,{persistent:true});
if(pb){
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