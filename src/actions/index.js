import axios from 'axios'

export function loginUser(credentials) {
        const req = axios.post('http://89.163.221.56:8881/api/company/login', credentials)
        .then(response =>response.data)
        return {
            type:'USER_LOGIN',
            payload: req
        }
}


export function getProductsList(){
    const request = axios.get('http://localhost:3003/Productlist')
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


