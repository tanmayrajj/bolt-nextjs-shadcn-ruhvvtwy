import axiosInstance from './axios-config';
import { ApiResponse, RequestConfig } from './types';
import { API_URLS } from './api-config';
import QueryString from 'qs';
import { CourtesyPointsPayload } from '@/types/courtesy-points';
import { GiftCardPayload } from '@/types/gift-card';
import { ResendActivationPayload } from '@/types/resend-activation';
import { ManualResetPasswordPayload } from '@/types/manual-reset-password';
import { AccountDeletionPayload } from '@/types/account-deletion';
import { ResetPasswordEmailPayload } from '@/types/reset-password';

class ApiService {
    private static instance: ApiService;
    private axiosInstance;
    private baseURL: string;

    private constructor() {
        this.baseURL = process.env.NEXT_PUBLIC_CLUBMILES_INTERNAL_URL || '';
        this.axiosInstance = axiosInstance;
        this.initializeAxios();
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private initializeAxios() {
        this.axiosInstance.defaults.baseURL = this.baseURL;
    }

    // Utility functions
    private convertDictToQueryParams(dict: Record<string, any>): string {
        return QueryString.stringify(dict);
    }

    private formatUrl(template: string, ...args: any[]): string {
        return template.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }

    private getFullUrl(endpoint: string): string {
        return `${this.baseURL}${endpoint}`;
    }


    async addCourtesyPoints(data: CourtesyPointsPayload) {
        return this.axiosInstance.post(API_URLS.courtesyPoints, data);
    }

    async addGiftCard(data: GiftCardPayload) {
        return this.axiosInstance.post(API_URLS.giftCard, data);
    }

    async resendActivation(data: ResendActivationPayload) {
        return this.axiosInstance.post(API_URLS.resendActivation, data);
    }

    async manualResetPassword(data: ManualResetPasswordPayload) {
        return this.axiosInstance.post(API_URLS.manualResetPassword, data);
    }

    async accountDeletion(data: AccountDeletionPayload) {
        return this.axiosInstance.post(API_URLS.accountDeletion, data);
    }

    async resetPasswordEmail(data: ResetPasswordEmailPayload) {
        return this.axiosInstance.post(API_URLS.resetPasswordEmail, data);
    }
}

const apiService = ApiService.getInstance();
export default apiService; 