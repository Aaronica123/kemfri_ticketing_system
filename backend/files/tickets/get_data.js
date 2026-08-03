import { USERS } from "../connection/pool.js";
import StatusSession from "../sessions/status.js";
export default async function FetchCategory(req,res){
    const connect=await USERS.connect();
    try{
        var m=null
        await connect.query("select*from kemfri_schema.category;").then((data)=>{
            console.log(data.rows);
            m=200;
            return res.status(202).json({message:"Data fetched",data:data.rows})
        }).catch((error)=>{
            console.log(error);
            m=500
            return res.status(500).json({message:"Error occured"})
        })

    }finally{
        connect.release();
    }
}
export async function FetchPriority(req,res) {
    const connect=await USERS.connect();
    try{
      
        await connect.query("select*from kemfri_schema.priority").then((data)=>{
            console.log(data.rows);
           
            return res.status(200).json({message:"Priorities fetched",data:data.rows})
        }).catch((error)=>{console.log(error); 
          
             return res.status(500).json({message:"Failed to fetch priorities"});});
    
    }
    finally{
        connect.release();
    }
    
}
export async function TotalTickets(req,res){
    const connect=await USERS.connect();
    try{
        var m=null;
        const{user_id}=req.session.user;
        console.log(user_id)
        if(!user_id){
            return res.status(500).json({message:"Ticket cound found",count:0})
        }
        
        await connect.query(`select*from kemfri_schema.tickets where user_id=$1`,[user_id]).then((data)=>{
            console.log(data.rowCount);
            return res.status(200).json({message:"Ticket cound found",count:data.rowCount})
        }).catch((error)=>{
            console.log(error);
            return res.status(500).json({message:"Server error"})
        })
        return m;
    }
    finally{
        connect.release();
    }
}

export async function PendingTickets(req,res){
    const connect=await USERS.connect();
    try{
        var m=null;
        const{user_id}=req.session.user;
        if(!user_id){
            return res.status(500).json({message:"Ticket cound found",count:0})
        }
        await connect.query(`select*from kemfri_schema.tickets where user_id=$1 and pending=true`,[user_id]).then((data)=>{
            console.log(data.rowCount);
           return res.status(200).json({message:"fetched pending tickets",count:data.rowCount})
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:"Could not fetch pending tickets"})
        })
       
    }
    finally{
        connect.release();
    }
}

export async function ResolvedTickets(req,res){
    const connect=await USERS.connect();
    try{
        const{user_id}=req.session.user;
        if(!user_id){
            return res.status(500).json({message:"Ticket cound found",count:0})
        }
        await connect.query(`select*from kemfri_schema.tickets where user_id=$1 and resolved=true`,[user_id]).then((data)=>{
            console.log(data.rowCount);
           return res.status(200).json({message:"fetched resolved tickets",count:data.rowCount})
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:"Could not fetch pending tickets"})
        })
       
    }
    finally{
        connect.release();
    }
}