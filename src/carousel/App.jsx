import React, {useState, useEffect, useRef,  useContext} from "react"
import Bar from "./Bar.jsx"

import { SizeContext } from "./context/index.js"


const SizeProvider = ({children}) =>{
    const [size, setSize] = useState({width : 0, height : 0})
    return <SizeContext.Provider value = {{size, setSize}}>
        {children}
    </SizeContext.Provider>
}

const carouselStyle = {
    height : '400px',
    width : '600px',
    overflow: 'hidden',
    border: '1px solid black',
    display : 'flex',
    flexDirection: 'column',
    justifyContent : 'center'
}

const Wrapper = ({items}) =>{
    const [num, setNum] = useState(0)
    const {size, setSize} = useContext(SizeContext)
    const carouselFrame = useRef(null)

    const scroll = (offset) => () => setNum(num + offset)
    

    useEffect(()=>{
        const rect = carouselFrame.current.getBoundingClientRect()
        const {width, height} = rect
        setSize({width, height})
        
    }, [])
    return (
            <>
                <div ref = {carouselFrame} style = {carouselStyle} className = 'carousel'>
                        <Bar items = {items} xOffset = {num}></Bar>
                </div>
                <button onClick = {scroll(-1)}>prev</button>
                <button onClick={scroll(1)}>next</button>
            </>
        )
}

const App = ({items}) =>
   <SizeProvider>
    <Wrapper items = {items}></Wrapper>
   </SizeProvider>
export default App