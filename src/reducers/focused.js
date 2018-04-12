export default function reducer(state = {
    type: "NA",
    page: "Dashboard"
}, action){
    console.log('Reduced')
    switch(action.type){
        case "SWITCH_PAGE":
            return Object.assign({}, state, {type:action.type, page:action.page});
        default:
            return state;
    }
};