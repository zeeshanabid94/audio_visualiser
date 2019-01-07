import React from 'react';
import AudioAnalyser from '../audio/AudioAnalyser';
import PropTypes from 'prop-types';
// import TweenMax, { Bounce, Circ, Power0 } from "gsap/TweenMax";
import CanvasComponent from "./CanvasComponent";
const COLORS = {
    1: "#DB5461",
    2: "#FFD9CE",
    3: "#593C8F",
    4: "#8EF9F3",
    5: "#8EF9F3"
}

const svgStyle = {
    border: "solid",
    borderSize: "2px",
    borderColor: "black",
    fill: "wheatish"
}
class Visualiser extends React.Component {
    static propTypes = {

    }
    constructor(props) {
        super(props);

        this.state = {
            FFT: new Uint8Array(512),
            audioAnalyser: new AudioAnalyser(1024, 'alan-walker-fade-NCS.mp3')
        }
    }

    

    render() {
        this.state.audioAnalyser.initialize();
        this.state.audioAnalyser.play();
        // let svg = <SVGComponent audioAnalyser={this.state.audioAnalyser}></SVGComponent>;
        return (
            <div id="visualiser">
                <h1>Visualiser</h1>
                {/* {svg} */}
                <CanvasComponent audioAnalyser={this.state.audioAnalyser}></CanvasComponent>
            </div>
        )
    }
}

// class SVGComponent extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             FFT: new Uint8Array(512),
//         }
//         this.circlesRefs = {
//             1: [],
//             2: [],
//             3: [],
//             4: [],
//             5: []
//         };
//         this.getCentersBetweenR = this.getCentersBetweenR.bind(this);
//         this.onMouseMove = this.onMouseMove.bind(this);
//         this.update = this.update.bind(this);
//         this.animate = this.animate.bind(this);

//         let circles = [];
//         let circlesRefs = {
//             1: [],
//             2: [],
//             3: [],
//             4: [],
//             5: [],
//         };
//         let rc = 0.5 * Math.PI;
//         this.width = 300;
//         this.height = 300;
//         let x = this.width/2;
//         let y = this.height/2;

//         let centers = this.getCentersBetweenR(1 * Math.PI, 40 * Math.PI, x, y);
//         for (let key in centers) {
//             // console.log(key);
//             centers[key].map((elem, index) => {
//                 circles.push(<circle key={key.toString() + index.toString()} 
//                 ref={refr => circlesRefs[key].push(refr)} 
//                 cx={elem.x} cy={elem.y} r={rc} stroke="green" 
//                 strokeWidth="0" fill={elem.fill} />)
//             })
//         }
        
//         this.circlesRefs = circlesRefs;
//         this.circles = circles;
//     }

//     animate(elem, value) {
//         TweenMax.killTweensOf(elem);
//         TweenMax.to(elem, 0.1, {
//             scale: value/256 * 2,
//             transformOrigin: "center center"
//         })
//     }

//     componentDidMount() {
//         this.interval = setInterval(() => this.update(), 200);
//     }

//     update() {
//         let newState = this.state;
//         newState.FFT = this.props.audioAnalyser.FFT;
//         this.setState(newState);
//     }

//     componentDidUpdate(prevProps) {
//         TweenMax.killAll();
//         // console.log("Updated SVG");
//         // if (prevProps != this.props) {
//             // console.log("Drawing");
//             let groupSize = this.state.FFT.length / 5;
//             this.state.FFT.map(async  (elem, index) => {
//                 let groupNum = Math.floor(index / groupSize + 1);
//                 // console.log(groupNum);
//                 let randomNode = this.circlesRefs[groupNum][Math.floor(Math.random() * this.circlesRefs[groupNum].length)]
//                 this.animate(randomNode, elem);
//             })
//         // }
        
//     }

//     componentWillUnmount() {
//         clearInterval(this.interval);
//         TweenMax.killAll();
//     }

//     getCentersAtR(r, deltaTheta, x, y, fill) {
//         let centers = [];

//         if (deltaTheta <= 0) {
//             throw Error("Delta theta in getCentersAtR can not be less than or equal to 0.");
//         }
//         for (let theta = 0; theta < 2 * Math.PI; theta += deltaTheta) {
//             // console.log("Theta", theta);
//             centers.push({
//                 x: r * Math.cos(theta) + x, 
//                 y: r * Math.sin(theta) + y,
//                 fill: COLORS[fill]
//             });
//         }

//         return centers;
//     }

//     getCentersBetweenR(r1, r2, x, y) {
//         let centers = {
//             1: [],
//             2: [],
//             3: [],
//             4: [],
//             5: []
//         };
//         let topPadding = 1 * Math.PI;
//         let rc = 0.5 * Math.PI;
//         let deltaTheta = Math.PI / 64;
//         let hops = 0;
//         let color = 1;
//         while (r1 < r2) {
//             if (r2 < 0) {
//                 break;
//             }
            
//             centers[color].push(...this.getCentersAtR(r2, deltaTheta, x, y, color))
//             r2 = r2 - 2 * (topPadding + rc);
//             // deltaTheta *= 2;
//             hops += 1;

//             if (hops >= 3) {
//                 hops = 0;
//                 deltaTheta *= 2;
//                 color += 1;

//                 if (color > 5) {
//                     color = 5;
//                 }
//             }
//         }

//         return centers;
//     }

//     onMouseMove(event) {
//         // console.log(event.target.getBoundingClientRect());
//         // TweenMax.killTweensOf(this.boundingBox);
//         TweenMax.to(this.boundingBox, 0.1, {
//             x: event.clientX - event.target.getBoundingClientRect().left,
//             y: event.clientY - event.target.getBoundingClientRect().top
//         });
//     }

//     render() {
        
        
//         console.log(this.circlesRefs);
//         console.log(this.FFT);
//         return (
//             <svg style={svgStyle} width={this.width} height={this.height}>
//                 <g ref={elem => this.boundingBox = elem}>
//                     {this.circles}
//                 </g> 
//             </svg>

//         )
//     }
// }
export default Visualiser;