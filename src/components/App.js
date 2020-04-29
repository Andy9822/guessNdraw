import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import Canvas from './Canvas.js';
import io from 'socket.io-client';

const socket = io(WS_URL);

socket.on('connect', () => {
    console.log('Connected with id: ', socket.id);
    // socket.emit('join', 5)

});

socket.on('connection', (user) => {
    console.log(`User id ${user} has connected`);

});

function App(props) {
    return (
        <Canvas ></Canvas>
    );
}

export default hot(App);