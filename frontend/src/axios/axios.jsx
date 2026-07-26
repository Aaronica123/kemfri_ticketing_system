
import axios from "axios";

const connect=axios.create({
baseURL:"http://localhost:3001",
headers:{
    "Content-Type":"application/json"
},
withCredentials:true
})
export default function con(){
    
    return connect;
}

