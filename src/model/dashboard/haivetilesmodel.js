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

const hexs = require('../../../const/global').hexs;
const clone = require('../../../const/global').clone;
const gv = require('../../../const/global');
const Haive = require('../../model/haive').Haive;
const Container = require('../container').Container;

let controller;


/**
 * The model class for the Haive Store
 */
export class HaiveTilesModel{
	constructor(args){
		controller = args.controller;
		this.haiveTiles = [];


        //Initiates the Haive from the "hexs" global variable.
		for(let i = 0; i < hexs.length; i++){
			this.haiveTiles.push(
				new Haive({
					id:hexs[i][0],
					type:hexs[i][1],
					name:hexs[i][2],
					refID:hexs[i][3],
					desc:hexs[i][4]
				})
			);
		}

		//The following code serves as an initiator for the debugging process. Please delete the following lines before release
		gv.currentlySelectedHaive = this.haiveTiles[0];
		gv.currentlySelectedHaive.addContainerObject("top-left", new Container({type:"P20 normal chip", name:"p20 normal second ?", id:"P20N:002", loc:"top-left"}));
		gv.currentlySelectedHaive.addContainerObject("top-right", new Container({type:"6 falcon stand", name:"6fs 2nd", id:"6FS:002", loc:"top-right"}));
		gv.currentlySelectedHaive.addContainerObject("middle-left", new Container({type:"15 screw tubes", name:"15 st", id:"15ST:002", loc:"middle-left"}));
		gv.currentlySelectedHaive.addContainerObject("middle-right", new Container({type:"P1000 long chip", name:"p1000 long 3", id:"P1000L:003", loc:"middle-right"}));

		gv.currentlySelectedHaive.getContainer("top-left").getTip(1,1).setFull(true);
		gv.currentlySelectedHaive.getContainer("top-left").getTip(1,2).setFull(true);
		gv.currentlySelectedHaive.getContainer("top-left").getTip(1,3).setFull(true);
		gv.currentlySelectedHaive.getContainer("top-left").getTip(1,4).setFull(true);
		gv.currentlySelectedHaive.getContainer("top-left").getTip(1,5).setFull(true);
		gv.currentlySelectedHaive.getContainer("top-left").getTip(1,6).setFull(true);
		gv.currentlySelectedHaive.getContainer("top-left").getTip(1,7).setFull(true);

		gv.currentlySelectedHaive.getContainer("top-right").getTip(0,1).setLiquid("ABC");
		gv.currentlySelectedHaive.getContainer("top-right").getTip(0,1).setLiquidAmount("150");
		gv.currentlySelectedHaive.getContainer("top-right").getTip(0,1).setColor("blue");

		gv.currentlySelectedHaive.getContainer("top-right").getTip(0,2).setLiquid("ABC");
		gv.currentlySelectedHaive.getContainer("top-right").getTip(0,2).setLiquidAmount("150");
		gv.currentlySelectedHaive.getContainer("top-right").getTip(0,2).setColor("blue");

		gv.currentlySelectedHaive.getContainer("top-right").getTip(1,1).setLiquid("ABC");
		gv.currentlySelectedHaive.getContainer("top-right").getTip(1,1).setLiquidAmount("150");
		gv.currentlySelectedHaive.getContainer("top-right").getTip(1,1).setColor("blue");

		gv.currentlySelectedHaive.getContainer("top-right").getTip(1,2).setLiquid("CBA");
		gv.currentlySelectedHaive.getContainer("top-right").getTip(1,2).setLiquidAmount("150");
		gv.currentlySelectedHaive.getContainer("top-right").getTip(1,2).setColor("orange");

		gv.currentlySelectedHaive.getContainer("middle-left").getTip(0,1).setLiquid("ABC");
		gv.currentlySelectedHaive.getContainer("middle-left").getTip(0,1).setLiquidAmount("150");
		gv.currentlySelectedHaive.getContainer("middle-left").getTip(0,1).setColor("green");

		gv.currentlySelectedHaive.getContainer("middle-left").getTip(0,2).setLiquid("ABC");
		gv.currentlySelectedHaive.getContainer("middle-left").getTip(0,2).setLiquidAmount("150");
		gv.currentlySelectedHaive.getContainer("middle-left").getTip(0,2).setColor("green");

		gv.currentlySelectedHaive.getContainer("middle-left").getTip(1,1).setLiquid("ABC");
		gv.currentlySelectedHaive.getContainer("middle-left").getTip(1,1).setLiquidAmount("150");
		gv.currentlySelectedHaive.getContainer("middle-left").getTip(1,1).setColor("green");

		gv.currentlySelectedHaive.getContainer("middle-left").getTip(1,2).setLiquid("CBA");
		gv.currentlySelectedHaive.getContainer("middle-left").getTip(1,2).setLiquidAmount("150");
		gv.currentlySelectedHaive.getContainer("middle-left").getTip(1,2).setColor("cyan");
		gv.haiveTilesModel = this;
	}

    /**
     * Returns the HaiveTiles variable, which is an array of all the Haives currently in the Haive Tiles. Every Hive put on the dashboard will be in this array.
     * This array is of fixed size, and contains every empty slot as well, which are known as "openslot".
     * @returns {Array} Array of haives.
     */
	getHaiveTiles(){
		return this.haiveTiles;
	}

