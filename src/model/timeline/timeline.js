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

const Block = require("./block").Block;
const gv = require('../../../const/global');

/**
 * The Object Timeline class.
 */
export class Timeline{
	constructor(args){
		if(args != undefined){
			this.blocks = args;
		}else{
			this.blocks = [new Block(), new Block(), new Block()];
		}

		this.initialTipContents = [];
		this.temporaryblocks = [];

		if(gv.currentlySelectedHaive != undefined){
            if(!gv.currentlySelectedHaive.isEmpty()){
                for(let i = 0; i < gv.currentlySelectedHaive.getContainers().length; i++){
                    this.initialTipContents.push(gv.currentlySelectedHaive.getContainers()[i].getChipsClone());
                }
            }
        }
	}

    /**
     * Returns all the blocks currently on the timeline
     * @returns {*|Array} Array of Block objects
     */
	getBlocks(){
		return this.blocks;
	}

    /**
     * TODO:comment
     * @returns {Array}
     */
	getNonEmptyBlocks(){
	    let blocks = [];

	    for(let i = 0; i < this.blocks.length; i++){
	        if(this.blocks[i].getType() != "empty"){
	            blocks.push(this.blocks[i]);
            }
        }

        return blocks;
    }

    /**
     * Return a specific block from its index
     * @param index Index of the block (int)
     * @returns {*} Block object
     */
	getBlock(index){
		return this.blocks[index];
	}

    /**
     * Set block by its index
     * @param block Block object
     * @param index Index at which the block is to go (int)
     */
	setBlock(block, index){
		this.blocks[index] = block;
		this.addEmptyBlocks();
	}

    /**
     * Add block at a given index (does not overwrite, creates a new space and adds the block in it). If the index given is higher than the maximum possible index, the block is added at the end.
     * @param block Block object
     * @param index Index of the block (int)
     */
	addBlock(block, index){
		if(index >= this.blocks.length){
			this.blocks.push(block);
		}else{
			this.blocks.splice(index, 0, block);
		}
	}

    /**
     * Add an empty block at the given index.
     * @param index Index of the block (int)
     */
	addEmptyBlock(index){
		this.blocks.splice(index, 1, new Block({text:"", type:"empty"}));
	}

    /**
     * Method to know if the block at the given index is empty or not
     * @param index Index of the block (int)
     * @returns {boolean} Returns true if the block is empty, false otherwise.
     */
	isEmpty(index){
		return this.blocks[index].getType() == "empty";
	}

    /**
     * Overrides block at the given index by the given block.
     * @param block Block object
     * @param t Index, int
     */
	overrideBlock(block ,t){
		this.blocks.splice(t, 1, block);
		this.addEmptyBlocks();
	}

    /*
	overrideBlockByText(text, t){
		let type;
		if(text == "Start"){
			type = "START_BLOCK_VALUE";
		}
		if(text == "End"){
			type = "END_BLOCK_VALUE";
		}
		if(text == "Get tip"){
			type = "get tip";
		}
		if(text == "Get liquid"){
			type = "get liquid";
		}
		if(text == "Deposit tip"){
			type = "Deposit tip";
		}
		this.blocks.splice(t, 1, new Block({type:type, text:text}));
		this.addEmptyBlocks();
	}*/

    /**
     * Method always makes sure there are two empty blocks at the end of the timeline.
     */
	addEmptyBlocks(){

	    while(this.blocks.length < 3){
	        this.blocks.push(new Block());
        }

		while(this.blocks[this.blocks.length-2].getType() != "empty" || this.blocks[this.blocks.length-1].getType() != "empty"){
			this.blocks.push(new Block());
		}

		if(this.blocks[this.blocks.length-1].getType() == "empty" || this.blocks[this.blocks.length-2].getType() == "empty"){
			while(this.blocks[this.blocks.length-3].getType() == "empty" && this.blocks.length > 3){
				this.blocks.pop();
			}
		}

		this.setErrors();
	}

    /**
     * Removes block at the given index
     * @param t Index, int
     */
	removeBlock(t){
		this.blocks.splice(t, 1);
		this.addEmptyBlocks();
	}

