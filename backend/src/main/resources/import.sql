ALTER TABLE places ADD FULLTEXT(name);
--inserimento tags

INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (1, 'takeout', 'Takeout', 'Asporto', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (2, 'dineIn', 'Dine In', 'Mangiare in loco', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (3, 'reservable', 'Reservable', 'Prenotabile', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (4, 'servesLunch', 'Serves Lunch', 'Serve pranzo', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (5, 'servesDinner', 'Serves Dinner', 'Serve cena', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (6, 'servesBeer', 'Serves Beer', 'Serve birra', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (7, 'servesWine', 'Serves Wine', 'Serve vino', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (8, 'outdoorSeating', 'Outdoor Seating', 'Tavoli all’aperto', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (9, 'menuForChildren', 'Menu for Children', 'Menu per bambini', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (10, 'servesDessert', 'Serves Dessert', 'Serve dessert', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (11, 'servesCoffee', 'Serves Coffee', 'Serve caffè', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (12, 'restroom', 'Restroom', 'Bagno disponibile', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (13, 'wheelchairAccessibleRestroom', 'Wheelchair Accessible Restroom', 'Bagno accessibile', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (14, 'wheelchairAccessibleSeating', 'Wheelchair Accessible Seating', 'Sedute accessibili', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (15, 'acceptCashOnly', 'Accept Cash Only', 'Solo contanti', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (16, 'acceptsDebitCards', 'Accepts Debit Cards', 'Carte di debito', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (17, 'acceptsNfc', 'Accepts NFC', 'Pagamenti NFC', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (18, 'paidParkingLot', 'Paid Parking Lot', 'Parcheggio a pagamento', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (19, 'paidStreetParking', 'Paid Street Parking', 'Parcheggio su strada a pagamento', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (20, 'liveMusic', 'Live Music', 'Musica dal vivo', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (21, 'allowsDogs', 'Allows Dogs', 'Cani ammessi', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (22, 'goodForGroups', 'Good for Groups', 'Adatto a gruppi', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (23, 'goodForWatchingSports', 'Good for Watching Sports', 'Adatto per guardare lo sport', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (24, 'goodForChildren', 'Good for Children', 'Adatto ai bambini', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (25, 'servesBreakfast', 'Serves Breakfast', 'Colazione disponibile', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (26, 'servesBrunch', 'Serves Brunch', 'Brunch disponibile', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (27, 'servesVegetarianFood', 'Serves Vegetarian Food', 'Cibo vegetariano disponibile', true);
INSERT INTO tags (id, google_name, en_name, it_name, is_visible) VALUES (28, 'curbsidePickup', 'Curbside Pickup', 'Ritiro al marciapiede', true);

--inserimento categories

INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (1, "Italian Restaurant", "italian_restaurant", "Cucina Italiana", true);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (2, "Pizza Restaurant", "pizza_restaurant", "Pizzeria", true);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (3, "Seafood Restaurant", "seafood_restaurant", "Ristorante di Pesce", true);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (4, "Food", "food", "Cibo", true);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (5, "Point of Interest", "point_of_interest", "Punto di Interesse", false);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (6, "Establishment", "establishment", "Struttura", false);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (7, "Bar", "bar", "Bar", true);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (8, "Night Club", "night_club", "Discoteca", true);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (9, "Mediterranean Restaurant", "mediterranean_restaurant", "Cucina Mediterranea", true);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (10, "Meal Takeaway", "meal_takeaway", "Cibo da Asporto", true);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (11, "Hotel", "hotel", "Hotel", false);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (12, "Lodging", "lodging", "Alloggio", false);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (13, "Wine Bar", "wine_bar", "Enoteca", true);
INSERT INTO categories (id, en_name, google_name, it_name, is_visible) VALUES (14, "Restaurant", "restaurant", "Ristorante", true);


INSERT INTO `places` VALUES (_binary '\0',33054,_binary '\0',45.6682693,13.104625599999999,4.1,843,'OvClqPYpMocy5FNNGnjN4ym3LSzhkDbpceGFaDvdj-gwnG9Q8ITjH2ff9f1nLlELblB9naSn5cm0Mn_RyU3gGLsCQTbfgZ7cgsjphj3FO7GR8Luo-0VxRLXUMAEqcYVNg5IHPJXC0K1C6cW_wt9BU05lsfMJKiTCNkwp0qBfx5NbQ-r5i3hZC2Kak-gEokeqzEHkrS0q7W-3mR8_xnnJM7kUnwvRfxfcxErBL64K2fZWqbyJRlUn86_L4pJb9Aoyas42vJoIMmgZWpdSD0BOF1eYC1EY35-DonJP20o4MgFzLEfS74','Piazza Rosa dei Venti','2','Lignano Sabbiadoro','https://maps.google.com/?cid=118904109235518046&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAAYBCAA','ChIJ534ctZ6Te0cRXjpRSahupgE','Pizza Restaurant','Ristorante e Pizzeria Capri','Italy','+39 0431 422467','','','moderate','UD','Friuli-Venezia Giulia','ristorante-e-pizzeria-capri','');
INSERT INTO `places` VALUES (_binary '\0',33054,_binary '\0',45.66722,13.1084306,4.3,2232,'ATKogpebKynxj7Xj1tnkL5RDoU1uj5_FfA-WX65g_RdY1-XMT6Go9F8HUYoJQ4NmmOdHVHiBiOPC5EN8sWGGyeHNbcUXmWRfNCsfWShCTidvok7UBPiIFNNd4M4UJjV57bHHMKND8MppoBtHg54so4HzXcgTqUhZTArnFwsHR9Vbm8nZW-BRehqY13KyhFsDNNLck263jUX5_rasLsd_eBbY6IKYWhA0OrClq83wwY9zt7sPNq3Fui5QYr0wb5SGpuezTaBLCBOWygw4UCpacOJvI2-WnWztbE821RjnVAoXMT_8hA','Arco della Paranza','2','Lignano Sabbiadoro','https://maps.google.com/?cid=16326804486530825650&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAAYBCAA','ChIJFYiCKpqTe0cRsn3saC12lOI','Italian Restaurant','Ristorante Pizzeria Vecchia Napoli','Italy','+39 0431 422751','','','moderate','UD','Friuli-Venezia Giulia','ristorante-pizzeria-vecchia-napoli','https://www.facebook.com/VecchiaNapoli');
INSERT INTO `places` VALUES (_binary '\0',33054,_binary '\0',45.6681149,13.112248,4.5,228,'ATKogpfOOGGO0b588KOGcbllQ8Jt_H0d9PlZtOhGymdeZDjTzUXUm1kO9dp7vrhJJCblkKsRCDasAV7p9T35Fyrby8HDbEj_JF4QMgN5ePklTQm9hLki-fdXuOxP4muclm7hLqTqrQPu7LItj1uIf3KwkZc81iPAulig9XgwKnTtjW0GDUIrqgT-xho5F9yFkmJ_e7dKPZAqr8DQn7dBuIjQR4P8H6Z9elXTz66yMeVDPJDlKTfpGwaFl-S5-4DueHci4yOLBS-fPGCtFFI9GGZvDoyXZ9ZZzBx_WOXKO8Lz5qHTJw','Raggio di Levante','36','Lignano Sabbiadoro','https://maps.google.com/?cid=36091080812899713&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAAYBCAA','ChIJM_E5eX-Te0cRga1pk6U4gAA','Restaurant','Levante - La Terrazza','Italy','+39 329 101 0265','','','moderate','UD','Friuli-Venezia Giulia','levante-la-terrazza','http://www.levantelignano.it/');
INSERT INTO `places` VALUES (_binary '\0',33054,_binary '\0',45.6714519,13.108744,4.2,8664,'w-vK39LKbVsdgOKNVYYID3-YgLMzl8aooqk7zx4I9l30YlvSUF6F_v3DYFRi7Jd92Zb1oUlpiIKxzzgzzD7W9fwrjmbU2WCRpkpoLgGM3IUl1jqtQtHg1_o1Hv0rntZc8JjUrZc5zdHr7G2uNprkcuCXZbUWBdIm_w0WIf_cV9eInB3xrcYZgV4dNOD7xrLTVezAQGAzc-bE3X2fMZjX3IgnbbT5XW8P7YCfROVg5Avi7_vk39_L2usF_CFfR5_wMr_vy8ib4XVumtbk88hbJmVPZaMN8DUdYDSOzzFXWXksRMW1L6','Corso degli Alisei','12','Lignano Sabbiadoro','https://maps.google.com/?cid=14786213185336014789&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAAYBCAA','ChIJmb6fmJuTe0cRxXcmJY0uM80','Restaurant','Ristorante La Botte','Italy','+39 0431 422183','','','inexpensive','UD','Friuli-Venezia Giulia','ristorante-la-botte','http://www.labottelignano.com/');
INSERT INTO `places` VALUES (_binary '\0',33054,_binary '\0',45.667581,13.106681,4.2,1176,'ATKogpdCwINFhTc-4VJ5TaFLA1vb4YUPQALt0GZcOgiTYo0Z1K09h6wffMJT3e5yOL6KxNAoCfgDp59ysCoa_dp-7keIjFt_0pn1KY9k1wdCde1cNavvEXgY_tAzbPbUF6pNrbn5egRd63Csf1tHUn-gF5taPeRd2e1eYaVRD39bBFpOEQpyjrJgv6n5hiDyz10oWQDidKHVthOBJqnDs9mGsHH5s7gMVKuAxqJR2PlluJUEy76FG0KmqMmAWrV8R99hGhrYQyPcej9kO3fHhj5TgU4ArgsfkxGeNiVbqC-YS_2RUg','Raggio dell\Ostro','18','Lignano Sabbiadoro','https://maps.google.com/?cid=9929653951735643360&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAAYBCAA','ChIJqXhKPpmTe0cR4LzB16g3zYk','Italian Restaurant','Ristorante Pizzeria Poseidon','Italy','+39 0431 422279','','','moderate','UD','Friuli-Venezia Giulia','ristorante-pizzeria-poseidon','');
INSERT INTO `places` VALUES (_binary '\0',33054,_binary '\0',46.0707757,13.235727599999999,3.6,902,'SJNf_TQoIkXLCLZerPnsJ7s6JOB9N55CwKJPCqmumYCxFowvEKSm0CsucNjCPBDhLo7SHjOxKSwCrTuzRLIXuiJ6V6QmCQeBKGbI5TkaD9S0pecNyNE5NJIg9SrSMECP0tYAMfKiG4ke8htKWsjsQT3v4OcNKyRVrsnGYQhqcrf2fRnSOiqPXnbjU89ZVtuTEQ53zIFyl81XILgFyId16anvyosslsvxDffVNmrkrYvyFR1cOAVhMdi0xV_pxt-CBUX0gDjEOKDAB3Bi9HAwih7LwDqDEQKRd1Le0Si_29S7k9KPmQ','Piazzale Osoppo','5','Udine','https://maps.google.com/?cid=7083853594173618645&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAAYBCAA','ChIJVb1wnaBKekcR1bmX4U_nTmI','','Bire','Italy','+39 0432 512009','','',NULL,'UD','Friuli-Venezia Giulia','bire','http://www.bire.it/');
INSERT INTO `places` VALUES (_binary '\0',33100,_binary '\0',45.6683589,13.106136399999999,4.8,19,'ATKogpf1Ca41nw8vUocVVEToDkFmdNcwCXN0yxcNrk6kuf4LhLfDALQ-kKclUzcaWp52FMeVqRtIbZ1SuLqcT7GE6YTYFqbxAb64A8pxS54L493eZw4VMi7N9ISoHmKZxXsCgRna4_8OFVn4lOM-vGB66_f-8CpCEQEVH3UKPCaUkM_bTHDeS91YzYYn0b7m8vbatm1Chvbvxp6Sllm3sc1ba_9TT0UTUkCWKZcOJh8BSfRZH1Kb_As-GvSCA0W_KZEPSD1l2Ah1C4jte6jT8oj21iJeB7vemMc7M8arry2HuO3TvQ','Raggio dello Scirocco','11','Lignano Sabbiadoro','https://maps.google.com/?cid=91253942031924872&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAAYBCAA','ChIJY9jDY6OTe0cRiL4qD_oyRAE','Restaurant','Osteria al Picolit con Cicchetteria','Italy','+39 346 810 2090','','',NULL,'UD','Friuli-Venezia Giulia','osteria-al-piccolit-con-cicchetteria','https://www.facebook.com/profile.php?id=61575054385361&locale=it_IT');
INSERT INTO `places` VALUES (_binary '\0',10122,_binary '\0',45.07685,7.6797249999999995,4.5,293,'ATKogpf0kGRqGU3R1fDkYYvox5iY1zWSuA17MapkpyMNKB1WLscc9BwuKG2mtWFv8H_9PmfyAIZFDYYDAapRKT3qE9ej8dpSO-wkRZosM6KLtf9BHeHgYvL0vy1vClH1XavNe0bVbGPhTRcMfqBm3TOa993CWZOEDdkBwlKLIP4v4baxWAg-RVILanrkxVvxGSsSpnxQhjPKNlZUF4DDNcZq9jaPvs_BJm5kMYctn0di7t3k6wGRGEKld08uO68l_Gkz3Zi_YSMkiPNZof01VzQCjWsu85IoBH3dde2ZIdJCnmQOTw','Via Carlo Ignazio Giulio','4','Torino','https://maps.google.com/?cid=16046540117382378230&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAAYBCAA','ChIJMZdkGXVtiEcR9rKh8jfDsN4','Restaurant','Ristorante Casa Amélie','Italy','+39 011 521 1579','','',NULL,'TO','Piemonte','ristorante-casa-amelie','http://www.ristorantecasaamelie.com/');




INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:46:36.263930', 1, 'ATKogpc1zyLjawaV28k3GBINLEGyKJZL3P7aIuFWyKSmQjPjPnkF00pkSTaJ1g7Fv5-3WQ5pCR_N_DfGAde2m0AqPRUsXdtBml4MbTdah7t7qRdbtSp61UrA7Pv1LvtY1Q3UInDQeap68MVoCG1f8apMGaLzBYLjL6geJx1pqUGGIclDa3F0sIaBoGSIoHDT2Pxf5ceJI7z13xYx7IDXbr2qC6u_YIR5CcjNdkZ3kSAZU5AzBbfQmJ-suF4pgzsKAspPNXR7JF4G_hUflvDCaXUP3V1yOAmQd-A6YhQBxFuGfrhBBA',  '93d74433d1457a11_1752223596263', 'backend/downloaded/photos/93d74433d1457a11_1752223596263', 'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:46:36.613284', 2, 'ATKogpebKynxj7Xj1tnkL5RDoU1uj5_FfA-WX65g_RdY1-XMT6Go9F8HUYoJQ4NmmOdHVHiBiOPC5EN8sWGGyeHNbcUXmWRfNCsfWShCTidvok7UBPiIFNNd4M4UJjV57bHHMKND8MppoBtHg54so4HzXcgTqUhZTArnFwsHR9Vbm8nZW-BRehqY13KyhFsDNNLck263jUX5_rasLsd_eBbY6IKYWhA0OrClq83wwY9zt7sPNq3Fui5QYr0wb5SGpuezTaBLCBOWygw4UCpacOJvI2-WnWztbE821RjnVAoXMT_8hA',  'e14d706a017697f5_1752223596613', 'backend/downloaded/photos/e14d706a017697f5_1752223596613', 'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:53:20.858989', 3, 'ATKogpf4hJHNU3Zz2xL7T7GEvpo5iAUzJxX91bQ6IrTsQLIqSSvQKSrez-HubWkWdVQ40uLjtbH1GLg7kOKCvasvAiKsCAyG64twUJa3K3n7b6cv143I7I3-6gkyyxIXf_EJDkjMnRb1MT1LguFgaUXamKx-XwICwLDBJ6e7y3jYTQaeAfgVH2Ncbd_ylv2JGYMjzdPYLqca2Uv5jYnFIR8MOFIpJkcLYSvS3pqGYrkwY_QnbDuEYqNAVgA1owMhc8MMXslCnOVfi9QPnmX-D5BGz3yiV792C8bcs7nl4ou4mJp0pQ',  '3a844eac5c590555_1752224000858', 'backend/downloaded/photos/3a844eac5c590555_1752224000858', 'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:53:21.206964', 4, 'ATKogpfOOGGO0b588KOGcbllQ8Jt_H0d9PlZtOhGymdeZDjTzUXUm1kO9dp7vrhJJCblkKsRCDasAV7p9T35Fyrby8HDbEj_JF4QMgN5ePklTQm9hLki-fdXuOxP4muclm7hLqTqrQPu7LItj1uIf3KwkZc81iPAulig9XgwKnTtjW0GDUIrqgT-xho5F9yFkmJ_e7dKPZAqr8DQn7dBuIjQR4P8H6Z9elXTz66yMeVDPJDlKTfpGwaFl-S5-4DueHci4yOLBS-fPGCtFFI9GGZvDoyXZ9ZZzBx_WOXKO8Lz5qHTJw',  '01306676f18fe16c_1752224001206', 'backend/downloaded/photos/01306676f18fe16c_1752224001206', 'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:53:28.257473', 5, 'ATKogpdMOoPcq_tz6bGkQUC_dnVDssTHa9DZ1P0fyx_5tbbHkJzImDxoiaJJxPxmCK75WDpC655N3pOEfv_kuR4Ce60E2oDHyc7-nVZa9M6uCA2g5pDF65vYpL0ZToYK3zfGEExz7s7JvU3Rb06XsR5uVKMZE_5EL09RPp9m4FukU7rXrTs2o0HG-rVstgjO1jsoWAHR4DMHPnJeY1DK_kHO5eFdwh12UjWkjWizQ0QH8rlPNOvfpSGF7a4eYLrp4y3lVFnHsqkgkrZk2KlKjRKN68mj-zkZGdn0_nWwjki8G5Kly6G141OOl-jEAvgKyXSV49Vs_-0PRoBwbqvmw2rA35Yf6XaNXdnWGtn2fefWvXKG2cJSoVLMOox7HjQ-zap9gNBPk4vC6wA_g_uzYnXSfqwU1dgLxgi1q8zODVHW0WTcmM1W',  'f5335375af363e1a_1752224008257', 'backend/downloaded/photos/f5335375af363e1a_1752224008257', 'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:53:28.427178', 6, 'ATKogpebcugAz4yzx88N7twVkTY-XTuevZVq3ETJL44Zmd-EMqX1bYWmu3s0R0ZG3D_9-szP21-OZz3PztMSHa6ZAoTt4_rsa4lCFFpQN1-pZ8D6avlMVxWIHoz1txeXFpw-vK39LKbVsdgOKNVYYID3-YgLMzl8aooqk7zx4I9l30YlvSUF6F_v3DYFRi7Jd92Zb1oUlpiIKxzzgzzD7W9fwrjmbU2WCRpkpoLgGM3IUl1jqtQtHg1_o1Hv0rntZc8JjUrZc5zdHr7G2uNprkcuCXZbUWBdIm_w0WIf_cV9eInB3xrcYZgV4dNOD7xrLTVezAQGAzc-bE3X2fMZjX3IgnbbT5XW8P7YCfROVg5Avi7_vk39_L2usF_CFfR5_wMr_vy8ib4XVumtbk88hbJmVPZaMN8DUdYDSOzzFXWXksRMW1L6',  'e4d4b41f645218fa_1752224008427', 'backend/downloaded/photos/e4d4b41f645218fa_1752224008427', 'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:56:18.920410', 7, 'ATKogpdfFfDK_ihsiRsZrGgKC4KzAIjh_ggVEqJRIo1t_iAiaLd3QgfT06XCMn1lveW6cZRKN8wfT12j3SL1P03Wm__b9JcytYKtd1bIWoY6SwUmseUWciRhQ74Z2kCV28lkcjEPfJyriBkfNCv0xqKMsdcFhirjFfTV_ZPGon53jcTzBjfIQziPk8TgCw38V55MBTLW4yLPZct_OG3qr_OwhLZwek_X6wS6fmdBuAVcTKcoVaNY_CX_V-a3a7HpkvrQm1bYiEZHcYA_v0VdKP8zkX7y1KzaRY2ddYPj6SIMB1OauIUDaDWiAa8IRznX73OldnhT86nFL6qv-9X-F8u2TkmINhNPfjk50Td7vULzVVDTaYb6ZM5XNV5bYFdUrlc8it98dK0avnIzTk_d6OuMk3ueX22AqN6zngASxzBWrlgNi4fMhQ_rzEYB1SroSg',  'a96bc3def0116e1d_1752224178920', 'backend/downloaded/photos/a96bc3def0116e1d_1752224178920', 'ChIJY9jDY6OTe0cRiL4qD_oyRAE');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:56:19.146329', 8, 'ATKogpf1Ca41nw8vUocVVEToDkFmdNcwCXN0yxcNrk6kuf4LhLfDALQ-kKclUzcaWp52FMeVqRtIbZ1SuLqcT7GE6YTYFqbxAb64A8pxS54L493eZw4VMi7N9ISoHmKZxXsCgRna4_8OFVn4lOM-vGB66_f-8CpCEQEVH3UKPCaUkM_bTHDeS91YzYYn0b7m8vbatm1Chvbvxp6Sllm3sc1ba_9TT0UTUkCWKZcOJh8BSfRZH1Kb_As-GvSCA0W_KZEPSD1l2Ah1C4jte6jT8oj21iJeB7vemMc7M8arry2HuO3TvQ',  '7e3d2c326338ad2a_1752224179145', 'backend/downloaded/photos/7e3d2c326338ad2a_1752224179145', 'ChIJY9jDY6OTe0cRiL4qD_oyRAE');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:58:31.784556', 9, 'ATKogpeLC7S4YH703Ff6-veRICyC4thzPq20wOwbsLFvOP_K55Uyieeo_4m-5Ql_yID8cf1RYaRLUk2iYbFzzrYEpNMRUgubdTFWbL5OzCKIuuGDdlaaC0u7cR1mRfDnt66hKuFYwZ92vTl-0F__1wKWuQ_TMb-GONxcOe6Bf9zmv9qMBZJvyiqy8j0UBfbT_P0-X60axP4NAsIN8y1eozoBY58elWpsIgi5RyxsJgBO3wyjXvcvVY0p0zx6RDDRqXQuxCtoUU3lYsZHVqM649glJxZ_8Ln3CGFmaJ1RsIJ0ug0r3cg6aGIDxgTM1g8PNHBduXd7xKjfzhMDX5Nw8xOJLY5teYsKx4PspN8TGTNWwS8hJ896TCEjFOq0OeiKC5ZDbP8kyjFJxtRPvPWHKB-ncGjvaQfERuMWuDtx56gQQ84_LBo',  'c1f6bb8e762c075d_1752224311784', 'backend/downloaded/photos/c1f6bb8e762c075d_1752224311784', 'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:58:31.917804', 10, 'ATKogpdCwINFhTc-4VJ5TaFLA1vb4YUPQALt0GZcOgiTYo0Z1K09h6wffMJT3e5yOL6KxNAoCfgDp59ysCoa_dp-7keIjFt_0pn1KY9k1wdCde1cNavvEXgY_tAzbPbUF6pNrbn5egRd63Csf1tHUn-gF5taPeRd2e1eYaVRD39bBFpOEQpyjrJgv6n5hiDyz10oWQDidKHVthOBJqnDs9mGsHH5s7gMVKuAxqJR2PlluJUEy76FG0KmqMmAWrV8R99hGhrYQyPcej9kO3fHhj5TgU4ArgsfkxGeNiVbqC-YS_2RUg',  '011f161ffb449cc1_1752224311917', 'backend/downloaded/photos/011f161ffb449cc1_1752224311917', 'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:58:44.188302', 11, 'ATKogpeK-DdGCJMvS8nXmcC-2Cz2KGwemZxqW-hOMZkHecy96s00GNFGgIACvlmP44IS-MAs5NfXfhEno6221fCljW2c-_Xce2id319Ey9urt-Aas3aVMdHBHrPntBlfwMtARYkikJSv3ckKJEk1nSyST-7gyS6Q7ro94t0KHZZ60OrPufDwVPtdwy-bYCuUO5rYt4KteMq46aSoBvj3vg4D7EbSfLMe5n435F-FovLAaLMHGGcB0l7AD11OvKyOmVq1S_TeKtcfmqSnacCQJIQFJCYkq4vdz2PQHknJMjkM9igLFh12UZ4GcZ4C9K5m-KL8xhQ3fcafMYqpJIsNvKPBJ_MHfl4AQLv4kNK9aKeNoCHqQgZlL-mdnvrY3dyO6MXe0B-pNxTNgLp7AVtRprkVR86D9Vo6SbkBTwY66Ub8qZsMgwMH',  'a5ea7fe5909435e9_1752224324188', 'backend/downloaded/photos/a5ea7fe5909435e9_1752224324188', 'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO photos (created_at, id, photo_reference,  file_name, file_path, place_id) VALUES ('2025-07-11 10:58:44.308821', 12, 'ATKogpez6MUYwj1359HX94O-G5-sNoNDkq6zxMIKrGP2CQcNd5Shg_qn9tmiyr6nPRY6dSLgSMjGuBm0daWEicXjd1beVnN4kJz5qMhHr7bt5LRlNa4QbMq18gIuYtxGCOvClqPYpMocy5FNNGnjN4ym3LSzhkDbpceGFaDvdj-gwnG9Q8ITjH2ff9f1nLlELblB9naSn5cm0Mn_RyU3gGLsCQTbfgZ7cgsjphj3FO7GR8Luo-0VxRLXUMAEqcYVNg5IHPJXC0K1C6cW_wt9BU05lsfMJKiTCNkwp0qBfx5NbQ-r5i3hZC2Kak-gEokeqzEHkrS0q7W-3mR8_xnnJM7kUnwvRfxfcxErBL64K2fZWqbyJRlUn86_L4pJb9Aoyas42vJoIMmgZWpdSD0BOF1eYC1EY35-DonJP20o4MgFzLEfS74',  '9bbf97f39cd9928d_1752224324308', 'backend/downloaded/photos/9bbf97f39cd9928d_1752224324308', 'ChIJ534ctZ6Te0cRXjpRSahupgE');




INSERT INTO `place_tag` VALUES (1,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (2,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (4,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (6,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (7,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (10,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (11,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (16,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (17,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (18,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (19,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (25,'ChIJ534ctZ6Te0cRXjpRSahupgE');
INSERT INTO `place_tag` VALUES (1,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (2,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (3,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (4,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (5,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (6,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (7,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (8,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (9,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (10,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (11,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (12,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (13,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (14,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (16,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (17,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (18,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (19,'ChIJFYiCKpqTe0cRsn3saC12lOI');
INSERT INTO `place_tag` VALUES (2,'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO `place_tag` VALUES (4,'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO `place_tag` VALUES (5,'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO `place_tag` VALUES (7,'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO `place_tag` VALUES (8,'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO `place_tag` VALUES (12,'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO `place_tag` VALUES (14,'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO `place_tag` VALUES (16,'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO `place_tag` VALUES (17,'ChIJM_E5eX-Te0cRga1pk6U4gAA');
INSERT INTO `place_tag` VALUES (1,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (2,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (3,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (4,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (5,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (6,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (7,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (9,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (10,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (11,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (12,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (13,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (14,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (16,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (17,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (19,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (21,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (22,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (24,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (27,'ChIJmb6fmJuTe0cRxXcmJY0uM80');
INSERT INTO `place_tag` VALUES (1,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (2,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (4,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (5,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (6,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (7,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (8,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (10,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (11,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (12,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (13,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (16,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (17,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (18,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (24,'ChIJqXhKPpmTe0cR4LzB16g3zYk');
INSERT INTO `place_tag` VALUES (1,'ChIJY9jDY6OTe0cRiL4qD_oyRAE');
INSERT INTO `place_tag` VALUES (2,'ChIJY9jDY6OTe0cRiL4qD_oyRAE');
INSERT INTO `place_tag` VALUES (28,'ChIJY9jDY6OTe0cRiL4qD_oyRAE');

DELETE FROM role_user WHERE user_id IN (SELECT id FROM users WHERE username = 'admin');
DELETE FROM users WHERE username = 'admin';
DELETE FROM roles WHERE name IN ('ADMIN', 'USER');

-- Inserisci i ruoli
INSERT INTO roles (name) VALUES ('ADMIN');
INSERT INTO roles (name) VALUES ('USER');

-- Inserisci l'utente admin
INSERT INTO users (username, password) VALUES ('admin', '{noop}admin123');

-- Collega l'utente al ruolo (usando le query per essere sicuri degli ID)
INSERT INTO role_user (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.username = 'admin' AND r.name = 'ADMIN';