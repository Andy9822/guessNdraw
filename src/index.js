import React from 'react';
import { render } from 'react-dom';
import App from './component/App';
import './style.css'

const rootEl = document.getElementById('root');


render(<App />, rootEl);

if (module.hot) {
    module.hot.accept();
}