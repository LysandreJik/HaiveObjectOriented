/*
__/\\\________/\\\_____/\\\\\\\\\_____/\\\\\\\\\\\__/\\\________/\\\__/\\\\\\\\\\\\\\\_
 _\/\\\_______\/\\\___/\\\\\\\\\\\\\__\/////\\\///__\/\\\_______\/\\\_\/\\\///////////__
  _\/\\\_______\/\\\__/\\\/////////\\\_____\/\\\_____\//\\\______/\\\__\/\\\_____________
   _\/\\\\\\\\\\\\\\\_\/\\\_______\/\\\_____\/\\\______\//\\\____/\\\___\/\\\\\\\\\\\_____
    _\/\\\/////////\\\_\/\\\\\\\\\\\\\\\_____\/\\\_______\//\\\__/\\\____\/\\\///////______
     _\/\\\_______\/\\\_\/\\\/////////\\\_____\/\\\________\//\\\/\\\_____\/\\\_____________
      _\/\\\_______\/\\\_\/\\\_______\/\\\_____\/\\\_________\//\\\\\______\/\\\_____________
       _\/\\\_______\/\\\_\/\\\_______\/\\\__/\\\\\\\\\\\______\//\\\_______\/\\\\\\\\\\\\\\\_
        _\///________\///__\///________\///__\///////////________\///________\///////////////__

	HAIVE web application - GUI Version 0.0.2 (OO)
	For Molcure product
	Base sketch by Lisan
	http://molcure.com
	Author: Lysandre Debut
*/

import LiquidContainer from "../../structure/containers/LiquidContainer";
import PipetteTipContainer from "../../structure/containers/PipetteTipContainer";
import {CONTAINER_SUBTYPES, getContainerPositionFromID, getContainerSubtypeFromName} from "../../../const/structure";

const gv = require('../../../const/global');
const timeline = require('../../../const/global').timeline;

/**
 * Controller class for the container select. Any action taken on the container select screen is redirected and managed here.
 */
export class ContainerSelectController{
    constructor(model){
        gv.containerSelectController = this;
        this.model = model;
    }

    switchHaive(loc){
        console.log("Clicked on loc", loc);
        if(this.model.getCurrentlySelectedHaive().getNeighbour(loc) !== null){
            this.model.setCurrentlySelectedHaive(this.model.getCurrentlySelectedHaive().getNeighbour(loc));
            gv.containerSelectView.setState({haive:this.model.getCurrentlySelectedHaive()});
        }
    }

    selectContainer(loc){
        gv.containerSelectView.setState({choose: true, loc: loc});
    }

    cancelSelection(){
        gv.containerSelectView.setState({choose: false, loc: -1});
    }

    placeContainer(loc, container){
        container = gv.availableContainers.getFirstContainerByType(container);
        console.log("Placing ", container, "on ", loc);
        console.log(this.model.getCurrentlySelectedHaive().getContainers());
        console.log(container ,loc);
        this.model.getCurrentlySelectedHaive().setContainer(container, loc);
        console.log(this.model.getCurrentlySelectedHaive().getContainer(loc));
        console.log(this.model.getCurrentlySelectedHaive().getContainers());
        gv.availableContainers.removeContainer(container);
        console.log(this.model.getCurrentlySelectedHaive().getContainers());
        gv.containerSelectView.setState({choose: false, loc: -1}) ;
        this.model.updateState("Placed container "+container.getContainerSubType().name+" at "+loc);

    }

    removeContainer(loc){
        let container = this.model.getCurrentlySelectedHaive().getContainer(loc);
        console.log(gv.availableContainers.containers.map(function(i){return i.getContainerSubType().name}));
        gv.availableContainers.addContainer(container);
        console.log(gv.availableContainers.containers.map(function(i){return i.getContainerSubType().name}));
        this.model.getCurrentlySelectedHaive().removeContainer(loc);
        gv.containerSelectView.setState({choose: false, loc: -1}) ;
        this.model.updateState("Removed container from "+loc+" of "+this.model.getCurrentlySelectedHaive().getName());
    }

    designContainerStructure(loc){
        gv.containerSelectView.setState({design: loc});
    }

}