    /**
     * Switch two haives of places.
     * @param index1 Index of the first haive.
     * @param index2 Index of the second haive.
     */
	switchHaiveTiles(index1, index2){
		let hex1 = this.getHaive(index1);
		let hex2 = this.getHaive(index2);
		let hexTemp = hex1.getClone();

		hex1.setId(hex2.getId());
		hex2.setId(hexTemp.getId());

		this.haiveTiles[index1] = hex2;
		this.haiveTiles[index2] = hex1;

		controller.refreshTiles();
	}

    /**
     * Replaces the current haive at the passed index by the passed haive. It will overwrite an existing Haive, but will also overwrite an "openslot".
     * @param index Index at which the Haive is to be.
     * @param hexagonTile Haive object to be added
     */
	addHaive(index, hexagonTile){
		let hex2 = this.getHaive(index);
		hex2.setType(hexagonTile.getType());
		hex2.setName(hexagonTile.getName());
		hex2.setRefID(hexagonTile.getRefID());
		hex2.setDesc(hexagonTile.getDesc());

		controller.refreshTiles();
	}

    /**
     * Method called when a Haive is dropped from the store. Removes that haive from the store, and adds it to the Haive Tiles.
     * @param index Index at which the haive is dropped
     * @param hexagonStore Haive object
     */
	addHaiveFromStore(index, hexagonStore){
		gv.haiveStoreModel.removeHaive(hexagonStore);
		hexagonStore.setId("tile"+index);
		if(this.getHaive(index).getType() != "openslot"){
			gv.haiveStoreModel.addHaive(this.getHaive(index));
		}
		this.setHaive(hexagonStore, index);

		controller.refreshTiles();
		gv.haiveStoreView.refresh();
	}

    /**
     * Removes a Haive from the Haive tiles by its index (Replaces this haive by an "openslot".
     * @param index Index of the Haive which is to be removed.
     */
	removeHaive(index){
		controller.destroyDraggableFromId("tile"+index);

		let hex = this.getHaiveTiles()[index];

		gv.haiveStoreModel.addHaive(hex.getClone());
		gv.haiveStoreView.refresh();

		gv.haiveTilesModel.addHaive(index, new Haive({
			type:"openslot",
			name:"",
			refID:"",
			desc:"",
			id:hex.getId()
		}));




		controller.refreshTiles();
	}

    /**
     * Returns the Haive Tiles controller object.
     * @returns {*}
     */
	getController(){
		return controller;
	}

    /**
     * Get a Haive by its index.
     * @param index Index of the haive on the Haive Tiles.
     * @returns {*} Haive object
     */
	getHaive(index){
		return this.getHaiveTiles()[index];
	}

    /**
     * Get a Haive by its Reference ID.
     * @param refID
     * @returns {*}
     */
	getHaiveByRefID(refID){
		for (let i = 0; i < this.getHaiveTiles().length; i++) {
			// console.log(this.getHaiveTiles()[i].getRefID() +" =?= "+refID);
			if(this.getHaiveTiles()[i].getRefID() == refID){
				return this.getHaiveTiles()[i];
			}
		}
	}

    /**
     * Set a Haive, using its index.
     * @param haive Haive object
     * @param index Index at which it is to be added.
     */
	setHaive(haive, index){
		this.getHaiveTiles()[index] = haive;
	}
}

/**
 * Hexagon class. Contains all the information about every hexagon ever created.
 */
export class Hexagon{
	constructor(args){
		this.id = args.id;
		this.type = args.type;
		this.title = args.title;
		this.refID = args.refID;
		this.desc = args.desc;
	}

    /**
     * The Id of the Hexagon.
     * @returns {*}
     */
	getId(){
		return this.id;
	}

    /**
     * The Id of the Hexagon.
     * @param id
     */
	setId(id){
		this.id = id;
	}

    /**
     * The type of the Hexagon. Currently supported types : "openslot", "dispenser", "freezer", "centrifuge".
     * @returns {*}
     */
	getType(){
		return this.type;
	}

    /**
     * The type of the Hexagon. Currently supported types : "openslot", "dispenser", "freezer", "centrifuge".
     * @param type
     */
	setType(type){
		this.type = type;
	}

    /**
     * The title of the Hexagon. This can be set by the user.
     * @returns {*}
     */
	getTitle(){
		return this.title;
	}

    /**
     * The title of the Hexagon. This can be set by the user.
     * @param title
     */
	setTitle(title){
		this.title = title;
	}

    /**
     * The RefID of the Hexagon.
     * @returns {*}
     */
	getRefID(){
		return this.refID;
	}

    /**
     * The RefID of the Hexagon.
     * @param refID
     */
	setRefID(refID){
		this.refID = refID;
	}

    /**
     * The description of the hexagon. This can be set by the user.
     * @returns {*}
     */
	getDesc(){
		return this.desc;
	}

    /**
     * The description of the hexagon. This can be set by the user.
     * @param desc
     */
	setDesc(desc){
		this.desc = desc;
	}

    /**
     * Returns a clone of the hexagon. This is extremely useful to assign a copy of this hexagon to a new variable, preventing the new variable to be a reference to this exact object.
     * @returns {Hexagon}
     */
	getClone(){
		return new Hexagon({
			id:clone(this.getId()),
			type:clone(this.getType()),
			title:clone(this.getTitle()),
			refID:clone(this.getRefID()),
			desc:clone(this.getDesc())

		})
	}
}
