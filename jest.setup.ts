import '@testing-library/jest-dom'

// Mock API Service
const mockApiService = {
    addGiftCard: jest.fn().mockImplementation(() => Promise.resolve({ success: true })),
    getGiftCards: jest.fn().mockImplementation(() => Promise.resolve([])),
    deleteGiftCard: jest.fn().mockImplementation(() => Promise.resolve({ success: true })),
};

// Mock api_management
jest.mock("@/api_management", () => ({
    __esModule: true,
    default: mockApiService,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        refresh: jest.fn(),
    }),
    useSearchParams: () => ({
        get: jest.fn(),
    }),
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    })),
});

// Clear all mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});