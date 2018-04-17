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
import PipetteTipContainer from '../structure/containers/PipetteTipContainer';
import LiquidContainer from '../structure/containers/LiquidContainer';

/**
 * Class that contains all the information about the available containers.
 */
export class ContainersAvailable{
	constructor(){
		this.containers = gv.containersAvailable;
		gv.availableContainers = this;
	}

    /**
     * Retusn all available containers of the passed type
     * @param type String
     * @returns {Array} Container object array
     */
	getAvailableContainersPerType(type){
		let containersTemp = [];

		for(let i = 0; i < this.containers.length; i++){
			if(this.containers[i].getType() == type){
				containersTemp.push(this.containers[i]);
			}
		}

		return containersTemp;
	}

    /**
     * Add a container to the available containers.
     * @param container Container object
     */
	addContainer(container){
		this.containers.push(container);
	}

    /**
     * Remove a container from the available containers array
     * @param container Contzainer object
     */
	removeContainer(container){
        let index = this.containers.indexOf(container);
		this.containers.splice(index, 1);
	}

    /**
     * Remove the first container of passed type
     * @param type String
     */
	removeFirstContainerByType(type){
		for(let i = 0; i < this.containers.length; i++){
			if(this.containers[i].getType() == type){
				this.containers.splice(i,1);
				return;
			}
		}
	}
}
