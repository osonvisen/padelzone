const apiUrl = "https://crudcrud.com/api/";
const apiKey = "c702c667d12f4483bcedfb270f6bda4d";

export const apiPOST = async (resource: string, data: object) => {
    try {
        console.log("Mottatt: ", resource, data);
        const response = await fetch(apiUrl + apiKey + resource, {
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
