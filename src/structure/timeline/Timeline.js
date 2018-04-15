
export default class Timeline{
    constructor(args){
        this._blocks = [];
        this._initialState = args.initialState;
        this._initialState.setID();
        this._states = [this._initialState];
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
        return this._states[this._states.length - 1];
    }
}
