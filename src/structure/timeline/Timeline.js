
export default class Timeline{
    constructor(initialState){
        this._blocks = [];
        this._initialState = initialState;
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
