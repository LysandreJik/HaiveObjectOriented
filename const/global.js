import Haive from "../src/structure/Haive";
import {
    CONTAINER_POSITIONS, CONTAINER_POSITIONS_IDS, CONTAINER_SUBTYPES, HAIVE_TYPES,
    LIQUID_MAGNITUDES
} from "./structure";
import Timeline from "../src/structure/timeline/Timeline";
import State from "../src/structure/timeline/State";
import PipetteTipContainer from "../src/structure/containers/PipetteTipContainer";
import LiquidContainer from "../src/structure/containers/LiquidContainer";

if(typeof jQuery == 'undefined'){
    document.write('<script type="text/javascript" src="../js/jquery.min.js"></'+'script>');
}


export var imageLoad = 0;
export var loadingScreen;
export var loginDone = true;
export var creatingAccount = false;
export var temporaryLiquidQuantity = [0,0,0];

//INITIALIZATION CODE

export var containersAvailable = [
    new PipetteTipContainer({subType:CONTAINER_SUBTYPES.P1000_NORMAL_CHIP}),
    new PipetteTipContainer({subType:CONTAINER_SUBTYPES.P1000_LONG_CHIP}),
    new PipetteTipContainer({subType:CONTAINER_SUBTYPES.P20_NORMAL_CHIP}),
    new PipetteTipContainer({subType:CONTAINER_SUBTYPES.P200_NORMAL_CHIP}),
    new PipetteTipContainer({subType:CONTAINER_SUBTYPES.P1000_NORMAL_CHIP}),
    new LiquidContainer({subType:CONTAINER_SUBTYPES.ST15_SCREW_TUBES}),
    new LiquidContainer({subType:CONTAINER_SUBTYPES.FS6_FALCON_STAND})
];

let ownedHaives = [
    new Haive({name: "First dispenser", type: HAIVE_TYPES.DISPENSER, id: 0, desc: ""}),
    new Haive({name: "First freezer", type: HAIVE_TYPES.FREEZER, id: 1, desc: ""}),
    new Haive({name: "First centrifuge", type: HAIVE_TYPES.CENTRIFUGE, id: 2, desc: ""}),
    new Haive({name: "Second dispenser", type: HAIVE_TYPES.DISPENSER, id: 3, desc: ""}),
];

let initialState = new State({
	storeHaives:ownedHaives,
	haives:[],
	held:{liquid: "NONE", quantity: 0, magnitude: LIQUID_MAGNITUDES.uL},
	copied: null,
});

export let timeline = new Timeline(initialState);

//END OF INIT CODE

export const acceptedContainerTypes = [
	"P1000 normal chip",
	"P1000 long chip",
	"P20 normal chip",
	"P200 normal chip",
	"15 screw tubes",
	"6 falcon stand",
	"20 magnetic beads",
	"96 micro plate",
	"24 micro plate"
];

export const acceptedContainerLocs = [
	"top-left",
	"top-right",
	"middle-left",
	"middle-right",
	"bottom-left",
	"bottom-right"
];

export const focusablePages = {
    DASHBOARD: "Dashboard",
    HAIVE_SELECT: "Haive select",
    ASSET_STORE: "Asset store",
	subpages:{
        CONTAINER_SELECT: "Container select",
		HAIVE_SELECT: "Haive select"
	}
};

export const navbarMenuTitlesAndIcons = [
    [focusablePages.DASHBOARD, "dashboard"],
    [focusablePages.HAIVE_SELECT, "flask"],
	[focusablePages.ASSET_STORE, "gears"]
];

export const reducers = {
	focused:{
		SWITCH_PAGE: "Switch page"
	},
	haives:{
        ADD_HAIVE_TO_INVENTORY: "Add Haive to inventory",
        REMOVE_HAIVE_FROM_INVENTORY: "Remove Haive from inventory",
		ADD_HAIVE_TO_STORE: "Add Haive to inventory",
        REMOVE_HAIVE_FROM_STORE: "Remove Haive from inventory"
	}
};

export var haiveStore = [
	['tile0', "DISPENSER", "First dispenser", "ID:DISP_001", "Template desc"],
	['tile1', "FREEZER", "First freezer", "ID:FREE_001", "Template desc"],
	['tile2', "CENTRIFUGE", "First centrifuge", "ID:CENT_001", "Template desc"],
	['tile3', "DISPENSER", "Second dispenser", "ID:DISP_002", "Template desc"],
];

export const dispenser =   "DISPENSER";
export const freezer =     "FREEZER";
export const centrifuge =  "CENTRIFUGE";
export const empty =       "openslot";




export var containerSelectModel;

export var hexagon_tiles_canv_pos = [];

export var mouseX = 0;
export var mouseY = 0;
export var dragInMotion = false;

