import { conf } from "../connection/redis.js";

export default async function Deletecache(req,res){
    try{
        var state=false;
        await conf.connect();
        await conf.json.del(`user:${req.sessionID}`).then((data)=>{
            if(data==1||data==0){
                state=true
            }
            
        })
        await conf.close();
        if(state){
            return state;
        }
        else{
            return state;
        }
    }
    catch(error){
        console.log(error);
        // return {status:500,message:"Server error"}
        return state;
    }
}