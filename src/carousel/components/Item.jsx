import React, { useContext } from "react"
import { SizeContext} from "../context"

const Item = ({id}) => {
    const {size} = useContext(SizeContext)
    
    const {width, height, margin} = size
    
    const style = {
        display : 'block',
        height : height,
        minWidth : width,
        marginLeft : margin,
        marginRight: margin,
        
    }

    return <div className = "item" id = {id} style = {style}></div>
}
export default Item