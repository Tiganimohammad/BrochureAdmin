import React,{Component} from 'react';
import { Form,Image,Button,Header} from 'semantic-ui-react'
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
               <div ref={el => (this.componentRef = el)}>
               <Header size='huge'>{item.Company_Name}</Header>
               <Image src={item.Company_Qrcode} size='medium' floated='left' rounded />             
               </div>
             <Form.Group unstackable widths={2}>
             <Form.Input label='Company Name' placeholder='Company Name' type='text'  value={item.Company_Name}/>
             <Form.Input label='Company Address' placeholder='Company Address' type='text' value={item.Company_Address}/>
             </Form.Group>
             <Form.Group>
             <Form.Input label='Company PhoneNumber' placeholder='Company PhoneNumber' type='phone'
               value={item.Company_Phone_Number}
             />
             </Form.Group>
             <Form.Group unstackable widths={2}>
             <Form.Input label='Bussiness Hour From' placeholder='From' type='text' value={item.Bussiness_Hour_To}/>
             <Form.Input label='Bussiness Hour To' placeholder='To' type='text' value={item.Bussiness_Hour_From}/>
             </Form.Group>
             <Button  color='green'>Update MyProfile</Button> 
             <ReactToPrint
              trigger={() =><Button  color='pink'>Print Company QRCode</Button>}
              content={() => this.componentRef}
              />                      
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