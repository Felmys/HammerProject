async function sendRequest() {
    try {
        const response = await fetch("https://api.artic.edu/api/v1/artworks?fields=title,artist_display,place_of_origin,artwork_type_title&limit=12", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok)
            throw Error("Bad request!");
        return await response.json();
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
const data = await sendRequest();
console.log(data);
export {};
//# sourceMappingURL=script.js.map