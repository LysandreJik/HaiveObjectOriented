import Tip from "./Tip";
import {TIP_TYPES} from "../../../const/structure";

export default class TestTube extends Tip{
    constructor(args){
        super(args);
    }

    getTipType(){
        return TIP_TYPES.TEST_TUBE;
    }
}