import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:3000/api/user/v1",
    headers: {
        'authorization': localStorage.getItem('token')
    }
})

export const allFollowers = () => API.get("/allFollower");
export const signup = (data) => API.post("/auth/signup", data)
export const signin = (data) => API.post("/auth/signup", data)
export const user = (data) => API.get(`/me/${data._id}`);
export const posts = () => API.get('/feed');
export const allUsers = () => API.get('/allusers');