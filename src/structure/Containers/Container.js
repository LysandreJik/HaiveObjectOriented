export default class Container{
    constructor(args){
        this._position = args.position;
        this._subType = args.subType;
        this._id = Container.getID();
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
}