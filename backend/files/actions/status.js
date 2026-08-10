import StatusSession from "../sessions/status.js";

export default async function CheckStatusLogin(req,res){
    try{
        var data1=null;
        await StatusSession(req,res).then((data)=>{
            //  console.log(data)
            // res=data;
            if(data.statusCode==200){
                console.log(req.session.user);
                
            }
            else if(data.statusCode==500){
                console.log("Server error ")
            }
            else if(data.statusCode==409){
                console.log("User has been compromized")
            }
            else if(data.statusCode==404){
                console.log("User not found");
                // console.log(data);
            }
        
        }).catch((error)=>{
            // req.session.user=null;
            console.log(error)
        });
    //    return data1;

    }catch(error){
        console.log(error);
    //    res.status(500).json({message:"Server failed"})
       return {statusCode:500,error:error}
    }
}