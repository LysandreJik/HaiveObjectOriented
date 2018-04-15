import Container from "./Container";
import {CONTAINER_TYPES} from "../../../const/structure";
import TestTube from "../Tips/TestTube";


export default class LiquidContainer extends Container{
    constructor(args){
        super(args);
        if(args.subType.containerType !== this.getContainerType()){
            throw new Error("LiquidContainer initialized with a wrong subType. Subtype : "+args.subType.name+", type: "+args.subType.containerType);
        }
    }

    getContainerType(){
        return CONTAINER_TYPES.TEST_TUBE_CONTAINER;
    }

    getClone(){
        let cloneTips = [];
        for(let i = 0; i < this._tips.length; i++){
            cloneTips.push([]);
            for(let j = 0; j < this._tips[0].length; j++){
                cloneTips[i].push(this._tips[i][j].getClone());
            }
        }
        return new LiquidContainer({
            subType: this._subType,
            id: this._id,
            tips: cloneTips
        });
    }
}