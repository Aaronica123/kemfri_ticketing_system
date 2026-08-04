import SubmitTicket from "./submit.js";
import FetchCategory from "./get_data.js";
import { FetchPriority } from "./get_data.js";
import GetTicket from "./get_tickets.js";
import { TotalTickets } from "./get_data.js";
import { ResolvedTickets } from "./get_data.js";
import { PendingTickets } from "./get_data.js";
import GetStaffTickets from "./staff/staff_get_tickets.js";
test('submit ticket testing',async()=>{
    expect(await SubmitTicket({category_id:3})).toBe(200);
})
test('fetch category',async()=>{
    expect(await FetchCategory()).toBe(200);
})
test('fetch priority',async()=>{
    expect(await FetchPriority()).toBe(200);
})
test('get tickets ',async ()=>{
    expect(await GetTicket()).toBe(200)
})
test('fetch tickets count ',async()=>{
    expect(await TotalTickets()).toBe(200)
})
test('fetch pending tickets',async()=>{
    expect(await PendingTickets()).toBe(200);
})
test('fetch resolved tickets',async()=>{
    expect(await ResolvedTickets()).toBe(200);
})
test.only('get tickets for staff',async()=>{
    expect(await GetStaffTickets({user_id:'staff100'})).toBe(200)
})