export var hexs = [
	['tile0', "DISPENSER", "Third dispenser", "ID:DISP_003", "Template desc"],
	['tile1', "FREEZER", "Second freezer", "ID:FREE_002", "Template desc"],
	['tile2', "CENTRIFUGE", "Second centrifuge", "ID:CENT_002", "Template desc"],
	['tile3', "openslot", "", "", ""],
	['tile4', "openslot", "", "", ""],
	['tile5', "openslot", "", "", ""],
	['tile6', "openslot", "", "", ""],
	['tile7', "openslot", "", "", ""],
	['tile8', "openslot", "", "", ""],
	['tile9', "openslot", "", "", ""],
	['tile10', "openslot", "", "", ""],
	['tile11', "openslot", "", "", ""],
	['tile12', "openslot", "", "", ""],
	['tile13', "openslot", "", "", ""],
	['tile14', "openslot", "", "", ""],
	['tile15', "openslot", "", "", ""],
	['tile16', "openslot", "", "", ""],
	['tile17', "openslot", "", "", ""],
	['tile18', "openslot", "", "", ""],
	['tile19', "openslot", "", "", ""],
	['tile20', "openslot", "", "", ""],
	['tile21', "openslot", "", "", ""],
	['tile22', "openslot", "", "", ""]
];

export var myAssets;

export var haiveSelectorView;
export var haiveSelectorModel;
export var haiveSelectorController;

export var containersAtTimelineStart = [];
export var blueprintController;

export var loginController;
export var hoverview;

export var dropped_blocks = ["START_BLOCK_VALUE","",""];
export var currentlySelectedDimension = "mL";
export var currentlySelectedSpeed = "sm";

export var haiveTilesModel;
export var haiveTilesView;
export var haiveTilesController;

export var haiveStoreModel;
export var haiveStoreView;
export var haiveStoreController;

export var navbarModel;

export var containerView;
export var containerViewCanvas;
export var containerViewMainContent;

export var containerSelectController;
export var containerSelectView;

export var protocolConceptionView;
export var protocolConceptionController;

export var protocolDesignModel;
export var protocolDesignView;
export var protocolDesignController;
export var protocolDesignBlueprintcontentView;

export var mainApp;
export var mainAppController;

export var currentlySelectedHaive;

export var pos_middle_left = [0.3,0.5];
export var pos_middle_right = [1-0.3,0.5];

export var pos_top_left = [0.4, 0.21];
export var pos_top_right = [1-0.4, 0.21];

export var pos_bottom_left = [0.4, 1-0.21];
export var pos_bottom_right = [1-0.4, 1-0.21];

export var availableContainers;
export var containerBar;

export var protocolDesignRunInterface;

export function fetchJSONFile(path, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                let data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

export function clone(source) {
    if (Object.prototype.toString.call(source) === '[object Array]') {
        var __clone = [];
        for (var i=0; i<source.length; i++) {
            console.log(source[i]);
            __clone[i] = clone(source[i]);
        }
        return __clone;
    } else if (typeof(source)=="object") {
        var __clone = {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                __clone[prop] = clone(source[prop]);
            }
        }
        return __clone;
    } else {
        return source;
    }
}

export function getClosestHexagonToMouse(){
	var distance;
    const blueprint = document.getElementById("haiveblueprint");

	distance = [[hexagon_tiles_canv_pos[0][2], hexagon_tiles_canv_pos[0][3]], getEuclidianDistance(mouseX+blueprint.scrollLeft, mouseY+blueprint.scrollTop, hexagon_tiles_canv_pos[0])];
	for(var i = 0; i < hexagon_tiles_canv_pos.length; i++){
		if(getEuclidianDistance(mouseX+blueprint.scrollLeft, mouseY+blueprint.scrollTop, hexagon_tiles_canv_pos[i]) < distance[1]){
			distance = [[hexagon_tiles_canv_pos[i][2], hexagon_tiles_canv_pos[i][3]], getEuclidianDistance(mouseX+blueprint.scrollLeft, mouseY+blueprint.scrollTop, hexagon_tiles_canv_pos[i])];
		}
	}

	return distance[0];
}

export function getEuclidianDistance(x, y, pos){
	if(pos == undefined){
		return 1000;
	}
	return Math.sqrt((x-pos[0])*(x-pos[0])+(y-pos[1])*(y-pos[1]));
}

