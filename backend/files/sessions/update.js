export default async function UpdateSession(req,res){
    try{
        if(req.session.user&&req.session.user.email){
            req.session.user={
                email:req.session.user.email,
                date:new Date().toUTCString()
            }
            await new Promise((resolve,reject)=>{
                req.session.save((error)=>{
                    if(error){
                        reject(error);
                        console.log(error);
                        return res.status(500).json({"message":"Failed to update session"});
                    }
                    else{
                        resolve();
                        return res.status(200).json({"message":"USers updated"});
                    }
                })
            })

        }
        else{

            console.log("Cannot update user");
            return res.status(409).json({"message":"Session not active"});
        }
    }
    catch(error){
        console.log(error);
        return 500;
    }
}