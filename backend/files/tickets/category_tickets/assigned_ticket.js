import { client } from "../../supabase.js";
import Auth from "../../auth.js";
import * as Minio from "minio"
let i;
export default async function Assigned_ticket(req,res) {
    let auth_data=await Auth(req);
    // if(data.state){
    // await client.schema("usecase_kemfri").from("tickets").select("*").eq("staff_id",data.data.user_metadata.staff_id).eq("ticket_state","assigned");
    // }    
    console.log(auth_data.data);
     const {data,error}=await client.schema("usecase_kemfri").from("tickets").select("*").eq("staff_id",auth_data.data.user_metadata.staff_id).eq("ticket_state","assigned");
     const p=data[0]
     console.log(p);
     const clnt=new Minio.Client({
             endPoint:process.env.endPoint,
                 secretKey:process.env.secretKey,
                 accessKey:process.env.accessKey,
                 port:process.env.port,
                 useSSL:false
         })
        const dateFromDB = data[0].created;
const formatted = new Date(dateFromDB).toLocaleDateString("en-US", {
  month:"numeric",day:"numeric",year:"numeric"
});
// "January 15, 2024"
console.log(formatted)
const v=`${data[0].ticket_id}${data[0].user_id}${formatted}`
console.log(v)
    
     const img=await clnt.getObject('kemfriimages',v);
     console.log(img)
     i=img;
     
     return res.status(200).json({message:"Fetched",data:data});
     
    
}
export async function Image(req,res){
  try {
    // 1. Get the stream from MinIO
    // 2. Set headers so the browser knows it's an image
    res.setHeader('Content-Type', 'image/jpeg'); // Adjust if PNG, etc.
    
    // 3. Pipe the stream directly to the response
    i.pipe(res);

  } catch (err) {
    console.error('MinIO stream error:', err);
    if (err.code === 'NoSuchKey') {
      return res.status(404).send('Image not found');
    }
    res.status(500).send('Internal Server Error');
  }
};
export async function Update_Ticket(req,res){
    const {state,ticket_id}=req.body
     const {data,error}=await client.schema("usecase_kemfri").from("tickets").update({"ticket_state":state,"resolved":new Date().toLocaleString()}).eq("staff_id",890001).eq("ticket_id",ticket_id).select
     ();
    console.log(data);
    if(data.length>0){
        await client.schema("usecase_kemfri").from("staff").update({"state":false}).eq("staff_id",890001).select();
;    }
    console.log(error);
    return res.status(200).json({message:"Done"})  
}