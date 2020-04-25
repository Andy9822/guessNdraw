import React, { Component } from 'react';

class Canvas extends Component {
    constructor(props) {
        super(props);

        this.canvas = React.createRef();
        this.pos = { x: 0, y: 0 }
        this.ctx = null;
        this.domRect = null;

        this.resize = this.resize.bind(this)
        this.setPosition = this.setPosition.bind(this)
        this.draw = this.draw.bind(this)
    }

    componentDidMount() {
        this.ctx = this.canvas.current.getContext("2d");
        this.domRect = this.canvas.current.getBoundingClientRect();

        window.addEventListener('resize', this.resize);

        this.props.ws.on('move', (data) => {
            this.drawRemote(data)
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    // new position from mouse event
    setPosition(e) {
        this.pos.x = e.clientX - this.domRect.left;
        this.pos.y = e.clientY - this.domRect.top;
    }

    // recalulcate canvas limits
    resize() {
        this.domRect = this.canvas.current.getBoundingClientRect();
    }

    draw(e) {
        // mouse left button must be pressed
        if (e.buttons !== 1) return;
        this.ctx.beginPath(); // begin

        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';

        // this.ctx.strokeStyle = '#0099e5'; // Blue
        this.ctx.strokeStyle = '#ff4c4c'; // Red

        // from
        const oldPos = { x: this.pos.x, y: this.pos.y }
        this.ctx.moveTo(this.pos.x, this.pos.y);

        this.setPosition(e);

        // to
        const newPos = { x: this.pos.x, y: this.pos.y }
        this.ctx.lineTo(this.pos.x, this.pos.y);

        //Send movement to server
        this.props.ws.emit('move', { id: this.props.ws.id, oldPos, newPos })

        this.ctx.stroke(); // draw it!
    }

    drawRemote(data) {
        this.ctx.beginPath(); // begin

        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';

        this.ctx.strokeStyle = '#0099e5'; // Blue
        // this.ctx.strokeStyle = '#ff4c4c'; // Red

        // from
        const oldPos = data.oldPos
        this.ctx.moveTo(oldPos.x, oldPos.y);

        // to
        const newPos = { x: data.newPos.x, y: data.newPos.y }
        this.ctx.lineTo(newPos.x, newPos.y);

        this.ctx.stroke(); // draw it!
    }



    render() {
        return (
            <canvas
                ref={this.canvas}
                className="canvas-container"
                width="640"
                height="320"
                onMouseMove={this.draw}
                onMouseDown={this.setPosition}
            ></canvas>
        );
    }
}

export default Canvas;