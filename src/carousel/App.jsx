import React, {useState} from "react"

import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./themes";



import { SizeContext, ItemsContext } from "./context"
import Carousel from "./components/Carousel.jsx"
const SizeProvider = ({children}) =>{
    const [size, setSize] = useState({width : 0, height : 0, margin : 0})
    return <SizeContext.Provider value = {{size, setSize}}>
        {children}
    </SizeContext.Provider>
}


const App = ({items, resizeCanvas, renderItems, relativeItemSize}) =>
        <ThemeProvider theme = {theme}>
            <CssBaseline enableColorScheme>
                <ItemsContext.Provider value = {renderItems}>
                    <SizeProvider>
                        <Carousel items = {items} relativeItemSize = {relativeItemSize} resizeCanvas = {resizeCanvas}></Carousel>
                    </SizeProvider>
                </ItemsContext.Provider>
            </CssBaseline>
        </ThemeProvider>
export default App