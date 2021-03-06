export default class State{
    constructor(args){
        this._storeHaives = args.storeHaives;
        this._haives = args.haives;
        this._held = args.held;
        this._copied = args.copied;
        this._currentlySelectedHaive = args.currentlySelectedHaive;
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

        let currentlySelectedHaive;
        if(this._currentlySelectedHaive !== undefined){
            for(let i = 0; i < haives.length; i++){
                if(haives[i].getX() === this._currentlySelectedHaive.getX() && haives[i].getY() === this._currentlySelectedHaive.getY()){
                    currentlySelectedHaive = haives[i];
                }
            }
        }

        return new State({
            storeHaives: storeHaives,
            haives: haives,
            held: {liquid: this._held.liquid, quantity: this._held.quantity, magnitude: this._held.magnitude},
            copied: this._copied,
            id: this._id,
            currentlySelectedHaive: currentlySelectedHaive
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

    getCurrentlySelectedHaive(){
        return this._currentlySelectedHaive;
    }

    setCurrentlySelectedHaive(haive){
        this._currentlySelectedHaive = haive;
    }

    getStoreHaives(){
        return this._storeHaives;
    }

    getHaives(){
        return this._haives;
    }

    setHaives(haives){
        this._haives = haives;
    }

    getHeld(){
        return this._held;
    }

    getCopied(){
        return this._copied;
    }

    save(description){
        this._id = State.getID();
        this._description = description;
    }

    getDescription(){
        return this._description;
    }

    getID(){
        return this._id;
    }

    getHaiveFromName(name){
        return this.getHaives().map(function(i){if(i.getName() === name){return i;}})[0];
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