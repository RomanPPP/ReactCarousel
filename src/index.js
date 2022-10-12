
import ReactDOM from 'react-dom/client';
import React from 'react';
import Bar from './carousel/components/Bar.jsx';
import App from './carousel/App.jsx';
import renderItems from './carousel/render/index.js';
import { ItemsContext } from './carousel/context/index.js';


const names = ['cone6', 'box', 'cone4']

const items = []
for(let i = 0; i < 100; i++){
    items.push({id : i, primitive : names[Math.floor(Math.random() * 3)]})
}


const itemsElementsArray = []
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<ItemsContext.Provider value = {itemsElementsArray}><App items={items}></App></ItemsContext.Provider>)
renderItems(itemsElementsArray)

