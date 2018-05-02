import React from 'react';
const SVG = require('svg.js');

export class ContainerStructureDesign extends React.Component{
    constructor(){
        super();
        this.points = [
            {x: 9, y: 71}, {x: 54, y: 10}, {x: 611, y: 10}, {x: 655, y: 71}, {x: 655, y: 939}, {x:611, y: 990},
            {x: 425, y: 990}, {x: 425, y: 952}, {x: 241, y: 952}, {x: 241, y: 990}, {x: 55, y: 990}, {x: 9, y: 939},
            {x: 9, y: 71}
        ];


        this.updateDimensions = this.updateDimensions.bind(this);
        this.getCircles = this.getCircles.bind(this);
    }

    getCircles(){
        console.log(this.props.size);
        let start = {x:(this.max.x*this.ratio)/10, y: (this.max.y*this.ratio)/10};
        let ratio = 2;
        let distance = {x:(8*start.x)/(this.props.size.width*ratio + this.props.size.width - 1), y:(8*start.y)/(this.props.size.height*ratio + this.props.size.height - 1)};
        this.circles = [];

        for(let i = 0; i < this.props.size.width; i++){
            for(let j = 0; j < this.props.size.height; j++){
                this.circles.push({xIndex: i, yIndex: j, x: start.x+i*(distance.x + distance.x*ratio), y:start.y+j*(distance.y + distance.y*ratio), radius:distance.x*ratio});
            }
        }

        let parent = this;
        this.circleSVGDark = [];
        this.circleSVGLight = [];

        for(let i = 0; i < this.circles.length; i++){
            this.circleSVGDark.push(this.draw.circle(this.circles[i].radius).move(this.circles[i].x+2, this.circles[i].y+2));
            this.circleSVGLight.push(this.draw.circle(this.circles[i].radius).move(this.circles[i].x, this.circles[i].y));
            this.circleSVGLight[i].fill({color: "#000", opacity: 0});
            this.circleSVGDark[i].fill('none');
            this.circleSVGLight[i].stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round'});
            this.circleSVGDark[i].stroke({ color: '#747BFE', width: 4, linecap: 'round', linejoin: 'round'});
            this.circleSVGLight[i].click(function(){parent.clickedOnCircle({x: parent.circles[i].xIndex, y: parent.circles[i].yIndex})});
            this.circleSVGLight[i].mouseover(function(){parent.circleSVGLight[i].animate(100, '>').fill({color: "#000", opacity: 0.2})});
            this.circleSVGLight[i].mouseout(function(){parent.circleSVGLight[i].animate(100, '>').fill({color: "#000", opacity: 0})});
        }
    }

    clickedOnCircle(circle){
        console.log("Clicked on circle", circle);
    }

    componentDidMount(){
        let ratio = 0.8;
        this.max = {x: 666, y: 1000};

        this.dimensions = {
            height:document.getElementById("structure-design-maindiv").clientHeight,
            width:document.getElementById("structure-design-maindiv").clientWidth
        };

        this.ratio = Math.min((this.dimensions.height*ratio)/this.max.y, (this.dimensions.width*ratio)/this.max.x, 1);
        let parent = this;
        this.points = this.points.map(function(item){return {x:item.x*parent.ratio, y:item.y*parent.ratio}});

        this.draw = SVG('container-structure-design-svg').size(this.max.x*this.ratio, this.max.y*this.ratio);
        this.polyline2 = this.draw.polyline([[this.points[0].x+2, this.points[0].y+2]]);
        this.polyline2.fill('none');
        this.polyline2.stroke({ color: '#747BFE', width: 4, linecap: 'round', linejoin: 'round'});
        this.polyline = this.draw.polyline([[this.points[0].x, this.points[0].y]]);
        this.polyline.fill('none');
        this.polyline.stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round'});


        for(let i = 2; i < this.points.length+1; i++){
            this.polyline2.animate(50, '>').plot(this.points.slice(0, i).map(function(item){return [item.x+2, item.y+2]}));
            this.polyline.animate(50, '>').plot(this.points.slice(0, i).map(function(item){return [item.x, item.y]}));
        }

        this.getCircles();





        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions(){
        this.points = [
            {x: 9, y: 71}, {x: 54, y: 10}, {x: 611, y: 10}, {x: 655, y: 71}, {x: 655, y: 939}, {x:611, y: 990},
            {x: 425, y: 990}, {x: 425, y: 952}, {x: 241, y: 952}, {x: 241, y: 990}, {x: 55, y: 990}, {x: 9, y: 939},
            {x: 9, y: 71}
        ];
        let ratio = 0.8;

        this.dimensions = {
            height:document.getElementById("structure-design-maindiv").clientHeight,
            width:document.getElementById("structure-design-maindiv").clientWidth
        };

        this.ratio = Math.min((this.dimensions.height*ratio)/this.max.y, (this.dimensions.width*ratio)/this.max.x, 1);
        this.draw.size(this.max.x*this.ratio, this.max.y*this.ratio);
        let parent = this;
        this.points = this.points.map(function(item){return {x:item.x*parent.ratio, y:item.y*parent.ratio}});
        this.polyline2.plot(this.points.map(function(item){return [item.x+2, item.y+2]}));
        this.polyline.plot(this.points.map(function(item){return [item.x, item.y]}));

        this.getCircles();
    }

    render(){
        return(
            <div id="structure-design-maindiv" className="structure-design-maindiv">
                ok lol
                <div id={"container-structure-design-svg"} className={"container-structure-design-svg"}></div>
            </div>
        );
    }
}