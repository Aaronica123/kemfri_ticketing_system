import app from "../app.js";
import supertest from "supertest";
import { configDotenv } from "dotenv";
import { conf } from "../connection/redis.js";
configDotenv();
describe('Login test',()=>{
    test('missing fields login',async()=>{
    const body={
        email:null,
        password:null
    }
    const result=await supertest(app).post('/api/login').send(body)
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
    test('missing user login ',async()=>{
        
    // await conn.connect().then(()=>{console.log("connected to database")}).catch((error)=>{
    //     console.log("error is 1" + error);
    // });
        const body={
            email:process.env.testuser,
            password:'wrong_password'
        }
        const result=await supertest(app).post('/api/login').send(body); 
        // console.log(result)
        expect(result.status).toBe(404);
        
    })
    test('working login',async()=>{
        const body={
            email:process.env.testuser,
            password:process.env.testpassword
        }
        await conf.connect();
        const result=await supertest(app).post('/api/login').send(body)
        // await conn.end();
        expect(result.status).toBe(200||201);
        conf.close();
        
    })

})
