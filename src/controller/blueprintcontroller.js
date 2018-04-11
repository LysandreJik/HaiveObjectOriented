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
	    gv.blueprintController = this;
		this.selectedItemContextMenu = "";
		this.modifyDroppedBlock = this.modifyDroppedBlock.bind(this);
		this.copyDroppedBlock = this.copyDroppedBlock.bind(this);
		this.paste = this.paste.bind(this);
		this.deleteDroppedBlock = this.deleteDroppedBlock.bind(this);
		this.removeDroppedBlock = this.removeDroppedBlock.bind(this);
		this.openedContextMenu = this.openedContextMenu.bind(this);
		this.splitMegablock= this.splitMegablock.bind(this);
		this.deleteSelectionBlocks = this.deleteSelectionBlocks.bind(this);
		this.copySelectedBlocks = this.copySelectedBlocks.bind(this);
		this.pasteGroup = this.pasteGroup.bind(this);
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
		let block = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);

        if(block.getType() == "deposit tip") {
            block.getTip().setContaminated(false);
            block.getTip().setContainingTip(false);
            block.clearError();
        }

		if(block.getType() == "megablock"){
            gv.hoverview.mergeGroup();
        }else{
            gv.protocolDesignController.blockDropped(selectedItemContextMenu, this.getSelectedItemContextMenu(), block);
        }
	}

    /**
     * If the "Copy" option is clicked on. Saves the block which is copied.
     */
	copyDroppedBlock(){
		this.blockCopyTimeline = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
	}

    /**
     * If the "Paste" option is clicked on. Pastes the block which was saved before using copy?
     * TODO:Manage other types of blocks
     */
	paste(){
		if(this.blockCopyTimeline.getType() != "empty" && this.blockCopyTimeline != undefined && this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]).getType() != "START_BLOCK"){
			if(this.blockCopyTimeline.getType() == "get liquid"){
                this.controller.timeline.setBlock(this.blockCopyTimeline.getClone(), this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
				this.blockCopyTimeline.getTip().removeLiquid(this.blockCopyTimeline.getLiquidQuantity()[0], this.blockCopyTimeline.getLiquidQuantity()[1]);
			}else if(this.blockCopyTimeline.getType() == "get tip"){
			    if(this.blockCopyTimeline.getContainer().getUncontaminatedFullTips().length > 0){
                    this.controller.timeline.setBlock(this.blockCopyTimeline.getClone(), this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
                    let block = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
                    block.setTip(block.getContainer().bookTip());
                }

			}else if(this.blockCopyTimeline.getType() == "megablock"){
                this.controller.timeline.setBlock(this.blockCopyTimeline.getClone(), this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
			    let blocks = this.blockCopyTimeline.getBlocksRecursively();
			    for(let i = 0; i < blocks.length; i++){
                    if(blocks[i].getType() == "get liquid"){
                        blocks[i].getTip().removeLiquid(blocks[i].getLiquidQuantity()[0], blocks[i].getLiquidQuantity()[1]);
                    }else if(blocks[i].getType() == "get tip"){
                        blocks[i].setTip(blocks[i].getContainer().bookTip());
                    }
                }
            }

			this.controller.timeline.addEmptyBlocks();
			gv.protocolDesignView.refresh();
		}

	}

    /**
     * TODO:Manage other types of blocks
     */
	pasteGroup(){
	    const blocks = this.blocksCopyTimeline;
	    const index = this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1];
        
        for(let i = 0; i < blocks.length; i++){


            if(blocks[i].getType() == "get liquid"){
                this.controller.timeline.addBlock(blocks[i].getClone(), (+index + +i));
                blocks[i].getTip().removeLiquid(blocks[i].getLiquidQuantity()[0], blocks[i].getLiquidQuantity()[1]);
            }else if(blocks[i].getType() == "get tip"){
                if(blocks[i].getContainer().getUncontaminatedFullTips().length > 0) {
                    this.controller.timeline.addBlock(blocks[i].getClone(), (+index + +i));
                    let block = this.controller.timeline.getBlock((+index + +i));
                    block.setTip(block.getContainer().bookTip());
                }
            }else if(this.blockCopyTimeline.getType() == "megablock"){
                this.controller.timeline.addBlock(blocks[i].getClone(), (+index + +i));
                let blocksTemp = this.blockCopyTimeline.getBlocksRecursively();
                for(let i = 0; i < blocksTemp.length; i++){
                    if(blocksTemp[i].getType() == "get liquid"){
                        blocksTemp[i].getTip().removeLiquid(blocksTemp[i].getLiquidQuantity()[0], blocksTemp[i].getLiquidQuantity()[1]);
                    }else if(blocksTemp[i].getType() == "get tip"){
                        blocksTemp[i].setTip(blocksTemp[i].getContainer().bookTip());
                    }
                }
            }

            this.controller.timeline.addEmptyBlocks();
            gv.protocolDesignView.refresh();
        }

        this.controller.timeline.addEmptyBlocks();
        gv.protocolDesignView.refresh();
    }

    /**
     * If the "Remove" option is clicked on. Removes the block from the timeline.
     * TODO:Manage other types of blocks
     */
	removeDroppedBlock(){
		let block = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
        this.removeBlockEffects(block);
        this.controller.timeline.removeBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);

        this.controller.timeline.addEmptyBlocks();
        gv.protocolDesignView.refresh();
	}
	
    addBlockEffects(block){
	    if(block.getType() == "get tip"){
	        block.setTip(block.getContainer().bookTip());
        }else if(block.getType() == "deposit tip"){
	        block.getTip().setContainingTip(true);
	        block.getTip().setContaminated(true);
        }else if(block.getType() == "get liquid"){
            block.getTip().removeLiquid(block.getLiquidQuantity()[0], block.getLiquidQuantity()[1]);
        }else if(block.getType() == "deposit liquid" || block.getType() == "pipetting"){
	        block.getTip().addLiquid(block.getLiquidQuantity()[0], block.getLiquidQuantity()[1]);
        }
    }

	removeBlockEffects(block){
	    console.log(block.isCounted());
	    if(!block.isCounted() || !block.isNoErrorCheck()){
            console.log("Removing block effects ...");
            if(block.getType() != "START_BLOCK"){
                if(block.getType() == "get tip"){
                    if(block.getTip() != undefined){
                        block.getTip().setContaminated(false);
                        block.getContainer().unbookTip(block.getTip());
                        block.clearError();
                        block.setCounted(true);
                    }

                }else if(block.getType() == "deposit tip") {
                    if(block.getTip() != undefined){
                        block.getTip().setContaminated(false);
                        block.getTip().setContainingTip(false);
                        block.clearError();
                        block.setCounted(true);
                    }

                }else if(block.getType() == "get liquid"){
                    if(block.getTip() != undefined){
                        block.getTip().addLiquid(block.getLiquidQuantity()[0], block.getLiquidQuantity()[1]);
                        block.setCounted(true);
                    }
                }else if(block.getType() == "deposit liquid"){
                    if(block.getTip() != undefined){
                        if(block.isDirtyingTip()){
                            block.getTip().emptyAndClean();
                        }else{
                            block.getTip().removeLiquid(block.getLiquidQuantity()[0], block.getLiquidQuantity()[1]);
                        }
                        block.setCounted(true);
                    }

                }else if(block.getType() == "megablock"){
                    block.setCounted(true);
                    let blocks = block.getBlocksRecursively();
                    for(let i = 0; i < blocks.length; i++){
                        if(blocks[i].getType() == "get tip"){
                            blocks[i].getTip().setContaminated(false);
                            blocks[i].getContainer().unbookTip(blocks[i].getTip());
                            blocks[i].clearError();
                        }else if(blocks[i].getType() == "deposit tip") {
                            blocks[i].getTip().setContaminated(false);
                            blocks[i].getTip().setContainingTip(false);
                            blocks[i].clearError();
                        }else if(blocks[i].getType() == "get liquid"){
                            blocks[i].getTip().addLiquid(blocks[i].getLiquidQuantity()[0], blocks[i].getLiquidQuantity()[1]);
                        }else if(blocks[i].getType() == "deposit liquid"){
                            if(blocks[i].isDirtyingTip()){
                                blocks[i].getTip().emptyAndClean();
                            }else{
                                blocks[i].getTip().removeLiquid(blocks[i].getLiquidQuantity()[0], blocks[i].getLiquidQuantity()[1]);
                            }
                        }
                    }
                }

                gv.protocolDesignView.refresh();
            }
        }

    }

    /**
     * If the "Delete" option is clicked on. Deletes the block but keeps the space.
     * TODO:Manage other types of blocks
     */
	deleteDroppedBlock(){
		let block = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
        this.removeBlockEffects(block);
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
        gv.protocolDesignBlueprintcontentView.resetBlocks();
        gv.hoverview.mergeGroup();
    }

    /**
     * Split the selected block into multiple smaller blocks.
     */
    splitMegablock(){
        let blockObject = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
        let blocks = blockObject.getBlocks();

        for(let i = 0; i < blocks.length; i++){
            this.controller.timeline.addBlock(blocks[i], blockObject.getIndex()+i);
        }

        gv.protocolDesignBlueprintcontentView.hideOptions();
        this.controller.timeline.removeBlock(blockObject.getIndex());
        gv.protocolDesignBlueprintcontentView.resetBlocks();
        gv.protocolDesignView.refresh();
    }

    copySelectedBlocks(){
        let blocks = gv.protocolDesignModel.getSelection();
        this.blocksCopyTimeline = blocks;

        gv.protocolDesignBlueprintcontentView.hideOptions();
        gv.protocolDesignView.refresh();
    }

    /**
     * TODO:Manage other types of blocks
     */
    deleteSelectionBlocks(){
        let blocks = gv.protocolDesignModel.getSelection();

        for(let i = 0; i < blocks.length; i++){
            let block = blocks[i];

            this.removeBlockEffects(block);

            this.controller.timeline.removeBlock(this.controller.timeline.getIndexOf(block));
            this.controller.timeline.addEmptyBlocks();

        }

        gv.protocolDesignBlueprintcontentView.hideOptions();
        gv.protocolDesignView.refresh();
    }
}
