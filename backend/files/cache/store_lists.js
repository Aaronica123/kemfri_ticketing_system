import { conf } from "../connection/redis.js";

export default async function PriorityGetCache(){
try{
var data_priroity=null
const result=await conf.execute(async(config)=>{
await config.json.get('priority').then((data)=>{
if(data){
    data_priroity=data;
    console.log(data_priroity[0])
}
})
if(data_priroity){
    console.log("data is "+data_priroity[0])
	const data=data_priroity
    return {status:200,data};
}else{
return {status:400,data:null} 
}
})
return result;
}
catch(error){
    console.log(error);
}
}
export async function PrioritySetCache(data) {
    try{

  const result=await conf.execute(async(config)=>{
        console.log(data)
        await config.json.set("priority","$",data);
        return {status:200}
        })
        return result;
    }
    catch(error){
        console.log(error);
        return {status:500,error:error};
    }
    
}

export async function CategoryGetCache(){
try{
    var result=null
    const feedback=await conf.execute(async(config)=>{
    await config.json.get('category').then((data)=>{
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
    })
    return feedback;
}
catch(error){
    console.log(error);
    return {status:500,error:error}
}
}

export  async function CategroySetCache(data){
    try{

const result=await conf.execute(async(config)=>{


      //  await DBcache.connect();
        await config.json.set("category","$",data)
        return {status:200}
    })
return result;
}
    catch(error){
        return {status:500,error:error}
        
    }

}
