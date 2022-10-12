
import ReactDOM from 'react-dom/client';
import React from 'react';
import Bar from './carousel/components/Bar.jsx';
import App from './carousel/App.jsx';
import {renderItems, context, drawer} from './carousel/render/index.js';
import { ItemsContext } from './carousel/context/index.js';


const names = ['cone6', 'box', 'cone4']

const items = []
for(let i = 0; i < 100; i++){
    items.push({
        id : i,
        primitive : names[Math.floor(Math.random() * 3)],
        background : [Math.random(), Math.random(), Math.random(), 1],
        color : [Math.random(), Math.random(), Math.random(), 1]
    })
}


const itemsElementsArray = {array : []}
const root = ReactDOM.createRoot(document.getElementById('app'))

const updateCanvasAndProjectionMatrix = () =>{
    context.resizeCanvasToDisplaySize()
    drawer.update3DProjectionMatrix()
}

root.render(<App items={items}
                renderItems = {itemsElementsArray}
                relativeItemSize = {{relWidth : 0.9, relHeight : 0.9}}
                resizeCanvas = {updateCanvasAndProjectionMatrix}
                >
                
            </App>)
const loop = renderItems(itemsElementsArray)
loop()
