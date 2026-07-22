import {Client} from "pg";
import { configDotenv } from "dotenv";
configDotenv()
export async function login(req,res){
    try{
        const{staff_email,password}=req;
        if(!staff_email||!password){
            console.log("fill all fields")
            return res.status(400).json({"message":"Fill all fields"})
        }
        const s=String(staff_email)
        console.log(s.length)
        const y=Array(s);
        const m=((y.length)-1)-11;
        const p=y[0].slice(0,m);
        console.log(p);
        const connect=new Client({
            database:"kemfri_database",
            user:String(p),
            port:5432,
            host:"localhost",
            password:process.env.passwordkm
        })
       
         await connect.connect().then(()=>{return 200;})
         await connect.end();
         return 200;
        
    }catch(error){
        console.log(error);
        return 500;
    }
}