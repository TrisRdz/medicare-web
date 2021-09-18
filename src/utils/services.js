import apiCall from "./api";

export const getUserDetails = async () => {
    const response = await apiCall({
        method: 'POST',
        url: '/me',
        withAuth: true
    });
    return response;
}