import { useState } from "react"

export default function Input(){
    const [file,setfile]=useState({input:null});
    const [input,setinput]=useState({email:"",password:""})
    const input_change=(e)=>{
        const {name,value}=e.target;
        setinput((data)=>({
            ...data,
            [name]:value
        }))
    }
    

    const change=(e)=>{
        const filea=e.target.files;
        setfile({input:filea})
    }
    
    const click=async(e)=>{
        e.preventDefault();
        console.log(file.input.length)
        if(file.input.length>=3){
            alert("number of images allowed exceeded")
            // setfile({input:null})
        }
        const fill=new FormData();
        var x=0
        while(file.input.length>=x){
             fill.append('files',file.input[x]);
             x++;
        }
       
        // console.log(file.input);
        
        console.log(fill.get('fle'))
        await fetch('http://localhost:3002/images_up',{
            method:"POST",
            body:fill
        })
        
    }
    return(
        <>
        <p>Select file</p>
        <span style={{width:"100%",background:"blue 90%",height:"100%"}}>
        <input type="file" multiple placeholder="select file" name="input" onChange={change} />
        </span>
        <button type="button" onClick={click}>Check type</button>
        <form>
            <label>EMail</label>
            <input type="email" value={input.email} name="email" onChange={input_change} placeholder="email"/>
            <label>Password</label>
            <input type="password" value={input.password} name="password" onChange={input_change} placeholder="password"/>
            <button type="button">Check Credentials</button>
        </form>
        </>
    )
}