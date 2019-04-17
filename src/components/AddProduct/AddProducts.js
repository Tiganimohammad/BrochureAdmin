import React,{Component} from 'react';
import { Form,Button,Image,TextArea,Input} from 'semantic-ui-react'
import classnames from 'classnames';


class AddProducts extends Component {
   
  state = {
    productimage : '',
    productname:'',
    productprice:'',
    productofferprice:'',
    productplaylink:'',
    productapplelink:'',
    productabout:'',
    errors:{}
  }

logoSelectedHandler = event =>{
  this.setState({
    productimage:event.target.files[0]
  });
} 

    handleChange = (e) =>{
     if(!!this.state.errors[e.target.name]){
      let errors = Object.assign({},this.state.errors);
      delete errors[e.target.name]; 
      this.setState({[e.target.name] : e.target.value,errors});
     }else{
       this.setState({[e.target.name] : e.target.value})
     } 
    }
    

    handleSubmit = (e) =>{
       e.preventDefault();
       
    }

  render(){
  return(
    <div>
             <Form onSubmit={this.handleSubmit}>

             <Image src={this.state.productimage} size='medium' centered rounded/>
             <input type='file' onChange={this.logoSelectedHandler}/>
            
             <Form.Group widths='equal'>
               
             </Form.Group>
            <div className={classnames('field',{error:!!this.state.errors.productname})}>
             <Form.Field>
             <label>Product Name</label>
             <Input 
             icon='product hunt' 
             placeholder='Enter Product Name' 
             type='text' 
             id='name'
             name='name'
             defaultvalue={this.state.productname}
             onchange={this.handleChange}
             />  
             </Form.Field>
             <span>{this.state.errors.productname}</span>
             </div>
              
                         
             <Form.Field>
             <div className={classnames('field',{error:!!this.state.errors.productprice})}>
             <label>Product Price</label>
             <Input 
             icon='money bill alternate' 
             placeholder='Enter Product Price' 
             type='text'
             id="price"
             name="price"
             defaultvalue={this.state.productprice}
             onChange={this.handleChange}
             />
             <span>{this.state.errors.productprice}</span>
             </div>
             </Form.Field>
            
             
             <Form.Field>
               <div className={classnames('field',{error:!!this.state.errors.productofferprice})}>
               <label>Product OfferPrice</label>
              <Input 
              icon='tag' 
              placeholder='Enter Product OfferPrice' 
              type='text'
              id="offerprice"
              name="offerprice"
              defaultvalue={this.state.productofferprice}
              onChange={this.handleChange}
              />
              <span>{this.state.errors.productofferprice}</span>
               </div>
             </Form.Field>
            

             <Form.Field>
               <div className={classnames('field',{error:!!this.state.errors.productplaylink})}>
               <label>Product playstore link</label>
             <Input 
             icon='google play' 
             placeholder='Enter product playstore link' 
             type='text'
             id="playstorelink"
             name="playstorelink"
             defaultvalue={this.state.productplaylink}
             onChange={this.handleChange}
             />
             <span>{this.state.errors.productplaylink}</span>
               </div>
             </Form.Field>
             
             
             <Form.Field>
             <div className={classnames('field',{error:!!this.state.errors.productapplelink})}>
             <label>Product AppleStore Link</label>
             <Input 
             icon='apple' 
             placeholder='Enter Product appleStore link' 
             type='text'
             id="applestore"
             name="applestore"
             defaultvalue={this.state.productapplelink}
             onChange={this.handleChange}
             />
            <span>{this.state.errors.productapplelink}</span>
                </div>
             </Form.Field>
            
             <Form.Field>
             <div className={classnames('field',{error:!!this.state.errors.productabout})}>
             <label>About Product</label>
             <TextArea  
             autoHeight 
             placeholder='Enter About Product' rows={2} 
             id="aboutproduct"
             name="aboutproduct"
             defaultvalue={this.state.productabout}
             onChange={this.handleChange}
             />
              <span>{this.state.errors.productabout}</span>
                </div>
             </Form.Field>
             <Button  fluid color='green'>Save Product</Button> 
             </Form>
    </div>    
    );   
      }
}

export default AddProducts