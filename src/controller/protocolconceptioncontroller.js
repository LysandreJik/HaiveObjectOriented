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

const gv = require('../../const/global');
const Block = require("../model/timeline/block").Block;

/**
 * Controller for the protocol conception
 */
export class ProtocolConceptionController{
    /**
     * Sets the global variable "protocolConceptionController" to this class' instance.
     */
	constructor(){
		gv.protocolConceptionController = this;
        //gv.protocolConceptionController.saveContainersDebug();
	}

    /**
     * Method called when a container is clicked on.
     * @param container Container on which the user clicked (Container object)
     */
	clickedContainer(container){
		console.log("Clicked container "+container.getType());
		gv.containerView.setState({containerSelected:container});

		setTimeout(function(){
			window.location = "#cthover";
			gv.containerViewCanvas.refresh();
		}, 1);

	}

    /**
     * Create a new Timeline.
     */
	createNewTimeline(){
		console.log("Created a new timeline");
		gv.protocolDesignController.timeline.blocks = [new Block({type:"START_BLOCK", text:"START"}), new Block(), new Block()];
		gv.currentlySelectedHaive.setContainers(gv.containersAtTimelineStart);
		window.location="#_";
		gv.myAssets.setSelected(3);
		gv.protocolDesignView.refresh();

	}

	saveContainersDebug(){
        let containers = gv.currentlySelectedHaive.getContainers();
        console.log(containers);
        gv.containersAtTimelineStart = [];
        for(let i = 0; i < containers.length; i++){
            gv.containersAtTimelineStart.push(containers[i].getClone());
        }
    }

    /**
     * Save the containers to the global variable "containersAtTimelineStart".
     */
	saveContainers(){
		let containers = gv.currentlySelectedHaive.getContainers();
		console.log(containers);
		gv.containersAtTimelineStart = [];
		for(let i = 0; i < containers.length; i++){
			gv.containersAtTimelineStart.push(containers[i].getClone());
		}

        window.location="#_";
        gv.myAssets.setSelected(3)
	}


}


