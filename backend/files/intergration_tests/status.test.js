import app from '../app.js'
import supertest from 'supertest';
import { conf} from '../connection/redis.js';

describe('status tests',()=>{
test('status availability',async()=>{
    console.log("started");
    const req=await supertest(app).get('/api/get_login_status');
    expect(req.status).toBe(404);    
})
});

