import request from "supertest";
import app from "../app";
import { client } from "../supabase.js";
describe("register test case",()=>{
test('missing input',async()=>{
    const res=await request(app).post("/api/register").send({email:"",password:""
        ,staff_role:"",branch:"",staff_id:"",first_name:"",last_name:""})
    expect(res.status).toBe(403);
})
test('duplicate input',async()=>{
const res=await request(app).post("/api/register").send({email:"peter@kemfri.com",password:"peter123",
    staff_role:"WORKER",
    branch:"nairobi",
    staff_id:"23143",
    last_name:"Robert",
    first_name:"peter"})
expect(res.status).toBe(409);
})
test('main flow',async()=>{
    const staff={
    email:"test@kemfri.com",
    password:"test123",
    staff_role:"STAFF",
    branch:"nairobi",
    staff_id:"12345",
    last_name:"test",
    first_name:"user",
    category:{networking:"networking"}
    }
    const worker={
    email:"workertest@kemfri.com",
    password:"test123",
    staff_role:"WORKER",
    branch:"nairobi",
    staff_id:"12345",
    last_name:"test",
    first_name:"user",
    category:{networking:"networking"}
    }
    const res=await request(app).post('/api/register').send(staff);
    const wok=await request(app).post('/api/register').send(worker);
    await client.auth.admin.deleteUser(res.body.data)
    await client.auth.admin.deleteUser(wok.body.data)
    expect(res.status).toBe(200);
    expect(wok.status).toBe(200);
})
})