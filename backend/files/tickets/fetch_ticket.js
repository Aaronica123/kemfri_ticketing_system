import { client } from "../supabase.js";
import Auth from "../auth.js";
export default async function Fetch_tickets(req,res){
if(await Auth(req)){
    try {
if(!req.body?.user_id||!req.body?.role){
    return res.status(403).json({message:"Missing values"})
}
const limit=10;
console.log(req.body?.user_id)
console.log(req.body?.role)
console.log(req.body?.type)
let data=null
if(req.body.role=="STAFF"){
data=await client.schema("usecase_kemfri").from("tickets").select("*",{ count: "exact", head: true }).like("staff_id",req.body.user_id)
}
else{
data=await client.schema("usecase_kemfri").from("tickets").select("*",{ count: "exact", head: true }).like("user_id",req.body.user_id)
}

console.log(data.count)
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
if(!req.body?.type){
// if(req.body.role=="STAFF"){
// const{data:da,error:er}=await client.schema("usecase_kemfri").from("tickets").select("ticket_id,ticket_type,description,ticket_state,team,created").range(0,offset).limit(limit).like("staff_id",req?.body?.user_id);
// console.log(da);
// console.log(er);
// return res.status(201).json({message:"General tickets fetched",data:da});
// }else{
const{data:da,error:er}=await client.schema("usecase_kemfri").from("tickets").select("ticket_id,ticket_type,description,ticket_state,team,created").range(0,offset).limit(limit).like("user_id",req?.body?.user_id);
console.log(da);
console.log(er);
return res.status(201).json({message:"General tickets fetched",data:da});

}
else{
    // if(req.body.role=="STAFF"){
    // const{data:n_data,error:n_error}=await client.schema("usecase_kemfri").from("tickets").select("ticket_id,ticket_type,description,ticket_state,team,created").range(0,offset).limit(limit).eq("ticket_state",req?.body?.type).like("staff_id",req?.body?.user_id)
    // console.log(n_data);
    // console.log(n_error);
    // return res.status(201).json({message:"Tickets fetched",data:n_data});
    // }
   
    const{data:n_data,error:n_error}=await client.schema("usecase_kemfri").from("tickets").select("ticket_id,ticket_type,description,ticket_state,team,created").range(0,offset).limit(limit).eq("ticket_state",req?.body?.type).like("user_id",req?.body?.user_id)
    console.log(n_data);
    console.log(n_error);
    return res.status(201).json({message:"Tickets fetched",data:n_data});
    
    
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