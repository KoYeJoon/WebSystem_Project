import axios from 'axios';

const API_DEFAULT = "http://localhost:3001/api/";
const instance = axios.create({ baseURL: API_DEFAULT });



export async function getAllRecordList({userIdNum}) {
    const result = await instance.get(`/recordlist/${userIdNum}`);
    return result.data
}


export async function getTodoList({userIdNum,today}){
    const result = await instance.get(`/todolist/read/${userIdNum}/${today}`);
    return result.data
}

export default {
    getAllRecordList,
    getTodoList,
}