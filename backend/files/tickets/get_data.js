import { USERS } from "../connection/pool.js";
import StatusSession from "../sessions/status.js";
import PriorityGetCache from "../cache/store_lists.js";
import { PrioritySetCache } from "../cache/store_lists.js";
import { CategoryGetCache } from "../cache/store_lists.js";
import { CategroySetCache } from "../cache/store_lists.js";
import TicketsSetCache, { TicketsGetCache } from "../cache/tickets_cache.js";
import { PendingTicketsCacheGet,PendingTicketsCacheSet } from "../cache/tickets_cache.js";
import { ResolvedTicketsCacheGet,ResolvedTicketsCacheSet } from "../cache/tickets_cache.js";

import { connfig } from "../app.js";
export default async function FetchCategory(req,res){
    const response=await CategoryGetCache();
    if(response.status==200){
        
        return res.status(200).json({message:"Category fetched",data:response.data})
    } 
    else{
    const conn=await connfig.connect();
    try{
        var m=null
//        await conn.connect();
        // const conn=await connfig.connect();
        await conn.query("select*from kemfri_schema.category;").then((data)=>{
            console.log(data.rows);
            m=data.rows;
            // return res.status(202).json({message:"Data fetched",data:data.rows})
        }).catch((error)=>{
            console.log(error);
            m=null
            // return res.status(500).json({message:"Error occured"})
        })
        if(m){
            const response=await CategroySetCache(m);
            if(response.status==200){
                return res.status(200).json({message:"Category fetched",data:m})
            }
            else{
                return res.status(response.status).json({error:response.error});
            }
        }
        else{
            return res.status(500).json({message:"Error occured"})
        }

    }finally{
        conn.release()
    }
}
}
export async function FetchPriority(req,res) {
    const response=await PriorityGetCache();
    console.log(response.data);
   
    if(response.status==200){
        console.log(response.data);
        return res.status(200).json({message:"Priroity fetched",data:response.data})
    }
    else{
  //  await conn.connect();
  const conn=await connfig.connect();
    try{
      var hold=null;
       
        await conn.query("select*from kemfri_schema.priority").then((data)=>{
            console.log(data.rows);
           hold=data.rows;
            // return res.status(200).json({message:"Priorities fetched",data:data.rows})
        }).catch((error)=>{console.log(error); 
          console.log(error);
             
        });
        if(hold){
            const response=await PrioritySetCache(hold);
            if(response.status==200){
                console.log("cache created");
                return res.status(200).json({message:"Priority Fetched",data:hold})
            }
            else{
                return res.status(response.status).json({message:"Error occured",error:response.error})
            }
        }
        else{
            return res.status(500).json({message:"Failed to fetch priorities"});
        }
    }
    
    finally{
         conn.release();
    }
}
    
}
export async function TotalTickets(req,res){
    const result=await TicketsGetCache(req);
    if(result.status==500){
        return res.status(500).json({message:"Cache has failed"})
    }
    else{
    
    if(result.data_>=1){
        const count=Number(result.data_)
        return res.status(200).json({message:"Cache found",count})
    }
    else{
        const conn=await connfig.connect();
    try{
        var m=null;
        const{user_id}=req.session.user;
        console.log(user_id)
        if(!user_id){
            return res.status(500).json({message:"Ticket cound found",count:0})
        }
        var data_=null
        // const conn=await connfig.connect();
        await conn.query(`select*from kemfri_schema.tickets where user_id=$1`,[user_id]).then((data)=>{
            console.log(data.rowCount);
            data_=data.rowCount;
            
        }).catch((error)=>{
            console.log(error);
            data_=null
            
        })
        console.log("data is "+ data_)
        if(!data_){
            return res.status(500).json({message:"Server error"})
        }
        else{
        await TicketsSetCache(req,data_);
        return res.status(200).json({message:"Ticket count found",count:data_})
        }
        // await TicketsGetCache(req);
        return m;
    }
    finally{
        conn.release();
    }
}
}
}

export async function PendingTickets(req,res){
   // const connect=await USERS.connect();
   const result=await PendingTicketsCacheGet(req);
   if(result.status==500){
    return res.status(500).json({message:"Failed to fetch from cache"})
   }
   else{
    if(result.data_>=1){
        const count=Number(result.data_);
        return res.status(200).json({message:"Fetched from cache",count})
    }
    else{
        const conn=await connfig.connect();
    try{
        
        var m=null;
        const{user_id}=req.session.user;
        if(!user_id){
            return res.status(500).json({message:"Ticket cound found",count:0})
        }
        var data_=null
        await conn.query(`select*from kemfri_schema.tickets where user_id=$1 and pending=true`,[user_id]).then((data)=>{
            console.log(data.rowCount);
            data_=data.rowCount
          
        }).catch((error)=>{
            console.log(error)
            
        })
        if(data_>=0){
            const result=await PendingTicketsCacheSet(req,data_);
            if(result.status==200){
                
                 return res.status(200).json({message:"fetched pending tickets",count:data_})
            }
            else{
                return res.status(result.status).json({message:"Error occured",error:result.error})
            }
        }else{
            return res.status(500).json({message:"Could not fetch pending tickets"})
        }  
    }
    finally{
       conn.release();
    }
}
}
   }

export async function ResolvedTickets(req,res){
    const result=await ResolvedTicketsCacheGet(req);
    if(result.status==500){
        console.log(result.error)
        return res.status(500).json({message:"Failed to ftech from cache"})
    }
    else{
        if(result.data_>=1){
            const count=Number(result.data_)
            return res.status(200).json({message:"Fetched from cache",count})
        }
        else{
            const conn=await connfig.connect();
         try{
        const{user_id}=req.session.user;
        if(!user_id){
            console.log("user id not found")
            return res.status(500).json({message:"Ticket could not be found",count:0})
        }
        else{
            var data_=null
        await conn.query(`select*from kemfri_schema.tickets where user_id=$1 and resolved=true`,[user_id]).then((data)=>{
            console.log(data.rowCount);
            data_=data.rowCount
           
        }).catch((error)=>{
            console.log(error)
            
        })
        if(data_>=0){
            const result=await ResolvedTicketsCacheSet(req,data_);
            if(result.status==200){
                return res.status(200).json({message:"fetched resolved tickets",count:data_})
            }
            else{
                console.log(result.error);
                return res.status(result.status).json({message:"Failed to cache"})
            }
        }
        else{
            return res.status(500).json({message:"Could not fetch pending tickets"})
        }
        
    }
       
    }
    finally{
     conn.release();
    }
}
 }
    }
