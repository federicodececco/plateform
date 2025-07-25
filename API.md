RestFinder

Panoramica

RestFinder è una API REST reattiva costruita con Spring WebFlux e implementa i JWT per assicurare sicurezza e scalabilità. L'API integra Google Places API per dati aggiornati sui luoghi e offre funzionalità avanzate di ricerca, filtri e gestione delle foto.

Base URL
http://localhost:8080/api
Autenticazione
Sistema JWT
L'API utilizza JSON Web Tokens (JWT) per l'autenticazione. Gli endpoint protetti richiedono un header Authorization valido.

Login
Endpoint: POST /auth/login
Request Body:
json{
"username": "admin",
"password": "password"
}
Response (200 OK):
json{
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"tokenType": "Bearer",
"username": "admin"
}
Response (401 Unauthorized):
json{
"accessToken": "fail",
"username": null
}
Utilizzo del Token
Per gli endpoint protetti, includi il token nell'header:
Authorization: Bearer <token>

Endpoints Places

1. Ricerca Testuale Google Places
   Endpoint: GET /places/google-search-text ->richiede auth
   Cerca luoghi utilizzando l'API di Google Places con supporto per filtri geografici.
   Parametri Query:

query (string, required): Termine di ricerca
latitude (double, optional): Latitudine per bias geografico (-90 a 90) (opzionale)
longitude (double, optional): Longitudine per bias geografico (-180 a 180) (opzionale)
radius (double, optional): Raggio in metri (default: 5000) (opzionale)
maxResults (integer, optional): Numero massimo risultati (default: 5) (opzionale)

Esempio Request:
GET /places/google-search-text?query=pizza&latitude=45.4642&longitude=9.1900&radius=1000&maxResults=10
Response (200 OK):
json{
"places": [
{
"id": "ChIJ...",
"name": "Pizzeria Mario",
"formattedAddress": "Via Roma 123, Milano MI, Italia",
"location": {
"latitude": 45.4642,
"longitude": 9.1900
},
"rating": 4.5,
"userRatingCount": 245,
"priceLevel": "PRICE_LEVEL_MODERATE",
"types": ["restaurant", "food", "establishment"],
"googleMapsUri": "https://maps.google.com/?cid=...",
"displayName": {
"text": "Pizzeria Mario",
"languageCode": "it"
}
}
]

} 2. Dettagli Luogo Google
Endpoint: GET /places/google-details/{id} ->richiede auth
Ottiene dettagli completi di un luogo da Google Places API.
Parametri Path:

id (string, required): Google Place ID

Parametri Query:

masks (array[string], optional): Campi specifici da recuperare (opzionale), se viene omesso recupera tutti i campi

Esempio Request:
GET /places/google-details/ChIJ...?masks=displayName,location,rating,photos
Response (200 OK):
json{
"id": "ChIJ...",
"name": "Pizzeria Mario",
"displayName": {
"text": "Pizzeria Mario",
"languageCode": "it"
},
"location": {
"latitude": 45.4642,
"longitude": 9.1900
},
"rating": 4.5,
"userRatingCount": 245,
"formattedAddress": "Via Roma 123, Milano MI, Italia",
"addressComponents": [
{
"longText": "123",
"shortText": "123",
"types": ["street_number"]
}
],
"photos": [
{
"name": "places/ChIJ.../photos/reference123",
"widthPx": 4032,
"heightPx": 3024
}
],
"takeout": true,
"dineIn": true,
"outdoorSeating": false,
"accessibilityOptions": {
"wheelchairAccessibleEntrance": true
}
}

3. Ricerca di Prossimità
   Endpoint: GET /places/proximity
   Trova luoghi nel database entro un raggio specificato dalle coordinate date.
   Parametri Query:

latitude (double, required): Latitudine centro ricerca
longitude (double, required): Longitudine centro ricerca
radius (double, required): Raggio in chilometri

