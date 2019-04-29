import React,{Component} from 'react';
import { Item,Button,Form,Image,Modal,TextArea,Header,Message} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getProductsList} from '../../actions';
import ReactToPrint from "react-to-print";
import axios from "axios";
import {UpdateProductProfile} from '../../actions';


class MyProducts extends Component {
   
     state = {
      selectedfile : null,
      uploadUrl:null,
      id:"",
      show:false,
      isImageUploaded:false,
      formdata:
      {
        name: null,
        about: null,
        price: null,
        offerPrice:null,
        playStoreUrl:null, 
        appStoreUrl:null ,
        photo:null
      }
     
     }

  
   saveUpdatedProduct =(e)=>{
    e.preventDefault()
    this.props.dispatch(UpdateProductProfile(this.state.formdata,this.state.id));
    this.setState({
      show:true
    })
  } 

   componentWillMount(){
     this.props.dispatch(getProductsList())
   }


  getProductId = (id) => {
    let productObj = {};
    let Updateproduct = this.props.productlist.productlist.Products;
    Updateproduct.forEach((item,i) => {
      if(item.id === id) {
        productObj = {
          name: item.name,
          about: item.about,
          price: item.price,
          offerPrice: item.offerPrice,
          playStoreUrl: item.playStoreUrl,
          appStoreUrl: item.appStoreUrl,
        }; 
        this.setState({ formdata: productObj, id: id ,show:false,isImageUploaded:false,
        selectedfile:""})
      }
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

   logoSelectedHandler = event =>{
    this.setState({
      selectedfile:URL.createObjectURL(event.target.files[0]),
      uploadUrl:event.target.files[0]
    });
  }   

  logoUploadHandler = event =>{
    event.preventDefault()
    console.log('id....'+this.state.id);

     let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accesstoken') 
      }
    };
    const pid = this.state.id;
    const fd = new FormData();
    fd.append('photo',this.state.uploadUrl,this.state.uploadUrl.name);
    axios.put(`http://89.163.221.56:8881/api/company/products/${pid}/photo`,fd,axiosConfig)
    .then(res => {
    console.log(res);
    this.setState({isImageUploaded:true});
    })   
 }


  
   render() {
   
    return(
      
    <div>
      {this.props.productlist.productlist ? 
      this.props.productlist.productlist.Products.map( (item,i) => (
     <Item.Group key={i}>
       <Item>
         <Item.Image size='small' src={item.photo} rounded/>
         
        <Item.Content>
          <Item.Header>{item.name}</Item.Header>
          <Item.Meta>{item.about}</Item.Meta>
          <Modal centered={false} trigger={
            <Button floated='left' color='blue'
            onClick={this.getProductId.bind(this,item.id)}
            >More Detailes</Button>
            } 
            closeIcon>
      <Modal.Header><center>Product Detailes</center></Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
        {
        this.state.selectedfile ?
        <Image src={this.state.selectedfile} size='medium' rounded centered/>
        :
        <Image src={item.photo} size='medium' rounded centered/>
        } 
             <br/>
             <br/>
             <input type='file' onChange={this.logoSelectedHandler}/>
             <br/>  
             <br/> 
             <Button  color='green' onClick={this.logoUploadHandler} fluid>Update Photo</Button> 
             <br/>
             <br/> 
            <Form>
            {
                <div>
                    {this.state.isImageUploaded?
                    <Message positive>
                    <Message.Header>
                       Logo Uploaded Successfully
                    </Message.Header>
                   </Message>
                    :null  
                    }
                </div>
        }
            <Form.Group  unstackable widths={1} centered>
           
        <Form.Input 
          label='Product Name' 
          placeholder='Product Name' 
          value={this.state.formdata.name}
          onChange={(event)=>this.handleInput(event,'name')}
          />
        <Form.Input 
         label='Product Price' 
         placeholder='Product Price' 
         value={this.state.formdata.price}
         onChange={(event)=>this.handleInput(event,'price')}
         />
      </Form.Group>
      <Form.Group  widths={1}>
        <Form.Input 
          label='PlayStoreLink' 
          placeholder='Product PlayStoreLink' 
          value={this.state.formdata.playStoreUrl}
          onChange={(event)=>this.handleInput(event,'playStoreUrl')}
          /> 
        <Form.Input 
          label='AppleStoreLink' 
          placeholder='Product AppleStoreLink' 
          value={this.state.formdata.appStoreUrl}
          onChange={(event)=>this.handleInput(event,'appStoreUrl')}
          />
  
      </Form.Group>  

      <Form.Group  widths={1}>
      <Form.Input 
          label='OfferPrice' 
          placeholder='Product OfferPrice' 
          value={this.state.formdata.offerPrice}
          onChange={(event)=>this.handleInput(event,'offerPrice')}
          />
      </Form.Group>   


      <br/>  
      <Form.Group widths={1}>
      <TextArea   placeholder='Product Detailes' rows={10} 
      value={this.state.formdata.about}
      onChange={(event)=>this.handleInput(event,'about')}
      />
      </Form.Group>
      <br/> 
      {
                <div>
                    {this.state.show?
                    <Message positive>
                    <Message.Header>
                       Product Updated Successfully
                    </Message.Header>
                   </Message>
                    :null  
                    }
                </div>
        }
      <br/> 
      <Form.Group widths={2}>
      <Button type='submit' color='blue' fluid 
        onClick={this.saveUpdatedProduct}>Update Product</Button>
      </Form.Group>
    </Form>
        </Modal.Description>
       </Modal.Content>
    </Modal>
  
  
    <Modal  centered={false} trigger={
          <Button floated='left' color='purple'>Display QRCODE</Button>
        } closeIcon>
      <Modal.Content image>
        <Modal.Description>
          <Form> 
          <div ref={el => (this.componentRef = el)}>
          <Header as='h1' textAlign='center'>{item.name}</Header>
            <Image  size='large' centered  src={item.qr} rounded/> 
          </div>   
            <Form.Group widths={1}> 
           <ReactToPrint
            trigger={() => <Button type='submit' color='pink' fluid >Print Product QRCODE</Button>}
            content={() => this.componentRef}
           />
            </Form.Group> 
          </Form>
        </Modal.Description>
       </Modal.Content>
    </Modal>
        </Item.Content>
      </Item> 
     </Item.Group> 
      )):null
      }
    </div>
    );
        }
  }

   

function  mapStateToProps (state){
  console.log(state);
  return {
    productlist:state.productlist
  }
}

export default connect(mapStateToProps)(MyProducts)

