import React,{Component} from 'react';
import { Item,Button,Form,Image,Modal,TextArea} from 'semantic-ui-react'



class MyProducts extends Component {
   
  
  render(){
  return(
  <div>
    <Item.Group>
    <Item>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
      <Item.Content>
        <Item.Header as='a'>Product 1</Item.Header>
        <Item.Meta>Description</Item.Meta>
         <Item.Extra>
          <Button floated='left' color='blue'>More Detailes</Button>
         </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
      <Item.Content>
        <Item.Header as='a'>Product 2</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Extra>
        <Modal trigger={<Item.Extra>
          <Button floated='left' color='blue'>More Detailes</Button>
          </Item.Extra>} closeIcon>
    <Modal.Header>Product Detailes</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
      <Modal.Description>
      <Form>
    <Form.Group  widths={1}>
      <Form.Input label='Product Name' placeholder='Product Name' />
      <Form.Input label='Product Price' placeholder='Product Price' />
    </Form.Group>
    <br/>
    <Form.Group widths={1}>
    <TextArea  autoHeight placeholder='Product Sepcification' rows={2} />
    </Form.Group>
    <br/>
    <Button type='submit' color='green'>Update Product</Button>
    <Button type='submit' color='brown'>Print Product QR</Button>  
  </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
      </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
            </div>
          );
      }
}



export default MyProducts