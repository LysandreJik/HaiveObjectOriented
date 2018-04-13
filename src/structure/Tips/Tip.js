import {LIQUID_MAGNITUDES} from "../../../const/structure";


export default class Tip{
    constructor(args){
        this._x = args.x;
        this._y = args.y;
        this._container = args.container;
        this._subType = args.subType;
        this._dirty = false;
        this._contents = {
            liquid: "NONE",
            quantity: 0,
            magnitude: LIQUID_MAGNITUDES.uL
        };
    }

    getTipType(){
        throw new Error("getTipType() called on supertype Tip. This object should be specialized as a PipetteTip or TestTube.");
    }

    getTipSubType(){
        return this._subType;
    }

    getContainer(){
        return this._container;
    }

    dirty(){
        this._dirty = true;
    }

    clean(){
        this._dirty = false;
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
}