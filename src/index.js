
import ReactDOM from 'react-dom/client';
import React from 'react';
import Bar from './carousel/components/Bar.jsx';
import App from './carousel/App.jsx';
import renderItems from './carousel/render/index.js';
import { ItemsContext } from './carousel/context/index.js';


const items = [
    {id : 0}, {id : 1}, {id : 2}
]

const itemsElementsArray = []
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<ItemsContext.Provider value = {itemsElementsArray}><App items={items}></App></ItemsContext.Provider>)
//document.addEventListener('click', loop.bind(null, itemsElementsArray))
renderItems(itemsElementsArray)

