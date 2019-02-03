export default function(state={},action){
    switch(action.type){
        case 'GET_MyProfile':
        return {...state,MyProfile:action.payload};
        default:
        return state;
    }
}