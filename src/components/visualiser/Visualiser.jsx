import React from 'react';
import AudioAnalyser from '../audio/AudioAnalyser';
import PlayButton from '../animated_buttons/play/Play';
import PropTypes from 'prop-types';
// import TweenMax, { Bounce, Circ, Power0 } from "gsap/TweenMax";
import CanvasComponent from "./CanvasComponent";
const controlStyle = {
    textAlign: "center",
    display: "block",
    width: "50%",
    marginLeft: "25%",
    marginRight: "25%",
}

const visualStyle = {
    border: "solid",
    borderWidth: "1px",
    display: "inline-block",
    paddingTop: "10px",
}
const canvasStyle = {
    textAlign: "center",
    display: "block",
}
class Visualiser extends React.Component {
    static propTypes = {

    }
    constructor(props) {
        super(props);

        this.state = {
            FFT: new Uint8Array(512),
            audioAnalyser: new AudioAnalyser(1024, 'alan-walker-fade-NCS.mp3'),
            playing: false
        }

        this.onPlayClick = this.onPlayClick.bind(this);
    }

    onPlayClick() {
        let newState = this.state;
        if (newState.audioAnalyser.playing) {
            newState.audioAnalyser.pause();
        } else {
            newState.audioAnalyser.play();
        }

        newState.playing = newState.audioAnalyser.playing;
        this.setState(newState);
    }
    

    render() {
        this.state.audioAnalyser.initialize();
        return (
            <div id="visualiser" style={visualStyle}>
                <div style={controlStyle}>
                    <PlayButton playing={this.state.playing} onClick={this.onPlayClick} />
                </div>
                <div style= {canvasStyle}>
                    <CanvasComponent  height={400} width={500} audioAnalyser={this.state.audioAnalyser}></CanvasComponent>
                </div>
                
            </div>
        )
    }
}


export default Visualiser;