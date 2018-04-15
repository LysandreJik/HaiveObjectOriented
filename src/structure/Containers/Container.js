import PipetteTip from "../Tips/PipetteTip";
import {CONTAINER_TYPES} from "../../../const/structure";
import TestTube from "../Tips/TestTube";

export default class Container{
    constructor(args){
        this._subType = args.subType;
        this._id = args.id === undefined ? Container.getID() : args.id;

        if(args.tips === undefined){
            this._tips = [];
            for(let i = 0; i < this.getWidth(); i++){
                this._tips.push([]);
                for(let j = 0; j < this.getHeight(); j++){
                    if(this._subType.containerType === CONTAINER_TYPES.PIPETTE_TIP_CONTAINER){
                        this._tips[i].push(new PipetteTip({x: i, y: j, container: this}));
                    }else if(this._subType.containerType === CONTAINER_TYPES.TEST_TUBE_CONTAINER){
                        this._tips[i].push(new TestTube({x: i, y: j, container: this}));
                    }else{
                        throw new Error("Unknown container type : " + this._subType.containerType);
                    }
                }
            }
        }else{
            this._tips = args.tips;
        }
    }

    setPosition(position){
        this._position = position;
    }

    static getID(){
        if(Container.id == undefined){
            Container.id = 0;
        }else{
            Container.id++;
        }

        return Container.id;
    }

    getContainerSubType(){
        return this._subType;
    }

    getPosition(){
        return this._position;
    }

    getWidth(){
        return this._subType.width;
    }

    getHeight(){
        return this._subType.height;
    }

    getID(){
        return this._id;
    }

    getTips(){
        return this._tips;
    }

    getAvailableTips(){
        let availableTips = [];
        for(let tipColumn in this._tips){
            for(let tipRow in this._tips[tipColumn]){
                if(this._tips[tipColumn][tipRow].isAvailable()){
                    availableTips.push(this._tips[tipColumn][tipRow]);
                }
            }
        }

        return availableTips;
    }

    bookTip(){
        for(let tipColumn in this._tips){
            for(let tipRow in this._tips[tipColumn]){
                if(this._tips[tipColumn][tipRow].isAvailable()){
                    this._tips[tipColumn][tipRow].book();
                    return this._tips[tipColumn][tipRow];
                }
            }
        }
    }


}