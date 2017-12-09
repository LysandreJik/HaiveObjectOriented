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
const Tip = require("./tip").Tip;

/**
 * Class of Container object
 *
 * TODO: IMPLEMENT THE REMAINING CONTAINER TYPES !!!!
 */
export class TipContainer{
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
					this.tipArr[i].push(new Tip({x:i, y:j, container:this}));
				}
			}
		}else{
			this.tipArr = args.tipArr;
		}
	}

	bookTip(){
	    let tip = this.getUncontaminatedFullTips()[0];
	    tip.setContainingTip(false);
	    return tip;
    }

    unbookTip(tip){
	    tip.setContaminated(false);
	    tip.setContainingTip(true);
    }

    depositTip(tip){
	    tip.setContainingTip(true);
	    tip.setContaminated(true);
	    return tip;
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
		return false;
	}

    /**
     * Method to know if the container is a tip container or not
     * @returns {boolean} Returns true if the container is a tip container, false otherwise.
     */
	isTipContainer(){
		return true;
	}



    /**
     * Returns an array of all tips, cloned (no referencing).
     * @returns {Array} MD Array of tips.
     */
	getTipsClone(){
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
     * @returns {TipContainer} Container object
     */
	getClone(){
		return new TipContainer({
			name:this.name,
			id:this.id,
			loc:this.loc,
			maxLiquidQuantity:this.maxLiquidQuantity,
			type:this.type,
			tipArr:this.getTipsClone(),
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

        return new TipContainer({
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
     * Returns an Array of all uncontaminated full tips.
     * @returns {Array} MD Array of tips.
     */
    getUncontaminatedFullTips(){
        let fullTips = [];
        for (let i = 0; i < this.tipArr.length; i++) {
            for (let j = 0; j < this.tipArr[i].length; j++) {
                if(this.tipArr[i][j].containsTip() && !this.tipArr[i][j].isContaminated()){
                    fullTips.push(this.tipArr[i][j]);
                }
            }
        }

        return fullTips;
    }

    /**
     * Returns the number of full tips
     * @returns {number} int
     */
    getNumberOfUncontaminatedFullTips(){
        return this.getUncontaminatedFullTips().length;
    }

    /**
     * Returns the full tips
     * @returns Array of tips
     */
    getFullTips(){
        let fullTips = [];
        for (let i = 0; i < this.tipArr.length; i++) {
            for (let j = 0; j < this.tipArr[i].length; j++) {
                if(this.tipArr[i][j].containsTip()){
                    fullTips.push(this.tipArr[i][j]);
                }
            }
        }

        return fullTips;
    }

    /**
     * Returns the empty tips
     * @returns Array of tips
     */
    getEmptyTips(){
        let emptyTips = [];
        for (let i = 0; i < this.tipArr.length; i++) {
            for (let j = 0; j < this.tipArr[i].length; j++) {
                if(!this.tipArr[i][j].containsTip()){
                    emptyTips.push(this.tipArr[i][j]);
                }
            }
        }

        return emptyTips;
    }

    /**
     * Returns an array of all contaminated tips.
     * @returns {Array} MD array of tips.
     */
	getContaminatedTips(){
        let liquidTips = [];
		for (let i = 0; i < this.tipArr.length; i++) {
			for (let j = 0; j < this.tipArr[i].length; j++) {
				if(this.tipArr[i][j].getLiquid() != ""){
					liquidTips.push(this.tipArr[i][j]);
				}
			}
		}

		return liquidTips;
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
     * @param Tip Tip object
     * @param x x-axis value
     * @param y y-axis value
     */
	setTip(Tip, x, y){
	    console.log(x, y, Tip);
		this.tipArr[x][y] = gv.clone(Tip);
	}
}
