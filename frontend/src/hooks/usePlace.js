import { fetchData } from "../utilities";

import { useAuthContext } from "../context/AuthContext";


// queste funzioni sono chiamabili tramite il global context context/GlobalContext.jsx
export default function usePlace() {

    const { token, isAuthenticated, logout, authenticatedFetch } = useAuthContext()
    const api = import.meta.env.VITE_API_URL

    const fetchDataAuth = async (url, options = {}) => {
        const response = await authenticatedFetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json();
    };

    //esempio di chiamata API GET
    async function getPlaces(value) {
        try {
            const response = await fetchData(`${api}/places/search?name=${value}`)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async function getPlacesFiltered({ searchLocation, filter }) {
        const filtersArr = [];
        let url = `${api}/places/filter`;

        if (searchLocation && searchLocation !== '') {
            filtersArr.push(`query=${searchLocation}`);
        }
        if (filter.category) {
            filtersArr.push(`category=${filter.category}`);
        }
        if (filter.price) {
            filtersArr.push(`priceRange=${filter.price}`);
        }
        if (filter.rating) {
            filtersArr.push(`rating=${filter.rating}`);
        }
        if (filter.services) {
            filtersArr.push(`tags=${filter.services}`);
        }
        filtersArr.push(`page=0`);
        filtersArr.push(`size=10`);

        const queryString = filtersArr.join('&');

        if (queryString) {
            url += `?${queryString}`;
        }

        try {
            const response = await fetchData(url);
            return response.content;
        } catch (error) {
            console.error("Error fetching filtered places:", error);
            throw new Error(error);
        }
    }

    async function getPlacesByProvince(province) {
        try {
            const response = await fetchData(`${api}/places/province/${province}`) //ud
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async function getPlacesByRegion(region) {
        try {
            const response = await fetchData(`${api}/places/region/${region}`)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async function getPlacesDetails(placeId) {
        try {
            const response = await fetchData(`${api}/places/details/${placeId}`)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    //esempio di chiamata API POST dove quando la richiami devi passare l'oggetto data con già tutti i campi compilati
    async function addPlace(id) {
        try {
            const response = await fetchDataAuth(`${api}/places/save/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response;
        } catch (error) {
            console.error("Errore nell'aggiunta del place:", error);
            throw error;
        }
    }

    async function googleSearchAuth({ query, latitude, longitude, radius, maxResults }) {
        try {
            const response = await fetchDataAuth(`${api}/places/google-search-text?query=${query}&latitude=${latitude}&longitude=${longitude}&radius=${radius}&maxResults=${maxResults}`)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async function googleSearchDetailAuth(id) {
        try {
            const response = await fetchDataAuth(`${api}/places/google-details/${id}`)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }



    return [getPlaces, getPlacesByProvince, getPlacesByRegion, getPlacesDetails, addPlace, googleSearchAuth, getPlacesFiltered, googleSearchDetailAuth]
}