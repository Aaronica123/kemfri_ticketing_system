import SubmitTicket from "./submit.js";
import FetchCategory from "./get_data.js";
import { FetchPriority } from "./get_data.js";
import GetTicket from "./get_tickets.js";
test('submit ticket testing',async()=>{
    expect(await SubmitTicket({category_id:3})).toBe(200);
})
test('fetch category',async()=>{
    expect(await FetchCategory()).toBe(200);
})
test('fetch priority',async()=>{
    expect(await FetchPriority()).toBe(200);
})
test.only('get tickets ',async ()=>{
    expect(await GetTicket()).toBe(200)
})