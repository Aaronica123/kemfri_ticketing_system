import { Card } from "@radix-ui/themes/dist/cjs/index.js";
import { Load_button } from "../ui/buttons";
import { Head_Text } from "../ui/text";
import Main_Text from "../ui/text";
import { Input_Field } from "../ui/text";
import Execute_Button from "../ui/buttons";
import { Avatar } from "@radix-ui/themes/dist/cjs/index.js";
import { Toast_use } from "../ui/toast";
import { Separator } from "@radix-ui/themes/dist/cjs/index.js";
export default function Login_form(){
    const {set_q}=Toast_use();
    const x=()=>{
        console.log("Clicked");
        set_q(true,"Logging In");
    }
    return(
    <>
    <div style={{width:"100vw",height:"100vh",boxSizing:"border-box",display:"flex",
        flexDirection:"row",justifyContent:"center",alignItems:"center",background:"linear-gradient(90deg,rgba(81, 45, 188, 0.35), rgba(25, 34, 212, 0.35), rgba(62, 19, 217, 0.35))"}}>
        <div style={{width:"fit-content",height:"fit-content", justifyContent:"center",
            alignItems:"center"
        }}>
            <Card size={"4"} style={{width:"fit-content", height:"fit-content",
                display:"flex",flexDirection:"column",alignItems:"center",
                gap:"5px"
            }}>
                <div style={{width:"100%",height:"fit-content",display:"flex", alignItems:"center",
                    justifyContent:"center"}}>
                    <Avatar size={"5"} src="" fallback="KM" variant="solid" radius={"large"}>
                    </Avatar>
                </div>
                <div style={{width:"100%",height:"fit-content",display:"flex",
                    alignItems:"center", flexDirection:"column",flexWrap:"wrap",gap:"5px",marginBottom:"5px"}}>
                    <Head_Text>Welcome to KEMFRI Login</Head_Text>
                    <Main_Text>Login To Continue</Main_Text>
                </div>
                <Separator size={"4"} orientation={"horizontal"}/>
                <div style={{ width:"100%",height:"fit-content",flexDirection:"column",display:"flex",
                justifyContent:"left",gap:"25px"
                }}>
                    <div style={{width:"fit-content",height:"fit-content",flexDirection:"column",display:'flex',
                        justifyContent:"left",gap:"5px"
                    }}>
                        <Main_Text>STAFF ID</Main_Text>
                        <Input_Field placeholder={"ENTER USER ID"} type={"number"} max={5}></Input_Field>
                    </div>
                     <div style={{width:"fit-content",height:"fit-content",flexDirection:"column",display:'flex',
                        justifyContent:"left",gap:"5px"
                    }}>
                        <Main_Text>PASSWORD</Main_Text>
                        <Input_Field placeholder={"ENTER USER ID"} type={"password"} max={10}></Input_Field>
                    </div>
                </div>
                <div style={{width:"100%", height:"fit-content",display:"flex",alignItems:"center",marginTop:"15px"}}>
                    <Execute_Button color="teal" variant={"classic"} type={"button"} onClick={x}>Login</Execute_Button>
                </div>
            </Card>
        </div>
    </div>
    </>)
}