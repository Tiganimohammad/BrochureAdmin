import React,{PureComponent} from 'react';
import { Form,Image,Button,Header,Modal} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getMyProfile} from '../../actions';
// import ReactToPrint from 'react-to-print';
import axios from 'axios';
   

class MyProfile extends PureComponent {
    state = {
      selectedfile : null,
      uploadUrl:null,
      formdata :{
        companyname:'',
        companyaddress:'',
        companybussinessfrom:'',
        companybussinessto:'',
        companyphonenumber:'',
        companyplaystorelink:'',
        companyapplestorelink:'',
        companyemail:'',
        aboutcompany:'',
        companyservice:'',
        companylogo:'',
        companyqr:''
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
     console.log(this.state.formdata)
   }


  componentWillMount(){
    this.props.dispatch(getMyProfile())
  }

  componentWillReceiveProps(nextProps){
     let companyProfile = nextProps.MyProfile.MyProfile;
     this.setState({
         formdata:{
          companyname:companyProfile.name,
          companyaddress:companyProfile.address,
          companybussinessfrom:companyProfile.opensAt,
          companybussinessto:companyProfile.closesAt,
          companyphonenumber:companyProfile.phoneNumber,
          companyplaystorelink:companyProfile.playStoreUrl,
          companyapplestorelink:companyProfile.appStoreUrl,
          companyemail:companyProfile.email,
          aboutcompany:companyProfile.about,
          companyservice:companyProfile.services,
          companylogo:companyProfile.logo,
          companyqr:companyProfile.qr
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
                 <Image src={this.state.formdata.companylogo} size='medium' rounded/>
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
               value={this.state.formdata.companyname}
               onChange={(event)=>this.handleInput(event,'companyname')}
               />

             <Form.Input 
              label='Company Address' 
              icon='address book' 
              placeholder='Company Address' 
              type='text' 
              value={this.state.formdata.companyaddress}
              onChange={(event)=>this.handleInput(event,'companyaddress')}

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
               value={this.state.formdata.companybussinessfrom}
               onChange={(event)=>this.handleInput(event,'companybussinessfrom')}

               />

             <Form.Input 
               label='Bussiness Hour To' 
               icon='time' 
               placeholder='To' 
               type='time' 
               value={this.state.formdata.companybussinessto}
               onChange={(event)=>this.handleInput(event,'companybussinessto')}

               />

             <Form.Input 
               label='Company PhoneNumber' 
               icon='phone' 
               placeholder='Company PhoneNumber' 
               type='phone'
               value={this.state.formdata.companyphonenumber}
               onChange={(event)=>this.handleInput(event,'companyphonenumber')}
               />
             </Form.Group>

             <Form.Group unstackable widths={2}>
             <Form.Input 
               label='GooglePlayStore Link' 
               icon='google play' 
               placeholder='playStore link' 
               type='text' 
               value={this.state.formdata.companyplaystorelink}
               onChange={(event)=>this.handleInput(event,'companyplaystorelink')}
               />

             <Form.Input 
               label='AppleStore Link'  
               icon='apple' 
               placeholder='applestore link' 
               type='text'
               value={this.state.formdata.companyapplestorelink}
               onChange={(event)=>this.handleInput(event,'companyapplestorelink')}
             />

             <Form.Input 
               label='Company Email' 
               icon='mail' 
               placeholder='company email' 
               type='text'
               value={this.state.formdata.companyemail}
               onChange={(event)=>this.handleInput(event,'companyemail')}
             />

             </Form.Group>


             <Form.Group unstackable widths={3}>
                 <Form.TextArea 
                 placeholder='about company' 
                 value={this.state.formdata.aboutcompany}
                 onChange={(event)=>this.handleInput(event,'aboutcompany')}
                 label="About Company"
                 />

             <Form.TextArea 
                 placeholder='service'
                 value={this.state.formdata.companyservice}
                 onChange={(event)=>this.handleInput(event,'companyservice')}
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
         <Header as='h1' textAlign='center'>{this.state.formdata.companyname}</Header>
          <Image  size='large' centered  src={this.state.formdata.companyqr} rounded/>  
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