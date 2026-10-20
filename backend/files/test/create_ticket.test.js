import request from "supertest"
import app from "../app.js"
import { client } from "../supabase.js"

jest.mock("../supabase.js",()=>({
    client:{
        schema:jest.fn().mockReturnThis(),
        from:jest.fn().mockReturnThis(),
        insert:jest.fn()
    }
}))

describe.only("ticket creation",()=>{
test.only("create ticket ",async()=>{

client.insert.mockResolvedValue({data:{user:"found"}})

const res=await request(app).post("/api/create_ticket").send({
    ticket_id:"TCK123",
    ticket_type:"networking",
    description:"My wifi has failed and i cannot connect to the internet",
    branch:"kisumu"
})
expect(res.status).toBe(200);
})
test.only("lacking input",async()=>{
    const res=await request(app).post("/api/create_ticket").send({
    })
    expect(res.status).toBe(409)
})
})