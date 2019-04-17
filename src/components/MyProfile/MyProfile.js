import React,{Component} from 'react';
import { Form,Image,Button,Header,Modal,TextArea} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getMyProfile} from '../../actions';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
   

class MyProfile extends Component {
    state = {
      selectedfile : null
    }

  logoSelectedHandler = event =>{
    this.setState({
      selectedfile:event.target.files[0]
    });
  }   

  logoUploadHandler = event =>{
     let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accesstoken') 
      }
    };
    const fd = new FormData();
    fd.append('logo',this.state.selectedfile,this.state.selectedfile.name);
    axios.put('http://89.163.221.56:8881/api/company/logo',fd,axiosConfig)
    .then(res => {
    console.log(res);
    })   
 }

  componentWillMount(){
    this.props.dispatch(getMyProfile())
  }

  renderCompanyProfile = (CompanyProfile) =>(
  CompanyProfile.MyProfile?   
   <div>
             <Form> 
             <Image src={CompanyProfile.MyProfile.logo} size='medium' rounded/>
             <br/>
             <br/>
             <input type='file' onChange={this.logoSelectedHandler}/>
             <br/>  
             <br/> 
             <Button  color='yellow' onClick={this.logoUploadHandler}>Update Photo</Button> 
             <br/>
             <br/> 
             <Form.Group unstackable widths={2}>
             <Form.Input label='Company Name' icon='building outline' placeholder='Company Name' type='text'  value={CompanyProfile.MyProfile.name}/>
             <Form.Input label='Company Address' icon='address book' placeholder='Company Address' type='text' value={CompanyProfile.MyProfile.address}/>
             </Form.Group>
             <Form.Group>
      
             </Form.Group>
             <Form.Group unstackable widths={2}>
             <Form.Input label='Bussiness Hour From' icon='time' placeholder='From' type='time' value={CompanyProfile.MyProfile.opensAt}/>
             <Form.Input label='Bussiness Hour To' icon='time' placeholder='To' type='time' value={CompanyProfile.MyProfile.closesAt}/>
             <Form.Input label='Company PhoneNumber' icon='phone' placeholder='Company PhoneNumber' type='phone'
               value={CompanyProfile.MyProfile.phoneNumber}
             />
             </Form.Group>

             <Form.Group unstackable widths={2}>
             <Form.Input label='GooglePlayStore Link' icon='google play' placeholder='playStore link' type='text' value={CompanyProfile.MyProfile.playStoreUrl}/>
             <Form.Input label='AppleStore Link'  icon='apple' placeholder='applestore link' type='text'
               value={CompanyProfile.MyProfile.appStoreUrl}
             />
             <Form.Input label='Company Email' icon='mail' placeholder='company email' type='text'
               value={CompanyProfile.MyProfile.email}
             />
             </Form.Group>


             <Form.Group unstackable widths={3}>
                 <Form.TextArea 
                 placeholder='about company' 
                 value={CompanyProfile.MyProfile.about}
                 label="About Company"
                 />

             <Form.TextArea 
                 placeholder='service'
                 value={CompanyProfile.MyProfile.services}
                 label="Company Service"
                 />
             </Form.Group>


          
             <Button  color='green'>Update MyProfile</Button> 

               <Modal  centered={false} trigger={
               <Button floated='left' color='purple'>Display QRCODE</Button>
               }closeIcon>
    <Modal.Content image >
      <Modal.Description>
        <Form> 
        <div ref={el => (this.componentRef = el)}>
        <Header as='h1' textAlign='center'>{CompanyProfile.MyProfile.name}</Header>
          <Image  size='large' centered  src={CompanyProfile.MyProfile.qr} rounded/> 
        </div>   
          <Form.Group widths={1}> 
         {/* <ReactToPrint
          trigger={() => <Button type='submit' color='pink' fluid >Print Company QRCODE</Button>}
          content={() => this.componentRef}
         />  */}
         {/* <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => this.componentRef.current}
      /> */}
          </Form.Group> 
         </Form>
      </Modal.Description>
     </Modal.Content>
  </Modal>
              </Form>
              </div>
              :null 
)




render(){
    let CompanyProfile = this.props.MyProfile;
    return (   
      <div>
        {this.renderCompanyProfile(CompanyProfile)}
      </div> 
      )
 }


}

function  mapStateToProps (state){
  return {
    MyProfile:state.MyProfile
  }
}

export default connect(mapStateToProps)(MyProfile)