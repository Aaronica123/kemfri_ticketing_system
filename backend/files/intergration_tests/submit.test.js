import app from "../app.js";
import supertest from "supertest";
describe('submit actions test',()=>{
    test('submit action with no values',async()=>{
        const body={
            category_id:null,
            priority_id:null,
            ticket_issue:null
        }
        const result=await supertest(app).post('/api/submit').send(body);
        expect(result.status).toBe(409)
    })
    // test('submit action not found')
})