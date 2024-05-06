import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as cookie from 'cookie';
import * as setCookie from 'set-cookie-parser';

// const { tokens, setAccessToken, setRefreshToken } = authStore();
// Create axios instance.
const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
});

// Function to refresh access token using the refresh token
const refreshAuthLogic = async (failedRequest: any) => {
    axiosInstance.get('/api/refresh/').then((res) => {
        if (axiosInstance.defaults.headers.setCookie)
            delete axiosInstance.defaults.headers.setCookie;

        const accessToken = res.data.access;
        const bearer = `Bearer ${accessToken}`;
        axiosInstance.defaults.headers.Authorization = bearer;
        // update the access token in the cookie
        const responseCookie = setCookie.parse(
            res.headers['set-cookie'] ?? []
        )[0];
        axiosInstance.defaults.headers.setCookie =
            res.headers['set-cookie'] ?? [];
        axiosInstance.defaults.headers.cookie = cookie.serialize(
            responseCookie.name,
            responseCookie.value
        );
        failedRequest.response.config.headers.Authorization = bearer;
        return Promise.resolve();
    });
};

// Create the interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export default axiosInstance;
