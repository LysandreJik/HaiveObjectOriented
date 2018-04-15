const { List } = require('immutable');

export default class Timeline{
    constructor(args){
        this._blocks = [];
        this._initialState = args.initialState;
        this._states = List([Object.assign({}, this._initialState)]);
    }

    updateState(state){
        this._states.push(Object.assign({}, state));
    }

    getStates(){
        return this._states;
    }

    getCurrentState(){
        return this._states.get(this._states.size - 1);
    }
}
