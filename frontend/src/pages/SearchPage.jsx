import RestaurantCard from '../components/RestaurantCard';
import styles from './SearchPage.module.css';

export default function SearchPage() {

    const restaurantsData = [
        {
            name: "Osteria del Mare Amalfi",
            location: "Via Marina Grande, 84011 Amalfi SA",
            description: "Elegante osteria ad Amalfi con cucina gourmet. Perfetto per una cena romantica con specialità di mare e vini pregiati.",
            tags: ["Cucina Gourmet", "Cantina Vini", "Disponibile", "Parcheggio"],
            price: "€€€ - Da €65 a persona",
            rating: 4.8,
            actionText: "Prenota Tavolo",
            actionType: "book"
        },
        {
            name: "Trattoria Nonna Rosa Ravello",
            location: "Via della Repubblica Marinara, 84010 Ravello SA",
            description: "Storico stabilimento balneare di Ravello con tradizione familiare. Offre un'esperienza autentica della Costiera Amalfitana.",
            tags: ["Cucina Tradizionale", "Bar", "Spogliatoi", "Ombrelloni"],
            price: "Da €35/giorno", // Esempio diverso di prezzo
            rating: 4.1,
            actionText: "Vedi Dettagli",
            actionType: "details"
        }
        // Aggiungi altri ristoranti qui
    ];

    return (
        <div className={styles["search-page"]}>
            {/* Breadcrumbs */}

            {/* Da riprodurre dinamicamente con i link delle pagine precedenti */}
            <div className={styles["breadcrumbs"]}>
                <a href="/">Home</a> &gt; <a href="/ristoranti">Ristoranti</a> &gt; <span>Costiera Amalfitana</span>
            </div>

            {/* Hero Section / Header */}
            <div className={styles["hero-section"]}>
                <h1>Ristoranti Costiera Amalfitana</h1>
                <p>Scopri i migliori ristoranti lungo la splendida Costiera Amalfitana. Prenota il tuo tavolo per un'esperienza culinaria indimenticabile.</p>

                {/* Search Bar */}
                <div className={styles["search-bar-container"]}>
                    <div className={styles["location-input-wrapper"]}>
                        <input type="text" placeholder="Cerca per località..." className={styles["location-input"]} />
                        <span className={styles["location-icon"]}>📍</span>
                    </div>
                    <button className={styles["search-button"]}>Cerca Ristoranti</button>
                </div>
            </div>

            {/* Filters and Sort */}
            <div className={styles["filters-sort-section"]}>
                <div className={styles["filters"]}>
                    <span>Filtri:</span>
                    <select className={styles["filter-dropdown"]}>
                        <option>Tutte le località</option>
                    </select>
                    <select className={styles["filter-dropdown"]}>
                        <option>Fascia di prezzo</option>
                    </select>
                    <select className={styles["filter-dropdown"]}>
                        <option>Cucina</option>
                    </select>
                </div>
                <div className={styles["sort-by"]}>
                    <span>Ordina per:</span>
                    <select className={styles["sort-dropdown"]}>
                        <option>Più popolari</option>
                    </select>
                </div>
            </div>

            {/* Lista dei ristoranti */}
            <div className={styles["restaurant-list-container"]}>
                {restaurantsData.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};
