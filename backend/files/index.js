import app from "./app.js";
// import {Client} from "pg";
import {configDotenv} from "dotenv";
// import { conn } from "./app.js";
import { conf } from "./connection/redis.js";
configDotenv();
// const con=new Client({
//     connectionString:`postgresql://postgres.xuatrkfjhmoqsomwzdwk:${encodeURIComponent(process.env.password)}@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres`
// })
async function start(){
    try{
        await conf.connect().then(()=>{console.log("connected")})
app.listen(3001);

console.log("listening");
    }catch(error){
        console.log(error)
    }
}
start();
