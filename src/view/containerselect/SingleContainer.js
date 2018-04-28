import React from 'react';
import {CONTAINER_POSITIONS} from "../../../const/structure";
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

        this.updateDimensions = this.updateDimensions.bind(this);
        this.hideContainerChoice = this.hideContainerChoice.bind(this);
        this.displayContainerChoice = this.displayContainerChoice.bind(this);

        this.state = {global:"empty"};
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

    displayContainerChoice(){
        this.setState({global:"type_selection"});
    }

    hideContainerChoice(){
        this.setState({global:"empty"});
    }

    render(){
        let parent = this;
        return(
            <div
                id={"single-container"+this.props.loc}
                className="single-container"
                style={this.style}
                onMouseOver={this.props.hexagon === undefined  ? function(){console.log("Entered !")} : function(){parent.displayContainerChoice();parent.props.hexagon.showHoverContainer(parent.props.loc)}}
                onMouseLeave={this.props.hexagon === undefined  ? function(){console.log("Left !")} : function(){parent.hideContainerChoice();parent.props.hexagon.showHoverContainer()}}
            >
                <div id={'single-container-svg-'+this.props.loc} className={"single-container-svg"}></div>
                {this.state.global === "empty" ?
                    <div className="initial-button-wrapper"><span className="initial-button-text">SELECT CONTAINER</span></div>
                :
                    <div className="initial-button-wrapper">
                        <img className="single-container-container-img-1 animated fadeIn" src={gi.getImage("DISPENSER_DEPTH")}></img>
                        <img className="single-container-container-img-2 animated fadeIn"  src={gi.getImage("LIQUID" )}></img>
                    </div>
                }

            </div>
        );
    }
}