import { API_BASE_URL } from "./apiConfig";

// Vi skal ta i mot objektet og _id til den som skal redigeres/endres
const apiPUT = async (updatedObject: object, type: "user" | "bookings") => {
    const apiUrl = `${API_BASE_URL}/${type}/${updatedObject._id}`;
    console.log(updatedObject);
    const { _id, ...cleanObject } = updatedObject;
    try {
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cleanObject),
        });
        if (!response.ok) {
            throw new Error("Feil ved oppdatering av data!");
        }
        return await response.json();
    } catch (error) {
        console.error("Feil ved oppdatering av data: ", error);
    }
};

export default apiPUT;
