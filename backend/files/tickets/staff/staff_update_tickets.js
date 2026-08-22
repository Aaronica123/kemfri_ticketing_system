import { ICT } from "../../connection/pool.js";
import { connfig } from "../../app.js";
import { PendingTicketsCacheGet } from "../../cache/tickets_cache.js";
import { conf } from "../../connection/redis.js";
import Rabbit from "../../rabbit/rabbit.js";
export default async function UpdateTicket(req,res){
if(!req.session.user){
  return res.status(409).json({message:"User must be logged in"})  
}
else{
    // const conn=await ICT.conn();
    const conn=await connfig.connect();
    try{
        if(req.session.user.group!='ICT'||!req.session.user.group||!req.session.user.user_id){
            return res.status(409).json({message:"User must be authenticated"})
        }
        const {ticket_id}=req.body;
        if(!ticket_id){
            return res.status(400).json({message:"Enter a ticket"})
        }
        // await conn.connect();
        await conn.query(`update kemfri_schema.tickets set pending=false,resolved=true
            where ticket_id like $1 and staff_id like $2`,[ticket_id,req.session.user.user_id])
            .then((data)=>{
                // console.log(data);
                return res.status(200).json({message:"Ticket has been solved"})
            }).catch((error)=>{
                console.log(error);
                return res.status(500).json({message:"Failed to update ticket"})
            })
        var user_id=null;
        await conn.query('select user_id from kemfri_schema.tickets where ticket_id=$1',[ticket_id]).then((data)=>{
            user_id=data.rows[0].user_id
            console.log("user id is "+user_id)
        })
        var data_=null
        await conn.query(`select user_id from kemfri_schema.tickets where ticket_id=$1`,[ticket_id]).then((data)=>{
            data_=data.rows[0].user_id
            console.log(data.rows)
        });
        Rabbit({user_id:req.session.user.user_id,name:`Ticket ${ticket_id} has been solved`,tag:"solved"},{queue:"staff"});
        Rabbit({user_id:user_id,name:`Ticket ${ticket_id} has been updated`,tag:"solved"},{queue:"users"});
        console.log("fetched data is "+data_)    
        const result=await PendingTicketsCacheGet(req);
        if(result.status==200&&Number(result.data_)>=1){
            await conf.connect();
            await conf.incr(`${data_}:ResolvedTickets`);
            await conf.decr(`${data_}:PendingTickets`);
        }
        else{
            console.log("Cache not available")
        }

    }
    finally{
        conn.release();

    }
}
}
