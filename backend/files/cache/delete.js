import { conf } from "../connection/redis.js";

export default async function Deletecache(req,res){
    try{
         var state=false;

        const result=await conf.execute(async(config)=>{
        await config.json.del(`user:${req.sessionID}`).then((data)=>{
            if(data==1||data==0){
                state=true
            }
            
        })
//        await conf.close();
        if(state){
            return state;
        }
        else{
            return state;
        }
        })
        return result;
    }
    
    catch(error){
        console.log(error);
//await conf.close();
        // return {status:500,message:"Server error"}
        return state;
    }
}
