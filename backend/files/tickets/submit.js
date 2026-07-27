
import { conf } from "../connection/pool.js";
import {randomUUID} from "crypto"
export default async function SubmitTicket(req,res){
     const con=await conf.connect();
    try{
        const p=randomUUID().replace(/-/g,'').slice(0,6).toUpperCase();
        console.log(p);
        var m=null;
        const{category_id,priority_id,user_id,staff_id}=req.body;
        if(!category_id||!priority_id||!user_id||!staff_id){
            return res.status(409).json({message:"Enter all fields"});
        }
        await con.query('insert into kemfri_schema.tickets(ticket_id,category_id,priority_id,staff_id,user_id) values($1,$2,$3,$4,$5)',
            [p,category_id,priority_id,staff_id,user_id]).then(()=>{
                return res.status(200).json({message:"Ticket has been created"})
            }).catch((error)=>{
                console.log(error);
               
                return res.status(500).json({message:"Failed to create ticket"})
            })


        return m;

    }
   finally{
    con.release();
   }
}