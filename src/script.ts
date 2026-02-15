interface ArtworkItem {
    title: string;
    artist_display: string;
    place_of_origin: string;
    artwork_type_title: string;
}
interface ArtworkResponse {
    data: ArtworkItem[];
}

async function sendRequest(): Promise<ArtworkResponse> {
    try {
        const response = await fetch("https://api.artic.edu/api/v1/artworks?fields=title,artist_display,place_of_origin,artwork_type_title&limit=12", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })

        if (!response.ok) throw Error("Bad request!");

        return await response.json();
    } catch (error) {
        console.error(error);
        return { data: [] };
    }
}


// const data = await sendRequest();
// console.log(data);

const showData = (param: ArtworkResponse): void => {
    const VerticalIndexes = [1,7,8,9]
    const BadDescedIndex = [2]
    const main = document.querySelector("main");
    if (!main) return;
    const content = param.data.map((c, index) => {
        const imageNumber = index + 1;
        if (BadDescedIndex.includes(imageNumber)) {
            return `
        <div class="card">
            <img src="./img/${imageNumber}.png" alt="${c.title}"><br>
            <h2>${c.title}</h2><br>
            <div class="header-row">
                <p id="art-right">${c.artist_display}</p>
            </div>
            <hr>
            <p>${c.place_of_origin}</p>
            <p>${c.artwork_type_title}</p>
        </div>`;
        }
        if (VerticalIndexes.includes(imageNumber)) {
            console.log(`${c.title}`)
            return `
        <div class="card-v">
            <img src="./img/${imageNumber}.png" alt="${c.title}"><br>
            <h2>${c.title}</h2>
            
            <div class="header-row">
                <p id="art-right">${c.artist_display}</p>
            </div>
            <hr>
            <p>${c.place_of_origin}</p>
            <p>${c.artwork_type_title}</p>
        </div>`;
        }
        else {
            return `
        <div class="card">
            <img src="./img/${imageNumber}.png" alt="${c.title}"><br>
            <h2>${c.title}</h2>
            <hr>
            <div class="header-row">
                <p id="art-right">${c.artist_display}</p>
            </div>
            <p>${c.place_of_origin}</p>
            <p>${c.artwork_type_title}</p>
        </div>`;
        }
    });
    main.innerHTML = content.join("");
};
showData(await sendRequest());