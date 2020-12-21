import axios from 'axios';

const API_RECORD = "http://localhost:3001/api/record";
const instance = axios.create({ baseURL:API_RECORD });


export async function createRecord({title,date,time,treatInfo, userIdNum}) {
    const result = await instance.post('/create',{title,date,time,treatInfo, userIdNum});
    return result.data
}


export async function readRecord({id}) {
    const result = await instance.get(`/read/${id}`);
    return result.data
}


export async function updateRecord({id,title,date,time,treatInfo}) {
    const result = await instance.post(`/update/${id}`,{title,date,time,treatInfo});
    return result.data
}


export async function deleteRecord({id}) {
    const result = await instance.get(`/delete/${id}`);
    return result.data
}



export async function contentSearch({userIdNum,queryName}) {
    const result = await instance.get(`/search/content/${userIdNum}/${queryName}`);
    return result.data
}



export async function nameSearch({userIdNum,queryName}){
    const result = await instance.get(`/search/name/${userIdNum}/${queryName}`);
    return result.data
}

export default {
    createRecord,
    readRecord,
    updateRecord,
    deleteRecord,
    contentSearch,
    nameSearch,
}