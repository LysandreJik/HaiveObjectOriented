import React from 'react';
import {CONTAINER_POSITIONS, HAIVE_TYPES} from "../../../const/structure";
const dispenser = require('../../../images/haive_types/dispenser.png');
const freezer = require('../../../images/haive_types/freezer.png');
const centrifuge = require('../../../images/haive_types/centrifuge.png');
const SVG = require('svg.js');

var hexagon;

export class ContainerSelect extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.focusedHexagon);
    }

    render(){
        return(
            <div className="container-select-background">
                <CenterHexagon hexagon={this.props.focusedHexagon}/>
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
            <div
                id={"single-container"}
                className="single-container"
                style={this.style}
                onMouseOver={hexagon === undefined  ? function(){console.log("Entered !")} : () => hexagon.showHoverContainer(this.props.loc)}
                onMouseLeave={hexagon === undefined  ? function(){console.log("Left !")} : () => hexagon.showHoverContainer()}
            >
                <div id={'single-container-svg-'+this.props.loc} className={"single-container-svg"}></div>
                <div className="initial-button-wrapper"><span className="initial-button-text">SELECT CONTAINER</span></div>
            </div>
        );
    }
}

export class CenterHexagon extends React.Component{
    constructor(props) {
        super(props);
        this.state = {init:false};
        this.updateDimensions = this.updateDimensions.bind(this);
        this.mouseMoved = this.mouseMoved.bind(this);
        hexagon = this;
        console.log(this.props.hexagon.getNeighbours());
        this.logo = this.getHaiveTypeImage(this.props.hexagon.getType());

    }

    getHaiveTypeImage(type){
        switch(type){
            case HAIVE_TYPES.DISPENSER:
                return dispenser;
            case HAIVE_TYPES.CENTRIFUGE:
                return centrifuge;
            case HAIVE_TYPES.FREEZER:
                return freezer;
        }
    }

