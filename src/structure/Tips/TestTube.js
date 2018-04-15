import Tip from "./Tip";
import {TIP_TYPES} from "../../../const/structure";

export default class TestTube extends Tip{
    constructor(args){
        super(args);
    }

    getTipType(){
        return TIP_TYPES.TEST_TUBE;
    }

    getClone(){
        return new TestTube({
            x: this._x,
            y: this._y,
            container: this._container,
            dirty: this._dirty,
            available: this._available,
            contents: this._contents,
        });
    }
}