    /**
     * Switches two blocks given as parameter.
     * @param block1 Block object
     * @param block2 Block object
     */
	switchBlocks(block1, block2){
		let index1 = this.blocks.indexOf(block1);
		let index2 = this.blocks.indexOf(block2);

		let blockTemp = block1.getClone();
		let blockTemp2 = block2.getClone();

		this.blocks[index1] = blockTemp2;
		this.blocks[index2] = blockTemp;

		this.addEmptyBlocks();
	}

    /**
     * Switch blocks by their index.
     * @param index1 Int
     * @param index2 Int
     */
	switchBlocksByIndex(index1, index2){
		if(index1 == "START_BLOCK_VALUE" || index1 == "END_BLOCK_VALUE"){
			index1 = this.getIndexOfType(index1);
		}

		if(index2 == "START_BLOCK_VALUE" || index2 == "END_BLOCK_VALUE"){
			index2 = this.getIndexOfType(index2);
		}

        let blockTemp = this.blocks[index1].getClone();
        let blockTemp2 = this.blocks[index2].getClone();

		this.blocks[index1] = blockTemp2;
		this.blocks[index2] = blockTemp;

		this.addEmptyBlocks();
	}

    /**
     * Main error and warning method. Contains all the base algorithm which detects timeline anomalies and probably unforeseen errors.
     *
     * TODO: This method is starting to be quite big. It should be split. A lot of errors and warnings are missing as well.
     */
	setErrors(){
        const extendedTimeline = this.getExtendedTimeline();
		for(let i = 0; i < extendedTimeline.length; i++){

			if(extendedTimeline[i].getType() == "deposit liquid" && extendedTimeline[i].getLiquidQuantity() != undefined){
				extendedTimeline[i].clearError();

                let quantity = extendedTimeline[i].getLiquidQuantity()[0];
                let heldQuantity = +this.getCurrentlyHeldLiquidQuantity(i)[0];
				if(extendedTimeline[i].getLiquidQuantity()[1] == "mL"){
					quantity *= 1000;
				}

				if(this.getCurrentlyHeldLiquidQuantity(i)[1] == "mL"){
					heldQuantity *= 1000;
				}

				if(heldQuantity < quantity){
					extendedTimeline[i].callError();
					if(this.getCurrentlyHeldLiquidQuantity(i)[2] != ""){
						extendedTimeline[i].setErrorText(this.getCurrentlyHeldLiquidQuantity(i)[2]);
					}else{
						extendedTimeline[i].setErrorText('Not enough liquid to deposit !');
					}
				}else if(heldQuantity == quantity){
					extendedTimeline[i].callWarning();
					extendedTimeline[i].setWarningText("Just enough liquid !");
				}
			}else if(extendedTimeline[i].getType() == "deposit tip"){
				extendedTimeline[i].clearError();
				extendedTimeline[i].clearWarning();

                let getTipIndex = this.getNthIndexOf("get tip", i);
                let depositTipIndex = this.getNthIndexOf("deposit tip", i-1);

				if((depositTipIndex > getTipIndex && depositTipIndex != i) || getTipIndex == -1){
					extendedTimeline[i].callError();
					extendedTimeline[i].setErrorText("No tip selected !");
				}else if(extendedTimeline[i].getContainer() != undefined && this.getBlock(getTipIndex) != undefined){
				    if(this.getBlock(getTipIndex).getContainer() != undefined){
                        if(this.getBlock(getTipIndex).getContainer().getType() != extendedTimeline[i].getContainer().getType()){
                            extendedTimeline[i].callWarning();
                            extendedTimeline[i].setWarningText("Wrong container selected !");
                        }
                    }
				}
			}else if(extendedTimeline[i].getType() == "get tip"){
				extendedTimeline[i].clearError();

                let getTipIndex = this.getNthIndexOf("get tip", i-1);
                let depositTipIndex = this.getNthIndexOf("deposit tip", i);


				if(getTipIndex > depositTipIndex && getTipIndex != i){
					extendedTimeline[i].callError();
					extendedTimeline[i].setErrorText("Tip already selected !");
				}
			}else if(extendedTimeline[i].getType() == "get liquid" && extendedTimeline[i].getTip() != undefined){
				extendedTimeline[i].clearError();
				extendedTimeline[i].clearWarning();

                let startIndex = this.getNthIndexOf("get tip", i);
                let droppedTip = this.getNthIndexOf("deposit tip", i);

				if(+extendedTimeline[i].getTip().getLiquidAmount() < 0){
					extendedTimeline[i].callError();
					extendedTimeline[i].setErrorText("Not enough liquid !");
				}else if(extendedTimeline[i].getTip().getLiquidAmount() == 0){
					extendedTimeline[i].callWarning();
					extendedTimeline[i].clearError();
					extendedTimeline[i].setWarningText("Just enough liquid !");
				}

				if(droppedTip > startIndex || startIndex == -1){
					extendedTimeline[i].callError();
					extendedTimeline[i].setErrorText("No tip selected !");
				}
			}else if(extendedTimeline[i].getType() == "pipetting"){
			    if(extendedTimeline[i].getLiquidQuantity() != undefined){
                    let liquidQuantity = extendedTimeline[i].getLiquidQuantity()[0];
                    if(extendedTimeline[i].getLiquidQuantity()[1] == "mL"){
                        liquidQuantity *= 1000;
                    }

                    let currentlyHeld = this.getCurrentlyHeldLiquidQuantity(i);
                    let currentlyHeldVal = currentlyHeld[0];
                    if(currentlyHeld[1] == "mL"){
                        currentlyHeldVal *= 1000;
                    }

                    if(liquidQuantity > currentlyHeldVal){
                        extendedTimeline[i].callError();
                        extendedTimeline[i].setErrorText("Not enough liquid !");
                    }
                }
            }
		}

		for(let i = 0; i < extendedTimeline.length; i++){

		    if(extendedTimeline[i].isNoErrorCheck()){
                gv.blueprintController.addBlockEffects(extendedTimeline[i]);

                extendedTimeline[i].setNoErrorCheck(false);
            }


		    if(extendedTimeline[i].isError()){
		        for(let j = i+1; j < extendedTimeline.length; j++){
		            if(!extendedTimeline[j].isNoErrorCheck()){
                        gv.blueprintController.removeBlockEffects(extendedTimeline[j]);
                        extendedTimeline[j].setNoErrorCheck(true);
                    }

                }

                return;
            }
        }
	}


