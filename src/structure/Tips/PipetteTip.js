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
        this._held = true;
    }

    release(){
        this._held = false;
    }

    getContents(){
        if(this._held){
            return super.getContents();
        }else{
            throw new Error("The pipette tip is not held, it can't contain anything.");
        }
    }
}