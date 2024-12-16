export const API_URLS = {
    courtesyPoints: '/courtesy-points',
    giftCard: '/gift-card',
    resendActivation: '/resend-activation',
    manualResetPassword: '/manual-reset-password',
    accountDeletion: '/account-deletion',
    resetPasswordEmail: '/reset-password-email',
} as const;

// Header configurations
export const HEADER_CONFIG = {
    DEFAULT: {
        'Content-Type': 'application/json',
        'X-Client-Id': 'web',
    },
    MULTIPART: {
        'Content-Type': 'multipart/form-data',
        'X-Client-Id': 'web',
    },
    PUBLIC: {
        'Content-Type': 'application/json',
        'X-Client-Id': 'public',
    },
} as const; 