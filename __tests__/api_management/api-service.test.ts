import apiService from "@/api_management";
import { DomainId } from "@/types/domain-id";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("addCourtesyPoints", () => {
        it("should make correct API call for courtesy points", async () => {
            const mockData = {
                entries: [{
                    personEmailId: "test@example.com",
                    domainId: DomainId.CHEAPOAIR_COM,
                    points: 100
                }]
            };

            mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });
            await apiService.addCourtesyPoints(mockData);

            expect(mockedAxios.post).toHaveBeenCalledWith("/courtesy-points", mockData);
        });
    });

    describe("addGiftCard", () => {
        it("should make correct API call for gift card creation", async () => {
            const mockData = {
                entries: [{
                    personEmailId: "test@example.com",
                    domainId: DomainId.CHEAPOAIR_COM,
                    amount: 50
                }]
            };

            mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });
            await apiService.addGiftCard(mockData);

            expect(mockedAxios.post).toHaveBeenCalledWith("/gift-card", mockData);
        });
    });
});