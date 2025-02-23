import { vi } from "vitest";
import getData from "../api/apiGET";
import postData from "../api/apiPOST";
import deleteData from "../api/apiDELETE";

global.fetch = vi.fn();

describe("api GET", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("henter bookinger fra API", async () => {
        const mockBookings = [
            { id: "1", courtId: "3", date: "2024-03-15", timeslot: "10:00" },
        ];

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockBookings),
        });

        const data = await getData("bookings");
        expect(data).toEqual(mockBookings);
    });

    test("oppretter en booking", async () => {
        const newBooking = {
            userId: "123",
            courtId: "3",
            date: "2024-03-15",
            timeslot: "10:00",
        };

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ id: "1", ...newBooking }),
        });

        const data = await postData("bookings", newBooking);
        expect(data).toHaveProperty("id");
        expect(data.userId).toBe("123");
    });

    test("sletter en booking", async () => {
        (fetch as jest.Mock).mockResolvedValue({ ok: true });

        const response = await deleteData("bookings", "1");
        expect(response).toBeUndefined();
    });
});
