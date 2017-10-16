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

const globalVars = require('../../../const/global');

/**
 * Controller class for the Haive tiles (dashboard).
 */
export class HaiveTilesController{
	constructor(){
		this.droppedTileFromStore = this.droppedTileFromStore.bind(this);
		globalVars.haiveTilesController = this;
	}

    /**
     * Function called when a tile is dropped from the store onto the tiles.
     * @param tile tile name and number.
     * @param loc location where it was dropped.
     */
	droppedTileFromStore(tile, loc){
		globalVars.haiveTilesModel.addHaiveFromStore(loc, globalVars.haiveStoreModel.getHaive(tile));
	}

    /**
     * Function called when a tile is dragged.
     * @param tile name and number of tile
     * @param loc location of the drag.
     */
	draggedTile(tile, loc){
		if(tile.substring(4) != loc){

			if(globalVars.haiveTilesModel.getHaiveTiles()[loc].getType() == "openslot"){
				this.destroyDraggableFromId("tile"+loc);
				this.destroyDraggableFromId(tile);
			}

			globalVars.haiveTilesModel.switchHaiveTiles(tile.substring(4), loc);
		}
	}

    /**
     * Destroy the draggable of the passed hexagon
     * @param hexagon Hexagon object
     */
	destroyDraggable(hexagon){
		try{
			$('#draggable'+hexagon.props.id).draggable("destroy");
		}catch(e){console.error(e)}
	}

    /**
     * Destroy the hexagon's draggable component from its ID.
     * @param hexagon Hexagon object id
     */
	destroyDraggableFromId(id){
		try{
			$('#draggable'+id).draggable("destroy");
		}catch(e){console.error(e)}
	}

    /**
     * Update the draggable component.
     * @param hexagon Hexagon object
     */
	updateDraggable(hexagon){
		this.destroyDraggable(hexagon);
		this.addDraggable(hexagon);
	}

    /**
     * Adds the draggable component to the hexagon item.
     * @param hexagon Hexagon object
     */
	addDraggable(hexagon){
		let sup = this;
		let parent = hexagon;

		$("#draggable"+hexagon.props.id).draggable({
			helper: function(){
				let clone = $(this).clone();
				clone.height($(this).height());
				clone.width($(this).width());
				return clone;
			},

			stop: function(){
				sup.draggedTile(parent.props.id, globalVars.getClosestHexagonToMouse());
			}
		});
	}

    /**
     * The main drag and drop function. Is called when a draggable object is dropped on top of a droppable object.
     * @param source name of the source item.
     * @param numberTarget number of the tile target.
     */
	dragAndDrop(source, numberTarget){
		//If it is from the hive of haives to the hive of haives (no interaction from hivesstore)
		if(source.substring(0,5) != "tiles"){
			let numberSource = source.substring(4);
			//If the drag comes from another haive than itself
			if(numberTarget != numberSource){
				globalVars.haiveTilesModel.switchHaiveTiles(numberTarget, numberSource);

				if(globalVars.haiveTilesModel.getHaive(numberSource).getType() == "openslot"){
					$('#draggabletile'+numberSource).draggable('disable');
				}else{
					$('#draggabletile'+numberSource).draggable('enable');
				}

				if(globalVars.haiveTilesModel.getHaive(numberTarget).getType() == "openslot"){
					$('#draggabletile'+numberTarget).draggable('disable');
				}else{
					$('#draggabletile'+numberTarget).draggable('enable');
				}
			}
		}
	}

    /**
     * Sets the refresh tiles function
     * @param tiles HaiveTile React component.
     */
	setRefreshTilesFunction(tiles){
		this.tiles = tiles;
	}

    /**
     * Updates the state of the HaiveTile React component, hence refreshing it.
     */
	refreshTiles(){
		this.tiles.setState({updated:true});
	}

    /**
     * Sets the refresh app function.
     * @param that App React component
     */
	setRefreshAppFunction(that){
		this.app = that;
	}

    /**
     * Refreshes the app by updating its state.
     */
	refreshApp(){
		this.app.updateApp("updated", true);
	}

    /**
     * Sets a certain state of the app to a certain value.
     * @param state state which is to be changed.
     * @param value new value of the state.
     */
	setAppState(state, value){
		this.app.updateApp(state, value);
	}

    /**
     * Displays the hover of passed item.
     * @param index of the item
     */
	displayHover(index){
		globalVars.haiveTilesView.setState({hover:index.substring(4)});
	}

    /**
     * Function which displays the miscellaneous hovers such as the hover item to set the description of the haive or the welcome screen
     * @param hover String : "setdescofhaive" and "welcomescreen" are currently the only two supported kinds.
     * @param id id of the hover.
     */
	hoverMisc(hover, id){
		var parent = globalVars.haiveTilesView;
		if(hover == "setdescofhaive"){
			setTimeout(function(){
				parent.setState({hoverMisc:hover+":"+id});
				window.location = "#desc";
			}, 100);
		}else if(hover == "welcomescreen"){
			setTimeout(function(){
				// console.log("Setting state to welcomescreen");
				parent.setState({hoverMisc:hover+":"+id});
				window.location = "#welcome";
			}, 100);
		}
	}
}