    componentDidMount(){
        this.dimensions = {
            height:document.getElementById("center-hexagon").clientHeight,
            width:document.getElementById("center-hexagon").clientWidth
        };

        this.d = this.dimensions.height;
        this.a = this.d/4;
        this.offset = 3;

        this.draw = SVG('center-hexagon-hex').size(this.dimensions.width, this.dimensions.height);
        this.hoverIndicator = this.draw.polyline();

        let point = {x:0, y:this.a-this.offset};
        this.points = [point, this.rotate(point, -60), this.rotate(point, -60*2), this.rotate(point, -60*3), this.rotate(point, -60*4), this.rotate(point, -60*5)];

        this.upper_polyline = this.draw.polyline([[this.d/2+point.x, this.d/2-point.y]]);
        this.upper_polyline.fill('none');
        this.upper_polyline.stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round'});
        this.upper_polyline.animate(200, '>').plot([[this.d/2+this.points[0].x, this.d/2-this.points[0].y], [this.d/2+this.points[1].x, this.d/2-this.points[1].y]]);
        this.upper_polyline.animate(200, '>').plot([[this.d/2+this.points[0].x, this.d/2-this.points[0].y], [this.d/2+this.points[1].x, this.d/2-this.points[1].y], [this.d/2+this.points[2].x, this.d/2-this.points[2].y]]);
        this.upper_polyline.animate(200, '>').plot([[this.d/2+this.points[0].x, this.d/2-this.points[0].y], [this.d/2+this.points[1].x, this.d/2-this.points[1].y], [this.d/2+this.points[2].x, this.d/2-this.points[2].y], [this.d/2+this.points[3].x, this.d/2-this.points[3].y]]);


        this.lesser_polyline = this.draw.polyline([[this.d/2+this.points[3].x, this.d/2-this.points[3].y]]);
        this.lesser_polyline.fill('none');
        this.lesser_polyline.stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round'});
        this.lesser_polyline.animate(200, '>').plot([[this.d/2+this.points[3].x, this.d/2-this.points[3].y], [this.d/2+this.points[4].x, this.d/2-this.points[4].y]]);
        this.lesser_polyline.animate(200, '>').plot([[this.d/2+this.points[3].x, this.d/2-this.points[3].y], [this.d/2+this.points[4].x, this.d/2-this.points[4].y], [this.d/2+this.points[5].x, this.d/2-this.points[5].y]]);
        this.lesser_polyline.animate(200, '>').plot([[this.d/2+this.points[3].x, this.d/2-this.points[3].y], [this.d/2+this.points[4].x, this.d/2-this.points[4].y], [this.d/2+this.points[5].x, this.d/2-this.points[5].y], [this.d/2+this.points[0].x, this.d/2-this.points[0].y]]);

        this.other_points = [
            {x: 0, y: this.a*2},
            {x: this.points[1].x*2  , y: this.a},
            {x: this.points[2].x*2  , y: this.a-this.d/2},
            {x: 0, y: -this.a*2},
            {x:(this.points[5].x-this.points[0].x)*2  , y: this.a-this.d/2},
            {x:(this.points[5].x-this.points[0].x)*2  , y: this.a}
        ];

        this.other_polylines = [];

        let parent = this;

        setTimeout(function(){
            for(let i = 0; i < parent.other_points.length; i++){
                let other_polyline = parent.draw.polyline([[parent.d/2+parent.points[i].x, parent.d/2-parent.points[i].y]]);
                other_polyline.fill('none');
                other_polyline.stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round', dasharray: '1,5'});
                other_polyline.animate(200, '>').plot([[parent.d/2+parent.points[i].x, parent.d/2-parent.points[i].y], [parent.d/2+parent.other_points[i].x, parent.d/2-parent.other_points[i].y]]);
                parent.other_polylines.push(other_polyline);
            }

            parent.hexagonNeighbours = [
                {name:"top-left", points:[
                    [parent.d/2+parent.other_points[5].x, parent.d/2-parent.other_points[5].y],
                    [parent.d/2+parent.points[5].x, parent.d/2-parent.points[5].y],
                    [parent.d/2+parent.points[0].x, parent.d/2-parent.points[0].y],
                    [parent.d/2+parent.other_points[0].x, parent.d/2-parent.other_points[0].y]
                ], relatedPolylines: [parent.other_polylines[5], parent.other_polylines[0]]},
                {name:"middle-left", points:[
                    [parent.d/2+parent.other_points[4].x, parent.d/2-parent.other_points[4].y],
                    [parent.d/2+parent.points[4].x, parent.d/2-parent.points[4].y],
                    [parent.d/2+parent.points[5].x, parent.d/2-parent.points[5].y],
                    [parent.d/2+parent.other_points[5].x, parent.d/2-parent.other_points[5].y]
                ], relatedPolylines: [parent.other_polylines[4], parent.other_polylines[5]]},
                {name:"bottom-left", points:[
                    [parent.d/2+parent.other_points[3].x, parent.d/2-parent.other_points[3].y],
                    [parent.d/2+parent.points[3].x, parent.d/2-parent.points[3].y],
                    [parent.d/2+parent.points[4].x, parent.d/2-parent.points[4].y],
                    [parent.d/2+parent.other_points[4].x, parent.d/2-parent.other_points[4].y]
                ], relatedPolylines: [parent.other_polylines[3], parent.other_polylines[4]]},
                {name:"top-right", points:[
                    [parent.d/2+parent.other_points[0].x, parent.d/2-parent.other_points[0].y],
                    [parent.d/2+parent.points[0].x, parent.d/2-parent.points[0].y],
                    [parent.d/2+parent.points[1].x, parent.d/2-parent.points[1].y],
                    [parent.d/2+parent.other_points[1].x, parent.d/2-parent.other_points[1].y]
                ], relatedPolylines: [parent.other_polylines[0], parent.other_polylines[1]]},
                {name:"middle-right", points:[
                    [parent.d/2+parent.other_points[1].x, parent.d/2-parent.other_points[1].y],
                    [parent.d/2+parent.points[1].x, parent.d/2-parent.points[1].y],
                    [parent.d/2+parent.points[2].x, parent.d/2-parent.points[2].y],
                    [parent.d/2+parent.other_points[2].x, parent.d/2-parent.other_points[2].y]
                ], relatedPolylines: [parent.other_polylines[1], parent.other_polylines[2]]},
                {name:"bottom-right", points:[
                    [parent.d/2+parent.other_points[2].x, parent.d/2-parent.other_points[2].y],
                    [parent.d/2+parent.points[2].x, parent.d/2-parent.points[2].y],
                    [parent.d/2+parent.points[3].x, parent.d/2-parent.points[3].y],
                    [parent.d/2+parent.other_points[3].x, parent.d/2-parent.other_points[3].y]
                ], relatedPolylines: [parent.other_polylines[2], parent.other_polylines[3]]}
            ];

            parent.setState({init:true});
        }, 1500);

        this.upper_polyline.animate(1000, '>').rotate(360, this.d/2, this.d/2);
        this.lesser_polyline.animate(1000, '>').rotate(360, this.d/2, this.d/2);

        this.bottomRight = {
            x:(parent.d/2+parent.points[5].x)/4 + (parent.d/2+parent.points[0].x)/4 + (parent.d/2),
            y:(parent.d/2+parent.points[5].y)/4 + (parent.d/2+parent.points[0].y)/4 + (parent.d/2)
        };

        this.topRight = this.rotate({x:0, y:this.a*1.3}, -30);
        this.middleRight = this.rotate({x:this.topRight.x, y:this.topRight.y}, -60);
        this.bottomRight = this.rotate({x:this.middleRight.x, y:this.middleRight.y}, -60);
        this.bottomLeft = this.rotate({x:this.bottomRight.x, y:this.bottomRight.y}, -60);
        this.middleLeft = this.rotate({x:this.bottomLeft.x, y:this.bottomLeft.y}, -60);
        this.topLeft = this.rotate({x:this.middleLeft.x, y:this.middleLeft.y}, -60);
        console.log("top left defined");

        // let test = parent.draw.polyline([[this.d/2+this.topLeft.x, this.d/2-this.topLeft.y], [this.d/2, this.d/2]]);
        // test.fill('none');
        // test.stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round', dasharray: '1,5'});

        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("mousemove", this.mouseMoved);


    }

