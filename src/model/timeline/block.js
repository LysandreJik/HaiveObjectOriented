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
const gv = require('../../../const/global');

/**
 * The Object superclass for the Block objects of the Timeline
 */
export class Block{
	constructor(args){
		if(args == undefined){
			this.type = "empty";
			this.text = "";
		}else{
			this.speed = args.speed;
			this.tip = args.tip;
            this.container = args.container;
			this.type = args.type;
			this.text = args.text;
			if(args.text == undefined){
				if(args.type == "START_BLOCK_VALUE"){
					this.text = "Start";
				}else if(args.type == "END_BLOCK_VALUE"){
					this.text = "End";
				}
			}
			this.warning = args.warning;
			this.liquidQuantity = args.liquidQuantity;
			this.dirtyingTip = args.dirtyingTip;
			this.comment = args.comment;
			this.args = args.args;
		}

		if(this.speed == undefined){
			this.speed = "Medium";
		}

		if(this.error == undefined){
			this.error = false;
		}

		if(this.warning == undefined){
			this.warning = false;
		}

		if(this.dirtyingTip == undefined){
			this.dirtyingTip = false;
		}

		if(this.errortext == undefined){
			this.errortext = "";
		}

		if(this.type == "megablock"){
            this.blocks = args.blocks;

            if(this.blocks == undefined){
                this.blocks = [];
            }
        }

        if(this.comment == undefined){
		    this.comment = "";
        }



		this.selected = false;
	}

    /**
     * Get the "args" variable
     * @returns {*}
     */
	getArgs(){
	    return this.args;
    }

    /**
     * Sets the "args" variable
     * @param args
     */
    setArgs(args){
	    this.args = args;
    }

    /**
     * Returns true if the block is selectable, false otherwise. This prevents user from making multiple copies of the start and end blocks.
     * @returns {boolean}
     */
	isSelectable(){
	    return !(this.getType() == "START_BLOCK" || this.getType() == "END_BLOCK");
    }

    /**
     * Returns the index of this block on the timeline.
     * @returns {number}
     */
	getIndex(){
	    return gv.protocolDesignController.timeline.getIndexOf(this);
    }

    /**
     * MEGABLOCK ONLY
     * Returns all the blocks contained in the megablock
     * @returns {*|Array}
     */
    getBlocks(){
        return this.blocks;
    }

    /**
     * MEGABLOCK ONLY
     * Add a block to the blocks array of this megablock
     * @param block
     */
    addBlock(block){
        block.setSelected(false);
        this.blocks.push(block);
    }

    /**
     * MEGABLOCK ONLY
     * Add an array of blocks to the block array of this megablock.
     * @param blocks
     */
    addBlocks(blocks){
        for(let i = 0; i < blocks.length; i++){
            this.addBlock(blocks[i].getClone());
        }
    }

