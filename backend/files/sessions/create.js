import Createcache from "../cache/create.js";
export default async function CreateSession(req,res){
    try{
        const {email}=req.body;
        if(!email){
            return 500;
        }
        var session=false;
        var cache=false;
        const date=new Date().toUTCString();
        console.log(date);
        
        console.log(req.sessionID);
        await new Promise ((resolve,reject)=>{
            req.session.regenerate((error)=>{
                if(error){
                    reject(error)
                    
                }
                else{
                    resolve();
                   
                }
            })
        })
        req.session.user={
            email,
            date:date
        }
        console.log(req.sessionID);
        await new Promise((resolve,reject)=>{
            req.session.save((error)=>{
                if(error){
                    reject();
                    console.log(error);
                   return res.status(500).json({"message":"Failed to create session"});
                }
                else{
                    resolve();
                    console.log("creeated session");
                    session=true;
                }
            })
        })
        await Createcache(req,res).then((data)=>{
            if(data=200){
                cache=true;
            }
        });
        if(cache&&session){
            return res.status(200).json({"message":"Created session and cached"});
        }
        console.log(req.session.user);

    }
    catch(error){
        console.log(error)
    }
}
