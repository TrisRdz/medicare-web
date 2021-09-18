import axios from 'axios';
import { BASE_URL } from '../constants';

const defaultHeaders = {
    'Content-Type': 'application/json'
}

const apiCall = async (params) => {
    const authToken = localStorage.getItem('authToken');
    try {
        const { headers = {}, url, method, data, withAuth  } = params;
        const response = await axios({
            headers: {
                ...defaultHeaders,
                ...headers,
                ...(withAuth ? { 'Authorization': `Bearer ${authToken}` }: {})
            },
            method,
            baseURL: BASE_URL,
            url,
            data
        });
        return response;
    } catch (error) {
        if (error && error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
        }
        return error.response;
    }
}

export default apiCall;
