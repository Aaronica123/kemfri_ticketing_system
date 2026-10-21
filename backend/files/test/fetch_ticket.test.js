import { client } from "../supabase.js";
import Fetch_tickets from "../tickets/fetch_ticket.js";
import request from "supertest"
import app from "../app.js";
import Auth from "../auth.js";
jest.mock("../supabase.js", () => ({
  client: {
    schema: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    limit:jest.fn().mockReturnThis(),
    range:jest.fn().mockReturnThis(),
    eq:jest.fn().mockReturnThis(),
    like:jest.fn()
  },
}));
jest.mock("../auth.js");

describe('fetch ticket files',()=>{
    let res;
    beforeEach(()=>{
        jest.clearAllMocks();
        res={
            status: jest.fn().mockReturnThis(),
            json:jest.fn().mockReturnThis()
        }
        Auth.mockResolvedValue(true);
    })
    test.only('No user id test',async()=>{
        await Fetch_tickets({body:{}},res)
        expect(res.status).toHaveBeenCalledWith(403);

    })
    test.only('Fetch tickets',async()=>{
        
        client.like.mockResolvedValue({count:5});
        await Fetch_tickets({body:{index:1,type:null,user_id:123,role:"STAFF"}},res)
        expect(res.status).toHaveBeenCalledWith(201);
    })
     test.only("Tickets test response",async()=>{
        client.like.mockResolvedValue({count:5})
        const da=await request(app).post("/api/fetch_ticket").send({index:1,type:null,user_id:123,role:"STAFF"})
        expect(da.status).toBe(201);
        
    })
    test.only('no tickets',async()=>{
        client.like.mockResolvedValue(0);
        await Fetch_tickets({body:{index:1,type:null,user_id:123,role:"STAFF"}},res)
        expect(res.status).toHaveBeenCalledWith(200);
    })
    test.only("no tickets test response",async()=>{
        client.like.mockResolvedValue(0)
        const da=await request(app).post("/api/fetch_ticket").send({index:1,type:null,user_id:123,role:"STAFF"})
        expect(da.status).toBe(200);
        expect(da.body.data).toBe("");
    })
})