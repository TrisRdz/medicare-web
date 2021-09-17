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
        if (error.message === 'Request failed with status code 401') {
            localStorage.setItem('authToken', null);
        }
        return error;
    }
}

export default apiCall;
