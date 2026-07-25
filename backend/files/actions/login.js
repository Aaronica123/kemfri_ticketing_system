import { conf } from "../connection/pool.js";
import CreateSession from "../sessions/create.js";

export default async function Login(req,res){
      const con=await conf.connect()
    try{
        const{email,password}=req.body;
        if(!email||!password){
            console.log("missing data")
            return 500;
        }
        
        if(!/^[a-zA-Z0-9]+@kemfri\.com$/.test(String(email))){
            console.log("wrong syntaax")
            return 409;
        }
        var m=null
        const email_=String(email).toLocaleLowerCase();
        const p=String(email_).slice(0,(String(email_).length-11))
        console.log("email is " +p)
        await con.query(`set session authorization ${(email_.slice(0,(email_.length-11)))}`).then(()=>{
            console.log("verified")
            m=200
            return m;
        }).catch((error)=>{
            console.log(error)
            m=500
            return m;
        })
        if(m==200){
        await con.query("select * from kemfri_schema.register;").then((data)=>{
            if(data.rowCount>0){
               
                console.log('user found');
                m=200;
            }
            else{
                console.log('user not found');
                m=404;
            }
        }).catch((error)=>{
            console.log(error);
        })
        if(m==200){
            
            console.log("verifiying")
            await CreateSession(req,res);
            // return res.status(200).json({"message":"User is verified"})
        }
        else{
            console.log("not verified");
        }
    }
    else{
        console.log("waiting")
    }
        // return m;
    }finally{
        con.release();
        console.log("released");
    }
}