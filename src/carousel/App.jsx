import React, {useState, useEffect, useRef,  useContext} from "react"

import { SizeContext } from "./context"
import Carousel from "./components/Carousel.jsx"
const SizeProvider = ({children}) =>{
    const [size, setSize] = useState({width : 0, height : 0, margin : 0})
    return <SizeContext.Provider value = {{size, setSize}}>
        {children}
    </SizeContext.Provider>
}


const App = ({items}) =>
        <SizeProvider>
            <Carousel items = {items} relativeItemSize = {{relWidth : 0.5, relHeight : 0.9}}></Carousel>
        </SizeProvider>
export default App