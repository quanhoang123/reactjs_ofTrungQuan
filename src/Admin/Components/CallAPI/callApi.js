import axios from 'axios';
const API_URL="https://data-json-server.herokuapp.com/api/";
export default function callAPI(endpoint, method = "GET", body) {
        return axios({
            method: method,
            url: `${API_URL}/${endpoint}`,
            data: body,
        }).catch((err) => {
            console.log(err);
        });
}