    /**
     * Returns a timeline that contains ALL of the blocks, spread out, ignoring the "megablocks". It will look inside the megablocks and give an index to those blocks.
     * For example, if the timeline was : 'get tip', 'megablock:{'get liquid', 'wait'}', 'deposit tip", it would return : [get tip, get liquid, wait, deposit tip], with each item being a Block object.
     */
	getExtendedTimeline(){
        let blocks = [];

        for(let i = 0; i < this.getBlocks().length; i++){
            if(this.getBlocks()[i].getType() != "megablock"){
                blocks.push(this.getBlocks()[i]);
            }else{
                const megablock = this.getBlocks()[i].getBlocksRecursively()
                for(let j = 0; j < megablock.length; j++){
                    blocks.push(megablock[j]);
                }
            }
        }

        return blocks;
    }

    /**
     * Gets the tip currently held. If there is no tip held, returns null.
     * @param n Index at which the query is done. Example : if '5' is passed as a parameter, it will look in blocks 4, 3, 2, 1, 0 (in this order) until it finds a held tip.
     * If the n index is higher than the amount of blocks, it will start from the last index.
     * @returns {*} String container type.
     */
	getCurrentlyHeldTipContainer(n){
	    const extendedTimeline = this.getExtendedTimeline();
	    console.log("Extended timeline :",extendedTimeline);

		if(n == undefined){
			n = extendedTimeline.length-1;
		}

        let startIndex = this.getNthIndexOf("get tip", n);

		if(extendedTimeline[startIndex] == undefined){
			return null;
		}else{
			return extendedTimeline[startIndex].getContainer().getType();
		}
	}

