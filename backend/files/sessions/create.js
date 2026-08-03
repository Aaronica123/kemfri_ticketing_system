import Createcache from "../cache/create.js";
export default async function CreateSession(req,res,first_name,role,id){
    try{
        const {email}=req.body;
        if(!email||!first_name||!role||!id){
            return 500;
        }
        var session=false;
        var cache=false;
        const date=new Date().toUTCString();
        const name=first_name
        const final_role=role
        const final_id=id
        var group=null;
        if(final_role=='ICT STAFF'){
            group='ICT'
        }
        else{
            group='USERS'
        }
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
            role:final_role,
            group:group,
            user_id:final_id
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
