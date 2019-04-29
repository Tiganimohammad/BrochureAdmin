export default function(state={},action){
    switch(action.type){
        case 'GET_ProductLists':
        return {...state,productlist:action.payload};
        case 'Update_Product':
        return { 
             ...state,   
             productlist:{updated:action.payload,
                Products: state.productlist.Products.map(
                    (product,i) => product.id === action.payload.id ? 
                    {...product,
                        name: action.payload.name, 
                        about: action.payload.about,  
                        price: action.payload.price,
                        offerPrice: action.payload.offerPrice,
                        playStoreUrl: action.payload.playStoreUrl,
                        appStoreUrl: action.payload.appStoreUrl,
                    }
                    : product
                )
             }
         }
        default:
        return state;
    }
}