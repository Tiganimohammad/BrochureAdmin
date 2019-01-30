import axios from 'axios';

  
export function loginUser(phone,password){


    const req = axios.get('https://my-json-server.typicode.com/Tiganimohammad/test/posts/200') 
           .then(Response => Response.data)

    return{
        type:'USER_LOGIN',
        payload:req
    }
}    