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
export class TestTube{
    constructor(args){
        this.x = args.x;
        this.y = args.y;
        if(args.liquid == undefined){
            this.liquid = "";
        }else{
            this.liquid = args.liquid;
        }

        if(args.color == undefined){
            this.color = "";
        }else{
            this.color = args.color;
        }

        if(args.amountUnit == undefined){
            this.amountUnit = "mL";
        }else{
            this.amountUnit = args.amountUnit;
        }

        if(args.liquidAmount == undefined){
            this.liquidAmount = "";
        }else{
            this.liquidAmount = args.liquidAmount;
        }

        if(args.viscous == undefined){
            this.viscous = false;
        }else{
            this.viscous = args.viscous;
        }

        if(args.full == undefined){
            this.full = false;
        }else{
            this.full = args.full;
        }
    }

    /**
     * Returns a clone of the current Tip. (REFERENCING PREVENTION)
     * @returns {TestTube} TestTube object
     */
    getClone(){
        return new TestTube({
            x:clone(this.x),
            y:clone(this.y),
            liquid:clone(this.liquid),
            color:clone(this.color),
            amountUnit:clone(this.amountUnit),
            liquidAmount:clone(this.liquidAmount),
            viscous:clone(this.viscous),
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
                s += "c";
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
     * Get the Tip's liquid name
     * @returns {string|*}
     */
    getLiquid(){
        return this.liquid;
    }

    /**
     * Set the Tip's liquid name
     * @param liquid
     */
    setLiquid(liquid){
        this.liquid = liquid;
    }

    /**
     * Add liquid to the current tip.
     * @param liquid int, liquid amount
     * @param unit String, liquid amount unit ("mL" or "uL")
     */
    addLiquid(liquid, unit){
        if(this.amountUnit == unit ){
            this.liquidAmount = +this.liquidAmount+ +liquid;
        }else if(this.amountUnit == "mL" && unit == "uL"){
            this.liquidAmount = +(+this.liquidAmount + +(+liquid/1000));
        }else if(this.amountUnit == "uL" && unit == "mL"){
            this.liquidAmount = +this.liquidAmount+ +(liquid*1000);
        }else{
            throw new Error("Add liquid invalid units : "+this.amountUnit+", "+unit);
        }

    }

    /**
     * Remove liquid of the current tip.
     * @param liquid int, liquid amount
     * @param unit String, liquid amount unit ("mL" or "uL")
     */
    removeLiquid(liquid, unit){
        if(this.amountUnit == unit ){
            this.liquidAmount = +this.liquidAmount - +liquid;
        }else if(this.amountUnit == "mL" && unit == "uL"){
            this.liquidAmount = +(this.liquidAmount - +liquid/1000);
        }else if(this.amountUnit == "uL" && unit == "mL"){
            this.liquidAmount = +this.liquidAmount - +(liquid*1000);
        }else{
            throw new Error("Remove liquid invalid units : "+this.amountUnit+", "+unit);
        }
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

    /**
     * Getter for the liquidAmount variable
     * @returns {string|*|number} int
     */
    getLiquidAmount(){
        return this.liquidAmount;
    }

    /**
     * Setter for the liquidAmount variable
     * @param liquidAmount int
     */
    setLiquidAmount(liquidAmount){
        this.liquidAmount = liquidAmount;
    }

    /**
     * Returns true if the liquid is viscous, false if aqueous
     * @returns {boolean|*}
     */
    isViscous(){
        return this.viscous;
    }

    /**
     * Setter for the Tip's viscous variable
     * @param viscous
     */
    setViscous(viscous){
        this.viscous = viscous;
    }

    /**
     * Getter for the liquid amount unit
     * @returns {string|*|string} String, either "uL" or "mL".
     */
    getAmountUnit(){
        return this.amountUnit;
    }

    /**
     * Setter for the liquid amount unit
     * @param amountUnit String, either "uL" or "mL"
     */
    setAmountUnit(amountUnit){
        this.amountUnit = amountUnit;
    }
}