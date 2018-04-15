export default class State{
    constructor(args){
        this._haives = args.haives;
        this._held = args.held;
        this._copied = args.copied;
        this._id = State.getID();
    }

    getHaives(){
        return this._haives;
    }

    getHeld(){
        return this._held;
    }

    getCopied(){
        return this._copied;
    }

    getID(){
        return this._id;
    }

    static getID(){
        if(State.id == undefined){
            State.id = 0;
        }else{
            State.id++;
        }

        return State.id;
    }
}