import axios from 'axios'


export function loginUser(credentials, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://89.163.221.56:8881/api/company/login',credentials);
      dispatch({ type: 'USER_LOGIN'});
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

export function UpdateCompanyProfile(data){
  console.log('data........'+data);
  let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accesstoken') 
      }
    };
  const request = axios.put('http://89.163.221.56:8881/api/company',data,axiosConfig)
  .then(response =>response.data);
  return {
  type:'Update_MyProfile',
  payload:request
}
}
 
export function UpdateProductProfile(data,pid){
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accesstoken') 
    }
  };
  const request = axios.put(`http://89.163.221.56:8881/api/company/products/${pid}`,data,axiosConfig)
  .then(response =>response.data);
  return {
  type:'Update_Product',
  payload:request
}
}
