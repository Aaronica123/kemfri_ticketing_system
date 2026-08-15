import { conf } from "../connection/redis.js";

export default async function PriorityGetCache(req,res){
try{
var data_priroity=null
await conf.connect().then(()=>{console.log("done")});
await conf.json.get('priority').then((data)=>{
if(data){
    data_priroity=data
}
})
if(data_priroity){
	const data=data_priroity
    return {status:200,data};
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
  await conf.connect().then(()=>{console.log("done")});

        await conf.json.set("priority","$",`${data}`);
        return {status:200}
    }
    catch(error){
        console.log(error);
        return {status:500,error:error};
    }
    
}

export async function CategoryGetCache(){
try{
await conf.connect().then(()=>{console.log("done")});
    //await DBcache.connect();
    var result=null
    await conf.json.get('category').then((data)=>{
        if(data){
        result=data;
        }
        else {
            result=null
        }
    })
    console.log("result is" + result)
    if(result!=null){
	const data=result
        return {status:200,data}
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
await conf.connect().then(()=>{console.log("done")});
      //  await DBcache.connect();
        await conf.json.set("category","$",`${data}`)
        return {status:200}
    }
    catch(error){
        return {status:500,error:error}
        
    }

}
