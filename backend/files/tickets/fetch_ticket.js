import { client } from "../supabase.js";
import Auth from "../auth.js";
export default async function Fetch_tickets(req,res){
const d=await Auth(req)
if(d.state){

    try {
        console.log(d.data.user_metadata)
if(!d.data.user_metadata?.staff_id||!d.data.user_metadata?.role){
    return res.status(403).json({message:"Missing values"})
}
const limit=10;
const filter=[];

let data=null
console.log(req.body);
if(req.body.all){    

data=await client
  .schema("usecase_kemfri")
  .from("tickets")
  .select("*", { count: "exact", head: true })
  .like("user_id",d.data.user_metadata.staff_id)

console.log(data)
}
else{
const p=Object.values(req.body.filter);    

let v=0;
while(p.length>v){
    if(p[v]!=null){
        filter.push(p[v])
    }
    v++;
}

console.log(filter)
data=await client
  .schema("usecase_kemfri")
  .from("tickets")
  .select("*", { count: "exact", head: true })
  .like("user_id", d.data.user_metadata.staff_id)      
  .in("ticket_state", filter);
console.log(data)



}

if(!data.count||data.count<=0){
    return res.status(200).json({message:"No tickets exist",data:""})
}
console.log(req.body.index)
const pages=Math.ceil(data.count/limit);
var offset=0;
if(req?.body?.index>=pages){
    offset=(pages-1)*limit
}else if(req?.body?.index<=1){
    offset=limit;
}else{
    offset=(req.body.index-1)*limit
}

if(req.body.all){
const{data:da,error:er}=await client.schema("usecase_kemfri").from("tickets").select("ticket_id,ticket_type,description,ticket_state,team,created").range(0,offset).limit(limit).like("user_id",d.data.user_metadata.staff_id);
console.log(da);
console.log(er);
return res.status(201).json({message:"General tickets fetched",data:da,total:data.count});   
}else{

const{data:da,error:er}=await client.schema("usecase_kemfri").from("tickets").select("ticket_id,ticket_type,description,ticket_state,team,created").range(0,offset).limit(limit).like("user_id",d.data.user_metadata.staff_id).in("ticket_state", filter);
console.log(da);
console.log(er);
return res.status(201).json({message:"General tickets fetched",data:da,total:data.count});
}

} catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server error"});
}
}
else{
    return res.status(409).json({message:"Unauthenticated user"})
}
}
