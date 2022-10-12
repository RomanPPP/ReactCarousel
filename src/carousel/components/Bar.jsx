import React, { useContext} from "react"


import Item from "./Item.jsx"
import { SizeContext } from "../context/index.js"

const Bar = ({xOffset, items}) =>{
    const {size} = useContext(SizeContext)
    const {width, margin} = size
    const style = {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        transform : `translateX(${xOffset * (width + 2 * margin)}px)`,
        transition: 'all 0.5s ease-in-out',
    }
    return <div className = "bar" style = {style}>
        {items.map(item => <Item key = {item.id} id = {`item${item.id}`} primitive = {item.primitive}></Item>)}
    </div>
}
export default Bar