ricerche nel database(quelle normali)

https://rest.dececcofederico.eu/api/places/details/(id del posto) - ti ritorna il place in base al suo id
https://rest.dececcofederico.eu/api/places/details/ChIJT4Pkr6lWKhMR_TbNKLsHz00

https://rest.dececcofederico.eu/api/places/proximity?latitude=&longitude=&radius - ti ritorna i places in base alle coordinate in una raggio pari a raidus
https://rest.dececcofederico.eu/api/places/proximity?latitude=45.6682693&longitude=13.104625599999999&radius=1

https://rest.dececcofederico.eu/api/places/province/(province) - dove (province è il suffisso, quindi Roma è ro), ritorna places in base alla provincia
https://rest.dececcofederico.eu/api/places/province/ud

https://rest.dececcofederico.eu/api/places/region/(region) - non l'ho ancora caricato sul server funzionante ma ci sarà a breve, quindi usala senza problemi

https://rest.dececcofederico.eu/api/places/search?name=&page=&size= - ritorna max 10 risultati in base al nome, page e size sono opzionali e puoi tranquillamente ometterle
https://rest.dececcofederico.eu/api/places/search?name=ris

https://rest.dececcofederico.eu/api/places/(id del posto)/photos - ritorna un array contenente i json delle foto
https://rest.dececcofederico.eu/api/places/ChIJT4Pkr6lWKhMR_TbNKLsHz00/photos

https://rest.dececcofederico.eu/api/photo/json/(filename) - ritorna un json con i dati della foto in base al suo filename
https://rest.dececcofederico.eu/api/photo/json/38bbbb292f76f079_1752759139989

https://rest.dececcofederico.eu/api/photo/file/(filename) - ritorna la foto in base al suo filename (questa per quanto funzioni non troverà le foto dei vecchi ristoranti in quanto hanno cambiato loco, tornerò ad importarli, l'unico ristorante che ha le 5 foto è ChIJT4Pkr6lWKhMR_TbNKLsHz00, perchè ho appena testa se la chiamata funzionava per 5 foto e non solo due come facevo)
https://rest.dececcofederico.eu/api/photo/filename/38bbbb292f76f079_1752759139989

ricerche con google places

https://rest.dececcofederico.eu/api/places/google-search-text?query=&latitude=&longitude=&radius=&maxResults= - fa una chiamta che ritorna max 20 places o maxResults(il più piccolo) partendo da query che è il nome, latitude , longitude e raidus come parametri di geolocalizzazione. I parametri di latitude, longitude e radius non sono necessari e puoi tranquillamente ometterli

https://rest.dececcofederico.eu/api/places/google-details/(id google place) - fa una chiamata a google che ritorna i dettagli di un place in base al suo id

https://rest.dececcofederico.eu/api/places/save/(id google place) - fa una chiamata Post in base all'id che salva il luogo scaricando le foto e aggiornando il database

https://rest.dececcofederico.eu/api/places/(id luogo)/photos/(reference della foto) - attraverso chiamata google Get scarica una foto in base al suo luogo e sua reference
