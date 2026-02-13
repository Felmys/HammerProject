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
        return { data: [] };
    }
}
// const data = await sendRequest();
// console.log(data);
const showData = (param) => {
    const main = document.querySelector("main");
    const content = param.data.map((c, index, type) => {
        const imageNumber = index + 1;
        return `
        <div class="card">
            <img src="./img/${imageNumber}.jpg" alt="${c.title}"><br>
            <h2>${c.title}</h2>
            <hr>
            <div class="header-row">
            <p id="art-right">${c.artist_display}</p>
            </div>
            <p>${c.place_of_origin}</p>
            <p>${c.artwork_type_title}</p>
        </div>`;
    });
    main.innerHTML = content.join("");
};
showData(await sendRequest());
export {};
//# sourceMappingURL=script.js.map