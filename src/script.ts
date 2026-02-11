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
    } catch(error) {
        console.error(error);
        return {data: []};
    }
}


// const data = await sendRequest();
// console.log(data);

const showData = (param :ArtworkResponse):void => {
    const main = document.querySelector("main");
    const content = param.data.map((c,index,type)=> {
        const imageNumber = index + 1;
        return`
        <div class="card">
            <img src="./img/${imageNumber}.jpg" alt="${c.title}"><br>
            <h2>${c.title}</h2>
            <hr>
            <p id="art-right">${c.artist_display}</p>
            <p>${c.place_of_origin}</p>
            <p>${c.artwork_type_title}</p>
        </div>`
    }
    )
    main!.innerHTML = content.join("");
}
showData(await sendRequest());