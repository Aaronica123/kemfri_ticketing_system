import request from "supertest"
import app from "../app.js"
import { client } from "../supabase.js"
import Auth from "../auth.js"
jest.mock("../supabase.js",()=>({
    client:{
        schema:jest.fn().mockReturnThis(),
        from:jest.fn().mockReturnThis(),
        insert:jest.fn()
    }
}))
jest.mock('../auth.js');
describe.only("ticket creation",()=>{
beforeEach(()=>{
    jest.clearAllMocks();
    Auth.mockResolvedValue(true)
})
test.only("create ticket ",async()=>{

client.insert.mockResolvedValue({data:{user:"found"}})

const res=await request(app).post("/api/create_ticket").send({
    ticket_type:"networking",
    description:"My wifi has failed and i cannot connect to the internet",
    branch:"kisumu",
    user_id:"123",
    test:true
})
expect(res.status).toBe(200);
})
test.only("lacking input",async()=>{
    const res=await request(app).post("/api/create_ticket").send({})
    expect(res.status).toBe(409)
})
})