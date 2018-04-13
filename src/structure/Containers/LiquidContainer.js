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
}