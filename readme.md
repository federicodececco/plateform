!!!!!!!!!IMPORTANTE!!!!!
Senza dover necessariamente creare un nuovo ambiente per l'app,
il sito hostato attraverso vercel e cloudflare, è disponibile a questo indirizzo per qulache giorno:
https://vite-react-six-mu-78.vercel.app/
Per il login le credenziali sono
username:admin
password:admin123

RestFinder

--Caratteristiche Principali

Ricerca e Scoperta

Ricerca Luoghi: Ricerca testuale con supporto per coordinate geografiche e raggio
Integrazione Google Places: Accesso completo ai dati di Google Places API
Ricerca Avanzata: Filtri per categoria, tag, fascia di prezzo e valutazione
Ricerca di Prossimità: Trova luoghi entro un raggio specificato
Ricerca per Regione/Provincia: Esplorazione geografica organizzata
Full-Text Search: Ricerca ottimizzata con ranking e relevance

Gestione Contenuti

Gestione Foto: Download e storage automatico delle foto dei luoghi
Sistema di Categorizzazione: Gestione di categorie e tag per i luoghi
Gallerie Responsive: Visualizzazione ottimizzata delle immagini dei luoghi
Blacklist Management: Sistema di moderazione per escludere luoghi

Interfaccia Utente

Interfaccia Web Responsive: Design ottimizzato per desktop, tablet e mobile
Internazionalizzazione: Supporto completo Italiano/Inglese
Mappe Interattive: Integrazione Google Maps con markers e indicazioni stradali
Navigation Breadcrumbs: Navigazione contestuale user-friendly

Esperienza Utente

Valutazioni e Recensioni: Visualizzazione rating con stelle
Informazioni Dettagliate: Orari, contatti, servizi disponibili, prezzi

Amministrazione

Panel Admin: Interfaccia per aggiungere nuovi luoghi tramite Google Places
Gestione Tags e Categorie: CRUD completo
Autenticazione JWT: Sistema di autenticazione sicuro
Route Protette: Controllo accessi basato su autenticazione

Architettura e Performance

API RESTful: Architettura completamente reattiva con Spring WebFlux
Debouncing: Ottimizzazione chiamate API per ricerche real-time
Error Handling: Gestione robusta degli errori con fallback graceful

Integrazione e Storage
Database Spaziale: Query geografiche ottimizzate con MySQL spatial functions
File Management: Sistema organizzato per storage foto con naming sicuro
URL Slug Generation: URL SEO-friendly per i luoghi

--Tecnologie Utilizzate:

Backend

Spring Boot 3.x con Spring WebFlux (Reactive)
Database: JPA/Hibernate con supporto MySQL
Sicurezza: Spring Security con JWT
API Esterne: Google Places API
Build Tool: Maven
Validazione: Jakarta Validation
Utility: Lombok
Slugify: Generazione URL-friendly slugs

Frontend

Framework: React 18 con Functional Components e Hooks
Build Tool: Vite
Routing: React Router v6
Styling: CSS Modules
State Management: Context API con Custom Hooks
Internazionalizzazione: React i18next
Mappe: Google Maps React API (@react-google-maps/api)
Icone: React Icons (Font Awesome)
Utility: Lodash (per debouncing e utility functions)

Database

MySQL 8.0+
Spatial Data: Supporto per query geografiche con ST_Distance_Sphere
Full-Text Search: Indicizzazione FULLTEXT per ricerca ottimizzata

Sicurezza e Autenticazione

JWT: JSON Web Tokens per autenticazione stateless
CORS: Configurazione per chiamate cross-origin
Password Encoding: Spring Security (attualmente NoOpPasswordEncoder per sviluppo)

API e Integrazione

Google Places API: Ricerca e dettagli luoghi
Google Maps JavaScript API: Visualizzazione mappe interattive
RESTful API: Architettura REST per comunicazione frontend-backend

--Prerequisiti

Java 17+
MySQL 8.0+
Maven 3.6+
Node.js 18+
npm 8+
Chiave API di Google Places
Chiave Maps JavaScript API
ID Google Anlytics

--Installazione e Configurazione

