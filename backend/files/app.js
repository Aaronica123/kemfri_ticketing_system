import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple"
import { Client,Pool } from "pg";
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
import GetTicket from "./tickets/get_tickets.js";
import { TotalTickets } from "./tickets/get_data.js";
import { PendingTickets } from "./tickets/get_data.js";
import { ResolvedTickets } from "./tickets/get_data.js";
import GetStaffTickets from "./tickets/staff/staff_get_tickets.js";
import CheckStatusLogin from "./actions/status.js";
import UpdateTicket from "./tickets/staff/staff_update_tickets.js";
import cors from "cors";
// import { DBcache } from "./connection/pool.js";
import { conf } from "./connection/redis.js";
import FilterTickets from "./tickets/filter_tickets.js";
configDotenv();
const app=express();

app.use(cors({methods:["GET","POST","DELETE"],origin:`https://${process.env.frontendurl}/`
    ,allowedHeaders:["Content-Type"]
    ,credentials:true}))

export const conn=new Pool({
    database:process.env.envdatabase,
    user:process.env.envuser,
    host:process.env.envhost,
    password:process.env.envpassword,
    port:process.env.envport
})
export const connfig=new Pool({
    database:process.env.envdatabase,
    user:process.env.envuser,
    host:process.env.envhost,
    password:process.env.envpassword,
    port:process.env.envport
})
async()=>{
    await conn.connect();
    await conf.connect();
//   await DBcache.connect();
}

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
app.post('/api/rate',Rate);
app.post('/api/create',CreateSession);
app.get('/api/status',StatusSession);
app.post('/api/update',UpdateSession);
app.delete('/api/delete',DeletSession);
app.post('/api/login',Login);
app.get('/api/getcache',Getcache);
app.post('/api/logout',Logout);
app.post('/api/submit',SubmitTicket);
app.get('/api/fetch_category',FetchCategory);
app.get('/api/fetch_priority',FetchPriority);
app.get('/api/get_tickets',GetTicket);
app.get('/api/total_tickets',TotalTickets);
app.get('/api/pending_tickets',PendingTickets);
app.get('/api/resolved_tickets',ResolvedTickets);
app.get('/api/staff_tickets',GetStaffTickets);
app.get('/api/get_login_status',CheckStatusLogin);
app.post('/api/update_ticket',UpdateTicket);
app.get('/api/filter_tickets',FilterTickets);
export default app;
