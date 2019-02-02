import React,{Component} from 'react';
import { Item,Button,Form,Image,Modal,TextArea,Header} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getProductsList} from '../../actions';
import ReactToPrint from "react-to-print";




class MyProducts extends Component {
   
   componentWillMount(){
     this.props.dispatch(getProductsList())
   }

  
  render() {
  return(
  <div>
    {this.props.productlist.productlist && this.props.productlist.productlist.length > 0 ?
    this.props.productlist.productlist.map( (item,i) => (
   <Item.Group key={i}>
     <Item>
      <Item.Image size='small' src={item.product_image} rounded/>
      <Item.Content>
        <Item.Header>{item.product_name}</Item.Header>
        <Item.Meta>{item.product_detailes}</Item.Meta>
        <Modal centered={false} trigger={
          <Button floated='left' color='blue'>More Detailes</Button>
          } closeIcon>
    <Modal.Header>Product Detailes</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='large' src={item.product_image} rounded/>
      <Modal.Description>
      <Form>
    <Form.Group  widths={1}>
      <Form.Input label='Product Name' placeholder='Product Name' value={item.product_name} />
      <Form.Input label='Product Price' placeholder='Product Price' value={item.product_price}/>
    </Form.Group>
    <br/>
    <Form.Group widths={1}>
    <TextArea  autoHeight placeholder='Product Detailes' rows={10} value={item.product_detailes}/>
    </Form.Group>
    <br/>
    <Form.Group widths={1}>
    <Button type='submit' color='green'>Update Data</Button>
    <Button type='submit' color='yellow'>Update Photo</Button>
    </Form.Group>
  </Form>
      </Modal.Description>
     </Modal.Content>
  </Modal>


  <Modal  centered={false} trigger={
        <Button floated='left' color='purple'>Display QRCODE</Button>
      } closeIcon>
    <Modal.Content image >
      <Modal.Description>
        <Form> 
        <div ref={el => (this.componentRef = el)}>
        <Header as='h1' textAlign='center'>{item.product_name}</Header>
          <Image  size='large' centered  src={item.product_Qrcode} rounded/> 
        </div>   
          <Form.Group widths={1}> 
         <ReactToPrint
          trigger={() => <Button type='submit' color='pink' fluid >Print</Button>}
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
  return {
    productlist:state.productlist
  }
}

export default connect(mapStateToProps)(MyProducts)