Esempio Request:
GET /places/proximity?latitude=45.4642&longitude=9.1900&radius=5
Response (200 OK):
json[
{
"id": "ChIJ...",
"name": "Ristorante Central",
"address": "Via Milano 45",
"city": "Milano",
"latitude": 45.4650,
"longitude": 9.1901,
"rating": 4.2,
"priceRange": "moderate"
}
]

4.  Salvataggio Luogo
    Endpoint: POST /places/save/{id} ->richiede auth
    Salva un luogo da Google Places nel database locale con tutte le relazioni.
    Parametri Path:

id (string, required): Google Place ID

Parametri Query:

masks (array[string], optional): Campi da recuperare da Google (opzionale)

Response (200 OK):
Restituisce l'oggetto Place completo salvato nel database.
Processo automatico:

Recupera dati da Google Places API
Estrae e salva categorie
Estrae e salva tag basati sui servizi
Scarica e salva fino a 5 foto
Genera slug URL-friendly
Salva tutte le relazioni

5. Ricerca nel Database
   Endpoint: GET /places/search
   Ricerca full-text nei luoghi salvati nel database con ranking intelligente.
   Parametri Query:

name (string, required): Termine di ricerca
page (integer, optional): Numero pagina (default: 0)
size (integer, optional): Dimensione pagina (default: 10, max: 100)

Esempio Request:
GET /places/search?name=pizza&page=0&size=20
Response (200 OK):
json{
"content": [
{
"id": "ChIJ...",
"name": "Pizzeria Mario",
"address": "Via Roma 123",
"city": "Milano",
"rating": 4.5,
"categories": [
{
"id": 1,
"googleName": "restaurant",
"enName": "Restaurant",
"itName": "Ristorante"
}
]
}
],
"pageable": {
"sort": {...},
"pageNumber": 0,
"pageSize": 20
},
"totalElements": 45,
"totalPages": 3
}

6. Filtri Avanzati
   Endpoint: GET /places/filter
   Filtra luoghi nel database usando criteri multipli.
   Parametri Query:

category (string, optional): Nome categoria Google
tags (array[string], optional): Lista tag da filtrare (opzionale)
priceRange (string, optional): Fascia prezzo (free|inexpensive|moderate|expensive|very expensive) (opzionale)
rating (integer, optional): Rating minimo (1-5) (opzionale)
page (integer, optional): Numero pagina (default: 0) (opzionale)
size (integer, optional): Dimensione pagina (default: 10, max: 100) (opzionale)

Esempio Request:
GET /places/filter?category=restaurant&tags=takeout,outdoorSeating&priceRange=moderate&rating=4&page=0&size=15
Response: Stesso formato di /places/search 7. Dettagli Luogo Database
Endpoint: GET /places/details/{id}
Recupera dettagli completi di un luogo dal database con tutte le relazioni.
Parametri Path:

id (string, required): ID del luogo

Response (200 OK):
json{
"id": "ChIJ...",
"name": "Pizzeria Mario",
"address": "Via Roma 123",
"city": "Milano",
"province": "MI",
"region": "Lombardia",
"latitude": 45.4642,
"longitude": 9.1900,
"rating": 4.5,
"reviewNumber": 245,
"priceRange": "moderate",
"categories": [
{
"id": 1,
"googleName": "restaurant",
"enName": "Restaurant",
"itName": "Ristorante",
"isVisible": true
}
],
"tags": [
{
"id": 15,
"googleName": "takeout",
"enName": "Takeout",
"itName": "Da asporto",
"isVisible": true
}
],
"photos": [
{
"id": 123,
"fileName": "abc123_1642501234567",
"filePath": "backend/downloaded/photos/abc123_1642501234567.jpg",
"contentType": "image/jpeg"
}
]
} 8. Luoghi per Regione/Provincia
Endpoint: GET /places/region/{region}
Endpoint: GET /places/province/{province}
Recupera luoghi filtrati per regione o provincia.
Parametri Path:

