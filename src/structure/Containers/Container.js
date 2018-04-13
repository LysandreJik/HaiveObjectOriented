export default class Container{
    constructor(args){
        this._position = args.position;
        this._subType = args.subType;
    }

    getContainerSubType(){
        return this._subType;
    }

    getPosition(){
        return this._position;
    }
}