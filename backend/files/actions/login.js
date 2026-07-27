import { conf } from "../connection/pool.js";
import CreateSession from "../sessions/create.js";
import StatusSession from "../sessions/status.js";
export default async function Login(req,res){
    var state=false;
    await StatusSession(req,res).then((data)=>{
        console.log("data is "+data);
        if(data==200){
            
            state=true;
        }else if(data==409){
            req.session.user=null;
        }else if(data==500){
            req.session.user=null;
        }
    })
    if(state){
        return res.status(200).json({message:"User already logged in"})
    }
    else{
      const con=await conf.connect()
    try{
        const{email,password}=req.body;
        if(!email||!password){
            console.log("missing data")
            return res.status(402).json({message:"Fields are missing"});
        }
        
        if(!/^[a-zA-Z0-9]+@kemfri\.com$/.test(String(email))){
            console.log("wrong syntaax")
            return res.status(405).json({message:"Check input syntax"});
        }
        var m=null
        const email_=String(email).toLocaleLowerCase();
        const p=String(email_).slice(0,(String(email_).length-11))
        const data_array=[]
        var name=null
        var last=null
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
                console.log(data.rows[0].first_name);
                data_array.push({
                    first_name:data.rows[0].first_name
                })
                name=data.rows[0].first_name
                last=data.rows[0].last_name
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
            await CreateSession(req,res,name,last);
            
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
        con.release();
        console.log("released");
    }
}
}