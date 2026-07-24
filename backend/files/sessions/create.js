export default async function CreateSession(req,res){
    try{
        const {email}=req.body;
        if(!email){
            return 500;
        }
        
        const date=new Date().toUTCString();
        console.log(date);
        
        console.log(req.sessionID);
        await new Promise ((resolve,reject)=>{
            req.session.regenerate((error)=>{
                if(error){
                    reject(error)
                    return 500;
                }
                else{
                    resolve();
                    return 200;
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
                    return res.status(200).json({message:"session created successfully"});
                }
            })
        })
        console.log(req.session.user);

    }
    catch(error){
        console.log(error)
    }
}
