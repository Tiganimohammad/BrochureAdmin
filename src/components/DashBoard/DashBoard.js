import React,{Component} from 'react';
import {Container,Tab,Menu } from 'semantic-ui-react'
import MyProducts from '../MyProduct/MyProducts';
import MyProfile from '../MyProfile/MyProfile';
import AddProducts from '../AddProduct/AddProducts';


class DashBoard extends Component {
   
  
      render(){
        const panes = [
          { menuItem: 'My Profile', render: () => <Tab.Pane><MyProfile/></Tab.Pane> },
          { menuItem: 'Add Product', render: () => <Tab.Pane><AddProducts/></Tab.Pane> },
          { menuItem: 'My Products', render: () => <Tab.Pane><MyProducts/></Tab.Pane> },
        ]
          return(
            <div>
    <Container style={{paddingTop:20}} >
            <Menu>
    <Container>
      <Menu.Item as="h2" header>
             i-Brochures Admin
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item as="a" name="register">
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>  
  </Container>

  <Container style={{paddingTop:0.8 + 'em'}}>
     <Tab menu={{ fluid: true, vertical: true }} menuPosition='left' panes={panes} />
  </Container>

          </div>
          );
      }
}



export default DashBoard