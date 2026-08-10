
jest.mock('../cache/get.js');

import StatusSession from "../sessions/status.js";
import Getcache from "../cache/get.js";
describe('status testing',()=>{
test('status is working',async()=>{
    const session={
        user:{
            email:100
        }
    }
    Getcache.mockResolvedValue({statusCode:200,data:{data:{email:100}}});
    const result=await StatusSession({session:session});
    console.log(result);
    expect(result.statusCode).toBe(200)
})

test('status is compromised',async()=>{
    const session={
        user:{
            email:1
        }
    }
    Getcache.mockResolvedValue({statusCode:409});
    const result=await StatusSession({session:session})
    expect(result.statusCode).toBe(409);
})
test('status not found',async()=>{
    Getcache.mockResolvedValue({statusCode:404});
    const session={
        user:{
            email:1
        }
    }
    const result=await StatusSession({session:session});
    console.log(result)
    expect(result.statusCode).toBe(404);
    
})
test('status error',async()=>{
    Getcache.mockRejectedValue({statusCode:500});
    const session={
        user:{
            email:1
        }
    }
    const result=await StatusSession({session:session})
    expect(result.statusCode).toBe(500);
})
})