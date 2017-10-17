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
			this.blocks = [new Block({type:"START_BLOCK", text:"START"}), new Block(), new Block()];
		}

		this.initialTipContents = [];

		if(!gv.currentlySelectedHaive.isEmpty()){
			for(let i = 0; i < gv.currentlySelectedHaive.getContainers().length; i++){
				this.initialTipContents.push(gv.currentlySelectedHaive.getContainers()[i].getFullChipsClone());
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
		while(this.blocks[this.blocks.length-2].getType() != "empty" || this.blocks[this.blocks.length-1].getType() != "empty"){
			this.blocks.push(new Block());
		}

		if(this.blocks[this.blocks.length-1].getType() == "empty" || this.blocks[this.blocks.length-2].getType() == "empty"){
			while(this.blocks[this.blocks.length-3].getType() == "empty"){
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

/*
	getChipStateAtN(n){
		if(n == undefined){
			return "Undefined n"
		}else if(n == 0){
			return this.initialTipContents;
		}else{

		}
	}*/

/*
	getLastIndexOf(type){
		for (let i = blocks.length-1; i >= 0 ; i--) {
			if(this.blocks[i].getType() == type){
				return i;
			}
		}

		return -1;
	}
*/

    /**
     * Main error and warning method. Contains all the base algorithm which detects timeline anomalies and probably unforeseen errors.
     *
     * TODO: This method is starting to be quite big. It should be split. A lot of errors and warnings are missing as well.
     */
	setErrors(){
		for(let i = 0; i < this.blocks.length; i++){

			if(this.blocks[i].getType() == "deposit liquid" && this.blocks[i].getLiquidQuantity() != undefined){
				this.blocks[i].clearError();

                let quantity = this.blocks[i].getLiquidQuantity()[0];
                let heldQuantity = +this.getCurrentlyHeldLiquidQuantity(i)[0];
				if(this.blocks[i].getLiquidQuantity()[1] == "mL"){
					quantity *= 1000;
				}

				if(this.getCurrentlyHeldLiquidQuantity(i)[1] == "mL"){
					heldQuantity *= 1000;
				}

				if(heldQuantity < quantity){
					this.blocks[i].callError();
					if(this.getCurrentlyHeldLiquidQuantity(i)[2] != ""){
						this.blocks[i].setErrorText(this.getCurrentlyHeldLiquidQuantity(i)[2]);
					}else{
						this.blocks[i].setErrorText('Not enough liquid to deposit !');
					}
				}else if(heldQuantity == quantity){
					this.blocks[i].callWarning();
					this.blocks[i].setWarningText("Just enough liquid !");
				}
			}else if(this.blocks[i].getType() == "deposit tip"){
				this.blocks[i].clearError();
				this.blocks[i].clearWarning();

                let getTipIndex = this.getNthIndexOf("get tip", i);
                let depositTipIndex = this.getNthIndexOf("deposit tip", i-1);

				if((depositTipIndex > getTipIndex && depositTipIndex != i) || getTipIndex == -1){
					this.blocks[i].callError();
					this.blocks[i].setErrorText("No tip selected !");
				}else if(this.blocks[i].getContainer() != undefined && this.getBlock(getTipIndex).getContainer() != undefined){
					if(this.getBlock(getTipIndex).getContainer().getType() != this.blocks[i].getContainer().getType()){
						this.blocks[i].callWarning();
						this.blocks[i].setWarningText("Wrong container selected !");
					}

				}
			}else if(this.blocks[i].getType() == "get tip"){
				this.blocks[i].clearError();

                let getTipIndex = this.getNthIndexOf("get tip", i-1);
                let depositTipIndex = this.getNthIndexOf("deposit tip", i);


				if(getTipIndex > depositTipIndex && getTipIndex != i){
					this.blocks[i].callError();
					this.blocks[i].setErrorText("Tip already selected !");
				}
			}else if(this.blocks[i].getType() == "get liquid" && this.blocks[i].getTip() != undefined){
				this.blocks[i].clearError();
				this.blocks[i].clearWarning();

                let startIndex = this.getNthIndexOf("get tip", i);
                let droppedTip = this.getNthIndexOf("deposit tip", i);

				if(+this.blocks[i].getTip().getLiquidAmount() < 0){
					this.blocks[i].callError();
					this.blocks[i].setErrorText("Not enough liquid !");
				}else if(this.blocks[i].getTip().getLiquidAmount() == 0){
					this.blocks[i].callWarning();
					this.blocks[i].clearError();
					this.blocks[i].setWarningText("Just enough liquid !");
				}

				if(droppedTip > startIndex || startIndex == -1){
					this.blocks[i].callError();
					this.blocks[i].setErrorText("No tip selected !");
				}
			}
		}
	}

    /**
     * Gets the tip currently held. If there is no tip held, returns null.
     * @param n Index at which the query is done. Example : if '5' is passed as a parameter, it will look in blocks 4, 3, 2, 1, 0 (in this order) until it finds a held tip.
     * If the n index is higher than the amount of blocks, it will start from the last index.
     * @returns {*} String container type.
     */
	getCurrentlyHeldTipContainer(n){
		if(n == undefined){
			n = this.blocks.length-1;
		}

        let startIndex = this.getNthIndexOf("get tip", n);

		if(this.blocks[startIndex] == undefined){
			return null;
		}else{
			return this.blocks[startIndex].getContainer().getType();
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
		if(n == undefined){
			n = this.blocks.length-1;
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
			if(this.blocks[i].getType() == "get liquid"){
				if(this.blocks[i].getLiquidQuantity()[1] == "mL"){
					liquids += this.blocks[i].getLiquidQuantity()[0]*1000;
				}else{
					liquids += this.blocks[i].getLiquidQuantity()[0];
				}
			}

			if(this.blocks[i].getType() == "deposit liquid"){
				if(this.blocks[i].getLiquidQuantity() != undefined){
					if(this.blocks[i].getLiquidQuantity()[1] == "mL"){
						liquids -= this.blocks[i].getLiquidQuantity()[0]*1000;
					}else{
						liquids -= this.blocks[i].getLiquidQuantity()[0];
					}
				}
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
		for (let i = n; i >= 0 ; i--) {
			if(this.blocks[i].getType() == type){
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
		if(n == undefined){
			n = this.blocks.length;
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
			if(this.blocks[i].getType() == "get liquid"){
				if(this.blocks[i].getLiquidQuantity()[1] == "mL"){
					liquids += this.blocks[i].getLiquidQuantity()[0]*1000;
				}else{
					liquids += this.blocks[i].getLiquidQuantity()[0];
				}
			}

			if(this.blocks[i].getType() == "deposit liquid"){
				if(this.blocks[i].getLiquidQuantity()[1] == "mL"){
					liquids -= this.blocks[i].getLiquidQuantity()[0]*1000;
				}else{
					liquids -= this.blocks[i].getLiquidQuantity()[0];
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