    showHoverContainer(loc){
        let indicator;
        switch(loc){
            case CONTAINER_POSITIONS.TOP_LEFT:
                indicator = this.getHexagonShownSelector([{x:this.d/2+this.points[5].x, y:this.d/2-this.points[5].y}, {x:this.d/2+this.points[0].x, y:this.d/2-this.points[0].y}]);
                this.hoverIndicator.plot([[indicator[0].x, indicator[0].y], [indicator[1].x, indicator[1].y], [indicator[2].x, indicator[2].y], [indicator[3].x, indicator[3].y]]);
                this.hoverIndicator.fill('#a5daff');
                this.hoverIndicator.stroke({ color: '#a5daff'});
                break;
            case CONTAINER_POSITIONS.TOP_RIGHT:
                indicator = this.getHexagonShownSelector([{x:this.d/2+this.points[0].x, y:this.d/2-this.points[0].y}, {x:this.d/2+this.points[1].x, y:this.d/2-this.points[1].y}]);
                this.hoverIndicator.plot([[indicator[0].x, indicator[0].y], [indicator[1].x, indicator[1].y], [indicator[2].x, indicator[2].y], [indicator[3].x, indicator[3].y]]);
                this.hoverIndicator.fill('#a5daff');
                this.hoverIndicator.stroke({ color: '#a5daff'});
                break;
            case CONTAINER_POSITIONS.MIDDLE_RIGHT:
                indicator = this.getHexagonShownSelector([{x:this.d/2+this.points[1].x, y:this.d/2-this.points[1].y}, {x:this.d/2+this.points[2].x, y:this.d/2-this.points[2].y}]);
                this.hoverIndicator.plot([[indicator[0].x, indicator[0].y], [indicator[1].x, indicator[1].y], [indicator[2].x, indicator[2].y], [indicator[3].x, indicator[3].y]]);
                this.hoverIndicator.fill('#a5daff');
                this.hoverIndicator.stroke({ color: '#a5daff'});
                break;
            case CONTAINER_POSITIONS.BOTTOM_RIGHT:
                indicator = this.getHexagonShownSelector([{x:this.d/2+this.points[2].x, y:this.d/2-this.points[2].y}, {x:this.d/2+this.points[3].x, y:this.d/2-this.points[3].y}]);
                this.hoverIndicator.plot([[indicator[0].x, indicator[0].y], [indicator[1].x, indicator[1].y], [indicator[2].x, indicator[2].y], [indicator[3].x, indicator[3].y]]);
                this.hoverIndicator.fill('#a5daff');
                this.hoverIndicator.stroke({ color: '#a5daff'});
                break;
            case CONTAINER_POSITIONS.BOTTOM_LEFT:
                indicator = this.getHexagonShownSelector([{x:this.d/2+this.points[3].x, y:this.d/2-this.points[3].y}, {x:this.d/2+this.points[4].x, y:this.d/2-this.points[4].y}]);
                this.hoverIndicator.plot([[indicator[0].x, indicator[0].y], [indicator[1].x, indicator[1].y], [indicator[2].x, indicator[2].y], [indicator[3].x, indicator[3].y]]);
                this.hoverIndicator.fill('#a5daff');
                this.hoverIndicator.stroke({ color: '#a5daff'});
                break;
            case CONTAINER_POSITIONS.MIDDLE_LEFT:
                indicator = this.getHexagonShownSelector([{x:this.d/2+this.points[4].x, y:this.d/2-this.points[4].y}, {x:this.d/2+this.points[5].x, y:this.d/2-this.points[5].y}]);
                this.hoverIndicator.plot([[indicator[0].x, indicator[0].y], [indicator[1].x, indicator[1].y], [indicator[2].x, indicator[2].y], [indicator[3].x, indicator[3].y]]);
                this.hoverIndicator.fill('#a5daff');
                this.hoverIndicator.stroke({ color: '#a5daff'});
                break;
            default:
                this.hoverIndicator.fill('none');
                this.hoverIndicator.stroke({ color: 'none'});

        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        window.removeEventListener("mousemove", this.mouseMoved);
    }

    rotate(point, angle) {
        angle = angle * (3.14157/180);
        return {
            x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
            y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
        };
    }

    mouseMoved(e){
        this.loc = {
            top:document.getElementById("center-hexagon").offsetTop,
            left:document.getElementById("center-hexagon").offsetLeft
        };

        if(this.hexagonNeighbours !== undefined){
            this.showPolylines([]);
            this.updateNeighbours(-1);
            for(let i = 0; i < this.hexagonNeighbours.length; i++){
                if(this.isInside([e.pageX - this.loc.left, e.pageY - this.loc.top], this.hexagonNeighbours[i].points)){
                    this.showPolylines(this.hexagonNeighbours[i].relatedPolylines);
                    this.updateNeighbours(i);
                }
            }
        }
    }

    updateNeighbours(loc){
        this.topRight = this.rotate({x:0, y:this.a*1.3}, -30);
        this.middleRight = this.rotate({x:this.topRight.x, y:this.topRight.y}, -60);
        this.bottomRight = this.rotate({x:this.middleRight.x, y:this.middleRight.y}, -60);
        this.bottomLeft = this.rotate({x:this.bottomRight.x, y:this.bottomRight.y}, -60);
        this.middleLeft = this.rotate({x:this.bottomLeft.x, y:this.bottomLeft.y}, -60);
        this.topLeft = this.rotate({x:this.middleLeft.x, y:this.middleLeft.y}, -60);

        switch(loc){
            case CONTAINER_POSITIONS.TOP_LEFT:
                this.topLeft = this.rotate({x:0, y:this.a*1.5}, -330);
                this.setState({updateIt:!this.state.updateIt});
                break;
            case CONTAINER_POSITIONS.MIDDLE_LEFT:
                this.middleLeft = this.rotate({x:0, y:this.a*1.5}, -270);
                this.setState({updateIt:!this.state.updateIt});
                break;
            case CONTAINER_POSITIONS.BOTTOM_LEFT:
                this.bottomLeft = this.rotate({x:0, y:this.a*1.5}, -210);
                this.setState({updateIt:!this.state.updateIt});
                break;
            case CONTAINER_POSITIONS.TOP_RIGHT:
                this.topRight = this.rotate({x:0, y:this.a*1.5}, -30);
                this.setState({updateIt:!this.state.updateIt});
                break;
            case CONTAINER_POSITIONS.MIDDLE_RIGHT:
                this.middleRight = this.rotate({x:0, y:this.a*1.5}, -90);
                this.setState({updateIt:!this.state.updateIt});
                break;
            case CONTAINER_POSITIONS.BOTTOM_RIGHT:
                this.bottomRight = this.rotate({x:0, y:this.a*1.5}, -150);
                this.setState({updateIt:!this.state.updateIt});
                break;
        }
    }

    getHexagonShownSelector(polyline){
        let ratio = 10;
        let offsetX = polyline[0].x, offsetY = polyline[0].y;
        let firstPoly = [{x:0, y:0}, this.rotate({x:(polyline[1].x-offsetX)/10, y:(polyline[1].y-offsetY)/10}, 120)];

        firstPoly[0].x += offsetX;
        firstPoly[0].y += offsetY;
        firstPoly[1].x += offsetX;
        firstPoly[1].y += offsetY;

        offsetX = polyline[1].x;
        offsetY = polyline[1].y;
        let secondPoly = [{x:0, y:0}, this.rotate({x:(polyline[0].x-offsetX)/10, y:(polyline[0].y-offsetY)/10}, -120)];
        secondPoly[0].x += offsetX;
        secondPoly[0].y += offsetY;
        secondPoly[1].x += offsetX;
        secondPoly[1].y += offsetY;
        return [firstPoly[0], firstPoly[1], secondPoly[1], secondPoly[0]];

    }

    showPolylines(polylines){
        for(let i = 0; i < this.other_polylines.length; i++){
            this.other_polylines[i].stroke({dasharray: '1,5', color: '#75aaff'});
        }

        for(let i = 0; i < polylines.length; i++){
            polylines[i].stroke({dasharray: 'none', color: '#ffffff'});
        }
    }

    isInside(point, vs) {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        let x = point[0], y = point[1];

        let inside = false;
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            let xi = vs[i][0], yi = vs[i][1];
            let xj = vs[j][0], yj = vs[j][1];

            let intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };

    updateDimensions(){
        this.dimensions = {
            height:document.getElementById("center-hexagon").clientHeight,
            width:document.getElementById("center-hexagon").clientWidth
        };

        this.draw.size(this.dimensions.width, this.dimensions.height);

        this.d = this.dimensions.height;
        this.a = this.d/4;
        this.offset = 3;

        let point = {x:0, y:this.a-this.offset};
        this.points = [point, this.rotate(point, -60), this.rotate(point, -60*2), this.rotate(point, -60*3), this.rotate(point, -60*4), this.rotate(point, -60*5)];

        this.other_points = [
            {x: 0, y: this.a*2},
            {x: this.points[1].x*2  , y: this.a},
            {x: this.points[2].x*2  , y: this.a-this.d/2},
            {x: 0, y: -this.a*2},
            {x:(this.points[5].x-this.points[0].x)*2  , y: this.a-this.d/2},
            {x:(this.points[5].x-this.points[0].x)*2  , y: this.a}
        ];

        this.hexagonNeighbours[3].points = [
            [this.d/2+this.other_points[0].x, this.d/2-this.other_points[0].y],
            [this.d/2+this.points[0].x, this.d/2-this.points[0].y],
            [this.d/2+this.points[1].x, this.d/2-this.points[1].y],
            [this.d/2+this.other_points[1].x, this.d/2-this.other_points[1].y]
        ];

        this.hexagonNeighbours[4].points = [
            [this.d/2+this.other_points[1].x, this.d/2-this.other_points[1].y],
            [this.d/2+this.points[1].x, this.d/2-this.points[1].y],
            [this.d/2+this.points[2].x, this.d/2-this.points[2].y],
            [this.d/2+this.other_points[2].x, this.d/2-this.other_points[2].y]
        ];

        this.hexagonNeighbours[5].points = [
            [this.d/2+this.other_points[2].x, this.d/2-this.other_points[2].y],
            [this.d/2+this.points[2].x, this.d/2-this.points[2].y],
            [this.d/2+this.points[3].x, this.d/2-this.points[3].y],
            [this.d/2+this.other_points[3].x, this.d/2-this.other_points[3].y]
        ];

        this.hexagonNeighbours[2].points = [
            [this.d/2+this.other_points[3].x, this.d/2-this.other_points[3].y],
            [this.d/2+this.points[3].x, this.d/2-this.points[3].y],
            [this.d/2+this.points[4].x, this.d/2-this.points[4].y],
            [this.d/2+this.other_points[4].x, this.d/2-this.other_points[4].y]
        ];

        this.hexagonNeighbours[1].points = [
            [this.d/2+this.other_points[4].x, this.d/2-this.other_points[4].y],
            [this.d/2+this.points[4].x, this.d/2-this.points[4].y],
            [this.d/2+this.points[5].x, this.d/2-this.points[5].y],
            [this.d/2+this.other_points[5].x, this.d/2-this.other_points[5].y]
        ];

        this.hexagonNeighbours[0].points = [
            [this.d/2+this.other_points[5].x, this.d/2-this.other_points[5].y],
            [this.d/2+this.points[5].x, this.d/2-this.points[5].y],
            [this.d/2+this.points[0].x, this.d/2-this.points[0].y],
            [this.d/2+this.other_points[0].x, this.d/2-this.other_points[0].y]
        ];

        for(let i = 0; i < this.other_points.length; i++){
            this.other_polylines[i].plot([[this.d/2+this.points[i].x, this.d/2-this.points[i].y], [this.d/2+this.other_points[i].x, this.d/2-this.other_points[i].y]]);
        }

        this.upper_polyline.plot([[this.d/2+this.points[0].x, this.d/2-this.points[0].y], [this.d/2+this.points[1].x, this.d/2-this.points[1].y], [this.d/2+this.points[2].x, this.d/2-this.points[2].y], [this.d/2+this.points[3].x, this.d/2-this.points[3].y]]);
        this.lesser_polyline.plot([[this.d/2+this.points[3].x, this.d/2-this.points[3].y], [this.d/2+this.points[4].x, this.d/2-this.points[4].y], [this.d/2+this.points[5].x, this.d/2-this.points[5].y], [this.d/2+this.points[0].x, this.d/2-this.points[0].y]]);

        this.topRight = this.rotate({x:0, y:this.a*1.3}, -30);
        this.middleRight = this.rotate({x:this.topRight.x, y:this.topRight.y}, -60);
        this.bottomRight = this.rotate({x:this.middleRight.x, y:this.middleRight.y}, -60);
        this.bottomLeft = this.rotate({x:this.bottomRight.x, y:this.bottomRight.y}, -60);
        this.middleLeft = this.rotate({x:this.bottomLeft.x, y:this.bottomLeft.y}, -60);
        this.topLeft = this.rotate({x:this.middleLeft.x, y:this.middleLeft.y}, -60);

        this.setState({updateIt:!this.state.updateIt});
    }

    getStyle(loc){
        this.loc = {
            top:document.getElementById("center-hexagon").offsetTop,
            left:document.getElementById("center-hexagon").offsetLeft
        };

        switch(loc){
            case CONTAINER_POSITIONS.TOP_LEFT:
                return {position:"absolute", left:this.d/2+this.topLeft.x, top:this.d/2-this.topLeft.y};
            case CONTAINER_POSITIONS.MIDDLE_LEFT:
                return {position:"absolute", left:this.d/2+this.middleLeft.x, top:this.d/2-this.middleLeft.y};
            case CONTAINER_POSITIONS.BOTTOM_LEFT:
                return {position:"absolute", left:this.d/2+this.bottomLeft.x, top:this.d/2-this.bottomLeft.y};
            case CONTAINER_POSITIONS.TOP_RIGHT:
                return {position:"absolute", left:this.d/2+this.topRight.x, top:this.d/2-this.topRight.y};
            case CONTAINER_POSITIONS.MIDDLE_RIGHT:
                return {position:"absolute", left:this.d/2+this.middleRight.x, top:this.d/2-this.middleRight.y};
            case CONTAINER_POSITIONS.BOTTOM_RIGHT:
                return {position:"absolute", left:this.d/2+this.bottomRight.x, top:this.d/2-this.bottomRight.y};
        }

    }

    getNeighbours(){
        this.neighbours = [];
        for (const [key, value] of Object.entries(this.props.hexagon.getNeighbours())) {
            if(value !== null){
                switch(key){
                    case "topLeft": this.neighbours.push({loc:CONTAINER_POSITIONS.TOP_LEFT, neighbour:value}); break;
                    case "middleLeft": this.neighbours.push({loc:CONTAINER_POSITIONS.MIDDLE_LEFT, neighbour:value}); break;
                    case "bottomLeft": this.neighbours.push({loc:CONTAINER_POSITIONS.BOTTOM_LEFT, neighbour:value}); break;
                    case "topRight": this.neighbours.push({loc:CONTAINER_POSITIONS.TOP_RIGHT, neighbour:value}); break;
                    case "middleRight": this.neighbours.push({loc:CONTAINER_POSITIONS.MIDDLE_RIGHT, neighbour:value}); break;
                    case "bottomRight": this.neighbours.push({loc:CONTAINER_POSITIONS.BOTTOM_RIGHT, neighbour:value}); break;
                }

            }
        }

        let parent = this;
        return <div>
            {this.neighbours.map(function(item, key){
                return <img key={key} className="center-hexagon-logo-tiny" style={parent.getStyle(item.loc)} src={parent.getHaiveTypeImage(item.neighbour.getType())}></img>
            })}
        </div>
    }

    render(){
        return(
            <div id="center-hexagon" className="center-hexagon">
                <div id="center-hexagon-hex"></div>
                <img className="animated fadeIn center-hexagon-logo" src={this.logo}></img>
                {this.state.init === true ?
                    this.getNeighbours()
                : ""}

            </div>
        );
    }
}