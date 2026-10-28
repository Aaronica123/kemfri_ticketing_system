import express from "express";
import { configDotenv } from "dotenv";
import Rate from "./connection/redis.js";
import CreateSession from "./sessions/create.js";
import StatusSession from "./sessions/status.js";
import UpdateSession from "./sessions/update.js";
import DeletSession from "./sessions/delete.js";
import Getcache from "./cache/get.js";
import CheckStatusLogin from "./actions/status.js";
import cors from "cors";
import { classifyTicket } from "./tickets/ai.js";
import Register from "./actions/create.js";
import Create_Ticket, { Upload_files } from "./tickets/create_ticket.js";
import Fetch_tickets from "./tickets/fetch_ticket.js";
import multer from "multer";

configDotenv();
const app=express();

app.use(cors({methods:["GET","POST","DELETE"],origin:`https://${process.env.frontendurl}/`
    ,allowedHeaders:["Content-Type","Authorization"]
    ,credentials:true}))

const upload=multer({dest:'images/',limits:{fileSize:1024*1024*5,files:3}})

app.use(express.json());
app.post('/api/rate',Rate);
app.post('/api/create',CreateSession);
app.get('/api/status',StatusSession);
app.post('/api/update',UpdateSession);
app.delete('/api/delete',DeletSession);
app.get('/api/getcache',Getcache);
app.get('/api/get_login_status',CheckStatusLogin);
app.post('/api/ai_ticket',classifyTicket);
app.post('/api/register',Register);
app.post('/api/create_ticket',Create_Ticket);
app.post('/api/fetch_ticket',Fetch_tickets);
app.post('/api/upload_file',upload.array('kemfri_images',3),Upload_files);

export default app;
