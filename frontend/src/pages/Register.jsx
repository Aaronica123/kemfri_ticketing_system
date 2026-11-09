
import { useEffect, useState } from "react"
import { supabase } from "../auth/supabase";
import { connect } from "../axios/axios";
import { Button, Card, Spinner } from "@radix-ui/themes/dist/cjs/index.js";
import { useNavigate } from "react-router-dom";
export default function Register(){
    const nav=useNavigate()
    
    const [form,setform]=useState({email:"",password:""})
    const[load,setload]=useState(false)
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
        setload(true)
        try {
            
        
        e.preventDefault();
       await connect.post('/register',{
        email:form.email,password:form.password,branch:profile.branch
        ,first_name:profile.first_name,last_name:profile.last_name,staff_id:profile.staff_id,
        staff_role:profile.staff_role,category:category,
       }).then((data)=>{
        alert("user created");
        console.log(data.status);
       })
       setload(false) 
       } catch (error) {
        alert("failed to register user")
           setload(false) 
        }
    
    }
    const labelStyle = {
  fontSize: "0.78rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "#2c4c6e",
  margin: 0,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
};

const inputStyle = {
  width: "100%",
  padding: "0.7rem 1rem",
  fontSize: "0.95rem",
  fontFamily: "'Inter', sans-serif",
  background: "#ffffff",
  border: "1.5px solid #e2e9f2",
  borderRadius: "14px",
  color: "#0a2647",
  outline: "none",
  fontWeight: 400,
  boxSizing: "border-box",
};

const checkboxLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.92rem",
  fontWeight: 500,
  color: "#1e3b5c",
  cursor: "pointer",
};

const checkboxStyle = {
  width: "1.1rem",
  height: "1.1rem",
  accentColor: "#1e6dc7",
  cursor: "pointer",
};
    return(
        <>
      <div style={{
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f2f5f9",
  fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  padding: "1.5rem",
  margin: 0,
}}>
  <Card
    size={"3"}
    style={{
      width: "100%",
      maxWidth: "620px",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      padding: "2.5rem 2.25rem",
      borderRadius: "28px",
      background: "#ffffff",
      boxShadow: "0 20px 35px -8px rgba(0,20,40,0.12), 0 10px 15px -6px rgba(0,0,0,0.03)",
      border: "1px solid rgba(255,255,255,0.6)",
      boxSizing: "border-box",
    }}
  >
    <div style={{ marginBottom: "0.25rem" }}>
      <h2 style={{
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "#1e3b5c",
        margin: 0,
        letterSpacing: "-0.01em",
      }}>
        Register a user
      </h2>
      <p style={{
        fontSize: "0.85rem",
        fontWeight: 400,
        color: "#7a92ab",
        margin: "0.35rem 0 0 0",
      }}>
        Fill in the details below to create a new staff account.
      </p>
    </div>
    <div style={{
      display: "grid",
      gridTemplateColumns: "140px 1fr",
      gap: "1rem 1rem",
      alignItems: "center",
    }}>
      <label style={labelStyle}>STAFF ID</label>
      <input
        type="text"
        placeholder="enter staff id"
        value={profile.staff_id}
        name="staff_id"
        onChange={profile_change}
        style={inputStyle}
      />

      <label style={labelStyle}>First Name</label>
      <input
        type="text"
        placeholder="enter first name"
        value={profile.first_name}
        name="first_name"
        onChange={profile_change}
        style={inputStyle}
      />

      <label style={labelStyle}>Last Name</label>
      <input
        type="text"
        placeholder="enter last name"
        value={profile.last_name}
        name="last_name"
        onChange={profile_change}
        style={inputStyle}
      />

      <label style={labelStyle}>Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={form_change}
        placeholder="enter email"
        style={inputStyle}
      />

      <label style={labelStyle}>Password</label>
      <input
        type="password"
        name="password"
        onChange={form_change}
        value={form.password}
        placeholder="enter password"
        style={inputStyle}
      />

      <label style={labelStyle}>Select Role</label>
      <select onChange={profile_change} name="staff_role" style={inputStyle}>
        <option value={""}>Choose a role</option>
        <option value={"WORKER"}>WORK STAFF</option>
        <option value={"STAFF"}>ICT STAFF</option>
      </select>

      <label style={labelStyle}>Branch</label>
      <select onChange={profile_change} name="branch" style={inputStyle}>
        <option value={""}>Choose a branch</option>
        <option value={"kisumu"}>Kisumu</option>
        <option value={"nairobi"}>Nairobi</option>
        <option value={"mombasa"}>Mombasa</option>
      </select>
    </div>

    {profile.staff_role == "STAFF" && (
      <div style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: "1rem",
        alignItems: "start",
      }}>
        <span style={labelStyle}>Categories</span>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.25rem 1.75rem",
        }}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="networking"
              value={category.networking}
              onChange={category_change}
              style={checkboxStyle}
            />
            Networking
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="hardware"
              value={category.hardware}
              onChange={category_change}
              style={checkboxStyle}
            />
            Hardware
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="software"
              value={category.software}
              onChange={category_change}
              style={checkboxStyle}
            />
            Software
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="security"
              value={category.security}
              onChange={category_change}
              style={checkboxStyle}
            />
            Security
          </label>
        </div>
      </div>
    )}

    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
      {load ? (
        <Button variant="outline" color="blue">
          <Spinner></Spinner> Registering
        </Button>
      ) : (
        <Button variant="classic" color="blue" onClick={submit}>
          Register
        </Button>
      )}
      <Button variant="outline" color="brown" onClick={() => nav('/')}>
        Back
      </Button>
    </div>
  </Card>
</div>
        </>
    )
}