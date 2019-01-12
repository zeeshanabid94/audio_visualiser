import React from 'react';
import {TweenMax} from 'gsap/all';
import './Play.css';


class PlayButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
        }

        // this.onClick = this.onClick.bind(this);
        this.stop = null;
        this.play = null;
    }
    componentDidUpdate() {
        TweenMax.killTweensOf(this.play);
        TweenMax.killTweensOf(this.stop);
        if (this.props.playing) {
            console.log("Stop");
            
            TweenMax.to(this.play, 1, {
                opacity: 0
            }, 0);
            TweenMax.to(this.stop, 1, {
                opacity: 1
            }, 0);
        } else {
            console.log("Play");
            TweenMax.to(this.play, 1, {
                opacity: 1
            }, 0);
            TweenMax.to(this.stop, 1, {
                opacity: 0
            }, 0);
        }
        
    }
    // onClick() {
    //     let newState = this.state;
    //     newState.playing = !newState.playing;

    //     // This is to make sure that anything connected
    //     // to this button does what it is supposed to do.
    //     this.props.onClick();
    //     this.setState(newState);
    // }

    render() {
        return (
            <svg class="button" onClick={this.props.onClick} xmlns="http://www.w3.org/2000/svg" version="1.1" width="40px" height="40px">
                <path ref={elem => this.stop = elem} d="M 0 0 L 0 40 L 40 40 L 40 0 Z" fill="#000000" stroke="#000000" style={{opacity:0}}/>
                <path ref={elem => this.play = elem} d="M 0 0 L 40 20 L 0 40 Z" fill="#000000" stroke="#000000"/>   
            </svg>
        )
    }
}

export default PlayButton;