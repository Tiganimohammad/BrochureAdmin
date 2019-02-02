import axios from 'axios';

  
export function loginUser(phone,password){
    const req = axios.get('https://my-json-server.typicode.com/Tiganimohammad/test/posts/200') 
           .then(Response => Response.data)
    return{
        type:'USER_LOGIN',
        payload:req
    }
}    
  
export function getProductsList(){
    const request = axios.get('http://localhost:3000/Productlist')
    .then(response => response.data);
    return {
    type:'GET_ProductLists',
    payload:request
}
}