import React, { useContext } from "react"
import { SizeContext } from "./context"

const Item = () => {
    const {size} = useContext(SizeContext)
    const style = {
        display : 'block',
        height : size.height*0.9,
        minWidth : size.width * 0.8,
        backgroundColor : 'black',
        marginLeft : size.width * 0.2,
        marginRight : size.width * 0.2
    }
    return <div className = "item" style = {style}>
        
    </div>
}
export default Item