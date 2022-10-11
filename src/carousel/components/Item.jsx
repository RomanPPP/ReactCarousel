import React, { useContext, useEffect, useRef } from "react"
import { SizeContext, ItemsContext } from "../context"

const Item = ({id}) => {
    const {size} = useContext(SizeContext)
    const array = useContext(ItemsContext)
    const {width, height, margin} = size

    const item = useRef(null)

    const style = {
        display : 'block',
        height : height,
        minWidth : width,
        border : '1px solid black',
        marginLeft : margin,
        marginRight : margin
    }

    useEffect(() => {
        array.push(item.current)
    }, [])
    return <div ref = {item} className = "item" id = {id} style = {style}>
        
    </div>
}
export default Item