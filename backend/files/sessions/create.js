import Createcache from "../cache/create.js";
export default async function CreateSession(req,res,first_name,last_name){
    try{
        const {email}=req.body;
        if(!email||!first_name||!last_name){
            return 500;
        }
        var session=false;
        var cache=false;
        const date=new Date().toUTCString();
        const name=first_name
        const lastname=last_name
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
            date:date,
            name:name,
            lastname:lastname
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
            return res.status(200).json({"message":"Created session and cached",
                data:req.session.user});
        }
        console.log(req.session.user);

    }
    catch(error){
        console.log(error)
    }
}
