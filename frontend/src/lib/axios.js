import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:9001/api",
    withCredentials:true, //send cookie with the requests
})
