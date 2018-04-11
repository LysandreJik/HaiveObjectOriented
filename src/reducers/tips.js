export default function reducer(state={
    started:false
}, action){
    switch(action.type){
        default:
            return {...state, started:true}
    }
}