
import ReactDOM from 'react-dom/client';
import React from 'react';
import Bar from './carousel/Bar.jsx';
import App from './carousel/App.jsx';
const items = [
    {id : 0}, {id : 1}, {id : 2}
]


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App items={items}></App>)