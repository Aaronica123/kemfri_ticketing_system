import { Button, Card, Spinner } from "@radix-ui/themes/dist/cjs/index.js";
import { Load_button } from "../ui/buttons";
import { Head_Text } from "../ui/text";
import Main_Text from "../ui/text";
import { Input_Field } from "../ui/text";
import Execute_Button from "../ui/buttons";
import { Avatar } from "@radix-ui/themes/dist/cjs/index.js";
import { Toast_use } from "../ui/toast";
import { Separator } from "@radix-ui/themes/dist/cjs/index.js";
import con from "../axios/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "@radix-ui/themes/dist/cjs/index.js";
import { Heading } from "@radix-ui/themes/dist/cjs/index.js";
import { TextField } from "@radix-ui/themes/dist/cjs/index.js";
import {useMediaQuery} from "react-responsive";
import { supabase } from "../auth/supabase";
// import { set } from "../auth/hold.js";
// import UserManager from "../auth/hold.js";
// import { Load_button } from "../ui/buttons";
export default function Login_form(){
    // const {set_q}=Toast_use();
    // const x=()=>{
    //     console.log("Clicked");
    //     set_q(true,"Logging In");
    // }
   // const [track,settrack]=useState({fetched:null,failed:null});
   
    const [loading,setload]=useState(false);
    const nav=useNavigate();
    const [form_,setform]=useState({email:"",password:""})
    const check=(e)=>{
       const{name,value}=e.target
       setform((data)=>({
        ...data,
        [name]:value
       }))
    }
    const min=useMediaQuery({maxWidth:"768px"})

    const login=async(e)=>{
        e.preventDefault();
        if(!form_.email||!form_.password){
            alert("Enter all fields")
            return;
        }
        const {data,error}=await supabase.auth.signInWithPassword({email:form_.email,password:form_.password});
        if(data?.user){
            localStorage.setItem('firstname',data.user.user_metadata.first_name);
            alert("Log In Successful")
            nav('/submit')
            return;
        }
        else{
            alert("An error occured");
            console.log(error);
            return;
        }
    }
    async function connect(e){
        
        e.preventDefault();
        setload(true);
        await con().post("/login",{email:form_.email,password:form_.password}).then((data)=>{
            console.log(data.status);
            setload(false);
            alert("successfully received");
            localStorage.setItem('firstname',data.data.data.name)
            // UserManager.set(data.data.data.user_id)
            nav('/submit');
            // settrack(()=>({
            //     failed:false,
            //     fetched:true
            // }))
        

        }).catch((error)=>{
            // settrack(()=>({
            //     failed:true,
            //     fetched:false
            // }))
            console.log(error);
            setload(false);
            if(error.status==405){
                alert("Check input")
            }
            else if(error.status==404){
                alert("User not found")
            }
            else if(error.status==402){
                alert("Enter all fields")
            }
            else {
                alert("Contact admin cannot login")
            }
            
            
            
        })
    }
    
    
    
    return(
    <>
    <div style={{width:"100vw",height:"100vh",boxSizing:"border-box",display:"flex",
        flexDirection:"row",justifyContent:"center",alignItems:"center",background:"whitesmoke 80%"}}>
        {/* <div style={{width:"fit-content",height:"fit-content", justifyContent:"center",
            alignItems:"center"
        }}> */}
            <Card size={"1"} variant="ghost" style={{width:min?"100%":"50%", height:"fit-content",
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center',
                gap:"15px"
            }}>
                {/* <div style={{width:"100%",height:"fit-content",display:"flex", alignItems:"center",
                    justifyContent:"center"}}>
                    <Avatar size={"5"} src="" fallback="KM" variant="solid" radius={"large"}>
                    </Avatar>
                </div> */}
                <div style={{width:"100%",height:"fit-content",display:"flex",
                    alignItems:"center", flexDirection:"column",flexWrap:"wrap",gap:"8px",marginBottom:"5px"}}>
                    {/* <Head_Text>Welcome to KEMFRI Login</Head_Text> */}
                    <Text weight={"medium"} style={{width:"100%",fontSize:"16px",color:"blue"}}>Staff Portal</Text>
                    <Heading style={{width:"100%",fontSize:"28px",fontWeight:"Bold",fontFamily:"sans-serif", color:"black"}}>Login</Heading>
                    <Text weight={"light"} style={{width:"100%",fontSize:"14px",color:"#6B7280"}}>Welcome To Kemfri Ticketing System</Text>
                    {/* <Main_Text>Login To Continue</Main_Text> */}
                </div>
                <Separator size={"4"} orientation={"horizontal"}/>
                <div style={{ width:"100%",height:"fit-content",flexDirection:"column",display:"flex",
                justifyContent:"left",gap:"25px"
                }}>
                    <div style={{width:"100%",height:"fit-content",flexDirection:"column",display:'flex',
                        justifyContent:"left",gap:"8px"
                    }}>
                        <Text weight={"medium"} style={{width:"100%",fontSize:"14px"}}>Email</Text>
                        <TextField.Root type="email" required size={"3"} placeholder="Enter email" 
                        value={form_.email} name="email" onChange={check}
                        style={{width:"100%",fontSize:"16px",color:"black",background:"#e6e6e6e4 70%"}}>
                        </TextField.Root>
                        {/* <Input_Field placeholder={"ENTER STAFF"} type={"text"} max={50} value={form_.email} name="email" change={check}></Input_Field> */}
                    </div>
                     <div style={{width:"100%",height:"fit-content",flexDirection:"column",display:'flex',
                        justifyContent:"left",gap:"8px"
                    }}>
                        <Text weight={"medium"} style={{width:"100%",fontSize:"14px"}}>Password</Text>
                        <TextField.Root type="password" required size={"3"} placeholder="Enter password"
                        value={form_.password} name="password" onChange={check} style={{width:"100%",fontSize:"16px",color:"black",background:"#e6e6e6e4 70%"}}>
                        </TextField.Root>
                        {/* <Input_Field placeholder={"ENTER STAFF"} type={"text"} max={50} value={form_.email} name="email" change={check}></Input_Field> */}
                    </div>
                </div>
                {loading? 
                <div style={{width:"100%", height:"fit-content",display:"flex",alignItems:"center",marginTop:"15px"}}>
                    
                    <Button radius="medium" size={"3"} variant="classic" color="blue" style={{width:"100%",justifyContent:"center",cursor:"none"}}><Spinner></Spinner><Text weight={"medium"} color="white" size={"5"}>Logging In</Text></Button>
                </div>
                :
                <div style={{width:"100%", height:"fit-content",display:"flex",alignItems:"center",marginTop:"15px"}}>
                    <Button radius="medium" size={"3"} variant="classic" type={"button"} onClick={login} color="blue" style={{cursor:"pointer",width:"100%",justifyContent:"center"}}><Text weight={"medium"} color="white" size={"5"}>Log In</Text></Button>
                    {/* <Execute_Button color="teal" variant={"classic"} type={"button"} onClick={connect}>Login</Execute_Button> */}
                </div>
}
            </Card>
        </div>
    {/* </div> */}
    </>)
}