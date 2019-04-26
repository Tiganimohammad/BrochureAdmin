import React,{Component} from 'react';
import { Form,Button,Image,TextArea,Input} from 'semantic-ui-react'
import {addProduct} from '../../actions';
import {connect} from 'react-redux';


class AddProducts extends Component {
   
  state = {
      productimage : "",
      productname:"",
      productprice:"",
      productofferprice:"",
      productplaylink:"",
      productapplelink:"",
      productabout:"",
      uploadUrl:null,
      errors:{}
  }
            
logoSelectedHandler = event =>{
  this.setState({
    productimage:URL.createObjectURL(event.target.files[0]),
    uploadUrl:event.target.files[0]
  });
} 

    handleChange = (e) =>{
      if(!!this.state.errors[e.target.name])
      {
        let errors = Object.assign({},this.state.errors);
        delete errors[e.target.name]
        this.setState({
          [e.target.name]:e.target.value,errors
        })
      }else{
        this.setState({
          [e.target.name]:e.target.value
        })
      }
     
    }
    

    handleSubmit = (e) =>{
       e.preventDefault();
       const errors = this.validate();
       this.setState({errors});
       const isValid = Object.keys(errors).length === 0;
       if(isValid){
       const fd = new FormData();
       fd.append('photo',this.state.uploadUrl,this.state.uploadUrl.name)
       fd.append('name',this.state.productname);
       fd.append('price',this.state.productprice);
       fd.append('offerPrice',this.state.productofferprice);
       fd.append('playStoreUrl',this.state.productplaylink);
       fd.append('appStoreUrl',this.state.productapplelink);
       fd.append('about',this.state.productabout);
       this.props.dispatch(addProduct(fd));
       }
  }

      validate = () =>{
        const errors = {};
        if(this.state.productname === '') errors.productname = "Product Name Cant Be Empty";
        if(this.state.productprice === '') errors.productprice = "Product Price Cant Be Empty";
        if(this.state.productofferprice === '') errors.productofferprice = "Product offerPrice Cant Be Empty";
        if(this.state.productplaylink === '') errors.productplaylink = "Product PlayLink Cant Be Empty";
        if(this.state.productapplelink === '') errors.productapplelink = "Product AppleLink Cant Be Empty";
        if(this.state.productabout === '') errors.productabout = "About Product Cant Be Empty";
        return errors; 
      }

  render(){
    const {errors} = this.state;  
  return(
    <div>
             <Form onSubmit={this.handleSubmit}>

             <Image src={this.state.productimage} size='medium' centered rounded/>
             <br/>
             <br/>
             <input type='file' onChange={this.logoSelectedHandler}/>
            
             <Form.Group widths='equal'>
               
             </Form.Group >
             <Form.Field error={!!errors.productname}>
             <label>Product Name</label>
             <Input 
             icon='product hunt' 
             placeholder='Enter Product Name' 
             type='text' 
             id='productname'
             name='productname'
             defaultValue={this.state.productname}
             onChange={this.handleChange}
             />  
             </Form.Field>
             <span style={{color:"#ae5856"}}>
            {errors.productname && errors.productname}
            </span> 
              
                         
             <Form.Field error={!!errors.productprice}>
             <div>
             <label>Product Price</label>
             <Input 
             icon='money bill alternate' 
             placeholder='Enter Product Price' 
             type='text'
             id="productprice" 
             name="productprice"
             defaultValue={this.state.productprice}
             onChange={this.handleChange}
             />
            <span style={{color:"#ae5856"}}>
            {errors.productprice && errors.productprice}
            </span>               
            </div>
             </Form.Field>
            
             
             <Form.Field error={!!errors.productofferprice}>
               <label>Product OfferPrice</label>
              <Input 
              icon='tag' 
              placeholder='Enter Product OfferPrice' 
              type='text'
              id="productofferprice"
              name="productofferprice"
              defaultValue={this.state.productofferprice}
              onChange={this.handleChange}
              />
            <span style={{color:"#ae5856"}}>
            {errors.productofferprice && errors.productofferprice}
            </span>                 
             </Form.Field>
            

             <Form.Field error={!!errors.productplaylink}>
               <label>Product playstore link</label>
             <Input 
             icon='google play' 
             placeholder='Enter product playstore link' 
             type='text'
             id="productplaylink"
             name="productplaylink"
             defaultValue={this.state.productplaylink}
             onChange={this.handleChange}
             />
            <span style={{color:"#ae5856"}}>
            {errors.productplaylink && errors.productplaylink}
            </span>   
             </Form.Field>
             
             
             <Form.Field error={!!errors.productapplelink}>
             <label>Product AppleStore Link</label>
             <Input 
             icon='apple' 
             placeholder='Enter Product appleStore link' 
             type='text'
             id="productapplelink"
             name="productapplelink"
             defaultValue={this.state.productapplelink}
             onChange={this.handleChange}
             />
            <span style={{color:"#ae5856"}}>
            {errors.productapplelink && errors.productapplelink}
            </span>                
             </Form.Field>
            
             <Form.Field error={!!errors.productabout}>
             <label>About Product</label>
             <TextArea  
             autoHeight 
             placeholder='Enter About Product' rows={2} 
             id="productabout"
             name="productabout"
             defaultValue={this.state.productabout}
             onChange={this.handleChange}
             />
              <span style={{color:"#ae5856"}}>
            {errors.productabout && errors.productabout}
            </span>
             </Form.Field>
             <Button  fluid color='green'>Save Product</Button> 
             </Form>
    </div>    
    );   
      }
}


function  mapStateToProps (state){
  console.log(state);
  return {
    Product:state.Product
  }
}

export default connect(mapStateToProps)(AddProducts) 