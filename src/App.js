import React from 'react';
import './App.css';
import Canvas from './Canvas';
import io from 'socket.io-client';

const socket = io('http://192.168.0.2:3030');

socket.on('connect', () => {
  console.log('Connected with id: ', socket.id);
  // socket.emit('join', 5)

});

socket.on('connection', (user) => {
  console.log(`User id ${user} has connected`);

});


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas ws={socket}></Canvas>
      </header>
    </div>
  );
}

export default App;
