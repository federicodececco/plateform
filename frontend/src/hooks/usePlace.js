import fetchData from "../utilities";

// queste funzioni sono chiamabili tramite il global context context/GLobalContext.jsx
export default function usePlace() {

    const api = import.meta.env.VITE_API_URL

    //esempio di chiamata API GET
    async function getPlaces(value) {
        const response = await fetchData(`${api}/places/search?name=${value}`)
        return response
    }

    async function getPlacesFiltered({ category, services, price, rating }) {
        const response = await fetchData(`${api}/places/filter?category=${category}&tags=${services}&priceRange=${price}&rating=${rating}&page=0&size=10`)
        console.log(response);

        return response
    }

    async function getPlacesByProvince(province) {
        const response = await fetchData(`${api}/places/province/${province}`) //ud
        return response
    }

    async function getPlacesByRegion(region) {
        const response = await fetchData(`${api}/places/region/${region}`)
        return response
    }

    async function getPlacesDetails(placeId) {
        const response = await fetchData(`${api}/places/details/${placeId}`)
        // console.log('response', response);
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

    return [getPlaces, getPlacesByProvince, getPlacesByRegion, getPlacesDetails, addPlace, googleSearch, getPlacesFiltered]
}