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
    range:jest.fn().mockReturnThis(),
    limit:jest.fn()
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
    test.only('Fetch tickets',async()=>{
        
        client.limit.mockResolvedValue([{"data":1},{"data":2}],{count:2});
        await Fetch_tickets({body:{index:1,type:null}},res)
        expect(res.status).toHaveBeenCalledWith(200);
    })
    test.only('no tickets',async()=>{
        client.limit.mockResolvedValue([{data:0}],{count:0});
        await Fetch_tickets({body:{index:1,type:null}},res)
        expect(res.status).toHaveBeenCalledWith(200);
    })
    test.only("no tickets test response",async()=>{
        client.limit.mockResolvedValue({count:0})
        const da=await request(app).get("/api/fetch_ticket").send({index:1,type:null})
        expect(da.status).toBe(200);
        expect(da.body.data).toBe("");
    })
})