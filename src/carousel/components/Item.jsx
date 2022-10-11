import React, { useContext } from "react"
import { SizeContext } from "../context"

const Item = () => {
    const {size} = useContext(SizeContext)
    const {width, height, margin} = size
    const style = {
        display : 'block',
        height : height,
        minWidth : width,
        backgroundColor : 'black',
        marginLeft : margin,
        marginRight : margin
    }
    return <div className = "item" style = {style}>
        
    </div>
}
export default Item