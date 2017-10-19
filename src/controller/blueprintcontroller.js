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
		console.log(selectedItemContextMenu, this.getSelectedItemContextMenu(), );
		let block = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
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
		console.log("Copying ", this.blockCopyTimeline);
	}

    /**
     * If the "Paste" option is clicked on. Pastes the block which was saved before using copy?
     * TODO:Manage other types of blocks
     */
	paste(){
		let parent = this;
		console.log(this.blockCopyTimeline);
		if(this.blockCopyTimeline.getType() != "empty" && this.blockCopyTimeline != undefined && this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]).getType() != "START_BLOCK"){
			this.controller.timeline.setBlock(this.blockCopyTimeline.getClone(), this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);


			if(this.blockCopyTimeline.getType() == "get liquid"){
				this.blockCopyTimeline.getTip().removeLiquid(this.blockCopyTimeline.getLiquidQuantity()[0], this.blockCopyTimeline.getLiquidQuantity()[1]);
			}else if(this.blockCopyTimeline.getType() == "get tip"){
				console.log(this.blockCopyTimeline);
				this.blockCopyTimeline.getContainer().bookTip();
			}else if(this.blockCopyTimeline.getType() == "megablock"){
			    let blocks = this.blockCopyTimeline.getBlocksRecursively();
			    for(let i = 0; i < blocks.length; i++){
                    if(blocks[i].getType() == "get liquid"){
                        blocks[i].getTip().removeLiquid(blocks[i].getLiquidQuantity()[0], blocks[i].getLiquidQuantity()[1]);
                    }else if(blocks[i].getType() == "get tip"){
                        blocks[i].getContainer().bookTip();
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
            console.log(blocks[i], (+index+ +i));
            this.controller.timeline.addBlock(blocks[i].getClone(), (+index + +i));

            if(blocks[i].getType() == "get liquid"){
                blocks[i].getTip().removeLiquid(blocks[i].getLiquidQuantity()[0], blocks[i].getLiquidQuantity()[1]);
            }else if(blocks[i].getType() == "get tip"){
                console.log(blocks[i]);
                blocks[i].getContainer().bookTip();
            }else if(this.blockCopyTimeline.getType() == "megablock"){
                let blocksTemp = this.blockCopyTimeline.getBlocksRecursively();
                for(let i = 0; i < blocksTemp.length; i++){
                    if(blocksTemp[i].getType() == "get liquid"){
                        blocksTemp[i].getTip().removeLiquid(blocksTemp[i].getLiquidQuantity()[0], blocksTemp[i].getLiquidQuantity()[1]);
                    }else if(blocksTemp[i].getType() == "get tip"){
                        blocksTemp[i].getContainer().bookTip();
                    }
                }
            }

            this.controller.timeline.addEmptyBlocks();
            gv.protocolDesignView.refresh();
        }

        console.log("Adding empty blocks");
        this.controller.timeline.addEmptyBlocks();
        gv.protocolDesignView.refresh();
    }

    /**
     * If the "Remove" option is clicked on. Removes the block from the timeline.
     * TODO:Manage other types of blocks
     */
	removeDroppedBlock(){
		let block = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);

		if(block.getType() != "START_BLOCK"){
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
            }else if(block.getType() == "megablock"){
                let blocks = block.getBlocksRecursively();
                for(let i = 0; i < blocks.length; i++){
                    if(blocks[i].getType() == "get tip"){
                        blocks[i].getContainer().unbookTip();
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

            this.controller.timeline.removeBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
            this.controller.timeline.addEmptyBlocks();
            gv.protocolDesignView.refresh();
        }

	}

    /**
     * If the "Delete" option is clicked on. Deletes the block but keeps the space.
     * TODO:Manage other types of blocks
     */
	deleteDroppedBlock(){
		let block = this.controller.timeline.getBlock(this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);

        if(block.getType() != "START_BLOCK"){
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
            }else if(block.getType() == "megablock"){
                let blocks = block.getBlocksRecursively();
                for(let i = 0; i < blocks.length; i++){
                    if(blocks[i].getType() == "get tip"){
                        blocks[i].getContainer().unbookTip();
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

            this.controller.timeline.setBlock(new Block(), this.getSelectedItemContextMenu().split('_')[this.getSelectedItemContextMenu().split('_').length-1]);
            this.controller.timeline.addEmptyBlocks();
            gv.protocolDesignView.refresh();
        }
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

        for(let i = 0; i < blocks.length; i++){
            this.controller.timeline.addBlock(blocks[i], blockObject.getIndex()+i);
        }

        gv.protocolDesignBlueprintcontentView.hideOptions();
        this.controller.timeline.removeBlock(blockObject.getIndex());
        gv.protocolDesignView.refresh();
    }

    copySelectedBlocks(){
        let blocks = gv.protocolDesignModel.getSelection();
        this.blocksCopyTimeline = blocks;
        console.log("Copied group");

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
            }else if(block.getType() == "megablock"){
                let blocksTemp = block.getBlocksRecursively();
                for(let i = 0; i < blocksTemp.length; i++){
                    if(blocksTemp[i].getType() == "get tip"){
                        blocksTemp[i].getContainer().unbookTip();
                        blocksTemp[i].clearError();
                    }else if(blocksTemp[i].getType() == "get liquid"){
                        blocksTemp[i].getTip().addLiquid(blocksTemp[i].getLiquidQuantity()[0], blocksTemp[i].getLiquidQuantity()[1]);
                    }else if(blocksTemp[i].getType() == "deposit liquid"){
                        if(blocksTemp[i].isDirtyingTip()){
                            blocksTemp[i].getTip().emptyAndClean();
                        }else{
                            blocksTemp[i].getTip().removeLiquid(blocksTemp[i].getLiquidQuantity()[0], blocksTemp[i].getLiquidQuantity()[1]);
                        }
                    }
                }
            }

            this.controller.timeline.removeBlock(this.controller.timeline.getIndexOf(block));
            this.controller.timeline.addEmptyBlocks();

        }

        gv.protocolDesignBlueprintcontentView.hideOptions();
        gv.protocolDesignView.refresh();
    }
}
