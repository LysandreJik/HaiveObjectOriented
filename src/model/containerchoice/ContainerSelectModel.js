const gv = require("../../../const/global");
const timeline = require('../../../const/global').timeline;

export class ContainerSelectModel{
    constructor(){
        this._state = timeline.getTemporaryState();
        gv.containerSelectModel = this;
        console.log(this._state);
    }

    getCurrentlySelectedHaive(){
        return this._state.getCurrentlySelectedHaive();
    }

    setCurrentlySelectedHaive(haive){
        this._state.setCurrentlySelectedHaive(haive);
    }

    updateState(description){
        timeline.updateState(this._state, description);
    }

    refreshModel(){
        this._state = timeline.getTemporaryState(); 
    }
}