export default function(state={},action){
    switch(action.type){
        case 'GET_ProductLists':
        return {...state,productlist:action.payload};
        default:
        return state;
    }
}