import axios from "axios";
import { BACKEND_URL } from '../../config.js';
// import router from "@/router";

const instance = axios.create({
    baseURL: BACKEND_URL,
});

instance.interceptors.request.use((request) => {
    request.headers["Authorization"] = `Bearer ${localStorage.getItem('accessToken')}`;
    return request;
}, error => {
    return Promise.reject(error);
})

instance.interceptors.response.use((response) => {
    return response;
}, error => {

    if (error.response != null) {
        if (error.response.status == 401) {
            // const router = useRouter()
            // router.push({name: "login"});
        }
    }
    else{
        console.log(error.message)
    }
    return Promise.reject(error);
});

export default instance;