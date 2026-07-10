import { Button } from "@radix-ui/themes/dist/cjs/index.js";
import { Spinner } from "@radix-ui/themes/dist/cjs/index.js";
export default function Execute_Button({children,onClick,color,variant,type}){
    return(<>
    <Button style={{width:"100%",height:"fit-content",display:"flex"}} type={type}
    variant={variant} color={color} onClick={onClick} size={"4"}
    >{children}</Button>
    </>)
}
export function Load_button(){
    return(
        <>
        <Button size="4" style={{width:"fit-content",height:"fit-content",display:"flex"}} variant="outline" highContrast color="bronze">
            <Spinner loading></Spinner>Loading...</Button>
        </>
    )
}
export function Nav_button({children,variant}){
    
    return(
        <>
        <Button size={"4"} class="hover:bg-red"variant={variant} color="green"  highContrast style={{width:"fit-content",height:"fit-content",display:"flex",transition:"1s,ease-in"}}>
            {children}
        </Button>
        </>
    )

}