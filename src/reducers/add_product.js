export default function(state={},action){
    switch(action.type){
        case 'ADD_PRODUCT':
        return {...state,Product:action.payload};
        default:
        return state;
    }
}