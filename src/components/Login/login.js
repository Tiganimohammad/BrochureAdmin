import React,{Component} from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {loginUser} from '../../actions';


class Login extends Component {

    state = {
        phone : '',
        password: ''
    }

    handlePhone = (event) =>{
        this.setState({
            phone:event.target.value
        })
     }  
     handlePassword = (event) =>{
         this.setState({
             password:event.target.value
         })
     }
     SubmitForm = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.dispatch(loginUser(this.state));
   }

   componentWillReceiveProps(nextProps){
    if(nextProps.user.login.isAuth){
        this.props.history.push('/DashBoard');
    }
}
    render (){   
        return(
     <div className='login-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        {
         <Header as='h2' color='blue' textAlign='center'>
           Log-in To Your Account
        </Header> 
        }
        <Form size='large'  onSubmit={this.SubmitForm}>
          <Segment raised>
            <Form.Input fluid icon='phone' iconPosition='left' placeholder='PhoneNumber' 
              value={this.state.phone}
              onChange={this.handlePhone}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={this.state.password}
              onChange={this.handlePassword}
            />

            <Button type="submit" color='blue' fluid size='medium'>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
         </div>
        );
    }   
}

function mapStateToProps (state){
  console.log(state);
    return {
        user:state.user
    }
}


export default connect(mapStateToProps)(Login);