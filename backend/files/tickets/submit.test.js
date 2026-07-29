import SubmitTicket from "./submit.js";
import FetchCategory from "./get_data.js";
import { FetchPriority } from "./get_data.js";
test.only('submit ticket testing',async()=>{
    expect(await SubmitTicket({category_id:3})).toBe(200);
})
test('fetch category',async()=>{
    expect(await FetchCategory()).toBe(200);
})
test('fetch priority',async()=>{
    expect(await FetchPriority()).toBe(200);
})