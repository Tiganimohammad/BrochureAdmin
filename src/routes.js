import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import DashBoard from './components/DashBoard/DashBoard';


const Routes = () => {
    return (
       <Switch>
           <Route path="/" exact  component={LoginForm} />
           <Route path="/DashBoard" exact  component={DashBoard} />
       </Switch>
       );
};


export default Routes; 