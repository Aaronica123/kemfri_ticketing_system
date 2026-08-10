import { conf } from "../connection/redis.js";
import app from "../app.js"
import supertest from 'supertest'

describe('Delete tests',()=>{
    test('delete success test api',async()=>{
        const result=await supertest(app).post('/api/logout');
        expect(result.status).toBe(200||201)
    })
})