import axios from "axios";
const API = axios.create({
    baseURL: "http://43.204.142.84/api/user/v1"
})
export const allFollowers = () => API.get("/allFollower");