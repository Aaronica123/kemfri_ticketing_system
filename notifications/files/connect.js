import mg from "./build.js";
import mongoose from "mongoose";

export default async function CreateNotification(data) {
    try{
    await mongoose.connect(`${process.env.db_connect}`).then(()=>{console.log("connected to mongoose")})
    .catch((error)=>{console.log(error)})

        const{user_id,notify_id,name,issue,status}=data;
        await mg.create({
            user_id:user_id,
            notify_id:notify_id,
            name:name,
            issue:issue,
            status:status,
            date:new Date().toUTCString()
        }).then(()=>{
            console.log("Notification saved");
        })
    }   
    catch(error){
console.log(error);
    } 
}

export async function GetNotification(id){
    try{
        await mongoose.connect(`${process.env.db_connect}`).then(()=>{console.log("connected to mongoose")})
    .catch((error)=>{console.log(error)})
    var data_=null
        await mg.find({user_id:id},{_id:0,user_id:0,notify_id:0,__v:0}).then((data)=>{console.log(data); data_=data});
        const data=data_
        return {length:data_.length,data};
    }
    catch(error){
        console.log(error);
        return {error:error}
    }

}

export async function FilterNotificationTrue(id){
    try{
         await mongoose.connect(`${process.env.db_connect}`).then(()=>{console.log("connected to mongoose")})
    .catch((error)=>{console.log(error)})
        var data_=null
        await mg.find({user_id:id},{_id:0,user_id:0,notify_id:0,__v:0}).where({status:true}).then((data)=>{
            console.log(data);
            data_=data

        });
        const data=data_;
        console.log(data_)
        return {length:data_.length,data}
        
    }catch(error){

    }
}

export async function FilterNotificationFalse(id){
    try{
         await mongoose.connect(`${process.env.db_connect}`).then(()=>{console.log("connected to mongoose")})
    .catch((error)=>{console.log(error)})
        var data_=null
        await mg.find({user_id:id,status:false},{_id:0,user_id:0,notify_id:0,__v:0}).then((data)=>{
            console.log(data);
            data_=data
        });
        const data=data_
        return {length:data_.length,data}
        
    }catch(error){
        console.log(error)
        return{error:error}

    }
}
export async function UpdateNotification(id,notifyid){
    try{
        await mongoose.connect(`${process.env.db_connect}`).then(()=>{console.log("connected to mongoose")})
    .catch((error)=>{console.log(error)})
    await mg.findOneAndUpdate({user_id:id,notify_id:notifyid},{status:true,date: Date.now()}).then(()=>{console.log("updated")})
    }
    catch(error){
        console.log(error)
    }
}