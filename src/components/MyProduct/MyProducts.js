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
     console.log(this.props.productlist.productlist)
    return(
    <div>
      {this.props.productlist.productlist?
      this.props.productlist.productlist.Products.map( (item,i) => (
     <Item.Group key={i}>
       <Item>
        <Item.Image size='small' src={item.photo} rounded/>
        <Item.Content>
          <Item.Header>{item.name}</Item.Header>
          <Item.Meta>{item.about}</Item.Meta>
          <Modal centered={false} trigger={
            <Button floated='left' color='blue'>More Detailes</Button>
            } closeIcon>
      <Modal.Header>Product Detailes</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='large' src={item.photo} rounded/>
        <Modal.Description>
        <Form>
      <Form.Group  widths={1}>
        <Form.Input label='Product Name' placeholder='Product Name' value={item.name} />
        <Form.Input label='Product Price' placeholder='Product Price' value={item.price}/>
      </Form.Group>
      <Form.Group  widths={1}>
        <Form.Input label='PlayStoreLink' placeholder='Product PlayStoreLink' value={item.playStoreUrl} />
        <Form.Input label='AppleStoreLink' placeholder='Product AppleStoreLink' value={item.appStoreUrl}/>
      </Form.Group>
      <Form.Group  widths={1}>
        <Form.Input label='Product OfferPrice' placeholder='Product OfferPrice' value={item.offerPrice} />
      </Form.Group>
      <br/>
      <Form.Group widths={1}>
      <TextArea  autoHeight placeholder='Product Detailes' rows={10} value={item.about}/>
      </Form.Group>
      <br/>
      <Form.Group widths={2}>
      <Button type='submit' color='green'>Select Photo</Button>
      <Button type='submit' color='yellow'>Upload Photo</Button>
      <Button type='submit' color='blue'>Update Product</Button>
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
  return {
    productlist:state.productlist
  }
}

export default connect(mapStateToProps)(MyProducts)

