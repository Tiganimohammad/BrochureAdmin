import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from './components/Login/login';
import DashBoard from './components/DashBoard/DashBoard';


const Routes = () => {
    return (
       <Switch>
           <Route path="/" exact  component={Login} />
           <Route path="/DashBoard" exact  component={DashBoard} />
       </Switch>
       );
};


export default Routes; 