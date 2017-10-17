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
const Block = require('./timeline/block').Block;

/**
 * Model class of the protocol design
 */
export class ProtocolDesignModel{
	constructor(){
		gv.protocolDesignModel = this;
		this.containerContents = [[], [], [], [], [], []];
		this.containers = [];
		this.currentlySelectedDimension = "mL";
		this.currentlySelectedSpeed = "sm";
        this.selection = [];
		this.designBlocks = [
			["Tip",
				[new Block({
					text: "GET TIP",
					type:"get tip",
				}),
				new Block({
					text: "DEPOSIT TIP",
					type:"deposit tip",
				})]
			],
			["Liquid",
				[new Block({
					text: "GET LIQUID",
					type:"get liquid",
				}),
				new Block({
					text: "DEPOSIT LIQUID",
					type:"deposit liquid",
				})]
			],
			["Other",
				[new Block({
					text: "WAIT",
					type:"wait",
				}),
				new Block({
					text: "PIPETTING",
					type:"pipetting",
				})]
			],
		]
	}

    /**
     * Returns the currently selected items.
     * @returns {Array}
     */
    getSelection(){
        return this.selection;
    }

    /**
     * Add an item to the current selection.
     * @param item
     */
    addToSelection(item){
        this.selection.push(item);
    }

    /**
     * Clears the current selection
     */
    clearSelection(){
        this.selection = [];
    }

    /**
     * Returns a Block object, according to its category and its index inside said category
     * @param category String
     * @param index Integer
     * @returns {*} Block object
     */
	getBlockFromCategoryAndIndex(category, index){
		for(let i = 0; i < this.designBlocks.length; i++){
			if(this.designBlocks[i][0] == category){
				return this.designBlocks[i][1][index];
			}
		}
	}

    /**
     * Returns an instance of an end block
     * @returns {Block}
     */
	getEndBlock(){
		return new Block({
				text:"END",
				type:"END_BLOCK"
		});
	}

    /**
     * Get all the design blocks of the protocol design.
     * @returns {Array|[null,null,null]}
     */
	getDesignBlocks(){
		return this.designBlocks;
	}

    /**
     * Get all the liquid containers as a string.
     * @returns {string} String
     */
	getLiquidContainersAsString(){
        let str = "";

        for(let i = 0; i < this.containerContents.length; i++){
			if(this.containerContents[i][0] == "LIQUID CONTAINER"){
				str+= i+" ";
			}
		}

		return str;
	}

    /**
     * Get all the tip containers as a string
     * @returns {string}
     */
	getTipContainersAsString(){
        let str = "";

        for(let i = 0; i < this.containerContents.length; i++){
			if(this.containerContents[i][0] == "CHIP CONTAINER"){
				str+= i+" ";
			}
		}

		return str;
	}

    /**
     * Get all the other containers as a string
     * @returns {string}
     */
	getOtherContainersAsString(){
        let str = "";

        for(let i = 0; i < this.containerContents.length; i++){
			if(this.containerContents[i][0] == "OTHER CONTAINER"){
				str+= i+" ";
			}
		}

		return str;
	}

    /**
     * Get all the container contentes
     * @returns {Array}
     */
	getContainerContents(){
		return this.containerContents;
	}

    /**
     * Init the protocol design
     */
	protocolDesignInit(){
        const containers = gv.currentlySelectedHaive.getContainers();

        $(document).bind("contextmenu", this.contextMenu);

		this.containerContents = [[], [], [], [], [], []];
		gv.dropped_blocks = ["START_BLOCK_VALUE","",""];

		for(let i = 0; i < containers.length; i++){
			if(containers[i].isLiquidContainer()){
				this.containerContents[i].push("LIQUID CONTAINER");
			}else if(containers[i].isTipContainer()){
				this.containerContents[i].push("CHIP CONTAINER");
			}else{
				this.containerContents[i].push("OTHER CONTAINER");
			}
		}

		for(let i = 1; i < containers.length; i++){
			switch (containers[i].getLoc()) {
				case "top-left":
					this.containerContents[0].push(containers[i]);
					break;
				case "top-right":
					this.containerContents[1].push(containers[i]);
					break;
				case "middle-left":
					this.containerContents[2].push(containers[i]);
					break;
				case "middle-right":
					this.containerContents[3].push(containers[i]);
					break;
				case "bottom-left":
					this.containerContents[4].push(containers[i]);
					break;
				case "bottom-right":
					this.containerContents[5].push(containers[i]);
					break;
				default:
					console.log("Error");
			}
		}
	}

    /**
     * Context menu main method
     * @param e
     */
	contextMenu(e){
		e.preventDefault();
		const contextMenu = $("#cntnrunavailable");
        contextMenu.css("left",e.pageX);
        contextMenu.css("top",e.pageY);
        contextMenu.fadeIn(200,startFocusOut());
	}


}

/**
 * Context menu function
 */
function startFocusOut(){
    const contextMenu = $("#cntnrunavailable");
	$(document).on("click",function(){
        contextMenu.hide();
		$(document).off("click");
	});

	$(document).mousedown(function(){
        contextMenu.hide();
		$(document).off("click");
	});
}
