export default async function DeletSession(req,res){
    try{
        if(req.session.user){
            await new Promise((resolve,reject)=>{
                req.session.destroy((error)=>{
                    if(error){
                        reject();
                        console.log(error);
                        return res.status(500).json({"message":"server error"})
                    }else{
                        resolve()
                        return res.status(201).json({"message":"Deleted success"})
                    }
                })
            })
        }
        else{
            return res.status(200).json({"message":"Already deleted"});
        }
    }catch(error){

    }
}