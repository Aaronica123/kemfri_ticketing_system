import { DBcache } from "../connection/pool.js";

export default async function PriorityGetCache(req,res){
try{
var data_priroity=null
await DBcache.connect().then(()=>{console.log("done")};
await DBcache.json.get('priority').then((data)=>{
if(data){
    data_priroity=data
}
})
if(data_priroity){
    return {status:200,data:data_priroity};
}else{
return {status:400,data:null} 
}

}
catch(error){
    console.log(error);
}
}
export async function PrioritySetCache(data) {
    try{
        await DBcache.connect();
        await DBcache.json.set("priority","$",`${data}`);
        return {status:200}
    }
    catch(error){
        console.log(error);
        return {status:500,error:error};
    }
    
}

export async function CategoryGetCache(){
try{
    await DBcache.connect();
    var result=null
    await DBcache.json.get('category').then((data)=>{
        if(data){
        result=data;
        }
        else {
            result=null
        }
    })
    console.log("result is" + result)
    if(result!=null){
        return {status:200,data:result}
    }
    else{
        return {status:404,data:null}
    }
}
catch(error){
    console.log(error);
    return {status:500,error:error}
}
}

export  async function CategroySetCache(data){
    try{
        await DBcache.connect();
        await DBcache.json.set("category","$",`${data}`)
        return {status:200}
    }
    catch(error){
        return {status:500,error:error}
        
    }

}
