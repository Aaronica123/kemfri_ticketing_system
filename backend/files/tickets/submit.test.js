import SubmitTicket from "./submit.js";

test('submit ticket testing',async()=>{
    expect(await SubmitTicket({category_id:1,staff_id:100,user_id:'',priority_id:2})).toBe(200);
})