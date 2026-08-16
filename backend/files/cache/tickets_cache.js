import { conf } from "../connection/redis.js";

export default async function TicketsSetCache(req,data){
    try{
        await conf.connect();
        await conf.set(req.session.user.user_id,data);
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
        await conf.get(req.session.user.user_id).then((data)=>{
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