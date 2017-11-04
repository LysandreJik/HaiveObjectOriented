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

const acceptedTypes = require('../../const/global').acceptedContainerTypes;
const gv = require('../../const/global');
const Chip = require("./tip").Tip;

/**
 * Class of Container object
 *
 * TODO: IMPLEMENT THE REMAINING CONTAINER TYPES !!!!
 */
export class Container{
	constructor(args){
		this.name = args.name;
		this.id = args.id;
		this.loc = args.loc;
		this.maxLiquidQuantity = args.maxLiquidQuantity;

		if(acceptedTypes.indexOf(args.type) != -1){
			this.type = args.type;
		}else{
			throw new SyntaxError("Type provided to container is not currently supported : "+args.type+". Currently supported types : "+acceptedTypes);
		}

		let arrSize = gv.getContainerWidthAndHeight(this);
		if(args.tipArr == undefined){
			this.tipArr = [];
			for(let i = 0; i < arrSize[0]; i++){
				this.tipArr.push([]);
				for(let j = 0; j < arrSize[1]; j++){
					this.tipArr[i].push(new Chip({x:i, y:j, container:this}));
				}
			}
		}else{
			this.tipArr = args.tipArr;
		}
	}

    /**
     * Book a tip in this container. This way there will always be enough tips.
     */
	bookTip(){
	    let tip = this.getFullTips()[0];
	    tip.setFull(false);
	    return tip;
	}

    /**
     * Unbook a tip in this container.
     */
	unbookTip(tip){
		tip.setFull(false);
	}

    /**
     * Container name.
     * @returns {*} String
     */
	getName(){
		return this.name;
	}

    /**
     * Container name
     * @param name String
     */
	setName(name){
		this.name = name;
	}

    /**
     * Container ID
     * @returns {*} int
     */
	getId(){
		return this.id;
	}

    /**
     * Container id
     * @param id int
     */
	setId(id){
		this.id = id;
	}

    /**
     * Container type
     * @returns {*} String
     */
	getType(){
		return this.type;
	}

    /**
     * Container type
     * @param type String
     */
	setType(type){
		this.type = type;
	}

    /**
     * Container location
     * @returns {*} String
     */
	getLoc(){
		return this.loc;
	}

    /**
     * Container location
     * @param loc String
     */
	setLoc(loc){
		this.loc = loc;
	}

    /**
     * Method to know if the container is a liquid container or not
     * @returns {boolean} Returns true if the container is a liquid container, false otherwise.
     */
	isLiquidContainer(){
		return this.getType() == "15 screw tubes" || this.getType() == "6 falcon stand" || this.getType() == "20 magnetic beads";
	}

    /**
     * Method to know if the container is a tip container or not
     * @returns {boolean} Returns true if the container is a tip container, false otherwise.
     */
	isTipContainer(){
		return this.getType() == "P20 normal chip" || this.getType() == "P200 normal chip" || this.getType() == "P1000 normal chip" || this.getType() == "P1000 long chip";
	}

    /**
     * Returns an Array of all uncontaminated tips.
     * @returns {Array} MD Array of tips.
     */
	getEmptyUncontaminatedTips(){
		let fullChips = [];
		for (let i = 0; i < this.tipArr.length; i++) {
			for (let j = 0; j < this.tipArr[i].length; j++) {
				if(!this.tipArr[i][j].isFull() && this.tipArr[i][j].getLiquid() == ""){
					fullChips.push(this.tipArr[i][j]);
				}
			}
		}

		return fullChips;
	}

    /**
     * Returns an array of all tips, cloned (no referencing).
     * @returns {Array} MD Array of tips.
     */
	getChipsClone(){
        let fullTip = [];
		for (let i = 0; i < this.tipArr.length; i++) {
            let fullTipLine = [];
			for (let j = 0; j < this.tipArr[i].length; j++) {
				fullTipLine.push(this.tipArr[i][j].getClone());
			}
			fullTip.push(fullTipLine);
		}

		return fullTip;
	}

    /**
     * Getter for this container's clone. (No referencing)
     * @returns {Container} Container object
     */
	getClone(){
		return new Container({
			name:this.name,
			id:this.id,
			loc:this.loc,
			maxLiquidQuantity:this.maxLiquidQuantity,
			type:this.type,
			tipArr:this.getChipsClone(),
		});
	}

