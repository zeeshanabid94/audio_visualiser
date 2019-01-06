import React from 'react';
import PropTypes from 'prop-types';

const sampleSize = 4096
const AudioContext = window.AudioContext || window.webkitAudioContext;

class AudioAnalyser {
    constructor(fftSize, filePath) {
        const audioCtx = new AudioContext();

        this.audioObjects = {
            audioCtx: audioCtx,
            sourceNode: audioCtx.createBufferSource(),
            analyserNode: audioCtx.createAnalyser(),
            javascriptNode: audioCtx.createScriptProcessor(sampleSize, 1, 1),
            destinationNode: audioCtx.destination,
        }

        this.initialized = false;
        this.fftSize = fftSize;
        this.FFT = new Uint8Array(fftSize/2);
        this.filePath = filePath;

        this.setupNodes = this.setupNodes.bind(this);
        this.fetchAudioData = this.fetchAudioData.bind(this);
    }

    initialize() {
        if (this.initialized == false) {
            this.fetchAudioData().then(
                (data) => {
                    console.log("Data received");
                    console.log(data);
                    this.setupNodes(data);
                }
            );    
            this.initialized = true;
        }
        
    }

    get FFT() {
        this.audioObjects.analyserNode.getByteTimeDomainData(this._FFT);
        return this._FFT;
    }

    set FFT(value) {
        this._FFT = value;
    }
    async fetchAudioData() {
        let response = await fetch(this.filePath)
        .then((res) => {
            console.log(res.status);
            console.log(res.statusText);
            return res.arrayBuffer();
        })
        let data = await this.audioObjects.audioCtx.decodeAudioData(response).then((data) => data);
        return data;
    }
    setupNodes(data) {
        console.log("Setting up audio nodes");
        this.audioObjects.analyserNode.fftSize = this.fftSize;
        // newState.sourceNode.connect(newState.destinationNode);
        this.audioObjects.sourceNode.connect(this.audioObjects.analyserNode);
        this.audioObjects.analyserNode.connect(this.audioObjects.destinationNode);
        // newState.javascriptNode.connect(newState.destinationNode);
        // newState.javascriptNode.onaudioprocess = () => this.props.onUpdate(newState.analyserNode);
        this.audioObjects.sourceNode.buffer = data;
        this.audioObjects.sourceNode.start(0);
        console.log("Playing");
    }
}

export default AudioAnalyser;