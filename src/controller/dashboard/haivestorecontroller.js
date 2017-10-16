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

const globalVars = require('../../../const/global');

/**
 * Controller class for the Haive store (dashboard).
 */
export class HaiveStoreController{
	constructor(){
		globalVars.haiveStoreController = this;
	}

    /**
     * Adds the draggable component to the small hexagons
     * @param hexagon Hexagon item.
     */
	addDraggable(hexagon){
		let parent = hexagon;

		$("#draggable"+hexagon.props.id).draggable({
			start: function(event, ui){
				// console.log("Started dragging draggable"+parent.props.id);
			},

			helper: function(){
                let clone = $(this).clone();
				clone.height($(this).height());
				clone.width($(this).width());
				return clone;
			},

			stop: function(){
				globalVars.haiveTilesController.droppedTileFromStore(parent.props.id.substring(9), globalVars.getClosestHexagonToMouse());
			}
		})
	}

    /**
     * Destroy draggable component of the passed hexagon
     * @param hexagon Hexagon item.
     */
	destroyDraggable(hexagon){
		try{
			$('#draggable'+hexagon.props.id).draggable("destroy");
			// console.log("Successfully removed the draggable of #draggable"+hexagon.props.id);
		}catch(e){
			// console.log("Couldn't remove the draggable of #draggable"+hexagon.props.id);
		}

	}

    /**
     * Destroy the draggable component from the hexagon corresponding to the passed id.
     * @param hexagon hexagon id.
     */
	destroyDraggableFromId(hexagon){
		try{
			$('#draggable'+hexagon).draggable("destroy");
			// console.log("Successfully removed the draggable of #draggable"+hexagon);
		}catch(e){
			// console.log("Couldn't remove the draggable of #draggable"+hexagon);
		}

	}

    /**
     * Sets the "RefreshApp" function.
     * @param that function which refreshes the App.
     */
	setRefreshAppFunction(that){
		this.app = that;
	}

    /**
     * Calls the "refresh app" function.
     */
	refreshApp(){
		this.app.updateApp("updated", true);
	}

    /**
     * Set the app state
     * @param state state which must change
     * @param value value of the changed state
     */
	setAppState(state, value){
		this.app.updateApp(state, value);
	}

    /**
     * Refreshes the haive store
     */
	refreshStore(){
		this.app.updateApp("refreshStore", true);
	}

    /**
     * Display the hover on a hexagon.
     * @param index
     */
	displayHover(index){
		globalVars.haiveStoreView.setState({hover:index.substring(9)});
	}
}
