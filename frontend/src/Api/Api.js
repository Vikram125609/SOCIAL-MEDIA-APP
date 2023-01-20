import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:3000/api/user/v1"
})
export const allFollowers = () => API.get("/allFollower");