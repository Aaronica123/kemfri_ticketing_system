import { TextField,Text,Heading } from "@radix-ui/themes/dist/cjs/index.js";

export default function Main_Text({children,color}){
    return(<>
    <Text size="5" weight={"medium"} color={color?color:""} style={{fontFamily:"ui-sans-serif",width:"fit-content",height:"fit-content",display:"flex",flexDirection:"row",flexWrap:"nowrap"}}>
        {children}
    </Text>
    </>)
}
export function Input_Field({placeholder,type,max}){
    return(
        <>
        <TextField.Root type={type} maxLength={max} placeholder={placeholder} 
        style={{width:"100%",height:"fit-content",display:"flex", padding:"5px"}}
        className="frm"
        required>
        </TextField.Root>
        </>
    )
}
export function Head_Text({children}){
    return(
        <>
        <Heading size={"5"} weight={"regular"} style={{width:"100%", height:"fit-content",
            display:"flex",justifyContent:"left",alignItems:"center",fontFamily:"ui-sans-serif"}}>
                {children}
            </Heading>
        </>
    )

}
export function Head_Mess({children}){
    return (<>
    <Heading size={"7"} weight={"regular"} style={{width:"100%", height:"fit-content",
            display:"flex",justifyContent:"left",alignItems:"center",fontFamily:"ui-sans-serif"}}>
                {children}
            </Heading>
    </>)
}