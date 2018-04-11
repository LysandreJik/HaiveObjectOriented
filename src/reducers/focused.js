export default function reducer(state = {
    type: "NA",
    page: "DASHBOARD"
}, action){
    console.log('Reduced')
    switch(action.type){
        case "SWITCH_PAGE":
            console.log(Object.assign({}, state, {type:action.type, page:action.page}));
            return Object.assign({}, state, {type:action.type, page:action.page});
            break;
        default:
            return state;
    }
};