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

describe('fetch ticket files unit tests',()=>{
    let res;
    beforeEach(()=>{
        jest.clearAllMocks();
        res={
            status: jest.fn().mockReturnThis(),
            json:jest.fn().mockReturnThis()
        }
        Auth.mockResolvedValue({data:{user_metadata:{staff_id:123,role:"STAFF"}},state:true});
    })
    test.only('No user id test',async()=>{
         Auth.mockResolvedValue({data:{user_metadata:{staff_id:null,role:null}},state:true});
        await Fetch_tickets({body:{}},res)
       
        expect(res.status).toHaveBeenCalledWith(403);

    })
    test.only('Fetch tickets',async()=>{
        
        client.like.mockResolvedValue({count:5});
        await Fetch_tickets({body:{index:1,all:true}},res)
        expect(res.status).toHaveBeenCalledWith(201);
    })
    test.only('no tickets',async()=>{
        client.like.mockResolvedValue(0);
        await Fetch_tickets({body:{index:1,all:true}},res)
        expect(res.status).toHaveBeenCalledWith(200);
    })
})
