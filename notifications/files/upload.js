import * as Minio from "minio";


const create=new Minio.Client({
endPoint:"",
port:43857,
accessKey:"",
secretKey:"",
useSSL:false
})

export default async function Min(){
// await create.bucketExists("images");
await create.makeBucket("images");
await create.putObject("images",'json',JSON.stringify({age:10})).then((data)=>{
    console.log("success "+data)
}).catch((error)=>{console.log(error)});
}