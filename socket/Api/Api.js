const { default: axios } = require('axios');
const API = axios.create({
    baseURL: "http://localhost:3001/api/user/v1",
});

const notify = (data) => API.post(`/notify/${data.viewed}`, data);

module.exports = { notify }