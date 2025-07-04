import RestaurantCard from '../components/RestaurantCard';
import styles from './SearchPage.module.css';
import { useTranslation } from 'react-i18next';

export default function SearchPage() {

    const { t } = useTranslation();
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
                <a href="/">{t('homeBreadcrumb')}</a> &gt; <a href="/ristoranti">{t('restaurants')}</a> &gt; <span>{t('amalfiCoastTitle').split(' ')[1]}</span>
            </div>

            {/* Hero Section / Header */}
            <div className={styles["hero-section"]}>
                <h1>{t('amalfiCoastTitle')}</h1>
                <p>{t('amalfiCoastDescription')}</p>

                {/* Search Bar */}
                <div className={styles["search-bar-container"]}>
                    <div className={styles["location-input-wrapper"]}>
                        <input type="text" placeholder={t('searchByLocationPlaceholder')} className={styles["location-input"]} />
                        <span className={styles["location-icon"]}>📍</span>
                    </div>
                    <button className={styles["search-button"]}>{t('searchRestaurants')}</button>
                </div>
            </div>

            {/* Filters and Sort */}
            <div className={styles["filters-sort-section"]}>
                <div className={styles["filters"]}>
                    <span>{t('filtersLabel')}</span>
                    <select className={styles["filter-dropdown"]}>
                        <option>{t('allLocationsOption')}</option>
                    </select>
                    <select className={styles["filter-dropdown"]}>
                        <option>{t('priceRangeOption')}</option>
                    </select>
                    <select className={styles["filter-dropdown"]}>
                        <option>{t('cuisineOption')}</option>
                    </select>
                </div>
                <div className={styles["sort-by"]}>
                    <span>{t('sortByLabel')}</span>
                    <select className={styles["sort-dropdown"]}>
                        <option>{t('mostPopularOption')}</option>
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
