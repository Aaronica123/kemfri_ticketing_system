import { conf } from "../connection/pool.js";
export default async function Login(req,res){
      const con=await conf.connect()
    try{
      

        const{useremail,password}=req;
        if(!useremail||!password){
            return 500;
        }
        
        if(!/^[a-zA-Z0-9]+@kemfri\.com$/.test(String(useremail))){
            return 409;
        }
        var m=null
        const email=String(useremail).toLocaleLowerCase();
        const p=String(email).slice(0,(String(email).length-11))
        console.log("email is " +p)
        await con.query(`set session authorization ${(email.slice(0,(email.length-11)))}`).then(()=>{
            console.log("verified")
            m=200
            return m;
        }).catch((error)=>{
            console.log(error)
            m=500
            return m;
        })
        
        return m;
    }finally{
        con.release();
        console.log("released");
    }
}