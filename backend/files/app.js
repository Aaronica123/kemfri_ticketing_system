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
import Logout from "./actions/logout.js";
import Login from "./actions/login.js";
import Getcache from "./cache/get.js";
import SubmitTicket from "./tickets/submit.js";
import FetchCategory from "./tickets/get_data.js";
import { FetchPriority } from "./tickets/get_data.js";
import cors from "cors";

configDotenv();
const app=express();

app.use(cors({methods:["GET","POST","DELETE"],origin:"http://localhost:5173"
    ,allowedHeaders:["Content-Type"]
    ,credentials:true}))
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
       prunesessionInterval:900000      
    }),
      cookie: {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        maxAge: 900000 // 24 hours
    }
}
app.use(session(config))
app.use(express.json());
app.post('/rate',Rate);
app.post('/create',CreateSession);
app.get('/status',StatusSession);
app.post('/update',UpdateSession);
app.delete('/delete',DeletSession);
app.post('/login',Login);
app.get('/getcache',Getcache);
app.post('/logout',Logout);
app.post('/submit',SubmitTicket);
app.get('/fetch_category',FetchCategory);
app.get('/fetch_priority',FetchPriority);
export default app;
