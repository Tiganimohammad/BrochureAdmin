import React,{Component} from 'react';
import { Form,Button,TextArea,Image} from 'semantic-ui-react'



class AddProducts extends Component {
   

  render(){
  return(
    <div>
             <div>
             {/* <h1 className='ui center aligned header'>Add New Product</h1> */}
             <br/>
             <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium' floated='right' bordered/>
             <br/>
             <Form>
             <Form.Group unstackable widths={2}>
             <Form.Input label='Product Name' placeholder='Product Name' type='text' />
             <Form.Input label='Product Price' placeholder='Product Price' type='text'/>
             </Form.Group>
             <br/>
             <Form.Group widths={2}>  
             <TextArea  autoHeight placeholder='Product Sepcification' rows={2} />
             </Form.Group>
             <br/>
             <Button  color='green'>Add Product</Button> 
             <Button  color='purple'>Attach Product Photo</Button> 
             </Form>
             </div>
    </div>    
    );   
      }
}

export default AddProducts