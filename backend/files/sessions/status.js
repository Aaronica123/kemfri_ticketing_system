export default function StatusSession(req,res){
    try{
        console.log(req.sessionID);
        console.log(req.session.user);
        if(req.session.user){
            return res.status(200).json({message:"logged in", user: req.session.user});
        }
        else{
            return res.status(401).json({message:"no active session"});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"server error"});
    }
}