1. Clona il Repository
2. Configurazione frontend
   Crea un file .env contenente:
   VITE_CHIAVE_API_GOOGLE= chiave di google maps
   VITE_API_URL= indirizzo backend(http://localhost:8080 di default)
   VITE_GA_MODE= modalità con cui GA opera, debug o prod
   VITE_GA_ID= id di google analytics
3. Configurazione backend
   Crea un database MySQL e configura le credenziali nel file application.properties:
   spring.datasource.url=jdbc:mysql://localhost:3306/restfinder
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
4. Configurazione Secret Key jwt
   Aggiungi la tua chiave segreta ad application.properties
   jwt.secret=your_secret_key -- deve aver + di 32 caratteri, altrimenti ci sarà un eccezzione nella creazione dei token
5. Configurazione Google Places API
   Aggiungi la tua chiave API di Google Places ad application.properties:
   MAPS_API_KEY=your_google_places_api_key
6. Build e Avvio
   installa i pacchetti contenuti nel pom.xml attraverso Maven, procedi poi ad avviare il servizio backend
   installa i pacchetti contenuti in package.json attraverso npm, procedi poi ad avviare il servizio frontend
   Il backend sarà esposto su http://localhost:8080
   L'applicazione sarà disponibile su http://localhost:5173
   Struttura del Progetto
   src/main/java/com/plateform/restfinder/
   ├── config/ # Configurazioni (Google API)
   ├── controller/ # Controller REST
   ├── dto/ # Data Transfer Objects
   │ ├── request/ # DTO per le richieste
   │ └── response/ # DTO per le risposte
   ├── model/ # Entità JPA
   ├── repository/ # Repository JPA
   ├── security/ # Configurazione sicurezza e JWT
   ├── services/ # Logica di business
   └── specifications/ # Specifiche JPA per query dinamiche
   Autenticazione
   Il sistema utilizza JWT per l'autenticazione. Per accedere agli endpoint protetti:

Login: POST /api/auth/login
json{
"username": "admin",
"password": "admin123"
}

Utilizza il Token: Includi il token JWT nell'header Authorization

API Endpoints Principali
Luoghi (Places)

GET /api/places/google-search-text - Ricerca luoghi con Google Places API
GET /api/places/google-details/{id} - Dettagli di un luogo specifico attraverso Google Places API
GET /api/places/proximity - Ricerca luoghi per prossimità
GET /api/places/search - Ricerca luoghi nel database locale
GET /api/places/filter - Filtra luoghi per categoria, tag, prezzo, rating
POST /api/places/save/{id} - Salva un luogo da Google Places nel database
POST /api/places/{id}/edit - Edita un luogo salvato nel database
GET /api/places/details/{id} - Dettagli di un luogo dal database
GET /api/places/region/{region} - Luoghi per regione
GET /api/places/province/{province} - Luoghi per provincia

Categorie

GET /api/categories/ - Lista tutte le categorie
GET /api/categories/{id} - Categoria specifica
POST /api/categories/create - Crea nuova categoria
POST /api/categories/edit/{id} - Modifica categoria
DELETE /api/categories/delete/{id} - Elimina categoria

Tag

GET /api/tags/ - Lista tutti i tag
GET /api/tags/{id} - Tag specifico
GET /api/tags/google/{googleName} - Tag per nome Google
POST /api/tags/edit - Modifica tag

Foto

GET /api/places/{placeId}/photos/{photoReference} - Download foto
GET /api/places/{placeId}/photos - Lista foto di un luogo
GET /api/places/photo/file/{filename} - Visualizza file foto

Modello Dati
Place (Luogo)

ID, nome, indirizzo completo
Coordinate geografiche
Categoria principale, rating, numero recensioni
Collegamenti a categorie, tag e foto
URL Google Maps e sito web

Category (Categoria)

Nome Google, nome in inglese e italiano
Flag di visibilità
Relazione many-to-many con Places

Tag (Tag)

Nome Google, nome in inglese e italiano
Flag di visibilità
Relazione many-to-many con Places

Photo (Foto)

Riferimento foto Google
Percorso file locale
Metadati (tipo contenuto, data creazione)

Funzionalità di Ricerca
Ricerca Testuale
Supporta ricerca full-text con ranking:

Corrispondenza esatta
Inizia con termine
Contiene termine

Filtri Avanzati

Categoria: Filtra per categoria specifica
Tag: Filtra per uno o più tag
Fascia di Prezzo: free, inexpensive, moderate, expensive, very expensive
Rating Minimo: Da 1 a 5 stelle

Ricerca Geografica

Ricerca entro raggio specificato
Ordinamento per distanza
Supporto coordinate

Gestione Foto
Il sistema gestisce automaticamente:

Download foto da Google Places API
Storage locale con naming sicuro (hash SHA-256)
Supporto formati: JPG, PNG, WebP, GIF
Eliminazione duplicati
Metadati

CORS e Sicurezza

CORS: Configurato per localhost su porte diverse
Endpoint Pubblici: Ricerca e visualizzazione luoghi
Endpoint Protetti: Ricerca Google Places, salvataggio dati

Troubleshooting
Errori Comuni

API Key Google non valida

Verifica che la chiave sia attiva
Controlla i limiti di quota

Errori di connessione database

Verifica le credenziali MySQL
Controlla che il database esista

Errori 401

Assicurati che il JWT sia valido

Foto non si caricano

Verifica i permessi della cartella backend/downloaded/photos/

Autori

Marco Mechini - Sviluppatore
Federico De Cecco - Sviluppatore
