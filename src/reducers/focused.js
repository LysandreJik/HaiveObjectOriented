const gv = require('../../const/global');

export default function reducer(state = {
    type: "INIT",
    page: "Dashboard"
}, action){
    switch(action.type){
        case gv.reducers.focused.SWITCH_PAGE:
            return Object.assign({}, state, {type:action.type, page:action.page});
        default:
            return state;
    }
};