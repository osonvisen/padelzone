import { API_BASE_URL } from "./apiConfig";

// Vi skal ta i mot type og _id til den som skal slettes
const apiDELETE = async (type: "bookings" | "users", itemId: string) => {
    const apiUrl = `${API_BASE_URL}/${type}/${itemId}`;

    try {
        await fetch(apiUrl, {
            method: "DELETE",
        });
    } catch (error) {
        console.error(error);
    }
};

export default apiDELETE;
