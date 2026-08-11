import { conn } from "../app.js";
import CreateSession from "../sessions/create.js";
export default async function Login(req,res){

      
    try{
        const{email,password}=req.body;
        console.log(req.body)
        if(!email||!password){
            console.log("missing data")
            return res.status(402).json({message:"Fields are missing"});
        }
        
        if(!/^[a-zA-Z0-9]+@kemfri\.com$/.test(String(email))){
            console.log("wrong syntaax")
            return res.status(405).json({message:"Check input syntax"});
        }
        var m=200
        const email_=String(email).toLocaleLowerCase();
        const p=String(email_).slice(0,(String(email_).length-11))
        var name=null
        var role=null
        var id=null
        console.log("email is " +p)
          
        if(m==200){
      console.log("beginning")
        await conn.connect();      
        await conn.query("select * from kemfri_schema.staff_registry where email like $1 and staff_password=$2;",[email,password]).then((data)=>{
            if(data.rowCount>0){
               
                console.log('user found');
                name=data.rows[0].first_name;
                role=data.rows[0].staff_role;
                id=data.rows[0].staff_id
                console.log("name is "+name +" role is "+role);
                m=200;
            }
            else{
                console.log('user not found');
                console.log(data.rows);
                m=404;
            }
            console.log("FInished")
        }).catch((error)=>{
            console.log("error in lg "+ error);
        })
        if(m==200){
            
            console.log("verifiying")
            await CreateSession(req,res,name,role,id);
            
        }
        else if (m==404){
            console.log("user not found")
            return res.status(404).json({message:"User not found"})
        }
        else{
            console.log("not verified");
            return res.status(403).json({message:"sessions not created"})
        }
    }
    else{
        console.log("waiting");
        return res.status(409).json({message:"Connection denied"})
    }
        // return m;
    }finally{
        // con.release();
        console.log("released");
    }
}
