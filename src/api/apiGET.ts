import { API_BASE_URL } from "./apiConfig";

export const apiGET = async (resource: string) => {
    console.log(`URL: ${API_BASE_URL}${resource}`);
    try {
        const response = await fetch(`${API_BASE_URL}${resource}`);
        if (!response.ok) {
            throw new Error("Kunne ikke hente data fra server!");
        }
        const data = await response.json();
        return await data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
