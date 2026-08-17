import { conf } from "../connection/redis.js";

export default async function TicketsSetCache(req,data){
    try{

        const result=await conf.execute(async(config)=>{
        await config.set(`${req.session.user.user_id}:TotalTickets`,data);
        await config.expire(`${req.session.user.user_id}:TotalTickets`,60)
        console.log("cache for user "+req.session.user.user_id)
        return {status:200};
        })
        return result;
    }
    catch(error){
        return {status:500,error:error};
    }

}
export async function TicketsGetCache(req){
    try{
        
        var data_=null;
        const result=await conf.execute(async(config)=>{
        await config.get(`${req.session.user.user_id}:TotalTickets`).then((data)=>{
            data_=data
        });
        console.log("user cache fetched "+data_)
        if(data_==null){
            data_=0
            return {status:200,data_};
        }
        else {
            return {status:200,data_};
        }
        })
        return result;
    }
    catch(error){
        return {status:500,error:error}
    }

}

export async function PendingTicketsCacheGet(req){
    try{
        var data_=null
        const result=await conf.execute(async(config)=>{
        await config.get(`${req.session.user.user_id}:PendingTickets`).then((data)=>{
            if(data==null){
                data_=0
            }
            else{
            data_=data
            }
        })
        return {status:200,data_}
        })
        return result;
    }
    catch(error){
        return {status:500,error:error};
    }
}
export async function  PendingTicketsCacheSet(req,data) {
    try{
        const result=await conf.execute(async(config)=>{
        await config.set(`${req.session.user.user_id}:PendingTickets`,data);
        await config.expire(`${req.session.user.user_id}:PendingTickets`,60)
        return {status:200};
        })
        return result;
    }
    catch(error){
        return {status:500,error:error}
    }
    
}

export async function ResolvedTicketsCacheGet(req){
    try{
        
        
        var data_=null
        const result=await conf.execute(async(config)=>{
        console.log(req.session.user.user_id)
        await config.get(`${req.session.user.user_id}:ResolvedTickets`).then((data)=>{
            if(data==null){
                data_=0
            }else{
            data_=data
            }
        })
        return {status:200,data_}
        })
        return result;
    }
    catch(error){
        return {status:500,error:error};
    }
}
export async function  ResolvedTicketsCacheSet(req,data) {
    try{
        const result=await conf.execute(async(config)=>{
        await config.set(`${req.session.user.user_id}:ResolvedTickets`,data);
        await config.expire(`${req.session.user.user_id}:ResolvedTickets`,60);
        return {status:200};
        })
        return result;
    }
    catch(error){
        return {status:500,error:error}
    }
    
}