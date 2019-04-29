import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import DashBoard from './components/DashBoard/DashBoard';


class  Routes extends Component {



    render(){
        let routes = (
            <Switch>
             <Route path="/" exact  component={LoginForm} /> 
             <Redirect to="/"/>  
            </Switch>
        );
        
        const token = localStorage.getItem('accesstoken');
        
        if(token){
            console.log('ok done')
            routes = (
           <Switch>
                  <Route path="/DashBoard" exact  component={DashBoard} />
                  <Redirect to="/DashBoard"/>
           </Switch>
            );
        }


        return (
            <div>
             {routes}
            </div>
        );
    }
  
};


export default Routes; 