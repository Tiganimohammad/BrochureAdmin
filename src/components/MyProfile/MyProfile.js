import React,{PureComponent} from 'react';
import { Form,Image,Button,Header,Modal} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getMyProfile,UpdateCompanyProfile} from '../../actions';
// import ReactToPrint from 'react-to-print';
import axios from 'axios';
   

class MyProfile extends PureComponent {
    state = {
      selectedfile : null,
      uploadUrl:null,
      formdata :{
        name:'',
        address:'',
        opensAt:'',
        closesAt:'',
        phoneNumber:'',
        playStoreUrl:'',
        appStoreUrl:'',
        email:'',
        about:'',
        services:'',
        logo:'',
        qr:''
      }
    }


  logoSelectedHandler = event =>{
    this.setState({
      selectedfile:URL.createObjectURL(event.target.files[0]),
      uploadUrl:event.target.files[0]
    });
    console.log(this.state.selectedfile);
  }   

  logoUploadHandler = event =>{
     let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accesstoken') 
      }
    };
    const fd = new FormData();
    fd.append('logo',this.state.uploadUrl,this.state.uploadUrl.name);
    axios.put('http://89.163.221.56:8881/api/company/logo',fd,axiosConfig)
    .then(res => {
    console.log(res);
    })   
 }

   handleInput = (event,name) =>{
        const newFormdata = {
          ...this.state.formdata
        }
        newFormdata[name] = event.target.value
        this.setState({
            formdata:newFormdata
        })
   }

   onSubmit =(e)=>{
     e.preventDefault()
     this.props.dispatch(UpdateCompanyProfile(this.state.formdata));
   }
    

  componentWillMount(){
    this.props.dispatch(getMyProfile())
  }

  componentWillReceiveProps(nextProps){
     let companyProfile = nextProps.MyProfile.MyProfile;
     this.setState({
         formdata:{
          name:companyProfile.name,
          address:companyProfile.address,
          opensAt:companyProfile.opensAt,
          closesAt:companyProfile.closesAt,
          phoneNumber:companyProfile.phoneNumber,
          playStoreUrl:companyProfile.playStoreUrl,
          appStoreUrl:companyProfile.appStoreUrl,
          email:companyProfile.email,
          about:companyProfile.about,
          services:companyProfile.services,
          logo:companyProfile.logo,
          qr:companyProfile.qr
         }
     })
  }

render(){
    console.log(this.props);
    return (   
      <div>
         <Form  onSubmit={this.onSubmit}> 
               {
                 this.state.selectedfile ?
                 <Image src={this.state.selectedfile} size='medium' rounded/>
                 :
                 <Image src={this.state.formdata.logo} size='medium' rounded/>
               } 
             <br/>
             <br/>
             <input type='file' onChange={this.logoSelectedHandler}/>
             <br/>  
             <br/> 
             <Button  color='yellow' onClick={this.logoUploadHandler}>Update Photo</Button> 
             <br/>
             <br/> 
             <Form.Group unstackable widths={2}>
             
             <Form.Input 
               label='Company Name' 
               icon='building outline' 
               placeholder='Company Name' 
               type='text'  
               value={this.state.formdata.name}
               onChange={(event)=>this.handleInput(event,'name')}
               />

             <Form.Input 
              label='Company Address' 
              icon='address book' 
              placeholder='Company Address' 
              type='text' 
              value={this.state.formdata.address}
              onChange={(event)=>this.handleInput(event,'address')}

              />

             </Form.Group>
             <Form.Group>
      
             </Form.Group>
             <Form.Group unstackable widths={2}>
             <Form.Input 
               label='Bussiness Hour From' 
               icon='time' 
               placeholder='From' 
               type='time' 
               value={this.state.formdata.opensAt}
               onChange={(event)=>this.handleInput(event,'opensAt')}

               />

             <Form.Input 
               label='Bussiness Hour To' 
               icon='time' 
               placeholder='To' 
               type='time' 
               value={this.state.formdata.closesAt}
               onChange={(event)=>this.handleInput(event,'closesAt')}

               />

             <Form.Input 
               label='Company PhoneNumber' 
               icon='phone' 
               placeholder='Company PhoneNumber' 
               type='phone'
               value={this.state.formdata.phoneNumber}
               onChange={(event)=>this.handleInput(event,'phoneNumber')}
               />
             </Form.Group>

             <Form.Group unstackable widths={2}>
             <Form.Input 
               label='GooglePlayStore Link' 
               icon='google play' 
               placeholder='playStore link' 
               type='text' 
               value={this.state.formdata.playStoreUrl}
               onChange={(event)=>this.handleInput(event,'playStoreUrl')}
               />

             <Form.Input 
               label='AppleStore Link'  
               icon='apple' 
               placeholder='applestore link' 
               type='text'
               value={this.state.formdata.appStoreUrl}
               onChange={(event)=>this.handleInput(event,'appStoreUrl')}
             />

             <Form.Input 
               label='Company Email' 
               icon='mail' 
               placeholder='company email' 
               type='text'
               value={this.state.formdata.email}
               onChange={(event)=>this.handleInput(event,'email')}
             />

             </Form.Group>


             <Form.Group unstackable widths={3}>
                 <Form.TextArea 
                 placeholder='about company' 
                 value={this.state.formdata.about}
                 onChange={(event)=>this.handleInput(event,'about')}
                 label="About Company"
                 />

             <Form.TextArea 
                 placeholder='service'
                 value={this.state.formdata.services}
                 onChange={(event)=>this.handleInput(event,'services')}
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
         <Header as='h1' textAlign='center'>{this.state.formdata.name}</Header>
          <Image  size='large' centered  src={this.state.formdata.qr} rounded/>  
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
      )
 }


}

function  mapStateToProps (state){
  return {
    MyProfile:state.MyProfile
  }
}

export default connect(mapStateToProps)(MyProfile) 