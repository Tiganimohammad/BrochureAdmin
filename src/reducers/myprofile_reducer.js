export default function(state={},action){
    switch(action.type){
        case 'GET_MyProfile':
        return {...state,MyProfile:action.payload};
        case 'Update_MyProfile':
        return {
             ...state,
             UpdateMyProfile:action.payload.success,
             MyProfile:action.payload
            };
        default:
        return state;
    }
}