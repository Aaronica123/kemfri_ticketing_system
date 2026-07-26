import Getcache from "../cache/get.js";
export default async function StatusSession(req,res){
    try{
        
        await Getcache(req,res).then((data)=>{
            console.log(data);
            if(data.status==200){
                if(data.data.data.email==req.session.user.email){
                    return res.status(200).json({message:"session is valid and user"})
                }
                else{
                    return res.status(409).json({message:"cridentials dont match"})
                }
            }
            else{
                return res.status(409).json({message:"User doesnt have valid session"})
            }
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"server error"});
    }
}