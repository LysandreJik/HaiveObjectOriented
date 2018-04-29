import React from 'react';
import {CONTAINER_TYPES, getContainersByTypeAndSize} from "../../../const/structure";

var dispenser_depth = require('../../../images/haive_types/dispenser.png');
var liquid_depth = require('../../../images/haive_types/liquid.png');
var S8_12 = require('../../../images/container_sizes/8_12.png');
var S2_3 = require('../../../images/container_sizes/2_3.png');
var S3_5 = require('../../../images/container_sizes/3_5.png');
var S4_5 = require('../../../images/container_sizes/4_5.png');

let TYPES = {
    SUPERTYPE_SELECTION: 0,
    SIZE_SELECTION: 1,
    TYPE_SELECTION: 2
};

let AVAILABLE_SELECTIONS = {
    TIP_CONTAINER: CONTAINER_TYPES.PIPETTE_TIP_CONTAINER,
    LIQUID_CONTAINER: CONTAINER_TYPES.TEST_TUBE_CONTAINER,
    S2_3: {width: 2, height: 3},
    S3_5: {width: 3, height: 5},
    S4_5: {width: 4, height: 5},
    S8_12: {width: 8, height: 12}
};

let STATES = [
    [AVAILABLE_SELECTIONS.TIP_CONTAINER, AVAILABLE_SELECTIONS.LIQUID_CONTAINER],
    [[AVAILABLE_SELECTIONS.S8_12], [AVAILABLE_SELECTIONS.S2_3, AVAILABLE_SELECTIONS.S3_5, AVAILABLE_SELECTIONS.S4_5]]
];

export class ContainerSelectItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {current: TYPES.SUPERTYPE_SELECTION};

        this.switchToPreviousState  =this .switchToPreviousState.bind(this);
    }

    getCurrentState(){
        if(this.state.current === TYPES.SUPERTYPE_SELECTION){
            return(
                <div className="container-select-item-container-2">
                    <div>
                        {this.getImage(dispenser_depth, "Tip container", 1, 2)}
                        {this.getImage(liquid_depth, "Liquid container", 2, 2)}
                    </div>
                </div>

            );
        }else if(this.state.current === TYPES.SIZE_SELECTION){
            if(this.state.container === AVAILABLE_SELECTIONS.TIP_CONTAINER){
                return(
                    <div className="container-select-item-container-1 large-comp">
                        <div className={"back-button"} onClick={this.switchToPreviousState}><span className="back-button-text">GO BACK</span></div>
                        <div>
                            {this.getImage(S8_12, "8 by 12", 1, 1, true)}
                        </div>
                    </div>

                );
            }else if(this.state.container === AVAILABLE_SELECTIONS.LIQUID_CONTAINER){
                return(
                    <div className="container-select-item-container-3 large-comp">
                        <div className={"back-button"} onClick={this.switchToPreviousState}><span className="back-button-text">GO BACK</span></div>
                        <div>
                            {this.getImage(S2_3, "2 by 3", 1, 3, true)}
                            {this.getImage(S3_5, "3 by 5", 2, 3, true)}
                            {this.getImage(S4_5, "4 by 5", 3, 3, true)}
                        </div>
                    </div>
                );
            }

        }else if(this.state.current === TYPES.TYPE_SELECTION){
            return(
                <div className="container-select-item-container-2 large-comp">
                    <div className={"back-button"} onClick={this.switchToPreviousState}><span className="back-button-text">GO BACK</span></div>
                    <div className="container-select-item-smaller-container-2-1">
                        {getContainersByTypeAndSize(this.state.container, this.state.size).map(function(item, key){
                            return <button key={key} className="text-desc animated fadeInUp">{item.name}</button>
                        })}
                    </div>
                </div>
            );
        }
    }

    changeState(index){

        if(this.state.current === TYPES.SUPERTYPE_SELECTION){
            this.setState({current: TYPES.SIZE_SELECTION, container: STATES[this.state.current][index]});
        }else if(this.state.current === TYPES.SIZE_SELECTION){
            this.setState({current: TYPES.TYPE_SELECTION, size:STATES[this.state.current][this.state.container][index]})
        }
    }

    switchToPreviousState(){
        if(this.state.current === TYPES.SIZE_SELECTION){
            this.setState({current: TYPES.SUPERTYPE_SELECTION});
        }if(this.state.current === TYPES.TYPE_SELECTION){
            this.setState({current: TYPES.SIZE_SELECTION});
        }
    }

    getImage(image, text, index, maxIndex, large){
        let parent = this;
        return(
            <div
                onClick={() => this.changeState(index-1)}
                onMouseOver ={() => parent.setState({hovered:index+"-"+maxIndex})}
                onMouseLeave={parent.state.hovered === index+"-"+maxIndex ? () => parent.setState({hovered:""}) : "" }
                className={"container-select-item-smaller-container-"+index+"-"+maxIndex+" "+ (large ? " large-comp":"")}>
                <img
                    id={"single-container-container-img-"+index+"-"+maxIndex}
                    style={this.state.hovered === index+"-"+maxIndex ? {top:"-10%"} : {}}
                    className={"single-container-container-img animated fadeIn" } src={image}/>
                <span
                    className={"single-container-text"}
                    style={this.state.hovered === index+"-"+maxIndex ? {color:"#95CAFF"} : {}}>
                    {text}
                </span>
            </div>
        );
    }

    render(){
        return(
            <div className="container-select-item">
                {this.getCurrentState()}
            </div>
        );
    }
}