import { client } from "../supabase.js";
import Auth from "../auth.js";

jest.mock('../supabase.js',()=>({
    client:{
        auth:{
        getUser:jest.fn()
        }
    },
}))

describe.only('auth tests',()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    test.only('success auth test',async()=>{
        client.auth.getUser.mockResolvedValue({data:{user:"found"}})
        const data=await Auth({headers:{authorization:"token"}})
        expect(data).toBe(true)
    })
    test.only('failed auth test',async()=>{
        client.auth.getUser.mockResolvedValue({data:{user:null}})
        const data=await Auth({headers:{authorization:"token"}})
        expect(data).toBe(false)
    })
})