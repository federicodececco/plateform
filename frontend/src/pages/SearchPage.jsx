import { useCallback, useEffect, useMemo, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import styles from './SearchPage.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from '../context/GlobalContext';
import { debounce } from 'lodash';
import BreadcrumbsCard from '../components/breadcrumbsCard';

export default function SearchPage() {

    const searchParams = new URLSearchParams(location.search);

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [placesData, setPlacesData] = useState([])
    const [searchLocation, setSearchLocation] = useState(searchParams.get('city') || '');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    const { region } = useParams()

    const [filter, setFilter] = useState({
        category: searchParams.get('category') || '',
        cuisine: searchParams.get('cuisine') || '',
        price: searchParams.get('price') || '',
        rating: searchParams.get('rating') || '',
        services: searchParams.get('services') || ''
    })

    const { getPlaces, closeShowLanguageOptions } = useGlobalContext()

    // questa funzione di debounce serve per evitare di fare troppe chiamate API quando l'utente digita nella barra di ricerca
    // il primo parametro: handleSearchRestaurant dice la funzione che chiama, 300 sono i millisecondi di attesa prima di eseguire la funzione
    const handleDebouncedSearchRestaurant = useCallback(debounce(handleSearchRestaurant, 300), [])

    async function handleSearchRestaurant(location) {
        const response = await getPlaces(location)
        console.log(response);
        setPlacesData(response.content)
    }

    useEffect(() => {
        handleDebouncedSearchRestaurant(searchLocation)
    }, [searchLocation])

    // useEffect(() => {

    //     const filtersArr = []
    //     let url = `/Search`;

    //     // inizio popolazione array dei filtri
    //     if (searchLocation) {
    //         filtersArr.push(`city=${searchLocation}`)
    //     }
    //     if (filter.category) {
    //         filtersArr.push(`category=${filter.category}`)
    //     }
    //     if (filter.cuisine) {
    //         filtersArr.push(`cuisine=${filter.cuisine}`)
    //     }
    //     if (filter.price) {
    //         filtersArr.push(`price=${filter.price}`)
    //     }
    //     if (filter.rating) {
    //         filtersArr.push(`rating=${filter.rating}`)
    //     }
    //     if (filter.services) {
    //         filtersArr.push(`services=${filter.services}`)
    //     }
    //     // fine popolazione array dei filtri
    //     // controllo se ci sono dei filtri ne caso concateno il punto interrogativo all'url per permettere di metter i parametri
    //     if (searchLocation !== '' || filter.category !== '' || filter.cuisine !== '' || filter.price !== '' || filter.rating !== '' || filter.services !== '') {
    //         url += '?'
    //     }

    //     // concateno all'url i parametri uniti dall'end logico
    //     if (filtersArr) {
    //         url += filtersArr.join('&')
    //     }

    //     navigate(url);

    //     return
    // }, [searchLocation, filter])

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
        <>
            <BreadcrumbsCard region={region} />
            <div onClick={closeShowLanguageOptions} className={styles["search-page"]}>
                {/* Breadcrumbs */}

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
                        <button onClick={() => handleDebouncedSearchRestaurant(searchLocation)} className={styles["search-button"]}>{t('searchRestaurants')}</button>
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
                    {placesData.map((restaurant, index) => (
                        <RestaurantCard key={index} restaurant={restaurant} />
                    ))}
                </div>
            </div>
        </>
    );
};
