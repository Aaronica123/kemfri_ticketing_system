import app from "../app.js";
import Login from "../actions/login.js";
import supertest from "supertest";
describe('Login test',()=>{
    test('missing fields login',async()=>{
    const body={
        email:null,
        password:null
    }
    const result=await supertest(app).post('/api/login').send({body:body})
    expect(result.status).toBe(402)  
    })
    test('wrong syntax login',async()=>{
        const body={
            email:'wrong_email',
            password:'wrong_password'
        }
        const result=await supertest(app).post('/api/login').send(body);
        expect(result.status).toBe(405)
    })
    
})