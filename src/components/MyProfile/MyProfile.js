import React,{Component} from 'react';
import { Form,Image,Button,Header,Modal} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getMyProfile} from '../../actions';
import ReactToPrint from "react-to-print";



class MyProfile extends Component {
   
  componentWillMount(){
    this.props.dispatch(getMyProfile())
  }

  
  render(){
          return(
          <div>
             {
              this.props.MyProfile.MyProfile && this.props.MyProfile.MyProfile.length > 0 ?  
              this.props.MyProfile.MyProfile.map( (item,i) => ( 
             <div key={i}>                
             <Form> 
             <Form.Group unstackable widths={2}>
             <Form.Input label='Company Name' placeholder='Company Name' type='text'  value={item.Company_Name}/>
             <Form.Input label='Company Address' placeholder='Company Address' type='text' value={item.Company_Address}/>
             </Form.Group>
             <Form.Group>
           
             </Form.Group>
             <Form.Group unstackable widths={2}>
             <Form.Input label='Bussiness Hour From' placeholder='From' type='text' value={item.Bussiness_Hour_To}/>
             <Form.Input label='Bussiness Hour To' placeholder='To' type='text' value={item.Bussiness_Hour_From}/>
             <Form.Input label='Company PhoneNumber' placeholder='Company PhoneNumber' type='phone'
               value={item.Company_Phone_Number}
             />
             </Form.Group>
             <Button  color='green'>Update MyProfile</Button> 

               <Modal  centered={false} trigger={
        <Button floated='left' color='purple'>Display QRCODE</Button>
      } closeIcon>
    <Modal.Content image >
      <Modal.Description>
        <Form> 
        <div ref={el => (this.componentRef = el)}>
        <Header as='h1' textAlign='center'>{item.Company_Name}</Header>
          <Image  size='large' centered  src={item.Company_Qrcode} rounded/> 
        </div>   
          <Form.Group widths={1}> 
         <ReactToPrint
          trigger={() => <Button type='submit' color='pink' fluid >Print Company QRCODE</Button>}
          content={() => this.componentRef}
         />
          </Form.Group> 
         </Form>
      </Modal.Description>
     </Modal.Content>
  </Modal>
              </Form>
              </div>
              )) : null
            }
        </div>   
    );
      
}
}

function  mapStateToProps (state){
  return {
    MyProfile:state.MyProfile
  }
}

export default connect(mapStateToProps)(MyProfile)