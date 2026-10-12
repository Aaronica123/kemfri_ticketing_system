import request from "supertest"
import app from "../app.js"

describe.only("ticket creation",()=>{
test.only("create ticket ",async()=>{
const res=await request(app).post("/api/create_ticket").send({
    ticket_id:"TCK123",
    ticket_type:"networking",
    description:"My wifi has failed and i cannot connect to the internet"
})
expect(res.status).toBe(200);
})
test.only("lacking input",async()=>{
    const res=await request(app).post("/api/create_ticket").send({
    })
    expect(res.status).toBe(409)
})
})