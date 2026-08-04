import { ICT } from "../../connection/pool.js";

export default async function UpdateTicket(req,res){
if(!req.session.user){
  return res.status(409).json({message:"User must be logged in"})  
}
else{
    const connect=await ICT.connect();
    try{
        if(req.session.user.group!='ICT'||!req.session.user.group||!req.session.user.user_id){
            return res.status(409).json({message:"User must be authenticated"})
        }
        const {ticket_id}=req.body;
        if(!ticket_id){
            return res.status(400).json({message:"Enter a ticket"})
        }
        await connect.query(`update kemfri_schema.tickets set pending=false,resolved=true
            where ticket_id like $1 and staff_id like $2`,[ticket_id,req.session.user.user_id])
            .then((data)=>{
                console.log(data);
                return res.status(200).json({message:"Ticket has been solved"})
            }).catch((error)=>{
                console.log(error);
                return res.status(500).json({message:"Failed to update ticket"})
            })

    }
    finally{
        connect.release();
    }
}
}
