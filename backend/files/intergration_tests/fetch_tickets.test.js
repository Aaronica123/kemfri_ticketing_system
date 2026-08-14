import app from "../app.js";
import supertest from "supertest";

describe('test component',()=>{
    test('ticket index check validity',async()=>{
        const result=await supertest(app).get(`/api/get_tickets?index=${null}`);
        expect(result.status).toBe(409)
    })
})