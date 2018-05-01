import React from 'react';
import {CONTAINER_POSITIONS} from "../../../const/structure";
import {containerSelectController, containerSelectModel} from "../../../const/global";
const gi = require('../../../const/globalImages').gi;

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

        this.onItemHover = this.onItemHover.bind(this);
        this.onItemLeave = this.onItemLeave.bind(this);
        this.selectContainer = this.selectContainer.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.state = {hovering: false};
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

    selectContainer(){
        containerSelectController.selectContainer(this.props.loc);
    }

    getContainer(){
        let container = containerSelectModel.getCurrentlySelectedHaive().getContainer(this.props.loc);
        if(container === null){
            return "NONE SELECTED";
        }else{
            return container.getContainerSubType().name;
        }
    }

    getContainerHover(){
        let container = containerSelectModel.getCurrentlySelectedHaive().getContainer(this.props.loc);
        if(container === null){
            return <span className="initial-button-text">SELECT A CONTAINER</span>;
        }else{
            return(
                <div style={{height:"100%"}}>
                    <button className="container-hover">DESIGN STRUCTURE</button>
                    <button className="container-hover" onClick={() => containerSelectController.removeContainer(this.props.loc)}>REMOVE CONTAINER</button>
                </div>
            );
        }
    }

    onItemHover(){
        this.props.hexagon.showHoverContainer(this.props.loc);
        $('#text-wrapper-'+this.props.loc).animate({left:"-100%"}, 200  );
    }

    onItemLeave(){
        this.props.hexagon.showHoverContainer();
        $('#text-wrapper-'+this.props.loc).animate({left:"0"}, 200);
    }

    render(){
        let parent = this;
        return(
            <div
                id={"single-container"+this.props.loc}
                className="single-container"
                style={this.style}
                onClick={this.selectContainer}
                onMouseOver={this.onItemHover}
                onMouseLeave={this.onItemLeave}
            >
                <div id={'single-container-svg-'+this.props.loc} className={"single-container-svg"}></div>
                <div id={'text-wrapper-'+this.props.loc} className="text-wrapper">
                    <div className="initial-button-wrapper"><span className="initial-button-text">{this.getContainer()}</span></div>
                    <div className="initial-button-wrapper-right">{this.getContainerHover()}</div>
                </div>
            </div>
        );
    }
}