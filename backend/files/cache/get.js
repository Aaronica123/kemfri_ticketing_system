import { conf } from "../connection/redis.js";

export default async function Getcache(req,res){
    try{
        await conf.connect();
        const sessionID=req.sessionID;
        console.log(sessionID);
        var track=null;
        const result=await conf.execute(async(config)=>{})
        await conf.json.get(`user:${sessionID}`).then((data)=>{
            if(data==null){
                track=null
            }
            else{
                track=data;
                console.log(track);
                if(data.data.email==req.session.user.email){
                    track=200
                }
                else{
                    track=409;
                }
            }
            console.log(1)
        }).catch((error)=>{
            console.log(error)
        })
//         await conf.close();
        if(track==200){
            return res.status(200).json({message:"Authenticated",user:req.session.user})
        }
        else if(track==409){
            // req.session.user=null;
            return res.status(409).json({message:"Unauthorized"});
        }
        else{
            
            // req.session.user=null;
            return res.status(404).json({message:"User not found"});
        }
        
    }
    catch(error){
        req.session.user=null;
        console.log("error" +error);
  //      await conf.close();

        return res.status(500).json({error:error});
    }
}
