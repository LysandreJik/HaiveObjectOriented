import {LIQUID_MAGNITUDES} from "../../../const/structure";


export default class Tip{
    constructor(args){
        this._x = args.x;
        this._y = args.y;
        this._container = args.container;
        this._dirty = false;
        this._available = true;
        this._contents = {
            liquid: "NONE",
            quantity: 0,
            magnitude: LIQUID_MAGNITUDES.uL
        };
    }

    addLiquid(liquid){
        if(this._contents.quantity > 0){
            throw new Error("Tip already contains liquid. Please empty the tip before adding liquid, or use the mergeLiquidInTip to add another liquid to the tip.");
        }else if(this._available){
            throw new Error("Tip is available. Please book it before trying to add liquid to it.");
        }else if(this._dirty){
            throw new Error("Tip is dirty. Please clean the tip before adding liquid, or use the mergeLiquidInTip to add another liquid to the tip.");
        }else{
            this._contents = liquid;
            this.dirty();
        }
    }

    removeLiquid(liquid){
        if(this._contents.quantity <= 0){
            throw new Error("Tip is empty. Please only remove liquid from tips that contain liquid.");
        }else if(this._available){
            throw new Error("Tip is available. Please book it before trying to add liquid to it.");
        }else{
            let totalHeldQuantity = (this._contents.magnitude === LIQUID_MAGNITUDES.ul ? this._contents.quantity : this._contents.quantity*1000);
            let totalRemovedQuantity = liquid.magnitude === LIQUID_MAGNITUDES.ul ? liquid.quantity : liquid.quantity*1000;
            if(totalRemovedQuantity > totalHeldQuantity){
                throw new Error("Trying to remove more liquid than actually contained in the tip !");
            }else{
                this._contents = liquid;
                this.dirty();
            }
        }
    }

    mergeLiquidInTip(liquid, liquidName){
        if(this._contents.quantity === 0 && !this._dirty){
            throw new Error("Tip doesn't contain any liquid and is clean. Please use the addLiquid method to add a first liquid to the tip.");
        }else if(this._available){
            throw new Error("Tip is available ! Please book the tip before trying to add liquid to it.");
        }else{
            if(liquidName !== undefined){
                this._contents.liquid = liquidName;
            }else{
                this._contents.liquid = liquid.liquid;
            }

            let totalLiquid = 0;
            if(this._contents.magnitude === LIQUID_MAGNITUDES.uL){
                totalLiquid += this._contents.quantity;
            }else{
                totalLiquid += this._contents.quantity*1000;
            }

            if(liquid.magnitude === LIQUID_MAGNITUDES.uL){
                totalLiquid += liquid.quantity;
            }else{
                totalLiquid += liquid.quantity*1000;
            }

            if(totalLiquid > 10000){
                this._contents.quantity = totalLiquid/1000;
                this._contents.magnitude = LIQUID_MAGNITUDES.mL
            }else{
                this._contents.quantity = totalLiquid;
                this._contents.magnitude = LIQUID_MAGNITUDES.uL;
            }
        }
    }

    getTipType(){
        throw new Error("getTipType() called on supertype Tip. This object should be specialized as a PipetteTip or TestTube.");
    }

    getContainer(){
        return this._container;
    }

    dirty(){
        this._dirty = true;
    }

    clean(){
        if(this._contents.quantity > 0){
            throw new Error("Liquid is still contained in the tip, it cannot be cleaned. Please empty the liquid first or call the reset method to reset the tip to its initial state.");
        }
        this._dirty = false;
    }

    reset(){
        this._dirty = false;
        this._available = true;
        this._contents = {
            liquid: "NONE",
            quantity: 0,
            magnitude: LIQUID_MAGNITUDES.uL
        };
    }

    isDirty(){
        return this._dirty;
    }

    getX(){
        return this._x;
    }

    getY(){
        return this._y;
    }

    getContents(){
        return this._contents;
    }

    book(){
        this._available = false;
    }

    unbook(){
        this._available = true;
    }

    isAvailable(){
        return this._available;
    }
}