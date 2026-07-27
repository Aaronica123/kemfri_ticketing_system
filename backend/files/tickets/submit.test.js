import SubmitTicket from "./submit.js";
import FetchCategory from "./get_data.js";
import { FetchPriority } from "./get_data.js";
test('submit ticket testing',async()=>{
    expect(await SubmitTicket({category_id:1,staff_id:100,user_id:'',priority_id:2})).toBe(200);
})
test('fetch category',async()=>{
    expect(await FetchCategory()).toBe(200);
})
test.only('fetch priority',async()=>{
    expect(await FetchPriority()).toBe(200);
})