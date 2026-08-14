
// import { conn } from "../connection/pool.js";
import { conn } from "../app.js";
export default async function GetTicket(req,res){
    
    try{
        const ind=Object.values(req.query);
        if(!ind||!Number(ind)){
            return res.status(409).json({message:"Must provide valid index"})
        }
        
        
        var m=null
        const batch=5;
        var count=null;
        const index=ind;
        var offset=0;
        await conn.connect();
        await conn.query('select count(*) from kemfri_schema.tickets')
        .then((data)=>{
            console.log(data.rows[0].count)
            count=Math.ceil((data.rows[0].count)/batch);
            console.log("count is " +count )
            if(index>=count){
                if(count==0){
                    offset=count*batch
                }
                else{
                    offset=(count-1)*batch
                }
                
            }
            else if(index<=0){
                offset=0*batch;
            }
            else{
                offset=(index-1)*batch;
            }
            
            m=200
        }).catch((error)=>{
            console.log(error)
            m=500
        });
        if(m=200){
            await conn.query(`SET TIME ZONE 'Africa/Nairobi';`)
            console.log(req.session.user.user_id);
        await conn.query(`
            select t.ticket_id,t.ticket_issue,c.category_name,p.priority,t.pending,
            t.resolved,TO_CHAR(t.date_entered, 'YYYY-MM-DD') AS date_entered,
            TO_CHAR(t.time_entered, 'HH-MI-SS') AS time_entered
            from kemfri_schema.tickets as t join kemfri_schema.category c
on t.category_id=c.category_id join kemfri_schema.priority p
on p.id_=t.priority_id
where t.date_entered<=$3 and t.user_id = $4 and
t.time_entered<=current_time order by t.date_entered,t.time_entered desc 
            limit $1
            offset $2`,[batch,offset,new Date().toISOString(),req.session.user.user_id]).then((data)=>{
                console.log(data.rows);
                m=200
                return res.status(200).json({message:"Data fetched",
                    total:count,
                    data:data.rows
                    })
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
        console.log("released")
    }
}