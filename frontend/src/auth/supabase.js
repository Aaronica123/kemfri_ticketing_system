import {createClient}from "@supabase/supabase-js"
// import {configDotenv}from "dotenv"
// configDotenv();

export  const supabase=createClient(import.meta.env.VITE_API_URL,import.meta.env.VITE_API_KEY)

export default async function login(values){

    const {data,error}=await supabase.auth.signInWithPassword({
    email:values.email,
    password:values.password
})
    if(data.user){
        console.log("exists")
    }
    else{
        console.log("not existing")
        console.log(error)
    }
    await supabase.auth.signOut().then(()=>{console.log("signed out")})
    .catch((error)=>{console.log(error)})
};

