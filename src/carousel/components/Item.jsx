import React, { useContext, useEffect, useRef } from "react"
import { SizeContext, ItemsContext } from "../context"

const Item = ({id, primitive}) => {
    const {size} = useContext(SizeContext)
    const array = useContext(ItemsContext)
    const {width, height, margin} = size

    const item = useRef(null)

    const style = {
        display : 'block',
        height : height,
        minWidth : width,
        marginLeft : margin,
        marginRight : margin,
        border : '1px solid black'
    }

    useEffect(() => {
        array.push({element : item.current, primitive})
    }, [])
    return <div ref = {item} className = "item" id = {id} style = {style}>
        
    </div>
}
export default Item