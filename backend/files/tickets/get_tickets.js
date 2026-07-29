import { conf } from "../connection/pool.js";

export default async function GetTicket(req,res){
    const connect=await conf.connect();
    try{
        var m=null
        const batch=3;
        var count=null;
        const index=1;
        var offset=null;
        await connect.query('select count(*) from kemfri_schema.tickets')
        .then((data)=>{
            console.log(data.rows[0].count)
            count=Math.ceil((data.rows[0].count)/batch);
            offset=(index-1)*count;
            m=200
        }).catch((error)=>{
            console.log(error)
            m=500
        });
        if(m=200){
        await connect.query(`select t.ticket_id,t.ticket_issue,c.category_name,p.priority,t.pending,t.resolved,t.date_entered from kemfri_schema.tickets t join kemfri_schema.category c
on t.category_id=c.category_id join kemfri_schema.priority p
on p.id_=t.priority_id
            order by t.date_entered,t.time_entered desc
            limit $1
            offset $2`,[batch,offset]).then((data)=>{
                console.log(data.rows);
                m=200
                return res.status(200).json({message:"Data fetched",
                    data:data.rows})
            })
            .catch((error)=>{
                console.log(error);
                return res.status(409).json({message:"Could not fetch data"})
            })
            
            }
        else{
            return res.status(500).json({message:"Could not fetch staff"});
        }
        
    }
    finally{
        connect.release();
    }
}