export function getClosestContainer(x, y){

	var image_width = $('#background').width();
	var image_height = $('#background').height();

	var distance_mouse_topleft = Math.sqrt((x-pos_top_left[0]*image_width)*(x-pos_top_left[0]*image_width) + (y-pos_top_left[1]*image_height)*(y-pos_top_left[1]*image_height));
	var distance_mouse_topright = Math.sqrt((x-pos_top_right[0]*image_width)*(x-pos_top_right[0]*image_width) + (y-pos_top_right[1]*image_height)*(y-pos_top_right[1]*image_height));
	var distance_mouse_middleleft = Math.sqrt((x-pos_middle_left[0]*image_width)*(x-pos_middle_left[0]*image_width) + (y-pos_middle_left[1]*image_height)*(y-pos_middle_left[1]*image_height));
	var distance_mouse_middleright = Math.sqrt((x-pos_middle_right[0]*image_width)*(x-pos_middle_right[0]*image_width) + (y-pos_middle_right[1]*image_height)*(y-pos_middle_right[1]*image_height));
	var distance_mouse_bottomleft = Math.sqrt((x-pos_bottom_left[0]*image_width)*(x-pos_bottom_left[0]*image_width) + (y-pos_bottom_left[1]*image_height)*(y-pos_bottom_left[1]*image_height));
	var distance_mouse_bottomright = Math.sqrt((x-pos_bottom_right[0]*image_width)*(x-pos_bottom_right[0]*image_width) + (y-pos_bottom_right[1]*image_height)*(y-pos_bottom_right[1]*image_height));

	var min = Math.min(distance_mouse_topleft, distance_mouse_topright, distance_mouse_middleleft, distance_mouse_middleright, distance_mouse_bottomleft, distance_mouse_bottomright);

	//If the drop is to far from anything, it doesn't drop on it.
	if(min > image_height/6){
		return null;
	}

	if(min == distance_mouse_topleft){
		return CONTAINER_POSITIONS_IDS.TOP_LEFT;
	}else if (min == distance_mouse_topright) {
		return CONTAINER_POSITIONS_IDS.TOP_RIGHT;
	}else if (min == distance_mouse_middleleft) {
		return CONTAINER_POSITIONS_IDS.MIDDLE_LEFT;
	}else if (min == distance_mouse_middleright) {
		return CONTAINER_POSITIONS_IDS.MIDDLE_RIGHT;
	}else if (min == distance_mouse_bottomleft) {
		return CONTAINER_POSITIONS_IDS.BOTTOM_LEFT;
	}else if (min == distance_mouse_bottomright) {
		return CONTAINER_POSITIONS_IDS.BOTTOM_RIGHT;
	}

}

export function getDivStylePosition(container_location){

	var ratio = 0.888*($(window).width()/1920);

	if(container_location == CONTAINER_POSITIONS.TOP_LEFT){
		return {
			top: ((pos_top_left[1]+0.01)*$('#background').height()-ratio*50)+'px',
			left: ((pos_top_left[0]+0.01)*$('#background').width()-ratio*100)+'px'
		}
	}else if (container_location == CONTAINER_POSITIONS.TOP_RIGHT) {
		return {
			top: ((pos_top_right[1]+0.01)*$('#background').height()-ratio*50)+'px',
			left: ((pos_top_right[0]+0.05)*$('#background').width()-ratio*100)+'px'
		}
	}else if (container_location == CONTAINER_POSITIONS.MIDDLE_LEFT) {
		return {
			top: ((pos_middle_left[1])*$('#background').height()-ratio*50)+'px',
			left: ((pos_middle_left[0]+0.03)*$('#background').width()-ratio*100)+'px'
		}
	}else if (container_location == CONTAINER_POSITIONS.MIDDLE_RIGHT) {
		return {
			top: ((pos_middle_right[1])*$('#background').height()-ratio*50)+'px',
			left: ((pos_middle_right[0]+0.05)*$('#background').width()-ratio*100)+'px'
		}
	}else if (container_location == CONTAINER_POSITIONS.BOTTOM_LEFT) {
		return {
			top: ((pos_bottom_left[1]-0.02)*$('#background').height()-ratio*50)+'px',
			left: ((pos_bottom_left[0]+0.01)*$('#background').width()-ratio*100)+'px'
		}
	}else if (container_location == CONTAINER_POSITIONS.BOTTOM_RIGHT) {
		return {
			top: ((pos_bottom_right[1]-0.02)*$('#background').height()-ratio*50)+'px',
			left: ((pos_bottom_right[0]+0.05)*$('#background').width()-ratio*100)+'px'
		}
	}


	return "";
}

export function getContainerLocNumberFromLocString(str){
	if(str == CONTAINER_POSITIONS.TOP_LEFT){
		return 0;
	}else if(str == CONTAINER_POSITIONS.TOP_RIGHT){
		return 1;
	}else if(str == CONTAINER_POSITIONS.MIDDLE_LEFT){
		return 2;
	}else if(str == CONTAINER_POSITIONS.MIDDLE_RIGHT){
		return 3;
	}else if(str == CONTAINER_POSITIONS.BOTTOM_LEFT){
		return 4;
	}else if(str == CONTAINER_POSITIONS.BOTTOM_RIGHT){
		return 5;
	}
}

export function  getContainerWidthAndHeight(container){
	if(container.getType() == "P200 normal chip" || container.getType() == "P20 normal chip" || container.getType() == "P1000 normal chip" || container.getType() == "P1000 long chip"){
		return [8,12];
	}else if(container.getType() == "15 screw tubes"){
		return [3,5];
	}else if(container.getType() == "20 magnetic beads"){
		return [4,5];
	}else if(container.getType() == "6 falcon stand"){
		return [2,3];
	}else{
		throw new Error("Error : "+ container.getType()+" does not have an appropriate type.");
	}
}

$(document).on("mousemove", function(event){
	mouseX = event.pageX;
	mouseY = event.pageY;
});
