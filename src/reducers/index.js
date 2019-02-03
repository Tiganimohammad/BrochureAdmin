import {combineReducers} from 'redux';
import user from './user_reducer';
import productlist from './productlists';
import MyProfile from './myprofile_reducer';


const rootReducer = combineReducers({
  user,
  productlist,
  MyProfile
});

export default rootReducer;