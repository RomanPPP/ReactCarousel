import { createContext } from "react"

const SizeContext = createContext({
    margin : 0, with : 0, height : 0
})
const ItemsContext = createContext({
    array : []
})
export {SizeContext, ItemsContext}