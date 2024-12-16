import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

// Default config for axios instance
const defaultConfig: AxiosRequestConfig = {
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
};

// Create axios instance
const axiosInstance: AxiosInstance = axios.create(defaultConfig);

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth token here
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        toast.error('Request failed');
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    toast.error('Unauthorized access');
                    // Handle logout or refresh token here
                    break;
                case 403:
                    toast.error('Access forbidden');
                    break;
                case 404:
                    toast.error('Resource not found');
                    break;
                case 500:
                    toast.error('Internal server error');
                    break;
                default:
                    toast.error('Something went wrong');
            }
        } else if (error.request) {
            toast.error('No response received from server');
        } else {
            toast.error('Error setting up request');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 