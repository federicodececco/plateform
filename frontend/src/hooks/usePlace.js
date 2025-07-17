
import { useState, useEffect } from "react"

const fetchData = async (url) => {

    // eseguo chiamata API GET
    const response = await fetch(url)

    //controllo se la risposta è ok
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    // converto la risposta in JSON
    const json = await response.json()
    return json
}


// queste funzioni sono chiamabili tramite il global context context/GLobalContext.jsx
export default function usePlace() {

    const api = import.meta.env.VITE_API_URL

    //esempio di chiamata API GET
    async function getPlace() {
        const response = await fetchData(`${api}/places`)
        return response
    }

    //esempio di chiamata API POST dove quando la richiami devi passare l'oggetto data con già tutti i campi compilati
    async function addPlace(data) {
        const response = await fetch(`${api}/places`, {
            //dichiaro il metodo della richiesta
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), //entro al body passo l'oggetto data
        });
        //controllo se la risposta è ok
        if (!response.ok) {
            throw new Error("Network response was not ok", response.messageS);
        }

    }

    return [getPlace, addPlace]
}