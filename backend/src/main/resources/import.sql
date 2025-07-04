
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

