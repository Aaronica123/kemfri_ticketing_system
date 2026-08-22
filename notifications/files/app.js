import {WebSocketServer} from "ws";
import express from "express";
import consume from "./consumer.js";
import { staff_consume } from "./consumer.js";
import mongoose from "mongoose";
import {configDotenv} from "dotenv";
import CreateNotification from "./connect.js";
import { GetNotification } from "./connect.js";
import { UpdateNotification } from "./connect.js";
import { FilterNotificationFalse } from "./connect.js";
import { FilterNotificationTrue } from "./connect.js";
configDotenv();
const app =express();
const connect=new WebSocketServer({port:3009});
export const store =new Map()
connect.on('connection',(wsl,url)=>{
    console.log("connected to server")
    wsl.on('open',()=>{
        
        console.log("User has been connected");
    })
    // console.log(wsl.connectionInfo)
    var data_=null
    wsl.on('message',(data)=>{
        if(url.url==="/get_notify"){
            console.log(data.toString())
            console.log(JSON.parse(data).user_id)
            store.set(JSON.parse(data).user_id,wsl);
            const id=JSON.parse(data).user_id
            var output=null
            async function cn(){
                console.log("Connected to notify")
                await GetNotification(id).then((data)=>{
                    console.log(data.data);
                    wsl.send(JSON.stringify({length:data.length,data:data.data}))
                });
                // wsl.send()
            }
            cn();
            // wsl.terminate();
            
            // wsl.send(" data returned is "+ res)
        }
        if(url.url==="/get_true"){
            console.log(JSON.parse(data).user_id)
            var data_=null
            async function get(){
               await FilterNotificationTrue(JSON.parse(data).user_id).then((data)=>{data_=data});
               console.log("Notification True")
               wsl.send(JSON.stringify({length:data_.length,data:data_.data}))
            }
            get();
            // wsl.terminate();
            // return{length:data_.length,data:data_.data}
        }
        if(url.url==="/get_false"){
            console.log("Connected to false")
            console.log(JSON.parse(data).user_id)
            var data_=null
            async function get(){
               await FilterNotificationFalse(JSON.parse(data).user_id).then((data)=>{data_=data});
               wsl.send(JSON.stringify({length:data_.length,data:data_.data}))
            }
            get();
            // wsl.terminate();
            // return{length:data_.length,data:data_.data}
        }
        if(url.url==="/update_state"){
            const {user_id,notify_id}=JSON.parse(data)
            async function update(){
                await UpdateNotification(user_id,notify_id).then((data)=>{
                    wsl.send("status returned is "+data.status);
                })
            }
            update();
            
        }
    })

    wsl.on('close',()=>{
        // const conn=store.get(data_)
        // console.log();
        console.log("USer has been disconnected")
    })
    const conn=store.get(data_)
    // console.log(conn);
    // console.log(
    // connect.clients.has(1)
    // )
    

})
console.log(connect.clients);
connect.on('listening',()=>{
    console.log("connected to web socket server")
})
consume();
staff_consume();

async function startSession(){

    app.listen(3002,()=>{
    console.log("connected to app server");
    
})
//await CreateNotification({user_id:123,notify_id:100,name:"Ticket failure",issue:"submit",status:false})
// const f=await FilterNotificationFalse(4561)
// console.log(f);
// const t=await FilterNotificationTrue(4561)
// console.log(t)
}
// async()=>{await GetNotification(4561);}
startSession();


