import { Text } from "@radix-ui/themes/dist/cjs/index.js";

export default function Header_txt({children}){
    return(
        <Text size={"8"} weight={"medium"} style={{fontFamily:"Inter",color:"#102E49"}}>{children}</Text>
    )
}
export function Child_text1({children}){
    return(
        <Text weight={"regular"} size={"2"} style={{fontFamily:"Inter",color:"#60798D"}}>
            {children}
        </Text>
    )
}
export function Child_text3({children}){
    return(
        <Text weight={"regular"} size={"1"} style={{fontFamily:"Inter",color:"#60798D"}}>
            {children}
        </Text>
    )
}
export function Child_text2({children}){
    return(
        <Text weight={"regular"} size={"3"} style={{fontFamily:"Inter",color:"#60798D"}}>
            {children}
        </Text>
    )
}
export function Label_txt({children}){
    return(
        <Text size={"4"} weight={"medium"} style={{fontFamily:"Inter",color:"#102E49"}}>{children}</Text>
    )
}