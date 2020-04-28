import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import Canvas from './Canvas.js';


function App(props) {
    const [counter, setCounter] = useState(0)

    return (
        <Canvas></Canvas>
    );
}

export default hot(App);