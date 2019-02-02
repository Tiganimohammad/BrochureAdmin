import React,{Component} from 'react';
import { Form,Image,Button } from 'semantic-ui-react'

class MyProfile extends Component {
   
 
  
  render(){
          return(
          <div>
             <br/>
             <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium' floated='right' bordered/>
             <br/>
             <div>
             <Form>   
             <Form.Group unstackable widths={2}>
             <Form.Input label='Company Name' placeholder='Company Name' type='text' />
             <Form.Input label='Company Address' placeholder='Company Address' type='text'/>
             </Form.Group>
             <Form.Group>
             <Form.Input label='Company PhoneNumber' placeholder='Company PhoneNumber' type='phone'/>
             </Form.Group>
             <br/>
             <Form.Group unstackable widths={2}>
             <Form.Input label='Bussiness Hour From' placeholder='From' type='time' />
             <Form.Input label='Bussiness Hour To' placeholder='To' type='time' />
             </Form.Group>
             <br/>
             <Button  color='green'>Update MyProfile</Button> 
             <Button  color='pink'>Print Company QRCode</Button>                       
             </Form>
             </div>
    </div>    
    );
      }
}



export default MyProfile