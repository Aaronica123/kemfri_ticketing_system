import StatusSession from "../sessions/status.js";

export default async function CheckStatusLogin(req,res){
    try{
        await StatusSession(req,res).then((data)=>{
            console.log("response is "+data)
            if(data==200){
                console.log(req.session.user);
                return res.status(200).json({message:"Authenticated",user:req.session.user})
            }
            else{
                return res.status(409).json({message:"Failed to authenticate"})
            }
        }).catch((error)=>{
            return res.status(500).json({message:"Server failed"})
        });
    }catch(error){
        console.log(error);
    }
}