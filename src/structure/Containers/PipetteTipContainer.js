import Container from "./Container";
import {CONTAINER_TYPES} from "../../../const/structure";
import TestTube from "../Tips/TestTube";
import PipetteTip from "../Tips/PipetteTip";


export default class PipetteTipContainer extends Container{
    constructor(args){
        super(args);
        if(args.subType.containerType !== this.getContainerType()){
            throw new Error("PipetteTipContainer initialized with a wrong subType. Subtype : "+args.subType.name+", type: "+args.subType.containerType);
        }
    }

    getContainerType(){
        return CONTAINER_TYPES.PIPETTE_TIP_CONTAINER;
    }
}