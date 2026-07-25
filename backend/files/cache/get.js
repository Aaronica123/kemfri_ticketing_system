import { conf } from "../connection/redis.js";

export default async function Getcache(req,res){
    try{
        const sessionID=req.sessionID;
        var track=null;
        await conf.json.get(`user:${sessionID}`).then((data)=>{
            if(data==null){
                track=null
            }
            else{
                track=data;
            }
        })
        return track;
    }
    catch(error){

    }
}