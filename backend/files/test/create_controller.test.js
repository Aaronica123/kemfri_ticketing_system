import request from "supertest";
import app from "../app.js";
import { client } from "../supabase.js";
import Register from "../actions/create.js";

jest.mock("../actions/create.js")
describe("register test case",()=>{
beforeEach(()=>{
    jest.clearAllMocks();
})
test('missing input',async()=>{
    Register.mockImplementation((req,res)=> res.status(403).json({message:"Missing input"}))
    const res=await request(app).post("/api/register").send({email:"",password:""
        ,staff_role:"",branch:"",staff_id:"",first_name:"",last_name:""})
    expect(res.status).toBe(403);
})
test('duplicate input',async()=>{
    Register.mockImplementation((req,res)=>res.status(409).json({message:"User account exists"}))
    const res=await request(app).post("/api/register").send({email:"",password:""
        ,staff_role:"",branch:"",staff_id:"",first_name:"",last_name:""})
    expect(res.status).toBe(409);
})

})