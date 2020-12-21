import axios from 'axios';

const API_AUTH = "http://localhost:3001/api/auth";
const instance = axios.create({ baseURL: API_AUTH });

// axios.defaults.withCredentials = true;
// const headers = { withCredentials: true };

export async function doLogin({id,password}) {
    const result = await instance.post('/login',{id,password});
    return result.data
}

export async function doLogout(){
    const result = await instance.get('/logout');
    return result.data
}

export async function createAuth({id,password,name}) {
    // console.log(id);
    const result = await instance.post('/signup/create',{id,password,name});
    return result.data
}

export async function getMyInfo({userIdNum}){
    const result = await instance.get(`/myinfo/${userIdNum}`);
    return result.data
}


export async function postMyInfo({userIdNum,password,name}){
    //console.log(userIdNum,password,name);
    const result = await instance.post(`/myinfo/update/${userIdNum}`,{password,name});
    return result.data
}


export async function deleteMyInfo({userIdNum}){
    const result = await instance.get(`/myinfo/delete/${userIdNum}`);
    return result.data
}


export async function confirmId({id}){
    const result = await instance.post(`/signup/confirm/`, {id});
    return result.data
}



export default {
    doLogin,
    createAuth,
    getMyInfo,
    postMyInfo,
    deleteMyInfo,
    confirmId,
    doLogout,
}