import Getcache from "../cache/get.js";
export default async function StatusSession(req,res){
    try{
        var m=null;
        await Getcache(req,res).then((data)=>{
            console.log(data);
            if(data.status==200){
                console.log(req.session.user.email)
                
                if(data.data.data.email==req.session.user.email){
                    console.log("cached data fetched")
                    m=200;
                }
                else{
                    console.log("cached data doesnt exist")
                    m=409;
                }
            }
            else{
                console.log("cached data not found")
                m= 404;
            }
        });
        return m;
    }catch(error){
        console.log(error);
        m=500;
        return m;
    }
}