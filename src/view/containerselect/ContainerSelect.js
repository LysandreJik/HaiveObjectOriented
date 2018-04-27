import React from 'react';
import {CONTAINER_POSITIONS} from "../../../const/structure";
const logo = require('../../../images/logo.png');
const SVG = require('svg.js');

export class ContainerSelect extends React.Component{
    render(){
        return(
            <div className="container-select-background">
                <CenterHexagon/>
                <SingleContainers loc={CONTAINER_POSITIONS.TOP_LEFT}/>
                <SingleContainers loc={CONTAINER_POSITIONS.MIDDLE_LEFT}/>
                <SingleContainers loc={CONTAINER_POSITIONS.BOTTOM_LEFT}/>
                <SingleContainers loc={CONTAINER_POSITIONS.TOP_RIGHT}/>
                <SingleContainers loc={CONTAINER_POSITIONS.MIDDLE_RIGHT}/>
                <SingleContainers loc={CONTAINER_POSITIONS.BOTTOM_RIGHT}/>
            </div>
        );
    }
}

export class SingleContainers extends React.Component{
    constructor(props){
        super(props);
        if(this.props.loc === undefined){
            this.style = {position:"absolute", top:"100px", left:"100px"};
        }else{
            switch(this.props.loc){
                case CONTAINER_POSITIONS.TOP_LEFT:
                    this.style = {position:"absolute", top:"10%", left:"2%"};
                    break;
                case CONTAINER_POSITIONS.MIDDLE_LEFT:
                    this.style = {position:"absolute", top:"40%", left:"2%"};
                    break;
                case CONTAINER_POSITIONS.BOTTOM_LEFT:
                    this.style = {position:"absolute", top:"70%", left:"2%"};
                    break;
                case CONTAINER_POSITIONS.TOP_RIGHT:
                    this.style = {position:"absolute", top:"10%", right:"2%"};
                    break;
                case CONTAINER_POSITIONS.MIDDLE_RIGHT:
                    this.style = {position:"absolute", top:"40%", right:"2%"};
                    break;
                case CONTAINER_POSITIONS.BOTTOM_RIGHT:
                    this.style = {position:"absolute", top:"70%", right:"2%"};
                    break;
                default:
                    this.style = {position:"absolute", top:"100px", left:"100px"};
                    break;
            }
        }

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount(){
        this.dimensions = {
            height:document.getElementById('single-container-svg-'+this.props.loc).clientHeight,
            width:document.getElementById('single-container-svg-'+this.props.loc).clientWidth
        };
        this.draw = SVG('single-container-svg-'+this.props.loc).size(this.dimensions.width, this.dimensions.height);
        this.polyline = this.draw.polyline([[2, 2]]);
        this.polyline.fill('none');
        this.polyline.stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round'});
        this.polyline.animate(200, '>').plot([[2, 2], [this.dimensions.width-2, 2]]);
        this.polyline.animate(200, '>').plot([[2, 2], [this.dimensions.width-2, 2], [this.dimensions.width-2, this.dimensions.height-2]]);
        this.polyline.animate(200, '>').plot([[2, 2], [this.dimensions.width-2, 2], [this.dimensions.width-2, this.dimensions.height-2], [2, this.dimensions.height-2]]);
        this.polyline.animate(200, '>').plot([[2, 2], [this.dimensions.width-2, 2], [this.dimensions.width-2, this.dimensions.height-2], [2, this.dimensions.height-2], [2, 2]]);


        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }


    updateDimensions(){
        this.dimensions = {
            height:document.getElementById('single-container-svg-'+this.props.loc).clientHeight,
            width:document.getElementById('single-container-svg-'+this.props.loc).clientWidth
        };
        this.draw.size(this.dimensions.width, this.dimensions.height);
        this.polyline.plot([[2, 2], [this.dimensions.width-2, 2], [this.dimensions.width-2, this.dimensions.height-2], [2, this.dimensions.height-2], [2, 2]]);
    }

    render(){
        return(
            <div id={"single-container"} className="single-container" style={this.style} onClick={this.props.func === undefined ? function(){console.log("Clicked !")} : () => this.props.func(this.props.id)}>
                <div id={'single-container-svg-'+this.props.loc} className={"single-container-svg"}></div>
                <div className="initial-button-wrapper"><span className="initial-button-text">SELECT CONTAINER</span></div>
            </div>
        );
    }
}

export class CenterHexagon extends React.Component{
    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount(){
        this.dimensions = {
            height:document.getElementById("center-hexagon").clientHeight,
            width:document.getElementById("center-hexagon").clientWidth
        };

        let d = this.dimensions.height;
        let a = d/4;
        let offset = 3;

        this.draw = SVG('center-hexagon-hex').size(this.dimensions.width, this.dimensions.height);

        let point = {x:0, y:a-offset};
        let points = [point, this.rotate(point, -60), this.rotate(point, -60*2), this.rotate(point, -60*3), this.rotate(point, -60*4), this.rotate(point, -60*5)];

        this.upper_polyline = this.draw.polyline([[d/2+point.x, d/2-point.y]]);
        this.upper_polyline.fill('none');
        this.upper_polyline.stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round'});
        this.upper_polyline.animate(200, '>').plot([[d/2+points[0].x, d/2-points[0].y], [d/2+points[1].x, d/2-points[1].y]]);
        this.upper_polyline.animate(200, '>').plot([[d/2+points[0].x, d/2-points[0].y], [d/2+points[1].x, d/2-points[1].y], [d/2+points[2].x, d/2-points[2].y]]);
        this.upper_polyline.animate(200, '>').plot([[d/2+points[0].x, d/2-points[0].y], [d/2+points[1].x, d/2-points[1].y], [d/2+points[2].x, d/2-points[2].y], [d/2+points[3].x, d/2-points[3].y]]);


        this.lesser_polyline = this.draw.polyline([[d/2+points[3].x, d/2-points[3].y]]);
        this.lesser_polyline.fill('none');
        this.lesser_polyline.stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round'});
        this.lesser_polyline.animate(200, '>').plot([[d/2+points[3].x, d/2-points[3].y], [d/2+points[4].x, d/2-points[4].y]]);
        this.lesser_polyline.animate(200, '>').plot([[d/2+points[3].x, d/2-points[3].y], [d/2+points[4].x, d/2-points[4].y], [d/2+points[5].x, d/2-points[5].y]]);
        this.lesser_polyline.animate(200, '>').plot([[d/2+points[3].x, d/2-points[3].y], [d/2+points[4].x, d/2-points[4].y], [d/2+points[5].x, d/2-points[5].y], [d/2+points[0].x, d/2-points[0].y]]);

        this.other_points = [
            {x: 0, y: a*2},
            {x: points[1].x*2  , y: a},
            {x: points[2].x*2  , y: a-d/2},
            {x: 0, y: -a*2},
            {x:(points[5].x-points[0].x)*2  , y: a-d/2},
            {x:(points[5].x-points[0].x)*2  , y: a}
        ];

        this.other_polylines = [];

        let parent = this;
        setTimeout(function(){
            for(let i = 0; i < parent.other_points.length; i++){
                let other_polyline = parent.draw.polyline([[d/2+points[i].x, d/2-points[i].y]]);
                other_polyline.fill('none');
                other_polyline.stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round'});
                other_polyline.animate(200, '>').plot([[d/2+points[i].x, d/2-points[i].y], [d/2+parent.other_points[i].x, d/2-parent.other_points[i].y]]);
                parent.other_polylines.push(other_polyline);
            }
        }, 1500);


        this.upper_polyline.animate(1000, '>').rotate(360, d/2, d/2);
        this.lesser_polyline.animate(1000, '>').rotate(360, d/2, d/2);

        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    rotate(point, angle) {
        angle = angle * (3.14157/180);
        return {
            x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
            y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
        };
    }

    updateDimensions(){
        this.dimensions = {
            height:document.getElementById("center-hexagon").clientHeight,
            width:document.getElementById("center-hexagon").clientWidth
        };

        this.draw.size(this.dimensions.width, this.dimensions.height);

        let d = this.dimensions.height;
        let a = d/2;
        let offset = 3;

        let point = {x:0, y:a-offset};
        let points = [point, this.rotate(point, -60), this.rotate(point, -60*2), this.rotate(point, -60*3), this.rotate(point, -60*4), this.rotate(point, -60*5)];

        this.upper_polyline.plot([[a+points[0].x, a-points[0].y], [a+points[1].x, a-points[1].y], [a+points[2].x, a-points[2].y], [a+points[3].x, a-points[3].y]]);
        this.lesser_polyline.plot([[a+points[3].x, a-points[3].y], [a+points[4].x, a-points[4].y], [a+points[5].x, a-points[5].y], [a+points[0].x, a-points[0].y]]);
    }

    render(){
        return(
            <div id="center-hexagon" className="center-hexagon">
                <div id="center-hexagon-hex"></div>
                    <img className="animated fadeIn center-hexagon-logo" src={logo}></img>
            </div>
        );
    }
}