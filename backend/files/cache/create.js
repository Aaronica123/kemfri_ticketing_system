import { conf } from "../connection/redis.js";
var c=null
export default async function Createcache(req,res){
    try{
        if(!c){
            c=await conf.connect().then(()=>{console.log("connected")});
        }
        const sessionID=req.sessionID;
        const data=req.session.user;
    
        // console.log(data)
        if(!sessionID||!data)
        {
            console.log("failed to cache missing details");
            return 500;
        }
        else{
        
            await conf.json.set(`user:${sessionID}`,"$",{data}).then(()=>{
                console.log("stored")
            });
            await conf.expire(`user:${sessionID}`,900000).then(()=>{
                console.log("expire set")
            });
            await conf.close();
            return 200;
        }
        
    }catch(error){
        console.log(error);
await conf.close();

        return error;
    }
}
