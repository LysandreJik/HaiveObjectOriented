const { List } = require('immutable');

export default class Timeline{
    constructor(args){
        this._blocks = [];
        this._initialState = args.initialState;
        this._initialState.setID();
        this._states = List([this._initialState]);
    }

    updateState(state){
        state.setID();
        this._states.push(state);
    }

    getTemporaryState(){
        return this.getCurrentState().getClone();
    }

    getStates(){
        return this._states;
    }

    getCurrentState(){
        return this._states.get(this._states.size - 1);
    }
}
