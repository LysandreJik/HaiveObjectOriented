import Tip from "./Tip";
import {TIP_TYPES} from "../../../const/structure";

export default class PipetteTip extends Tip{
    constructor(args){
        super(args);
        this._held = false;
    }

    getTipType(){
        return TIP_TYPES.PIPETTE_TIP;
    }

    hold(){
        if(this._available){
            throw new Error("Tip is available, can't be held.");
        }
        this._held = true;
    }

    release(){
        this._held = false;
    }

    isHeld(){
        return this._held;
    }

    getContents(){
        if(this._held){
            return super.getContents();
        }else{
            throw new Error("The pipette tip is not held, it can't contain anything.");
        }
    }

    addLiquid(liquid){
        if(this._held){
            return super.addLiquid(liquid);
        }else{
            throw new Error("The pipette tip is not held, it can't contain anything.");
        }
    }

    removeLiquid(liquid){
        if(this._held){
            return super.removeLiquid(liquid);
        }else{
            throw new Error("The pipette tip is not held, it can't contain anything.");
        }
    }

    mergeLiquidInTip(liquid, liquidName){
        if(this._held){
            return super.mergeLiquidInTip(liquid, liquidName);
        }else{
            throw new Error("The pipette tip is not held, it can't contain anything.");
        }
    }

    getClone(){
        return new PipetteTip({
            x: this._x,
            y: this._y,
            container: this._container,
            dirty: this._dirty,
            available: this._available,
            contents: this._contents,
        });
    }
}