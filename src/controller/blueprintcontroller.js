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
const Block = require('../model/timeline/block').Block;

/**
 * Controller class for the Blueprint (Protocol design).
 */
export class BlueprintController{
	constructor(){
		this.selectedItemContextMenu = "";
		this.modifyDroppedBlock = this.modifyDroppedBlock.bind(this);
		this.copyDroppedBlock = this.copyDroppedBlock.bind(this);
		this.paste = this.paste.bind(this);
		this.deleteDroppedBlock = this.deleteDroppedBlock.bind(this);
		this.removeDroppedBlock = this.removeDroppedBlock.bind(this);
		this.openedContextMenu = this.openedContextMenu.bind(this);
		this.splitMegablock= this.splitMegablock.bind(this);
	}

    /**
     * Set the selected item of the context menu
     * @param sel selected item
     */
	setSelectedItemContextMenu(sel){
		this.selectedItemContextMenu = sel;
	}

    /**
     * Sets the controller
     * @param controller controller item
     */
	setController(controller){
		this.controller = controller;
	}

    /**
     * Returns the selected item from the context menu
     * @returns {string|*} selected item from the context menu
     */
	getSelectedItemContextMenu(){
		return this.selectedItemContextMenu;
	}

    /**
     * If the "Modify" option is clicked on. Basically redrops the block, and calls the method "droppedBlock" once again.
     */
	modifyDroppedBlock(){
	    let selectedItemContextMenu = $('#'+this.getSelectedItemContextMenu());
		console.log(selectedItemContextMenu, this.getSelectedItemContextMenu(), );
		gv.protocolDesignController.blockDropped(selectedItemContextMenu, this.getSelectedItemContextMenu(), this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]));
	}

    /**
     * If the "Copy" option is clicked on. Saves the block which is copied.
     */
	copyDroppedBlock(){
		this.blockCopyTimeline = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
		console.log("Copying ", this.blockCopyTimeline);
	}

    /**
     * If the "Paste" option is clicked on. Pastes the block which was saved before using copy?
     */
	paste(){
		let parent = this;
		console.log(this.blockCopyTimeline);
		if(this.blockCopyTimeline.getType() != "empty" && this.blockCopyTimeline != undefined){
			this.controller.timeline.setBlock(this.blockCopyTimeline, this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);


			if(this.blockCopyTimeline.getType() == "get liquid"){
				this.blockCopyTimeline.getTip().removeLiquid(this.blockCopyTimeline.getLiquidQuantity()[0], this.blockCopyTimeline.getLiquidQuantity()[1]);
			}else if(this.blockCopyTimeline.getType() == "get tip"){
				console.log(this.blockCopyTimeline);
				this.blockCopyTimeline.getContainer().bookTip();
			}else{
				setTimeout(function(){parent.controller.timeline.addEmptyBlocks();gv.protocolDesignView.refresh();},2);
			}

			this.controller.timeline.addEmptyBlocks();
			gv.protocolDesignView.refresh();
		}

	}

    /**
     * If the "Remove" option is clicked on. Removes the block from the timeline.
     */
	removeDroppedBlock(){
		let block = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);

		if(block.getType() == "get tip"){
			block.getContainer().unbookTip();
			block.clearError();
		}else if(block.getType() == "get liquid"){
			block.getTip().addLiquid(block.getLiquidQuantity()[0], block.getLiquidQuantity()[1]);
		}else if(block.getType() == "deposit liquid"){
			if(block.isDirtyingTip()){
				block.getTip().emptyAndClean();
			}else{
				block.getTip().removeLiquid(block.getLiquidQuantity()[0], block.getLiquidQuantity()[1]);
			}
		}

		this.controller.timeline.removeBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
		this.controller.timeline.addEmptyBlocks();
		gv.protocolDesignView.refresh();
	}

    /**
     * If the "Delete" option is clicked on. Deletes the block but keeps the space.
     */
	deleteDroppedBlock(){
		let block = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);

		if(block.getType() == "get tip"){
			block.getContainer().unbookTip();
			block.clearError();
		}else if(block.getType() == "get liquid"){
			block.getTip().addLiquid(block.getLiquidQuantity()[0], block.getLiquidQuantity()[1]);
		}else if(block.getType() == "deposit liquid"){
			if(block.isDirtyingTip()){
				block.getTip().emptyAndClean();
			}else{
				block.getTip().removeLiquid(block.getLiquidQuantity()[0], block.getLiquidQuantity()[1]);
			}
		}

		this.controller.timeline.setBlock(new Block(), this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
		this.controller.timeline.addEmptyBlocks();
		gv.protocolDesignView.refresh();
	}

    /**
     * Sets the selected item from the context menu
     * @param id id of the selected item.
     */
	openedContextMenu(id){
		this.setSelectedItemContextMenu(id);
	}

    /**
     * Merging the selected group.
     */
	mergeInOneGroup(){
	    if(gv.protocolDesignModel.getSelection().length < 1){
	        throw new Error("Need at least one object selected !");
        }
        console.log("Called");
        gv.hoverview.mergeGroup();
    }

    /**
     * Split the selected block into multiple smaller blocks.
     */
    splitMegablock(){
        let blockObject = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
        let blocks = blockObject.getBlocks();

        for(var i = 0; i < blocks.length; i++){
            this.controller.timeline.addBlock(blocks[i], blockObject.getIndex()+i);
        }

        this.controller.timeline.removeBlock(blockObject.getIndex());
        gv.protocolDesignView.refresh();
    }
}
