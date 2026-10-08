import {createClient} from "@supabase/supabase-js"
import { configDotenv } from "dotenv"
configDotenv()

export const client=createClient(process.env.url,process.env.api_key);