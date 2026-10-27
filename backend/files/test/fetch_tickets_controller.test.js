import request from "supertest";
import Fetch_tickets from "../tickets/fetch_ticket.js";
import app from "../app.js";

jest.mock('../tickets/fetch_ticket.js')
describe('api calls fetch tickets',()=>
{
test('working files',async()=>{
Fetch_tickets.mockImplementation((req, res) => res.status(201).json({message:"General tickets fetched",data:1}));
const da=await request(app).post("/api/fetch_ticket").send({index:1,type:null,user_id:123,role:"STAFF"})
console.log(da.status)
console.log(da.status, da.body, Fetch_tickets.mock.calls.length);
expect(da.status).toBe(201)
})
})