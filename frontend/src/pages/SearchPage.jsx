import RestaurantCard from '../components/RestaurantCard';
import styles from './SearchPage.module.css';
import { useTranslation } from 'react-i18next';

export default function SearchPage() {

    const { t } = useTranslation();
    const restaurantsData = [
        {
            name: "Osteria del Mare Amalfi",
            address: "Via dei Pescatori",
            description: "Elegante osteria ad Amalfi con cucina gourmet. Perfetto per una cena romantica con specialità di mare e vini pregiati.",
            tags: ["Cucina Gourmet", "Cantina Vini", "Disponibile", "Parcheggio"],
            price: "moderate",
            rating: 4.8,
            actionText: "Prenota Tavolo",
            actionType: "book",
            "adressNumber": "12",
            "city": "Napoli",
            "cap": 80100,
            "province": "NA",
        },
        {
            name: "Trattoria Nonna Rosa Ravello",
            address: "Via della Repubblica Marinara",
            description: "Storico stabilimento balneare di Ravello con tradizione familiare. Offre un'esperienza autentica della Costiera Amalfitana.",
            tags: ["Cucina Tradizionale", "Bar", "Spogliatoi", "Ombrelloni"],
            price: "very expensive",
            rating: 3.0,
            actionText: "Vedi Dettagli",
            actionType: "details",
            "adressNumber": "12",
            "city": "Napoli",
            "cap": 80100,
            "province": "NA",
        }
        // Aggiungi altri ristoranti qui
    ];

    // const Category = {
    //     id, //int
    //     googleName, //string
    //     enName, //string
    //     itName, //string
    //     isVisible, //bool
    //     places,//array  di locali $ref: "#/components/schemas/Place"
    // }

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
                    <select
                        aria-label={t('allLocationsOption')} className={styles["filter-dropdown"]}>
                        <option className={styles.optionPlaceHolder}>{t('allLocationsOption')}</option>
                    </select>
                    <select aria-label={t('priceRangeOptions')} className={styles["filter-dropdown"]}>
                        <option className={styles.optionPlaceHolder}>{t('priceRangeOption')}</option>
                    </select>
                    <select aria-label={t('cuisineOption')} className={styles["filter-dropdown"]}>
                        <option className={styles.optionPlaceHolder}>{t('cuisineOption')}</option>
                    </select>
                </div>
                <div className={styles["sort-by"]}>
                    <span>{t('sortByLabel')}</span>
                    <select aria-label={t('mostPopularOption')} className={styles["sort-dropdown"]}>
                        <option className={styles.optionPlaceHolder}>{t('mostPopularOption')}</option>
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
