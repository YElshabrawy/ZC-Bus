import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as cookie from 'cookie';
import * as setCookie from 'set-cookie-parser';
import authStore from './store';

// const { tokens, setAccessToken, setRefreshToken } = authStore();
// Create axios instance.
const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
});
// Function to refresh access token using the refresh token
// const refreshAuthLogic = (failedRequest) =>
//     axiosInstance
//         .post('/user/refresh/', {
//             refresh: tokens.refresh,
//         })
//         .then((tokenRefreshResponse) => {
//             const { access } = tokenRefreshResponse.data;
//             failedRequest.response.config.headers.Authorization = `Bearer ${access}`;
//             // Update the access token in the store
//             setAccessToken(access);
//             return Promise.resolve();
//         });

// createAuthRefreshInterceptor(axiosInstance)
