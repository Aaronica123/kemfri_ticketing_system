import { connfig } from "../app.js";

export default async function FilterTickets(req,res){
     const con=await connfig.connect();
    try{
        const {user_id}=req.session.user;
        if(!user_id){
            return res.status(400).json({message:"User is not logged in"})
        }
        
        const filter=Object.values(req.query)[0];
        if(!filter){
            return res.status(404).json({message:"Must provide filter for tickets"})
        }
        const l=filter.length;
        var count=0;
        var state=false;

        console.log(filter)
        while(count<l){
            if(filter.charAt(count)>='a'||filter.charAt(count)<='z'||filter.charAt(count)>=1||filter.charAt(count)>='A'||filter.charAt(count)<='Z'){
                state=true;
                count++;
            }
            else{
                state=false;
                break;
            }
        }
        if(!state){
            return res.status(409).json({message:"ticket should have valid syntax"})
        }
       
            var data_=null
            await con.query(`select t.ticket_id,t.ticket_issue,c.category_name,p.priority,t.pending,
            t.resolved,TO_CHAR(t.date_entered, 'YYYY-MM-DD') AS date_entered,
            TO_CHAR(t.time_entered, 'HH-MI-SS') AS time_entered
            from kemfri_schema.tickets as t join kemfri_schema.category c
on t.category_id=c.category_id join kemfri_schema.priority p
on p.id_=t.priority_id
where t.ticket_id=$1 and t.user_id = $2`,[filter,user_id]).then((data)=>{
    data_=data.rows;
    if(data.rowCount<=0){
        data_=[]
    }
    return res.status(200).json({message:"Fetched filter",data:data_})
});



    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"error occured",error:error});
    }finally{
        con.release();

    }
}