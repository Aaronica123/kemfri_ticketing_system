import {createClient}from "@supabase/supabase-js"
// import {configDotenv}from "dotenv"
// configDotenv();

export  const supabase=createClient(import.meta.env.VITE_API_URL,import.meta.env.VITE_API_KEY)

