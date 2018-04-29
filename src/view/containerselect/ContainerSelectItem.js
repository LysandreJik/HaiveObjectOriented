import React from 'react';
import {
    CONTAINER_TYPES, getContainersByTypeAndSize, SIZE_STRING_TO_ID,
    TYPE_STRING_TO_ID
} from "../../../const/structure";
import {availableContainers, containerSelectController} from "../../../const/global";
const gi = require('../../../const/globalImages').gi;

var dispenser_depth = gi.getImage("DISPENSER_DEPTH");
var liquid_depth = gi.getImage("LIQUID");
var S8_12 = gi.getImage("8_12");
var S2_3 = gi.getImage("2_3");
var S3_5 = gi.getImage("3_5");
var S4_5 = gi.getImage("4_5");

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

export class ContainerSelectItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {current: TYPES.SUPERTYPE_SELECTION};

        this.switchToPreviousState  =this .switchToPreviousState.bind(this);
        this.getSuperTypesComponent = this.getSuperTypesComponent.bind(this);
        this.updateAvailableContainers = this.updateAvailableContainers.bind(this);

        this.updateAvailableContainers();
    }

    updateAvailableContainers(){
        this.availableContainers = {};
        let superTypes = availableContainers.getAvailableContainersSubtypes();
        console.log(superTypes);

        for(let i = 0; i < superTypes.length; i++){
            this.availableContainers[superTypes[i]] = {sizes: []};
            let av = availableContainers.getAvailableContainersSizesFromSupertypes(superTypes[i]);
            console.log("    ", av);
            for(let j = 0; j < av.length; j++){
                this.availableContainers[superTypes[i]].sizes.push({width: av[j].width, height: av[j].height, types: []});
                let types = availableContainers.getAvailableContainersTypesFromSizeAndSupertype(av[j], superTypes[i]);
                for(let k = 0; k < types.length; k++){
                    this.availableContainers[superTypes[i]].sizes[j].types.push({name: types[k]});
                }
                console.log("        ", availableContainers.getAvailableContainersTypesFromSizeAndSupertype(av[j], superTypes[i]));
            }
        }

        console.log("Available containers",     this.availableContainers);
    }

    getSuperTypesComponent(){
        if(Object.keys(this.availableContainers).length == 0){
            return <div>NO CONTAINERS LEFT</div>
        }else if(Object.keys(this.availableContainers).length == 1){
            if(this.availableContainers[1] === undefined){
                return(
                    <div className="container-select-item-container-1">
                        <div>
                            {this.getImage(dispenser_depth, "Tip container", 1, 1)}
                        </div>
                    </div>
                );
            }else{
                return(
                    <div className="container-select-item-container-1">
                        <div>
                            {this.getImage(liquid_depth, "Liquid container", 1, 1)}
                        </div>
                    </div>
                );
            }
        }else{
            return(
                <div className="container-select-item-container-2">
                    <div>
                        {this.getImage(dispenser_depth, "Tip container", 1, 2)}
                        {this.getImage(liquid_depth, "Liquid container", 2, 2)}
                    </div>
                </div>
            );
        }
    }

    getSizeSelectionComponent(){
        if(this.state.container === "Tip container"){
            return(
                <div className="container-select-item-container-1 large-comp">
                    <div className={"back-button"} onClick={this.switchToPreviousState}><span className="back-button-text">GO BACK</span></div>
                    <div>
                        {this.getImage(S8_12, "8 by 12", 1, 1, true)}
                    </div>
                </div>

            );
        }else if(this.state.container === "Liquid container"){
            let parent = this;
            return(
                <div className={"container-select-item-container-"+this.availableContainers[TYPE_STRING_TO_ID[this.state.container]].sizes.length+" large-comp"}>
                    <div className={"back-button"} onClick={this.switchToPreviousState}><span className="back-button-text">GO BACK</span></div>
                    <div>
                        {this.availableContainers[TYPE_STRING_TO_ID[this.state.container]].sizes.map(function(item, key){
                            return parent.getImage(
                                gi.getContainerThumb({width: item.width, height: item.height}),
                                item.width+" by "+item.height,
                                key+1 ,
                                parent.availableContainers[TYPE_STRING_TO_ID[parent.state.container]].sizes.length,
                                true
                            )
                        })}
                    </div>
                </div>
            );
        }
    }

    getTypeSelectionComponent(){
        let parent = this;
        return(
            <div className="container-select-item-container-2 large-comp">
                <div className={"back-button"} onClick={this.switchToPreviousState}><span className="back-button-text">GO BACK</span></div>
                <div className="container-select-item-smaller-container-2-1">
                    {getContainersByTypeAndSize(TYPE_STRING_TO_ID[this.state.container], SIZE_STRING_TO_ID[this.state.size]).map(function(item, key){
                        return <button key={key} className="text-desc animated fadeInUp" onClick={() => containerSelectController.placeContainer(parent.props.loc, item)}>{item.name}</button>
                    })}
                </div>
            </div>
        );
    }

    getCurrentState(){
        if(this.state.current === TYPES.SUPERTYPE_SELECTION){
            return this.getSuperTypesComponent();
        }else if(this.state.current === TYPES.SIZE_SELECTION){
            return this.getSizeSelectionComponent();
        }else if(this.state.current === TYPES.TYPE_SELECTION){
            return this.getTypeSelectionComponent();
        }
    }

    changeState(text){
        if(this.state.current === TYPES.SUPERTYPE_SELECTION){
            this.setState({current: TYPES.SIZE_SELECTION, container: text});
        }else if(this.state.current === TYPES.SIZE_SELECTION){
            this.setState({current: TYPES.TYPE_SELECTION, size:text})
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
                key={index}
                onClick={() => this.changeState(text)}
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

    componentDidMount(){
        let parent = this;
        $('.container-select-item').on('click', function(e) {
            if (e.target !== this)
                return;

            parent.props.cancel();
        });
    }

    render(){
        return(
            <div className="container-select-item" >
                {this.getCurrentState()}
            </div>
        );
    }
}