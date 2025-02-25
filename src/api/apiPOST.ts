import { API_BASE_URL } from "./apiConfig";

const apiPOST = async (resource: string, data: object) => {
    try {
        const response = await fetch(API_BASE_URL + resource, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Feil ved opplasting av data!");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
export default apiPOST;
