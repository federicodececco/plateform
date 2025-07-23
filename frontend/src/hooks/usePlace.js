import fetchData from "../utilities";

// queste funzioni sono chiamabili tramite il global context context/GLobalContext.jsx
export default function usePlace() {

    const api = import.meta.env.VITE_API_URL

    //esempio di chiamata API GET
    async function getPlaces(value) {
        const response = await fetchData(`${api}/places/search?name=${value}`)
        return response
    }

    async function getPlacesByProvince(province) {
        const response = await fetchData(`${api}/places/province/${province}`) //ud
        return response
    }

    async function getPlacesByRegion(region) {
        const response = await fetchData(`${api}places/region/${region}`)
        console.log(response);
        return response
    }

    async function getPlacesDetails(placeId) {
        const response = await fetchData(`${api}/places/details/${placeId}`)
        // console.log('response', response);
        return response
    }

    async function getPlacesPic(picArray) {
        // const promise = await Promise.all(fetchArr)
        // const fetchArr = picArray.map(photo => fetchData(`${api}/photo/filename/${photo.fileName}`))
        // return promise

        console.log(picArray[0]);
        // const response = await fetchData(`${api}/photo/filename/82fc23ceafc2bc73_1752759138559`)

        // const response = await fetch(`${api}/photo/filename/${picArray[0].fileName}`)
        // const json = await response.json()
        // return json
        return response
    }

    //esempio di chiamata API POST dove quando la richiami devi passare l'oggetto data con già tutti i campi compilati
    async function addPlace(id) {
        const response = await fetch(`${api}/places/save/${id}`, {
            //dichiaro il metodo della richiesta
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
        });
        //controllo se la risposta è ok
        if (!response.ok) {
            throw new Error("Network response was not ok", response.messageS);
        }

        return response.status
    }

    async function googleSearch({ query, latitude, longitude, radius, maxResults }) {
        // places/google-search-text?query=&latitude=&longitude=&radius=&maxResults=
        const response = await fetchData(`${api}/places/google-search-text?query=${query}&latitude=${latitude}&longitude=${longitude}&radius=${radius}&maxResults=${maxResults}`)
        return response
    }


    async function getCategory() {
        const response = await fetchData(`${api}/categories/`)
        console.log('categories', response);

        return response
    }

    return [
        getPlaces,
        getPlacesByProvince,
        getPlacesByRegion,
        getPlacesDetails,
        getPlacesPic,
        addPlace,
        googleSearch
    ]
}