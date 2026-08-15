import { conf } from "../connection/redis.js";

export default async function Createcache(req,res){
    try{
        
            await conf.connect();
        const sessionID=req.sessionID;
        const data=req.session.user;
    
        // console.log(data)
        if(!sessionID||!data)
        {
            console.log("failed to cache missing details");
            return {status:400};
        }
        else{
        
            await conf.json.set(`user:${sessionID}`,"$",{data}).then(()=>{
                console.log("stored")
            });
            await conf.expire(`user:${sessionID}`,900000).then(()=>{
                console.log("expire set")
            });
//            await conf.close();
            return {status:200}
        }
        
    }catch(error){
        console.log(error);
//await conf.close();
const message={status:500,error:error}
        return message;
    }
}
