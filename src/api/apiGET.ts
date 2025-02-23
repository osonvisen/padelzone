import { API_BASE_URL } from "./apiConfig";

const apiGET = async (resource: string) => {
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
export default apiGET;
