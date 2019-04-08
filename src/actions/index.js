import axios from '../axios'

export async function loginUser(credentials) {
    try {
        const response = await axios.post('/company/login', credentials)
        return {
            type:'USER_LOGIN',
            payload: response.data
        }
    } catch (error) {
        console.error(error)
        return {
            type:'USER_LOGIN_FAIL',
            payload: 'Please check your internet connection.'
        }
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
    const request = axios.get('http://localhost:3003/MyProfile')
    .then(response => response.data);
    return {
    type:'GET_MyProfile',
    payload:request
}
}


