import React,{Component} from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { loginUser } from '../../actions';


class Login extends Component {

    state = {
        email : '',
        password: ''
    }

    handleEmail = (event) =>{
        this.setState({
          email:event.target.value
        })
     }  
     handlePassword = (event) =>{
         this.setState({
             password:event.target.value
         })
     }
     SubmitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state));
   }

   componentWillReceiveProps(nextProps){
    if(nextProps.user.login.isAuth){
        localStorage.setItem('accesstoken',nextProps.user.login.accessToken);
        localStorage.setItem('c_Id',nextProps.user.login.companyId);
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
            <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email' 
              value={this.state.email}
              onChange={this.handleEmail}
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
  return {
        user:state.user
    }
}


export default connect(mapStateToProps)(Login);