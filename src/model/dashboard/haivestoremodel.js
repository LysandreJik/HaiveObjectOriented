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

const haives = require('../../../const/global').haiveStore;
const globalVars = require('../../../const/global');
const Haive = require('../../model/haive').Haive;

let controller;

/**
 * The model class for the Haive Store
 */
export class HaiveStoreModel{
	constructor(args){
		controller = args.controller;
		this.haiveStore = [];

		for(let i = 0; i < haives.length; i++){
			this.haiveStore.push(
				new Haive({
					id:haives[i][0],
					type:haives[i][1],
					name:haives[i][2],
					refID:haives[i][3],
					desc:haives[i][4]
				})
			);
		}

		globalVars.haiveStoreModel = this;
		// console.log(this.haiveStore);
	}

    /**
     * Return the "Haive store", which is all the haives bought that are available, but which are not put onto the dashboard. Therefore, they're available but not used.
     * @returns {Array} Array of haives
     */
	getHaiveStore(){
		return this.haiveStore;
	}

    /**
     * Returns the controller of the HaiveStore object
     * @returns {*} Controller object
     */
	getController(){
		return controller;
	}

    /**
     * Get haive from its index.
     * @param index Index of the haive in the haiveStore array.
     * @returns {*} Haive object
     */
	getHaive(index){
		return this.haiveStore[index];
	}

    /**
     * Add a haive to the current haive store.
     * @param haive Haive object
     */
	addHaive(haive){
		this.haiveStore.push(haive);
	}

    /**
     * Remove haive from the current haive store.
     * @param haive Haive object
     */
	removeHaive(haive){
		for(let i = 0; i < this.haiveStore.length; i++){
			if(this.haiveStore[i] == haive){
				this.haiveStore.splice(i, 1);
			}
		}
	}
}
