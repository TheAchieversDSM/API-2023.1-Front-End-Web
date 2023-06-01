import axios, { AxiosInstance } from "axios";

const url = {
    baseURL: "http://localhost:5000",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
};

export default url;