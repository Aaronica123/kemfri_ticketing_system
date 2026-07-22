import { login } from "./conn.js";

test('login testing ',async()=>{

    expect(await login({staff_email:"network153@kemfri.com",password:"sxa"})).toBe(200);
})