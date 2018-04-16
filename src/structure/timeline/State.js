export default class State{
    constructor(args){
        this._storeHaives = args.storeHaives;
        this._haives = args.haives;
        this._held = args.held;
        this._copied = args.copied;
        this._id = "Not saved";
    }

    getClone(){
        let haives = [];
        for(let i = 0; i < this._haives.length; i++){
            haives.push(this._haives[i].getClone());
        }

        let storeHaives = [];
        for(let i = 0; i < this._storeHaives.length; i++){
            storeHaives.push(this._storeHaives[i].getClone());
        }

        return new State({
            storeHaives: storeHaives,
            haives: haives,
            held: {liquid: this._held.liquid, quantity: this._held.quantity, magnitude: this._held.magnitude},
            copied: this._copied,
            id: this._id
        });
    }

    getHaiveFromID(id){
        for(let i = 0; i < this.getHaives().length; i++){
            if(this.getHaives()[i].getID() === id){
                return this.getHaives()[i];
            }
        }

        for(let i = 0; i < this.getStoreHaives().length; i++){
            if(this.getStoreHaives()[i].getID() === id){
                return this.getStoreHaives()[i];
            }
        }
    }

    getStoreHaives(){
        return this._storeHaives;
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

    setID(){
        this._id = State.getID();
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