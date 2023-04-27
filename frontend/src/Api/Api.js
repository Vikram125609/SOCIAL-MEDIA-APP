import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:3000/api/user/v1",
    headers: {
        'authorization': localStorage.getItem('token')
    }
})

export const allFollowers = () => API.get("/allFollower");
export const followUser = (id) => API.post(`/follow/${id}`)
export const signup = (data) => API.post("/auth/signup", data)
export const signin = (data) => API.post("/auth/signup", data)
export const user = (data) => API.get(`/me/${data._id}`);
export const posts = () => API.get('/feed');
export const allUsers = () => API.get('/allusers');
export const profile = (data) => API.get(`profile/${data.id}`)
export const userFriends = () => API.get('/friends');
export const createPost = (data) => API.post('/createpost', data);
export const getAllPost = () => API.get('/getAllPost');
export const userPost = (user_id) => API.get(`/userPost?user_id=${user_id}`);
export const likePost = (data) => API.post(`/like/post/${data?.post_id}`, data);
export const commentPost = (data) => API.post(`/comment/post/${data?.post_id}`);