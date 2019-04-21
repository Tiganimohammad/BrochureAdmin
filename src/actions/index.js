import axios from 'axios'








export function loginUser(credentials, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://89.163.221.56:8881/api/company/login',credentials);
      dispatch({ type: 'USER_LOGIN' });
      localStorage.setItem('accesstoken',res.data.accessToken);
      localStorage.setItem('c_Id',res.data.companyId);
      history.push('/DashBoard');
    } catch(error) {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload: 'Invalid email or password'
      });   
    }   
  };
}


// export const loginUser = (credentials) => {
//     return dispatch => {
//         axios.post('http://89.163.221.56:8881/api/company/login',credentials)
//         .then((response)=>{
//             dispatch({
//                 type: 'USER_LOGIN',
//                 payload: response
//             })
//         })
//         .catch((error)=>{
//             console.log("error"+error);
//         })
//     };
// };


// export const loginUser =(credentials) =>{
//     console.log(credentials);
//     return dispatch => {
//         axios.post('http://89.163.221.56:8881/api/company/login',credentials)
//         .then((response)=>{
//             dispatch({
//                 type: 'USER_LOGIN',
//                 payload: response.data
//             })
//         })
//         .catch((error)=>{
//             console.log("error"+error);
//             dispatch({
//                 type: 'USER_LOGIN_FAIL',
//                 payload: 'Invalid Email Or Password'
//             })
//         })
//     };      
// } 

// export async function loginUser(credentials) {
//     try {
//         const response = await axios.post('http://89.163.221.56:8881/api/company/login', credentials)
//         return {
//             type:'USER_LOGIN',
//             payload: response.data
//         }
//     } catch (error) { 
//         console.error(error)
//         return {
//             type:'USER_LOGIN_FAIL',
//             payload: error.data
//         }
//     }

// }

export function getProductsList(){
    const cid = localStorage.getItem('c_Id')
    const request = axios.get(`http://89.163.221.56:8881/api/companies/${cid}`)
    .then(response => response.data);
    return {
    type:'GET_ProductLists',
    payload:request
}
}

export function getMyProfile(){
    const cid = localStorage.getItem('c_Id')
    const request = axios.get(`http://89.163.221.56:8881/api/companies/${cid}`)
    .then(response =>response.data);
    return {
    type:'GET_MyProfile',
    payload:request
}
}


export function addProduct(productInfo){
    let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accesstoken') 
        }
      };
    const request = axios.post('http://89.163.221.56:8881/api/company/products',productInfo,axiosConfig)
    .then(response =>response.data);
    return {
    type:'ADD_PRODUCT',
    payload:request
}
}


