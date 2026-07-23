import {Pool} from "pg"
import { configDotenv } from "dotenv"
configDotenv();
//pool declaration configuration that provides maximum connections of users simultaneously
const conf=new Pool({
    database:"kemfri_database",
    user:"app_service",
    password:process.env.passwordapp,
    host:"localhost",
    max:5,
    maxLifetimeSeconds:1000,//duration length for a connection from creation to termination after expiry user is terminated
    port:5432,
    allowExitOnIdle:false,//pool to reman active always and not terminate 
    idleTimeoutMillis:10000,//duration for idle connection when connected to pool between disconnection
    connectionTimeoutMillis:1000//connection time for a use rto be given a connection
})

//function responsible for assigning connections to users via a pool and reuse them 
export default async function Pl(req,res){
try{
const us=await conf.connect();
const{user}=req;
if(!user||String(user).length>10){
    console.log("enter valid user")
    return 409;
}
//the loop below is a validation search that filters all character from user string to 
//ensure user input is of alphabets and numbers any character is denied
//the output of the loop should match the length of the user string to proceed else will be considered inavlidated
var x=0;
const p=[];
const val=String(user);
while(x<val.length){
    if((val.charAt(x)>='a' && val.charAt(x)<='z')||(val.charAt(x)>='a' && val.charAt(x)<='z')
    ||(val.charAt(x)>=1 && val.charAt(x)<=9))
{
    p[x]=val.charAt(x);

}
else{
    console.log("invalid user")
    break;
}
x++;
}

//condition statement that checks validity of the output of the loop and the user input if lengths match are validated else are invalid and connection is denied
if(p.length==val.length){
console.log("user syntax correct");

//query replaces the connection fetched from the pool with the existing user from the database
await us.query(`set session authorization ${String(user)}`)

return 200;
}
else{
    console.log("user string invalidated")
}

}
catch(error){
    
    console.log("error is "+ error)
    return 500;
}

}