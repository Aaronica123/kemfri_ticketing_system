import Deletecache from "../cache/delete.js";

export default async function DeletSession(req,res){
    try{
        var session=false;
        var cache=false;
        if(req.session.user){
            await new Promise((resolve,reject)=>{
                req.session.destroy((error)=>{
                    if(error){
                        reject();
                        console.log(error);
                        return res.status(500).json({"message":"server error"})
                    }else{
                        resolve()
                       session=true
                    }
                })
            })
            await Deletecache(req,res).then((data)=>{
                console.log(data)
                if(data){
                    cache=true;
                }
            })
            if(cache&&session){
                 return res.status(201).json({"message":"Deleted success"})
            }
            else{
                return res.status(500).json({"message":"Delete action denied"})
            }
            
        }
        else{
            return res.status(200).json({"message":"Already deleted"});
        }
    }catch(error){
console.log(error);
    }
}