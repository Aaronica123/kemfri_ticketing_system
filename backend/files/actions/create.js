import { client } from "../supabase.js";
export default async function Register(req,res){
    try {
    const{email,password,staff_role,branch,staff_id,first_name,last_name}=req.body;
    if(!email||!password||!staff_role||!branch||!staff_id||!first_name||!last_name){
        return res.status(403).json({message:"Enter all fields"})
    }
    if(staff_role!="STAFF"){
        const{data,error}=await client.auth.admin.createUser({email:email,password:password,
            user_metadata:{role:staff_role,branch:branch,staff_id:staff_id,
            first_name:first_name,last_name:last_name}})
        console.log(data);
        console.log(error);
        if(error?.status==422){
            return res.status(409).json({message:"User account exists"})
        }
        else{
        return res.status(200).json({message:"User is created",data:data.user.id})
        }
    }
    else{
        const category=req.body.category;
        const{data,error}=await client.auth.admin.createUser({email:email,password:password,
            user_metadata:{role:staff_role,branch:branch,staff_id:staff_id,
            first_name:first_name,last_name:last_name}})
        console.log("data is "+data)
        console.log("error is "+error);
        if(error?.status==422){
            return res.status(409).json({message:"User account exists"})
        }else{
        for (const value of Object.values(category)){
            if(value!=false){
                const{data,error}=await client.schema("usecase_kemfri").from("staff").insert({
                staff_id:staff_id,staff_email:email,first_name:first_name,last_name:last_name,
                branch:branch,staff_role:staff_role,staff_category:value
                })
                console.log(data)
                console.log(error)
            }
        }
    
        return res.status(200).json({message:"Staff is created",data:data.user.id})
    }
    }
    } catch (error) {
       console.log(error);
       return res.status(500).json({message:"Server error"}); 
    }

}