import Getcache from "../cache/get.js";
export default async function StatusSession(req,res){
    try{
        var m=null;
        var data1=null;
        await Getcache(req,res).then((data)=>{
            // console.log(data);
             data1=data
            if(data.statusCode==200){
                console.log("verfied user")                
                
            }
            else if(data.statusCode==409){
                console.log("Compromised");
            }
            else if(data.statusCode==404){
                console.log("cached data not found")
                // m= 404;
            }else if(data.statusCode==500){
                console.log("Cached fetch action failed")
                // m=500;
                
            }
            
        });
        // console.log(res)
        return data1;
    }catch(error){
        console.log(error);
        m=500;
        // res.status(500).json({error:error})
        return {statusCode:500,error:error}
    }
}