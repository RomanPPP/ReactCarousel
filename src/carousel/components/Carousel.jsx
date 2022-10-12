import React, {useRef, useState, useContext, useEffect} from "react"

import Button from '@mui/material/Button';
import Bar from "./Bar.jsx"
import { SizeContext, ItemsContext } from "../context/index.js";
import { Card } from "@mui/material";

const frameStyle = {
    height : '90%',
    overflow: 'hidden',
    
    display : 'flex',
    flexDirection: 'column',
    justifyContent : 'center',
    alignItems : 'flex-start',
}
const buttonBarStyle = {
    width : '100%',
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-evenly'
}
const carouselStyle = {
    height : '100%'
}

const getItemFrames = (items) => items.map(item =>{
                                    const {id, primitive} = item
                                    const element = document.getElementById(`item${id}`)
                                    
                                    return {...item, element}
                                })


const Carousel = ({items, relativeItemSize, resizeCanvas}) =>{
    const [num, setNum] = useState(0)
    const {setSize} = useContext(SizeContext)
    const _items = useContext(ItemsContext)
    const carouselFrame = useRef(null)
    const maxNum = 1 - items.length
    const scroll = (offset) => () => setNum(Math.min(0, Math.max(maxNum, num + offset)))
    const {relWidth, relHeight} = relativeItemSize

    function resize(){
        resizeCanvas()
        const rect = carouselFrame.current.getBoundingClientRect()
        const {width, height} = rect
        const itemWidth = width * relWidth
        const itemHeight = height * relHeight
        const margin = relWidth < 1 ? (width - itemWidth) / 2 : 0
        setSize({width : itemWidth, height : itemHeight, margin})
    }
    function updateItemFrames(){
        _items.array = getItemFrames(items)
    }
    useEffect(()=>{
        resize()
        updateItemFrames()
        window.addEventListener('resize', resize)
        window.addEventListener('resize', updateItemFrames)
        return ()=>{
            window.removeEventListener('resize', resize)
            window.removeEventListener('resize', updateItemFrames)
        }
    }, [])
    console.log('render')
    return (
            <Card variant = 'outlined' style = {carouselStyle} >
                <div ref = {carouselFrame} style = {frameStyle}>
                    <Bar items = {items} xOffset = {num}></Bar>    
                </div>
                <div style = {buttonBarStyle}> 
                    <Button disabled = {num === 0} onClick = {scroll(1)}>Prev</Button>
                    {`${-num + 1}/${items.length}`}
                    <Button disabled = {num === maxNum} onClick = {scroll(-1)}>Next</Button>
                </div>
            </Card>
        )
}

export default Carousel