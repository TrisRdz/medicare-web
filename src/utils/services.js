import apiCall from "./api";

export const getUserDetails = async () => {
    const response = await apiCall({
        method: 'GET',
        url: '/me',
        withAuth: true
    });
    return response;
}