import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple"
import { Client } from "pg";
import { configDotenv } from "dotenv";
import Rate from "./connection/redis.js";
import CreateSession from "./sessions/create.js";
import StatusSession from "./sessions/status.js";
import UpdateSession from "./sessions/update.js";
import DeletSession from "./sessions/delete.js";
configDotenv();
const app=express();
export const conn=new Client({
    database:"kemfri_database",
    user:"postgres",
    password:process.env.passworddb,
    host:"localhost",
    port:5432

})


await conn.connect().then(()=>{console.log("connected to database")}).catch((error)=>{
    console.log(error);
});
const pl=pgSession(session);
const config={
    saveUninitialized:false,
    resave:false,
    secret:process.env.passwordsess,
    store:new pl({
       schemaName:"kemfri_schema",
       tableName:"sessions",
       pool:conn,
       createTableIfMissing:true,
       prunesessionInterval:30600        
    }),
      cookie: {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}
app.use(session(config))
app.use(express.json());
app.post('/rate',Rate);
app.post('/create',CreateSession);
app.get('/status',StatusSession);
app.post('/update',UpdateSession);
app.delete('/delete',DeletSession);
export default app;
