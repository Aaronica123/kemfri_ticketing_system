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
import Header_txt, { Child_text1, Child_text3, Label_txt } from "../../reusable/text";
import {toast} from "sonner"
import { Bell } from "lucide-react";
import { ExclamationMark,SquareExclamationPoint } from "lucide-react";
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
        setload(true)
        e.preventDefault();
        if(!form_.email||!form_.password){
            alert("Enter all fields")
            setload(false);
            return;
        }
        const {data,error}=await supabase.auth.signInWithPassword({email:form_.email,password:form_.password});
        if(data?.user){
            setload(false)
            localStorage.setItem('firstname',data.user.user_metadata.first_name);
            alert("Log In Successful")
            toast(
  <div style={{display:"flex",flexDirection:"row",alignItems:"center", gap:"10px",}}>
  <Bell color="#2362DF"></Bell>       
  <div style={{width:"fit-content",display:"flex",flexDirection:"column"}}>
  Success Login
  <Child_text1>User Authenticated</Child_text1>
  </div>
  </div>,{position:"top-right",action:{label:"Close",onClick:()=>{}},actionButtonStyle:{background:"#FFFFFF",color:"#2362DF",},
  style:{background:"#EDF4FF",border:"1px solid #C7DBFF"}});
            nav('/submit')
            return;
        }
        else{
            setload(false);
            
            toast(
  <div style={{display:"flex",flexDirection:"row",alignItems:"center", gap:"10px",}}>
  <SquareExclamationPoint color="#2362DF"></SquareExclamationPoint>       
  <div style={{width:"fit-content",display:"flex",flexDirection:"column"}}>
  <Text weight={"bold"} style={{fontFamily:"Inter"}}>Failed to Login</Text>
  <Child_text1></Child_text1>
  <Child_text3>Check Login Details</Child_text3>
  </div>
  </div>,{position:"top-right",action:{label:"Close",onClick:()=>{}},actionButtonStyle:{background:"#FFFFFF",color:"#2362DF",},
  style:{background:"#EDF4FF",border:"1px solid #C7DBFF"}});
            console.log(error);
            return;
        }
    }
    // async function connect(e){
        
    //     e.preventDefault();
    //     setload(true);
    //     await con().post("/login",{email:form_.email,password:form_.password}).then((data)=>{
    //         console.log(data.status);
    //         setload(false);
    //         alert("successfully received");
    //         localStorage.setItem('firstname',data.data.data.name)
    //         // UserManager.set(data.data.data.user_id)
    //         nav('/submit');
    //         // settrack(()=>({
    //         //     failed:false,
    //         //     fetched:true
    //         // }))
        

    //     }).catch((error)=>{
    //         // settrack(()=>({
    //         //     failed:true,
    //         //     fetched:false
    //         // }))
    //         console.log(error);
    //         setload(false);
    //         if(error.status==405){
    //             alert("Check input")
    //         }
    //         else if(error.status==404){
    //             alert("User not found")
    //         }
    //         else if(error.status==402){
    //             alert("Enter all fields")
    //         }
    //         else {
    //             alert("Contact admin cannot login")
    //         }
            
            
            
    //     })
    // }
    
    
    
    return(
    <>
    <div style={{width:"100vw",height:"100vh",boxSizing:"border-box",display:"flex",
        flexDirection:"row",justifyContent:"center",alignItems:"center",background:"#F7FBFE"}}>
        {/* <div style={{width:"fit-content",height:"fit-content", justifyContent:"center",
            alignItems:"center"
        }}> */}
        <div style={{padding:"10px",width:'100%',height:"100%",display:"flex",position:"relative" }}>
            <img src="im2.png" style={{width:"100%",height:"100%",borderRadius:"10px"}}/>
            {/* <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      borderRadius:"10px",
      background:
        "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(54, 70, 238, 0.9) 100%)",
    }}
  ></div> */}
        </div>
        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column"}}>
            {/* <div style={{padding:"10px",width:"100%",height:"fit-content",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Text weight={"regular"}size={"4"} style={{fontFamily:"Inter", color:"#102E49"}}>Aqua System</Text>
            </div> */}
            <div style={{width:"100%",height:'100%',display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Card variant="ghost" style={{width:"448px",height:"400px",display:'flex',flexDirection:"column",gap:"15px"}}>
                     <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column"}}>
                        <Text weight={"bold"} size={"2"} style={{fontFamily:"Inter",color:"#0865C4"}}>
                            {String("Kenya Marine And Fisheries Research Institute").toUpperCase()}
                        </Text>
                     </div>
                    <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column"}}>
                        <Header_txt>Welcome back</Header_txt>
                        <Child_text1>The following login to create data</Child_text1>
                    </div>
                    <div style={{marginTop:"20px",width:"100%",height:"fit-content",display:"flex",flexDirection:"column",gap:"15px"}}>
                    <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column",gap:"5px"}}>
                        <Label_txt>Email</Label_txt>
                        <TextField.Root size={"2"} name="email" onChange={check} value={form_.email} color="blue" style={{width:'100%',border:"1px #CBDCE8 solid",padding:"8px"}} type="email"></TextField.Root>
                    </div>
                    <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column",gap:"5px"}}>
                        <Label_txt>Password</Label_txt>
                        <TextField.Root size={"2"}  color="blue" onChange={check} name="password" value={form_.password} required style={{width:'100%',border:"1px #CBDCE8 solid",padding:"8px"}} type="password"></TextField.Root>
                    </div>
                    </div>
                    <div style={{marginTop:"20px",width:"100%",height:"fit-content",display:"flex",flexDirection:"column",gap:"10px"}}>
                        <button onClick={login} type="button" style={{width:"100%",backgroundColor:"#0865C4",padding:"8px",borderRadius:"8px",justifyContent:"center",alignItems:"center"}}>
                            {loading?<Text weight={"regular"} size={"4"} style={{fontFamily:"Inter",color:"#FFFFFF",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"5px"}}>
                                
                               <Spinner></Spinner> 
                                Logging In</Text>:
                            <Text weight={"regular"} size={"4"} style={{fontFamily:"Inter",color:"#FFFFFF"}}>
                                Login</Text>
}
                            </button>
                    
                    <div
                    style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column",gap:"5px", justifyContent:"center",alignItems:"flex-end"}}
                    >
<Text size={"3"} style={{fontFamily:"Inter",color:"#0865C4",fontWeight:"bold"}}>
                           Create an account
                        
                        </Text>
                    </div>
                    </div>
                </Card>
            </div>
            
        </div>
           
        </div>
    {/* </div> */}
    </>)
}