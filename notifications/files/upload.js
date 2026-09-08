import * as Minio from "minio";
import fs from "fs";

const create=new Minio.Client({
endPoint:"caboose.proxy.rlwy.net",
port:43857,
accessKey:"kemfri",
secretKey:"Kemfri_123",
useSSL:false
})

export async function Upload(req,res){
    try {
    const{user,bdy}=req.body;
    const state=await create.bucketExists('clients')
    if(!state){
        await create.makeBucket('clients').then(()=>console.log("Bucket created"))
    }
    
    const size=Object.keys(bdy).length;
    await create.putObject('clients',user,JSON.stringify(bdy),size).then(()=>console.log("uploaded"))
    return res.status(200).json({message:"Success"})
}
catch(error){
    console.log(error);
}
}


export default async function Min(){
// await create.bucketExists("images");
// await create.makeBucket("images");
// await create.putObject("images",'json',JSON.stringify({age:10})).then((data)=>{
//     console.log("success "+data)
// }).catch((error)=>{console.log(error)});
const data=await create.getObject("images",'json')
const hold=[]
data.on('data',(dat)=>{
hold.push(dat);
})
data.on('end',()=>{
    console.log('ended stream')
    console.log(JSON.parse(Buffer.concat(hold).toString('utf-8')).age);
})
}