import { client } from "../supabase.js";
export default async function Fetch_tickets(req,res){
try {
const limit=10;
const data=(await client.schema("usecase_kemfri").from("tickets").select("*")).count
if(!data||data<=0){
    return res.status(200).json({message:"No tickets exist",data:""})
}
console.log(req.body.index)
const pages=Math.ceil(data/limit);
var offset=0;
if(req?.body?.index>=pages){
    offset=(pages-1)*limit
}else if(req?.body?.index<=1){
    offset=0;
}else{
    offset=(req.body.index-1)*limit
}
if(!req?.body?.type){
const{data:da,error:er}=await client.schema("usecase_kemfri").from("tickets").select("*").range(0,offset).limit(limit);
console.log(da);
console.log(er);
return res.status(200).json({message:"General tickets fetched"});
}
else{
    const{data:n_data,error:n_error}=await client.schema("usecase_kemfri").from("tickets").select("*").eq("status",req?.body?.type).range(0,offset).limit(limit)
    console.log(n_data);
    console.log(n_error);
    
    return res.status(200).json({message:"Tickets fetched"});
}
} catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server error"});
}
}