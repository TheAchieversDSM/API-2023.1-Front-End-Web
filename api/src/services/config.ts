import axios, { AxiosInstance } from "axios";

const url = {
    baseURL: "https://fatecapisjc.hopto.org:5000",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
};

export default url;