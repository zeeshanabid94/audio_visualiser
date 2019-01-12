import React from 'react';
import PropTypes from 'prop-types';

const Style = {
}

const COLORS = {
    1: "#F71735",
    2: "#E28413",
    3: "#17A398",
    4: "#E40066",
    5: "#08415C"
}

class CanvasComponent extends React.Component {
    static propTypes = {
        audioAnalyser: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);

        this.canvasRef = null;
        this.circles = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        };
        this.canvasCtx = null;
        this.frame = -1;

        this.update = this.update.bind(this);
        this.innerRadius = 5 * Math.PI;
        this.outerRadius = 75 * Math.PI;
        this.center = {
            x: 250,
            y: 250
        }
        this.deltaRotation = ((2 * Math.PI) / 64) / 50;
    }

    componentDidMount() {
        console.log("Mounted Canvas");
        console.log(this.canvasRef);
        console.log(this.canvasRef.getContext("2d"));
        this.canvasCtx = this.canvasRef.getContext("2d");
        this.circles = this.getCentersBetweenR(this.innerRadius, this.outerRadius, this.center.x, this.center.y);

        for (let key in this.circles) {
            // console.log(key);
            this.circles[key].map((elem, index) => {
                let circle = new Path2D();
                circle.arc(elem.x, elem.y, elem.r, 0, 2*Math.PI);
                this.canvasCtx.fillStyle = COLORS[elem.color]
                this.canvasCtx.fill(circle);
               
            })
        }

        this.frame = 0;
        this.interval = setInterval(()=> this.update(), 20);
        
    }

    update() {
        this.canvasCtx.clearRect(0, 0, 500, 500);
        let FFT = this.props.audioAnalyser.FFT
        let groupSize = FFT.length / 5;
        let i = 0;
        // console.log(FFT);
        for (let key in this.circles) {
            // console.log(key);
            this.circles[key].map((elem, index) => {
                let groupNum = i / groupSize;
                let FFT_i = FFT[i];
                if (i < FFT.length) {
                    if (Math.random() < groupSize / this.circles[key].length) {
                        let circle = new Path2D();
                        elem.r = 2.5 *FFT_i/256 * Math.PI;
                        elem.currentTheta = elem.currentTheta + elem.deltaRotation
                        elem.x = this.center.x + elem.positionRadius * Math.cos(elem.currentTheta);
                        elem.y = this.center.y + elem.positionRadius * Math.sin(elem.currentTheta);
                        
                        circle.arc(elem.x, elem.y, elem.r, 0, 2*Math.PI);
                        this.canvasCtx.fillStyle = COLORS[elem.color]
                        this.canvasCtx.fill(circle);
                        i+=1;
                    } else {
                        let circle = new Path2D();
                        elem.currentTheta = elem.currentTheta + elem.deltaRotation
                        elem.x = this.center.x + elem.positionRadius * Math.cos(elem.currentTheta);
                        elem.y = this.center.y + elem.positionRadius * Math.sin(elem.currentTheta);
                        circle.arc(elem.x, elem.y, elem.r, 0, 2*Math.PI);
                        this.canvasCtx.fillStyle = COLORS[elem.color]
                        this.canvasCtx.fill(circle);
                    }
                }
                
            })
        }
    }

    getCentersAtR(r, deltaTheta, x, y, fill) {
        let centers = [];
        let deltaRotation = this.deltaRotation * fill * ((fill % 2) == 0 ? 1 : -1);

        if (deltaTheta <= 0) {
            throw Error("Delta theta in getCentersAtR can not be less than or equal to 0.");
        }
        for (let theta = 0; theta < 2 * Math.PI; theta += deltaTheta) {
            // console.log("Theta", theta);
            centers.push({
                x: r * Math.cos(theta) + x, 
                y: r * Math.sin(theta) + y,
                r: Math.PI/4,
                color: fill,
                positionRadius: r,
                currentTheta: theta,
                deltaRotation: deltaRotation
            });
        }

        return centers;
    }

    getCentersBetweenR(r1, r2, x, y) {
        let centers = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        };
        
        let rc = Math.PI/4;
        let topPadding = 2 * Math.PI;
        let deltaTheta = Math.PI / 64;
        let hops = 0;
        let color = 1;
        while (r1 < r2) {
            if (r2 < 0) {
                break;
            }
            
            centers[color].push(...this.getCentersAtR(r2, deltaTheta, x, y, color))
            r2 = r2 - 2 * (topPadding + rc);
            // deltaTheta *= 2;
            hops += 1;

            if (hops >= 3) {
                hops = 0;
                deltaTheta *= 2;
                color += 1;

                if (color > 5) {
                    color = 5;
                }
            }
        }

        return centers;
    }



    render() {
        return (
            <canvas style={Style} ref={elem => this.canvasRef = elem} height="500" width="500">

            </canvas>
        )
    }
}


export default CanvasComponent