// import { conn } from "../connection/pool.js";
import { conn } from "../app.js";
// import { conn } from "../app.js";
import {randomUUID} from "crypto";
import { TicketsGetCache } from "../cache/tickets_cache.js";
import { conf } from "../connection/redis.js";
import { PendingTicketsCacheGet } from "../cache/tickets_cache.js";
import Rabbit from "../rabbit/rabbit.js";
export default async function SubmitTicket(req,res){
     
    try{
        const p=randomUUID().replace(/-/g,'').slice(0,6).toUpperCase();
        console.log(p);
        var m=null;
        const{category_id,priority_id,ticket_issue}=req.body;
        console.log(category_id)
        console.log(priority_id)
        
        if(!category_id||!priority_id||!ticket_issue||!req.session.user.user_id){
            console.log("all fields enter")
            return res.status(409).json({message:"Enter all fields"});
        }
        var staff_id=null
        await conn.connect();
        await conn.query(`select count(t.staff_id),t.staff_id as tickets_staff,r.staff_id as register_staff,c.category_name from kemfri_schema.register r
left join kemfri_schema.tickets t on r.staff_id=t.staff_id left join kemfri_schema.category c
on c.category_id=r.category_id
 where r.category_id=($1)
group by(t.staff_id,r.staff_id,c.category_name) order by count(t.staff_id) asc;`,[category_id]).then((data)=>{
    staff_id=data.rows[0].register_staff;
    
}).catch((error)=>{
    console.log(error);
    staff_id=null;
})
if(staff_id){
    const d=new Date().toISOString();
    console.log(d);
        await conn.query('insert into kemfri_schema.tickets(ticket_id,category_id,priority_id,staff_id,user_id,ticket_issue,date_entered) values($1,$2,$3,$4,$5,$6,$7)',
            [p,category_id,priority_id,staff_id,req.session.user.user_id,ticket_issue,d]).then(()=>{
                m=200;
                console.log("ticket created");
                return res.status(200).json({message:"Ticket has been created",ticket:p})
            }).catch((error)=>{
                console.log(error);
               
                return res.status(500).json({message:"Failed to create ticket"})
            })
        Rabbit({user_id:req.session.user.user_id,name:`Ticket has been submitted`,tag:"submit"})
        const result=await TicketsGetCache(req);
        const pend=await PendingTicketsCacheGet(req);
        if(result.status==200&&pend.status==200){
            await conf.connect();
            await conf.incr(`${req.session.user.user_id}:TotalTickets`);
            await conf.incr(`${req.session.user.user_id}:PendingTickets`);
        }
        else{
            console.log("No tickets in cache")
        }
}
            else{
                return res.status(409).json({message:"Could not fetch appropriate staff"})
            }    

    }
   finally{
    console.log("released")
   }
}