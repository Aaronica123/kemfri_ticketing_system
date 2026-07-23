import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple"
import { Client } from "pg";
import { configDotenv } from "dotenv";
import Rate from "./connection/redis.js";
configDotenv();
const app=express();
export const conn=new Client({
    database:"kemfri_database",
    user:"staff",
    password:process.env.passwordkm,
    host:"localhost",
    port:5432
   
})
const pl=pgSession(session);

await conn.connect().then(()=>{console.log("connected to database")}).catch((error)=>{
    console.log(error);
});

const config={
    saveUninitialized:false,
    resave:false,
    secret:process.env.passwordsess,
    store:new pl({
       schemaName:"kemfri_database",
       tableName:"sessions",
       pool:conn,
       createTableIfMissing:true,
       prunesessionInterval:30600        
    })
}
app.use(session(config))
app.use(express.json());
app.post('/rate',Rate);

export default app;
