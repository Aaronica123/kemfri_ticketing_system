import { conf } from "../connection/redis.js";

export default async function Getcache(req,res){
    try{
        await conf.connect();
        const sessionID=req.sessionID;
        console.log(sessionID);
        var track=null;
        await conf.json.get(`user:${sessionID}`).then((data)=>{
            if(data==null){
                track=null
            }
            else{
                track=data;
                console.log(data.data);
            }
        })
        await conf.close();
        if(track){
            const d={
                status:200,
                data:track
            }
            return d;
        }
        else{
            return {"status":400,data:track};
        }
        
    }
    catch(error){
        console.log(error);
await conf.close();

        return 500;
    }
}
