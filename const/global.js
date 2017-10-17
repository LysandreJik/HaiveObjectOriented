export var imageLoad = 0;
export var loadingScreen;
export var loginDone = false;
export var creatingAccount = false;
export var temporaryLiquidQuantity = [0,0,0]

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

//If add or delete, think to go to webInterfaceController.js, WebInterfaceController class, getFocusedPage method and modify the switch statement
export const navbarMenuTitlesAndIcons = [
	["Dashboard", "dashboard"],
	["Container Select", "building-o"],
	["Protocol Conception", "flask"],
	["Protocol Design", "edit"],
	["Marketplace", "gears"]
];

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


export var containersAvailable = [
	["P1000 normal chip", "p1000 normal", "P1000N:001"],
	["P1000 long chip", "p1000 long", "P1000L:001"],
	["P20 normal chip", "p20", "P20N:001"],
	["P200 normal chip", "p200", "P200N:001"],
	["15 screw tubes", "15st", "15SC:001"],
	["6 falcon stand", "6fs", "6FS:001"],
	["P1000 normal chip", "second p100 normal", "P1000N:002"]
];

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

export var containersAtTimelineStart = [];

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

export var protocolConceptionView;
export var protocolConceptionController;

export var protocolDesignModel;
export var protocolDesignView;
export var protocolDesignController;
export var protocolDesignBlueprintcontentView;

export var mainApp;
export var mainAppController;

export var currentlySelectedHaiveID;
export var currentlySelectedHaive;

export var pos_middle_left = [0.3,0.5];
export var pos_middle_right = [1-0.3,0.5];

export var pos_top_left = [0.4, 0.21];
export var pos_top_right = [1-0.4, 0.21];

export var pos_bottom_left = [0.4, 1-0.21];
export var pos_bottom_right = [1-0.4, 1-0.21];

export var availableContainers;
export var containerBar;

export function clone(source) {
    if (Object.prototype.toString.call(source) === '[object Array]') {
        var __clone = [];
        for (var i=0; i<source.length; i++) {
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
	var distance = [];
	distance = [0, getEuclidianDistance(mouseX, mouseY, hexagon_tiles_canv_pos[0])];
	for(var i = 0; i < hexagon_tiles_canv_pos.length; i++){
		if(getEuclidianDistance(mouseX, mouseY, hexagon_tiles_canv_pos[i]) < distance[1]){
			distance = [i, getEuclidianDistance(mouseX, mouseY, hexagon_tiles_canv_pos[i])];
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
		return "top-left";
	}else if (min == distance_mouse_topright) {
		return "top-right";
	}else if (min == distance_mouse_middleleft) {
		return "middle-left";
	}else if (min == distance_mouse_middleright) {
		return "middle-right";
	}else if (min == distance_mouse_bottomleft) {
		return "bottom-left";
	}else if (min == distance_mouse_bottomright) {
		return "bottom-right";
	}

}

export function getDivStylePosition(container_location){

	var ratio = 0.888*($(window).width()/1920);

	if(container_location == "top-left"){
		return {
			top: ((pos_top_left[1]+0.01)*$('#background').height()-ratio*50)+'px',
			left: ((pos_top_left[0]+0.01)*$('#background').width()-ratio*100)+'px'
		}
	}else if (container_location == "top-right") {
		return {
			top: ((pos_top_right[1]+0.01)*$('#background').height()-ratio*50)+'px',
			left: ((pos_top_right[0]+0.05)*$('#background').width()-ratio*100)+'px'
		}
	}else if (container_location == "middle-left") {
		return {
			top: ((pos_middle_left[1])*$('#background').height()-ratio*50)+'px',
			left: ((pos_middle_left[0]+0.03)*$('#background').width()-ratio*100)+'px'
		}
	}else if (container_location == "middle-right") {
		return {
			top: ((pos_middle_right[1])*$('#background').height()-ratio*50)+'px',
			left: ((pos_middle_right[0]+0.05)*$('#background').width()-ratio*100)+'px'
		}
	}else if (container_location == "bottom-left") {
		return {
			top: ((pos_bottom_left[1]-0.02)*$('#background').height()-ratio*50)+'px',
			left: ((pos_bottom_left[0]+0.01)*$('#background').width()-ratio*100)+'px'
		}
	}else if (container_location == "bottom-right") {
		return {
			top: ((pos_bottom_right[1]-0.02)*$('#background').height()-ratio*50)+'px',
			left: ((pos_bottom_right[0]+0.05)*$('#background').width()-ratio*100)+'px'
		}
	}


	return "";
}

export function getContainerLocNumberFromLocString(str){
	if(str == "top-left"){
		return 0;
	}else if(str == "top-right"){
		return 1;
	}else if(str == "middle-left"){
		return 2;
	}else if(str == "middle-right"){
		return 3;
	}else if(str == "bottom-left"){
		return 4;
	}else if(str == "bottom-right"){
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
