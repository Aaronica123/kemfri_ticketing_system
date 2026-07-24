export default function StatusSession(req,res){
    try{
        console.log(req.sessionID);
        console.log(req.session.user)
    }catch(error){
        console.log(error);
        return 500;
    }
}