	getJSONCopy(){
	    let tipArr = [];
	    let fullTips = this.getFullTips();

	    console.log(fullTips);
	    for(let i = 0; i < fullTips.length; i++){
	        console.log(fullTips[i]);
	        tipArr.push({x:fullTips[i].getX(), y:fullTips[i].getY()});
        }

        return new Container({
            name:this.name,
            id:this.id,
            loc:this.loc,
            type:this.type,
            tipArr:tipArr
        });
    }

    getSuccintJSONCopy(){
        return ({
            loc:this.getNumberFromPosition(this.loc),
            type:this.type
        });
    }

    getNumberFromPosition(pos){
        if(pos == "middle-right"){
            return 3;
        }else if(pos == "bottom-right"){
            return 5;
        }else if(pos == "bottom-left"){
            return 7;
        }else if(pos == "middle-left"){
            return 9;
        }else if(pos == "top-left"){
            return 11;
        }else if(pos == "top-right"){
            return 1;
        }
    }

    /**
     * Returns the number of full tips
     * @returns {number} int
     */
    getNumberOfFullTips(){
        let fullChips = 0;
        for (let i = 0; i < this.tipArr.length; i++) {
            for (let j = 0; j < this.tipArr[i].length; j++) {
                if(this.tipArr[i][j].isFull()){
                    fullChips++;
                }
            }
        }

        return fullChips;
    }

    /**
     * Returns the full tips
     * @returns Array of tips
     */
    getFullTips(){
        let fullChips = [];
        for (let i = 0; i < this.tipArr.length; i++) {
            for (let j = 0; j < this.tipArr[i].length; j++) {
                if(this.tipArr[i][j].isFull()){
                    fullChips.push(this.tipArr[i][j]);
                }
            }
        }

        return fullChips;
    }

    /**
     * Returns an array of all contaminated tips.
     * @returns {Array} MD array of tips.
     */
	getContaminatedChips(){
        let liquidChips = [];
		for (let i = 0; i < this.tipArr.length; i++) {
			for (let j = 0; j < this.tipArr[i].length; j++) {
				if(this.tipArr[i][j].getLiquid() != ""){
					liquidChips.push(this.tipArr[i][j]);
				}
			}
		}

		return liquidChips;
	}

    /**
     * Returns an array of all liquid tips.
     * @returns {Array} MD array of tips.
     */
	getLiquidTips(){
        let liquidChips = [];
		for (let i = 0; i < this.tipArr.length; i++) {
			for (let j = 0; j < this.tipArr[i].length; j++) {
				if(this.tipArr[i][j].getLiquid() != "" && this.tipArr[i][j].getLiquidAmount() > 0){
					liquidChips.push(this.tipArr[i][j]);
				}
			}
		}

		return liquidChips;
	}

    /**
     * Returns an array of all tips which contain a different liquid. If two tips contain the same liquid, only the first one will be added to this array.
     * @returns {Array} MD array of tips.
     */
	getLiquidTipsSingletons(){
        let liquidChips = [];
		for (let i = 0; i < this.tipArr.length; i++) {
			for (let j = 0; j < this.tipArr[i].length; j++) {
				if(this.tipArr[i][j].getLiquid() != "" && this.tipArr[i][j].getLiquidAmount() > 0){
                    let liquidNotContained = true;
					for(let k = 0; k < liquidChips.length; k++){
						if(this.tipArr[i][j].getLiquid() == liquidChips[k].getLiquid()){
							liquidNotContained = false;
						}
					}
					if(liquidNotContained){
						liquidChips.push(this.tipArr[i][j]);
					}
				}
			}
		}

		return liquidChips;
	}

    /**
     * Gets a tip from the container
     * @param x x-axis value
     * @param y y-axis value
     * @returns {*} Tip object
     */
	getTip(x, y){
		return this.tipArr[x][y];
	}

    /**
     * Sets a tip in the container
     * @param chip Tip object
     * @param x x-axis value
     * @param y y-axis value
     */
	setTip(chip, x, y){
	    console.log(x, y, chip);
		this.tipArr[x][y] = gv.clone(chip);
	}
}
