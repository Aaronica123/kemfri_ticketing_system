import { client } from "../supabase.js"
import Auth from "../auth.js"
import Create_Ticket from "../tickets/create_ticket.js"
jest.mock("../supabase.js",()=>({
    client:{
        schema:jest.fn().mockReturnThis(),
        from:jest.fn().mockReturnThis(),
        insert:jest.fn()
    }
}))
jest.mock('../auth.js');
describe.only("ticket creation",()=>{
let res=null;
beforeEach(()=>{
    jest.clearAllMocks();
    Auth.mockResolvedValue(true);
    res={
        status:jest.fn().mockReturnThis(),
        json:jest.fn().mockReturnThis()
    }
})
test.only("create ticket ",async()=>{
client.insert.mockResolvedValue({data:{user:"found"}})
const body={
    ticket_type:"networking",
    description:"My wifi has failed and i cannot connect to the internet",
    branch:"kisumu",
    user_id:"123",
    test:true}
await Create_Ticket({body:body},res)
expect(res.status).toHaveBeenCalledWith(200);
})
test.only("lacking input",async()=>{
    await Create_Ticket({body:{}},res)
    expect(res.status).toHaveBeenCalledWith(409)
})
})