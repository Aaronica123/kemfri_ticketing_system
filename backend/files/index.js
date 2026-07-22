import app from "./app.js";
import {Client} from "pg";
import {configDotenv} from "dotenv";
import { conn } from "./app.js";
configDotenv();
const con=new Client({
    connectionString:`postgresql://postgres.xuatrkfjhmoqsomwzdwk:${encodeURIComponent(process.env.password)}@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres`
})
async function start(){
    try{
app.listen(3001);

// await con.connect().then(()=>{
//     console.log("connected")
// }).catch((error)=>{
//     console.log(error)
// })
console.log("listening")
    }catch(error){
        console.log(error)
    }
}
start();