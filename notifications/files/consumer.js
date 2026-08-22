import amqp from "amqplib";
import { store } from "./app.js";
import CreateNotification from "./connect.js";
const queues={
    users:"users",
    staff:"staff"
}
export default async function consume() {
    
   const connect=await amqp.connect('amqp://switchback.proxy.rlwy.net:24754');
   const channel=await connect.createChannel();
   const queue=queues.users;
   await channel.assertQueue(queue,{durable:true});
   await channel.prefetch(1);
   await channel.consume(queue,(message)=>{
    const data=JSON.parse(message.content);
    CreateNotification(data);
    console.log(data.user_id);
    const get=store.get(data.user_id);
    if(get){
        get.send('notification is pending')
    }
    channel.ack(message)
    
    console.log("Message")
   },{noAck:false})
    
}


export async function staff_consume() {
    
   const connect=await amqp.connect('amqp://switchback.proxy.rlwy.net:24754');
   const channel=await connect.createChannel();
   const queue=queues.staff;
   await channel.assertQueue(queue,{durable:true});
   await channel.prefetch(1);
   await channel.consume(queue,(message)=>{
    const data=JSON.parse(message.content);
    CreateNotification(data);
    console.log(data.user_id);
    const get=store.get(data.user_id);
    if(get){
        get.send('notification is pending')
    }
    channel.ack(message)
    
    console.log("Message")
   },{noAck:false})
    
}