    /**
     * Gets the liquid quantity currently held.
     * @param n Index at which the query is done. Example : if '5' is passed as a parameter, it will look in blocks 4, 3, 2, 1, 0 (in this order) until it finds a "get tip".
     * From this point, it will add all the liquid that has been gathered in the tip.
     * If the n index is higher than the amount of blocks, it will start from the last index.
     * @returns {*} Array [liquidQuantity (int), liquidQuantityUnit (String:"uL" or "mL")
     */
	getCurrentlyHeldLiquidQuantity(n){
        const extendedTimeline = this.getExtendedTimeline();
		if(n == undefined){
			n = extendedTimeline.length-1;
		}

        let liquids = 0;

        let startIndex = this.getNthIndexOf("get tip", n);
        let droppedTip = this.getNthIndexOf("deposit tip", n);

		if(droppedTip > startIndex){
			return [0, "mL", "At the n°"+n+", no tip is held"];
		}

		if(startIndex == -1){
			return [0, "mL", "No tip was ever held"];
		}

		for (let i = startIndex; i < n; i++) {
			if(extendedTimeline[i].getType() == "get liquid" && extendedTimeline[i].getLiquidQuantity() != undefined){
				if(extendedTimeline[i].getLiquidQuantity()[1] == "mL"){
					liquids += extendedTimeline[i].getLiquidQuantity()[0]*1000;
				}else{
					liquids += extendedTimeline[i].getLiquidQuantity()[0];
				}
			}

			if(extendedTimeline[i].getType() == "deposit liquid"){
				if(extendedTimeline[i].getLiquidQuantity() != undefined){
					if(extendedTimeline[i].getLiquidQuantity()[1] == "mL"){
						liquids -= extendedTimeline[i].getLiquidQuantity()[0]*1000;
					}else{
						liquids -= extendedTimeline[i].getLiquidQuantity()[0];
					}
				}
			}

			if(extendedTimeline[i].getType() == "pipetting"){
			    liquids = 0;
            }
		}

		if(liquids / 1000 > 1){
			return [(liquids/1000),"mL", ""];
		}else{
			return [liquids,"uL", ""];
		}
	}

    /**
     * Returns the closest inferior index of the passed block type compared to the passed index.
     * @param type Type of the block looked for
     * @param n Index at which it will start looking
     * @returns {*} Int, index of closest inferior block.
     */
	getNthIndexOf(type, n){
        const extendedTimeline = this.getExtendedTimeline();
		for (let i = n; i >= 0 ; i--) {
			if(extendedTimeline[i].getType() == type){
				return i;
			}
		}

		return -1;
	}

    /**
     * Returns a boolean if there is liquid held at the passed index.
     * @param n int, passed index
     * @returns {boolean} Return true if liquid is held, false otherwise.
     */
	isLiquidHeld(n){
        const extendedTimeline = this.getExtendedTimeline();
		if(n == undefined){
			n = extendedTimeline.length;
		}

        let liquids = 0;

        let startIndex = this.getNthIndexOf("get tip", n);
        let droppedTip = this.getNthIndexOf("deposit tip", n);

		if(droppedTip > startIndex){
			return false;
		}

		if(startIndex == -1){
			return false;
		}

		for (let i = startIndex; i < n; i++) {
			if(extendedTimeline[i].getType() == "get liquid"){
				if(extendedTimeline[i].getLiquidQuantity()[1] == "mL"){
					liquids += extendedTimeline[i].getLiquidQuantity()[0]*1000;
				}else{
					liquids += extendedTimeline[i].getLiquidQuantity()[0];
				}
			}

			if(extendedTimeline[i].getType() == "deposit liquid"){
				if(extendedTimeline[i].getLiquidQuantity()[1] == "mL"){
					liquids -= extendedTimeline[i].getLiquidQuantity()[0]*1000;
				}else{
					liquids -= extendedTimeline[i].getLiquidQuantity()[0];
				}
			}
		}

		return liquids > 0;
	}

    /**
     * Returns the blocks array.
     * @returns {*|Array} Array of blocks
     */
	getBlocks(){
		return this.blocks;
	}

    /**
     * Checks to see if the timeline contains a certain type of block.
     * @param type
     * @returns {boolean}
     */
	containsType(type){
		for(let i = 0; i < this.blocks.length; i++){
			if(this.blocks[i].getType() == type){
				return true;
			}
		}

		return false;
	}

    /**
     * Return the first index of passed block.
     * @param block
     * @returns {number}
     */
	getIndexOf(block){
		return this.blocks.indexOf(block);
	}

    /**
     * Returns the first index of passed block type.
     * @param type String
     * @returns {number} Index of block. Returns -1 if no block has been found
     */
	getIndexOfType(type){
		for(let i = 0; i < this.blocks.length; i++){
			if(this.blocks[i].getType() == type){
				return i;
			}
		}

		return -1;
	}
}
