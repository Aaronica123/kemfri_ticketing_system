import { ICT } from "../../connection/pool.js";

export default async function GetStaffTickets(req,res){
    if(!req.session.user||!req.session.user.group){
        
        return res.status(500).json({message:"Denied access"})
    }
    else{    
    const connect=await ICT.connect();
    try{
        var m=null
        const{user_id}=req.session.user;
        if(!user_id||req.session.user.group!='ICT'){
            return res.status(409).json({message:"invalid user"})
        }

        
        await connect.query(`select t.ticket_id,t.ticket_issue,t.user_id, c.category_name,p.priority from kemfri_schema.tickets t
            join kemfri_schema.category c on c.category_id=t.category_id 
            join kemfri_schema.priority p on p.id_=t.priority_id
            where t.staff_id=$1`,[user_id]).then((data)=>{
            console.log(data.rows);
            return res.status(201).json({message:"Data fetched",data:data.rows})
        }).catch((error)=>{console.log(error);
           return res.status(500).json({message:"An error occured"});})
        
        }
    
    finally{
        connect.release();
    
}}
}