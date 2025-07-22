import { useAuthContext } from '../context/AuthContext'
export default function usePlaceAuth() {
    const { token, isAuthenticated, logout, authenticatedFetch  } = useAuthContext()
    const api = import.meta.env.VITE_API_URL

    // è il modo più semplice a mio avviso, manda in automatico l'autenticazione con ogni chiamata, senza dover modificare le chiamate originali
    // scritte da te, nei due esempi è più chiaro cosa intendo
    //è simile a quella che c'è in authContext, usa quella che più ti piace
    const authFetch =authenticatedFetch;

    //questa è la chimata che avevi scritto, l'ho lasciata per confronto e  anche nel caso tu voglia usarla non devi riscrivertela 
        const fetchData = async (url) => {

        // eseguo chiamata get
        const response = await fetch(url)

        //controllo se la risposta è ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        // converto la risposta in JSON
        const json = await response.json()
        return json
    }

    // questo è l'esmpio di getPlace(), anche se effettivamente getPlace non ha bisgono di aut, l'ho scritto giusto 
    // per farti vedere la similitudine
   async function getPlaceAuth() {
        const response = await authFetch(`http://localhost:8080/api/places/province/ud`)       
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        return await response.json() 
    }
    //differenza piuttosto nulla tra le due
    async function getPlace() {
        const response = await fetchData(`${api}/places`)        //senza aut
        return await response.json()
    }
    
     

    //uguale qua, ti basta usare authFetch, poi chiaro se vuoi ti basta usare authFetch per le chiamata che hanno bisogno di autenticazione
    //ma l'ho scritzo per funzionare con tutte le chiamate per non darti troppo fastidio
    async function addPlace(data) {
        const response = await authFetch(`${api}/places`, {     //aut
            method: "POST",
            body: JSON.stringify(data),
        })
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        return await response.json()
    }
    async function addPlace(data) {
        const response = await fetch(`${api}/places`, {         //no aut
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

      return { 
        getPlace, 
        addPlace, 
        getPlaceAuth, 
        authFetch,
        fetchData 
    }
}