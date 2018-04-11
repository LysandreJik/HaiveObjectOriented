export default function reducer(state = {
    type: "NA",
    page: "INDEX"
}, action){
    switch(action.type){
        case "SWITCH_PAGE":
            return {...state, type:action.type, page:action.page}
    }
};