region o province (string, required): Nome regione/provincia

Response: Array di oggetti Place con relazioni caricate.

Endpoints Foto

1. Download Foto
   Endpoint: GET /places/{placeId}/photos/{photoReference} ->richiede auth
   Scarica una foto da Google Places API e la salva localmente.
   Parametri Path:

placeId (string, required): ID del luogo
photoReference (string, required): Riferimento foto Google

Response (200 OK):
json"Foto scaricata con successo! Filename: abc123_1642501234567, Path: backend/downloaded/photos/abc123_1642501234567.jpg" 2. Lista Foto Luogo
Endpoint: GET /places/{placeId}/photos
Recupera tutte le foto scaricate per un luogo.
Response (200 OK):
json[
{
"id": 123,
"fileName": "abc123_1642501234567",
"filePath": "backend/downloaded/photos/abc123_1642501234567.jpg",
"contentType": "image/jpeg",
"createdAt": "2024-01-18T10:30:00"
}
] 3. Visualizza Foto
Endpoint: GET /places/photo/file/{filename}
Serve il file immagine direttamente dal storage locale.
Parametri Path:

filename (string, required): Nome file senza estensione

Response: File immagine con Content-Type appropriato 4. Metadati Foto
Endpoint: GET /places/photo/json/{filename}
Recupera metadati JSON di una foto.
Response (200 OK):
json{
"id": 123,
"fileName": "abc123_1642501234567",
"photoReference": "original_google_reference",
"contentType": "image/jpeg",
"filePath": "backend/downloaded/photos/abc123_1642501234567.jpg",
"createdAt": "2024-01-18T10:30:00"
}

Endpoints Categorie

1. Lista Categorie
   Endpoint: GET /categories/
   Recupera tutte le categorie disponibili.
   Response (200 OK):
   json[
   {
   "id": 1,
   "googleName": "restaurant",
   "enName": "Restaurant",
   "itName": "Ristorante",
   "isVisible": true
   }
   ]
2. Categoria Specifica
   Endpoint: GET /categories/{id}
   Response (200 OK): Singolo oggetto Category
3. Crea Categoria
   Endpoint: POST /categories/create ->richiede auth
   Request Body:
   json{
   "googleName": "new_category",
   "enName": "New Category",
   "itName": "Nuova Categoria",
   "isVisible": true
   }
4. Modifica Categoria
   Endpoint: POST /categories/edit/{id} ->richiede auth
   Request Body: Oggetto Category completo
5. Elimina Categoria
   Endpoint: DELETE /categories/delete/{id} ->richiede auth

Endpoints Tag

1. Lista Tag
   Endpoint: GET /tags/
   Response: Array di oggetti Tag
2. Tag Specifico
   Endpoint: GET /tags/{id}
   Endpoint: GET /tags/google/{googleName}
3. Modifica Tag
   Endpoint: POST /tags/edit ->richiede auth
   Request Body:
   json{
   "id": 1,
   "googleName": "takeout",
   "enName": "Takeout",
   "itName": "Da asporto",
   "isVisible": true
   }

Codici di Stato HTTP

401 Unauthorized: Token mancante o non valido

Metodi supportati: GET, POST, PUT, DELETE, OPTIONS

Note Tecniche:

Reattività
Tutti gli endpoint restituiscono Mono<ResponseEntity<T>> per supporto reattivo completo.

Transazioni
Le operazioni di lettura utilizzano @Transactional(readOnly = true) per ottimizzazioni delle performance.

Mapping Avanzato
Slug automatici per URL SEO-friendly
Estrazione intelligente di tag da Google Places
Gestione automatica duplicati foto
Coordinate geografiche con calcolo distanze

Sicurezza File

Nomi file hash SHA-256 per evitare collisioni
Validazione tipi MIME
Gestione automatica estensioni file
Protezione path traversal
