const { default: axios } = require('axios');
const API = axios.create({
    baseURL: "http://192.168.1.23:3000/api/user/v1",
});

const notify = (data) => API.post(`/notify/${data.viewed}`, data);

module.exports = { notify }