import {createClient} from "redis";
//configuration for redis server
const conf=createClient({
    host:"localhost",
    port:6379,
})
//lua script for rate limiting
const scr=`
local nowdate=tonumber(KEYS[1])
local token=(KEYS[2])
local rate=tonumber(KEYS[3])
local refill=tonumber(KEYS[4])
local max_tokens=tonumber(KEYS[5])

local now=redis.call("GET",token)

if now==false then
redis.call("SET",token,(max_tokens-1))
redis.call("SET", "last" ,nowdate)
redis.call("EXPIRE",token,50000)
return {max_tokens,nowdate}
end

local ls=redis.call("GET","last")
local diff=tonumber(nowdate)-tonumber(ls)
local com=math.floor((diff/rate)*refill)
local min=math.min((tonumber(now)+com),max_tokens)

if min<1 then
return{"exhausted tokens"}
end

redis.call("SET",token,(min-1))
redis.call("SET","last",nowdate)
redis.call("EXPIRE",token,50000)
return {min,"tkn",diff,com,ls,nowdate}

`
var c=null;
//function responsible for rate limiting
export default async function Rate(){
    try {
    const d=Number(Date.now());    
    if(!c){
        c=await conf.connect()
    }
    //execution function that executes the lua script
    await conf.eval(scr,{keys:[`${d}`,"bucket","5000","1","10"]}).then((data)=>{
        console.log(data)
        console.log("tokens created");
    })
    return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
