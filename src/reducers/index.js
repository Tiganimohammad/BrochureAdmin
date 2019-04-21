import {combineReducers} from 'redux';
import user from './user_reducer';
import productlist from './productlists';
import MyProfile from './myprofile_reducer';
import Product from './add_product';


const rootReducer = combineReducers({
  user,
  productlist,
  MyProfile,
  Product
});

export default rootReducer;