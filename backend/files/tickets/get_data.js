import { conf } from "../connection/pool.js";

export default async function FetchCategory(req,res){
    const connect=await conf.connect();
    try{
        var m=null
        await connect.query("select*from kemfri_schema.category;").then((data)=>{
            console.log(data.rows);
            m=200;
            return res.status(202).json({message:"Data fetched",data:data.rows})
        }).catch((error)=>{
            console.log(error);
            m=500
            return res.status(500).json({message:"Error occured"})
        })

    }finally{
        connect.release();
    }
}
export async function FetchPriority(req,res) {
    const connect=await conf.connect();
    try{
      
        await connect.query("select*from kemfri_schema.priority").then((data)=>{
            console.log(data.rows);
           
            return res.status(200).json({message:"Priorities fetched",data:data.rows})
        }).catch((error)=>{console.log(error); 
          
             return res.status(500).json({message:"Failed to fetch priorities"});});
    
    }
    finally{
        connect.release();
    }
    
}