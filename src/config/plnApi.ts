import axios from "axios";

const PlnApi = axios.create({
    baseURL: process.env.PLN_DEFAULT_HOST || "http://localhost:8000",
    headers: {
        "Content-type": "application/json"
    }
});

export default PlnApi;
