import { conf } from "../connection/redis.js";

export default async function TicketsSetCache(req,data){
    try{
        await conf.connect();
        await conf.set(`${req.session.user.user_id}:TotalTickets`,data);
        await conf.expire(`${req.session.user.user_id}:TotalTickets`,60)
        console.log("cache for user "+req.session.user.user_id)
        return {status:200};
    }
    catch(error){
        return {status:500,error:error};
    }

}
export async function TicketsGetCache(req){
    try{
        await conf.connect();
        var data_=null;
        await conf.get(`${req.session.user.user_id}:TotalTickets`).then((data)=>{
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
    }
    catch(error){
        return {status:500,error:error}
    }

}

export async function PendingTicketsCacheGet(req){
    try{
        await conf.connect();
        var data_=null
        await conf.get(`${req.session.user.user_id}:PendingTickets`).then((data)=>{
            if(data==null){
                data_=0
            }
            else{
            data_=data
            }
        })
        return {status:200,data_}
    }
    catch(error){
        return {status:500,error:error};
    }
}
export async function  PendingTicketsCacheSet(req,data) {
    try{
        await conf.connect();
        await conf.set(`${req.session.user.user_id}:PendingTickets`,data);
        await conf.expire(`${req.session.user.user_id}:PendingTickets`,60)
        return {status:200};
    }
    catch(error){
        return {status:500,error:error}
    }
    
}

export async function ResolvedTicketsCacheGet(req){
    try{
        await conf.connect();
        var data_=null
        console.log(req.session.user.user_id)
        await conf.get(`${req.session.user.user_id}:ResolvedTickets`).then((data)=>{
            if(data==null){
                data_=0
            }else{
            data_=data
            }
        })
        return {status:200,data_}
    }
    catch(error){
        return {status:500,error:error};
    }
}
export async function  ResolvedTicketsCacheSet(req,data) {
    try{
        await conf.connect();
        await conf.set(`${req.session.user.user_id}:ResolvedTickets`,data);
        await conf.expire(`${req.session.user.user_id}:ResolvedTickets`,60);
        return {status:200};
    }
    catch(error){
        return {status:500,error:error}
    }
    
}