
import { useEffect, useState } from "react"
import { supabase } from "../auth/supabase";
import { connect } from "../axios/axios";
export default function Register(){
    const [form,setform]=useState({email:"",password:""})
    const[profile,setprofile]=useState({first_name:"",last_name:"",staff_role:"",
        branch:"",staff_id:""})
    const[category,setcategory]=useState({hardware:false,networking:false,software:false,security:false})
    const form_change=(e)=>{
        const{name,value}=e.target;
        setform((data)=>({
            ...data,
            [name]:value
        }))
    }
    const profile_change=(e)=>{
        const{name,value}=e.target;
        setprofile((data)=>({
            ...data,
            [name]:value
        }))   
    }
    const category_change=(e)=>{
        const {name,checked}=e.target; 
        if(checked){
            setcategory((data)=>({
            ...data,
            [name]:name
        }))
        }else{
            setcategory((data)=>({
            ...data,
            [name]:checked
        }))
        }
        
    }
    useEffect(()=>{
         if(profile.staff_role!="STAFF"){
            setcategory({hardware:false,software:false,security:false,networking:false})
        }
    },[profile.staff_role])
    const submit=async(e)=>{
        e.preventDefault();
       await connect.post('/register',{
        email:form.email,password:form.password,branch:profile.branch
        ,first_name:profile.first_name,last_name:profile.last_name,staff_id:profile.staff_id,
        staff_role:profile.staff_role,category:category,
       }).then((data)=>{
        alert("user created");
        console.log(data.status);
       })
    
    }
    return(
        <>
        <form>
            <label>STAFF ID</label>
            <input type="text" placeholder="enter staff id" value={profile.staff_id} name="staff_id" onChange={profile_change}/>
            <label>First Name</label>
            <input type="text" placeholder="enter first name" value={profile.first_name} name="first_name" onChange={profile_change}></input>
            <label>Last Name</label>
            <input type="text" placeholder="enter last name" value={profile.last_name} name="last_name" onChange={profile_change}/>
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={form_change} placeholder="enter email"/>
            <label>Password</label>
            <input type="password" name="password" onChange={form_change} value={form.password}/>
            <label>Select Role</label>
            <select onChange={profile_change} name="staff_role">
                <option value={""}>Choose a role</option>
                <option value={"WORKER"}>WORK STAFF</option>
                <option value={"STAFF"}>ICT STAFF</option>
            </select>
            <select onChange={profile_change} name="branch">
                <option value={""}>Choose a branch</option>
                <option value={"kisumu"}>Kisumu</option>
                <option value={"nairobi"}>Nairobi</option>
                <option value={"mombasa"}>Mombasa</option>
            </select>
            {profile.staff_role=="STAFF"?
            <>
            <input type="checkbox" name="networking" value={category.networking} onChange={category_change}></input>
            Networking
            <input type="checkbox" name="hardware" value={category.hardware} onChange={category_change}></input>
            Hardware
            <input type="checkbox" name="software" value={category.software} onChange={category_change}/>
            Software
            <input type="checkbox" name="security" value={category.security} onChange={category_change}></input>
            Security
            </>:
            ""}
            <button type="button" onClick={submit}>View</button>
            
        </form>
        </>
    )
}