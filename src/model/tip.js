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

const clone = require('../../const/global').clone;

/**
 * The Object Tip class
 */
export class Tip{
	constructor(args){
		this.x = args.x;
        this.y = args.y;
        this.color = args.color;

        if(this.color == undefined){
            this.color = "";
        }

        if(args.full == undefined){
            this.full = false;
        }else{
            this.full = args.full;
        }

        if(args.contaminated == undefined){
            this.contaminated = false;
        }else{
            this.contaminated = args.contaminated;
        }
	}

    /**
     * Returns a clone of the current Tip. (REFERENCING PREVENTION)
     * @returns {Tip} Tip object
     */
	getClone(){
		return new Tip({
			x:clone(this.x),
			y:clone(this.y),
			full:clone(this.full),
            contaminated:clone(this.contaminated)
		});
	}

    /**
     * Cleans this tip and empties it. Basically resets it to its unused, original state.
     */
	emptyAndClean(){
		this.liquid = "";
		this.color = "";
		this.amountUnit = "";
		this.liquidAmount = 0;
		this.viscous = false;
		this.full = false;
		this.contaminated = false;
	}

    /**
     * Setter for the Tip's container
     * @param container Container object
     */
	setContainer(container){
		this.container = container;
	}

    /**
     * Returns true if this tip is full. This is only used for the "Tip" tips, as "Liquid" tips are never truly full.
     * @returns {boolean|*}
     */
	containsTip(){
		return this.full;
	}

    /**
     * Setter for the full boolean
     * @param full boolean
     */
	setContainingTip(full){
		this.full = full;
	}

    /**
     * Setter for the contaminated boolean. A contaminated tip is not suitable for re-use.
     * @param contaminated
     */
	setContaminated(contaminated){
	    this.contaminated = contaminated;
    }

    /**
     * Getter for the contamniated boolean. A contaminated tip is not suitable for re-use.
     * @returns {*}
     */
    isContaminated(){
	    return this.contaminated;
    }

    /**
     * Get the Tip's X position
     * @returns {*}
     */
	getX(){
		return this.x;
	}

    /**
     * Get the Tip's Y position
     * @returns {*}
     */
	getY(){
		return this.y;
	}

	getTextLoc(){
	    let s = "";
	    switch(this.getX()){
            case 0:
                s += "A";
                break;
            case 1:
                s += "B";
                break;
            case 2:
                s += "C";
                break;
            case 3:
                s += "D";
                break;
            case 4:
                s += "E";
                break;
            case 5:
                s += "F";
                break;
            case 6:
                s += "G";
                break;
            case 7:
                s += "H";
                break;
            default:
                s+="NaN";
        }

        s += this.getY();

	    return s;

    }

    /**
     * Getter for the tip's color
     * @returns {string|*} Hexadecimal color as String
     */
    getColor(){
        return this.color;
    }

    /**
     * Setter for the tip's color
     * @param color Hexadecimal color as String
     */
    setColor(color){
        this.color = color;
    }
}
