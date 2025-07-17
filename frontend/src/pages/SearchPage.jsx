import { useEffect, useMemo, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import styles from './SearchPage.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

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

export default function SearchPage() {

    const searchParams = new URLSearchParams(location.search);

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [placesData, setPlacesData] = useState(restaurantsData)
    const [searchLocation, setSearchLocation] = useState(searchParams.get('city') || '');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    const [filter, setFilter] = useState({
        category: searchParams.get('category') || '',
        cuisine: searchParams.get('cuisine') || '',
        price: searchParams.get('price') || '',
        rating: searchParams.get('rating') || '',
        services: searchParams.get('services') || ''
    })


    useEffect(() => {

        const filtersArr = []
        let url = `/Search`;

        // inizio popolazione array dei filtri
        if (searchLocation) {
            filtersArr.push(`city=${searchLocation}`)
        }
        if (filter.category) {
            filtersArr.push(`category=${filter.category}`)
        }
        if (filter.cuisine) {
            filtersArr.push(`cuisine=${filter.cuisine}`)
        }
        if (filter.price) {
            filtersArr.push(`price=${filter.price}`)
        }
        if (filter.rating) {
            filtersArr.push(`rating=${filter.rating}`)
        }
        if (filter.services) {
            filtersArr.push(`services=${filter.services}`)
        }
        // fine popolazione array dei filtri
        // controllo se ci sono dei filtri ne caso concateno il punto interrogativo all'url per permettere di metter i parametri
        if (searchLocation !== '' || filter.category !== '' || filter.cuisine !== '' || filter.price !== '' || filter.rating !== '' || filter.services !== '') {
            url += '?'
        }

        // concateno all'url i parametri uniti dall'end logico
        if (filtersArr) {
            url += filtersArr.join('&')
        }

        navigate(url);

        return
    }, [searchLocation, filter])

    const handleInputChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    const handleSort = e => {

        const currOrder = e.target.name

        if (sortBy === currOrder) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(currOrder);
            setSortOrder(1);
        }
    }

    const orderedPlacesData = useMemo(() => {
        let result = [...placesData]
        return result.sort((a, b) =>
            sortOrder === 1
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
    }, [placesData, sortBy, sortOrder])

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
                        <input
                            onChange={(e) => setSearchLocation(e.target.value)}
                            value={searchLocation}
                            type="text"
                            placeholder={t('searchByLocationPlaceholder')}
                            className={styles["location-input"]} />
                        <span className={styles["location-icon"]}>📍</span>
                    </div>
                    <button onClick={() => console.log(filter)} className={styles["search-button"]}>{t('searchRestaurants')}</button>
                </div>
            </div>

            <div className={styles["filters-sort-section"]}>
                <div className={styles["filters"]}>
                    <span>{t('filtersLabel')}</span>
                    <select aria-label={t('categoryOption')} name='category' onChange={handleInputChange} className={styles["filter-dropdown"]}>
                        <option className={styles.optionPlaceHolder}>{t('categoryOption')}</option>
                        <option value='pizza'>pizza</option>
                        <option value='pasta'>pasta</option>
                    </select>
                    <select aria-label={t('cuisineOption')} name='cuisine' onChange={handleInputChange} className={styles["filter-dropdown"]}>
                        <option className={styles.optionPlaceHolder}>{t('cuisineOption')}</option>
                        <option value='pizza'>pizza</option>
                    </select>
                    <select aria-label={t('priceRangeOptions')} name='price' onChange={handleInputChange} className={styles["filter-dropdown"]}>
                        <option className={styles.optionPlaceHolder}>{t('priceRangeOption')}</option>
                        <option value='pasta'>pasta</option>
                    </select>
                    <select aria-label={t('ratingOption')} name='rating' onChange={handleInputChange} className={styles["filter-dropdown"]}>
                        <option className={styles.optionPlaceHolder}>{t('ratingOption')}</option>
                    </select>
                    <select aria-label={t('services')} name='services' onChange={handleInputChange} className={styles["filter-dropdown"]}>
                        <option className={styles.optionPlaceHolder}>{t('services')}</option>
                    </select>
                </div>
                <div className={styles["sort-by"]}>
                    <span>{t('sortByLabel')}</span>
                    {/* fare un bottone se resta solo un opzione per l'ordinamento delle card */}
                    <select aria-label={t('mostPopularOption')} className={styles["sort-dropdown"]} onChange={handleSort}>
                        {/* <option data-value='popular' className={styles.optionPlaceHolder} onChange={handleSort}>{t('mostPopularOption')}</option> */}
                        <option data-value='popular' className={styles.optionPlaceHolder}>{t('mostPopularOption')}</option>
                        <option data-value='popular' >popasdf</option>
                        <option data-value='caprone' >capora</option>
                    </select>
                </div>
            </div>

            {/* Lista dei ristoranti */}
            <div className={styles["restaurant-list-container"]}>
                {orderedPlacesData.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};
