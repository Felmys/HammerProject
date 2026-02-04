interface artwork {
    data: {
    title:string,
    artist_display:string,
    place_of_origin:string,
    credit_line:string,
    artwork_type_title:string
    }[]
}


async function sendRequest(): Promise<artwork | []> {
    try {
        const response = await fetch("https://api.artic.edu/api/v1/artworks", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        
        if (!response.ok) throw Error("Bad request!");

        return await response.json();
    } catch(error) {
        console.error(error);
        return [];
    }
}
const data = await sendRequest();
console.log(data);
