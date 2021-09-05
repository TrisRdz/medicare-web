import axios from 'axios';
import { BASE_URL } from '../constants';

const defaultHeaders = {
    'Content-Type': 'application/json'
}

const apiCall = async (params) => {
    try {
        const { headers = {}, url, method, data  } = params;
        const response = await axios({
            headers: {
                ...defaultHeaders,
                ...headers
            },
            method,
            baseURL: BASE_URL,
            url,
            data
        });
        return response;
    } catch (error) {
        return error;
    }
}

export default apiCall;
