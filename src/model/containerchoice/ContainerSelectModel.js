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
        console.log("Initial", this._state.getCurrentlySelectedHaive());
        this._state.setCurrentlySelectedHaive(haive);
        console.log("After", this._state.getCurrentlySelectedHaive());
        this.updateState("Changed currently selected haive to "  + haive.getName());
    }

    updateState(description){
        timeline.updateState(this._state, description);
        this.refreshModel();
    }

    refreshModel(){
        this._state = timeline.getTemporaryState();
    }
}