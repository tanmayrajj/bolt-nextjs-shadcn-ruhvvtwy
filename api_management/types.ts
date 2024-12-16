import { AxiosRequestHeaders, Method } from 'axios';

export interface RequestConfig {
    url: string;
    method: Method;
    data?: any;
    params?: any;
    headers?: AxiosRequestHeaders;
    logoutStatusCodes?: number[];
}

export interface ApiResponse<T = any> {
    data: T;
    status: number;
    headers: any;
}

export interface ErrorResponse {
    message: string;
    code?: string;
    status?: number;
} 