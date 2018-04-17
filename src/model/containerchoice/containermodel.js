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

import React from 'react';

const gv = require('../../../const/global');
const ContainersAvailable = require('../containersavailable').ContainersAvailable;

let controller;

/**
 * The model for the container select part of the GUI.
 */
export class ContainerSelectModel{
	constructor(args){
		controller = args.controller;
		gv.containerSelectModel = this;
		this.containersAvailable = new ContainersAvailable();
		this.containersOnField = [];
	}

    /**
     * Returns the controller class of the container select.
     * @returns {*} controller object
     */
	getController(){
		return controller;
	}

    /**
     * Returns all the containers currently in the selected haive.
     * @returns {Array} array of container objects
     */
	getContainersOnField(){
		return this.containersOnField;
	}

    /**
     * Returns the name of a container from its location
     * @param loc String which indicates the location such as : "top-right" or "middle-left"
     * @returns {string|XML|*|void} String, name of the container
     */
	getContainerOnFieldName(loc){
		return this.containersOnField[gv.getContainerLocNumberFromLocString(loc)].replace(/_/g,' ');
	}

    /**
     * Returns a container object from its location
     * @param loc String which indicates the location such as : "top-right" or "middle-left"
     * @returns Container object
     */
	getContainerOnField(loc){
	    console.log(this.containersOnField);
	    console.log(loc);
		return this.containersOnField[gv.getContainerLocNumberFromLocString(loc)];
	}

    /**
     * Set a container on the field. Requires the position to which it is to be assigned.
     * @param loc String which indicates the location such as : "top-right" or "middle-left"
     * @param container
     */
	setContainersOnField(loc, container){
		this.containersOnField[gv.getContainerLocNumberFromLocString(loc)] = container;
	}

    /**
     * Remove  a container from haive from its location.
     * @param loc String which indicates the location such as : "top-right" or "middle-left"
     */
	removeContainerFromHaive(loc){
	    let isLiquidContainer = gv.currentlySelectedHaive.getContainer(loc).isLiquidContainer();

	    if(isLiquidContainer){
            gv.availableContainers.addContainer(new LiquidContainer({type:gv.currentlySelectedHaive.getContainer(loc).getType(), name:"none", id:"none", loc:"containerbar"}));
        }else{
            gv.availableContainers.addContainer(new TipContainer({type:gv.currentlySelectedHaive.getContainer(loc).getType(), name:"none", id:"none", loc:"containerbar"}));
        }

		gv.currentlySelectedHaive.removeContainer(loc);
		gv.containerViewCanvas.refresh();
		gv.containerBar.refresh();
	}
}