    /**
     * MEGABLOCK ONLY
     * Returns every block inside the megablock. If a block inside this megablock is another megablock, it will apply this function again to get the blocks inside the latter megablock.
     */
    getBlocksRecursively(){
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
     * This is the getter for the boolean "selected". Returns true if the block is currently selected by the user, false otherwise.
     * @returns {boolean|*}
     */
	isSelected(){
	    return this.selected;
    }

    /**
     * This is the setter for the boolean "selected". Returns true if the block is currently selected by the user, false otherwise.
     * @param selected Boolean
     */
    setSelected(selected){
	    this.selected = selected;
    }

    /**
     * This is the getter for the "dirtyingTip". This boolean is used to know if a block is dirtying a chip, hence making it unusable for the future.
     * @returns {*|boolean}
     */
	isDirtyingTip(){
		return this.dirtyingTip;
	}

    /**
     * Set the speed of the block movement.
     * @param speed
     */
	setSpeed(speed){
		this.speed = speed;
	}

    /**
     * !get the speed of the block
     * @returns {*|string}
     */
	getSpeed(){
		return this.speed;
	}

    /**
     * Get the color assigned to it. The color changes upon speed variation, and changes if the block displays a warning or an error.
     * @returns {*} Hexadecimal string color
     */
	getColor(){

	    if(this.isSelected()){
	        return "#FFF";
        }

		if(this.getType() == "START_BLOCK"){
			return "#88FF88";
		}else if(this.getType() == "END_BLOCK"){
			return "#FF8888";
		}else if(this.getType() == "megablock"){
		    return "#FF7B00";
        }

		if(this.isError()){
			return "#97323D";
		}else if(this.isWarning()){
			return "#ECA53E";
		}else if(this.speed == "Medium"){
			return "#3B3F48";
		}else if(this.speed == "Fast"){
			return "#2F323A";
		}else if(this.speed == "Ultra fast"){
			return "#26282E";
		}else if(this.speed == "Slow"){
			return "#3A404E";
		}else if(this.speed == "Ultra slow"){
			return "#374175";
		}else{
			return "#3B3F48";
		}
	}

    /**
     * Get the foreground color. The foreground color is always the same except for the start and end blocks.
     * @returns {*} Hexadecimal string color
     */
	getForegroundColor(){
		if(this.getType() == "START_BLOCK"){
			return "#000";
		}else if(this.getType() == "END_BLOCK"){
			return "#000";
		}else if(this.getType() == "megablock"){
		    return "#000";
        }else{
			return "#D0E1F9";
		}
	}

    /**
     * Getter for the error boolean.
     * @returns {boolean} Returns a boolean which is true if the block displays an error, false otherwise.
     */
	isError(){
		return this.error;
	}

    /**
     * Getter for the error text
     * @returns {string|*} Returns the text that comes with the error. Will be undefined or equal to "" if no error is raised.
     */
	getErrorText(){
		return this.errortext;
	}

    /**
     * Setter for the errortext.
     * @param errortext String
     */
	setErrorText(errortext){
		this.errortext = errortext;
	}

    /**
     * Getter for the warning text.
     * @returns {*}
     */
	getWarningText(){
		return this.warningtext;
	}

    /**
     * Setter for the warning text
     * @param warningtext String
     */
	setWarningText(warningtext){
		this.warningtext = warningtext;
	}

    /**
     * Sets the error boolean of this block to true.
     */
	callError(){
		this.error = true;
	}

    /**
     * Sets the error boolean of this block to false.
     */
	clearError(){
		this.error = false;
	}

    /**
     * Warning boolean getter.
     * @returns {*|boolean}
     */
	isWarning(){
		return this.warning	;
	}

    /**
     * Sets the warning boolean of this block to true.
     */
	callWarning(){
		this.warning = true;
	}

    /**
     * Sets the warning boolean of thie block to false.
     */
	clearWarning(){
		this.warning = false;
	}

    /**
     * Sets the text of the block. The text is displayed on the block, in the timeline.
     * @param text String
     */
	setText(text){
		this.text = text;
	}

    /**
     * Sets the type of the block.
     * @param type String
     */
	setType(type){
		this.type = type;
	}

    /**
     * Returns a clone of this exact block. Reference preventing.
     * @returns {Block} Block object, clone of this same object.
     */
	getClone(){
		return new Block({
			type:gv.clone(this.type),
			text:gv.clone(this.text),
			tip:this.tip,
			container:this.container,
			liquidQuantity:this.liquidQuantity,
			speed:this.speed,
			error:this.error,
			warning:this.warning,
            blocks:this.blocks,
            comment:this.comment,
            args:this.args
		});
	}

    /**
     * Returns the type of the block
     * @returns {string|*}
     */
	getType(){
		return this.type;
	}

    /**
     * Returns the text of the block .
     * @returns {string|*|string|string}
     */
	getText(){
		return this.text;
	}

    /**
     * Returns every detail about the block
     */
	getExtendedText(){
        let text = [];
        text.push([this.getText()]);
        text.push(["Type of the operation : "+this.getType()]);
        if(this.getComment() != undefined && this.getComment() != ""){
            text.push(["Comment : "+this.getComment()]);
        }
        if(this.getType() == "get tip"){
            text.push(["Container : "+this.getContainer().getType()]);
            text.push(["Container name : "+this.getContainer().getName()]);
            text.push(["Tip : "+this.getTip().getTextLoc()]);
        }else if(this.getType() == "dsposit tip"){
            text.push(["Container : "+this.getContainer().getType()]);
            text.push(["Container name : "+this.getContainer().getName()]);
            text.push(["Tip : "+this.getTip().getX()+":"+this.getTip().getY()]);
        }else if(this.getType() == "get liquid"){
            text.push(["Container : "+this.getContainer().getType()]);
            text.push(["Container name : "+this.getContainer().getName()]);
            text.push(["Tip : "+this.getTip().getX()+":"+this.getTip().getY()]);
            text.push(["Liquid : "+this.getTip().getLiquid()+", "+this.getLiquidQuantity()[0]+this.getLiquidQuantity()[1]]);
        }else if(this.getType() == "pipetting"){
            if(this.args.position[1] == "bs"){
                text.push(["Getting liquid from below the surface : "+this.args.position[0]+" mm."]);
            }else{
                text.push(["Getting liquid from above the ground : "+this.args.position[0]+" mm."]);
            }
            text.push(["Redial pipette to "+this.args.n+"% of total liquid."]);
            text.push(["Using "+this.args.x+"% of the liquid to mix it up."]);
        }else if(this.getType() == "megablock"){
            for(let i = 0; i < this.getBlocks().length; i++){
                let textTemp = [];
                textTemp.push(this.getBlocks()[i].getText());

                if(this.getBlocks()[i].getComment() != undefined){
                    textTemp.push(this.getBlocks()[i].getComment());
                }

                text.push("");
                text.push(textTemp);
            }
        }

        console.log(text);
        return text;

    }

    /**
     * If a tip is concerned by the block, it has to be set using this setter. Some block do not use this, so attention is required.
     * @param tip Tip object
     */
	setTip(tip){
		this.tip = tip;
	}

    /**
     * Tip getter
     * May return null : Some block do not use this, so attention is required.
     * @returns {*} Tip object
     */
	getTip(){
		return this.tip;
	}

    /**
     * Setting the liquid quantity, using the value and unit.
     * @param liquid int
     * @param unit String (mL or uL)
     */
	setLiquidQuantity(liquid, unit){
		this.liquidQuantity = [liquid, unit];
	}

    /**
     * Getting the liquid quantity
     * @returns {*|Array}
     */
	getLiquidQuantity(){
		return this.liquidQuantity;
	}

    /**
     * Get the container concerned by this block. Some block does not use this, so attention is required.
     * @param container
     */
	setContainer(container){
		this.container = container;
        console.log("Set container of ", this, "to ", container);
	}

    /**
     * Container getter
     * May return null : some block does not use this, so attention is required.
     * @returns {*}
     */
	getContainer(){
		return this.container;
	}

    /**
     * Returns the user-set comment for this block
     * @returns {*}
     */
	getComment(){
	    return this.comment;
    }

    /**
     * Sets a comment for this block that the user defined
     * @param comment
     */
    setComment(comment){
	    this.comment = comment;
    }
}
