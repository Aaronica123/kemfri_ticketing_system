
import { conf } from "../connection/pool.js";
import {randomUUID} from "crypto"
export default async function SubmitTicket(req,res){
     const con=await conf.connect();
    try{
        const p=randomUUID().replace(/-/g,'').slice(0,6).toUpperCase();
        console.log(p);
        var m=null;
        const{category_id,priority_id,user_id}=req.body;
        console.log(category_id)
        console.log(priority_id)
        console.log(user_id)
        if(!category_id||!priority_id||!user_id){
            console.log("all fields enter")
            return res.status(409).json({message:"Enter all fields"});
        }
        var staff_id=null
        await con.query(`select count(t.staff_id),t.staff_id as tickets_staff,r.staff_id as register_staff from kemfri_schema.register r
left join kemfri_schema.tickets t on r.staff_id=t.staff_id where r.category_id=($1)
group by(t.staff_id,r.staff_id) order by count(t.staff_id) asc;`,[category_id]).then((data)=>{
    staff_id=data.rows[0].register_staff;
    
}).catch((error)=>{
    console.log(error);
    staff_id=null;
})
if(staff_id){
        await con.query('insert into kemfri_schema.tickets(ticket_id,category_id,priority_id,staff_id,user_id) values($1,$2,$3,$4,$5)',
            [p,category_id,1,staff_id,100]).then(()=>{
                m=200;
                console.log("ticket created");
                return res.status(200).json({message:"Ticket has been created",ticket:p})
            }).catch((error)=>{
                console.log(error);
               
                return res.status(500).json({message:"Failed to create ticket"})
            })

        }
            else{
                return res.status(409).json({message:"Could not fetch approrpaite staff"})
            }    

    }
   finally{
    con.release();
   }
}