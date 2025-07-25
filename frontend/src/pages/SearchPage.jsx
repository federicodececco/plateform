import { useCallback, useEffect, useMemo, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import styles from './SearchPage.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from '../context/GlobalContext';
import { debounce } from 'lodash';
import BreadcrumbsCard from '../components/breadcrumbsCard';
import { FaSearch, FaSpinner, FaStar } from 'react-icons/fa';

export default function SearchPage() {

    const searchParams = new URLSearchParams(location.search);

    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const [placesData, setPlacesData] = useState([])
    const [regionData, setRegionData] = useState([])
    const [categoryData, setCategoryData] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [searchLocation, setSearchLocation] = useState(searchParams.get('city') || '');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    const { region } = useParams()
    const {
        getPlaces, getPlacesByRegion, closeShowLanguageOptions,
        getTags, getCategory, getPlacesFiltered
    } = useGlobalContext()

    const priceMap = ["free", "inexpensive", "moderate", "expensive", "very expensive",]

    const isEn = i18n.language === 'en'

    const [filter, setFilter] = useState({
        category: searchParams.get('category') || '',
        price: searchParams.get('price') || '',
        rating: searchParams.get('rating') || '',
        services: searchParams.get('services') || ''
    })

    // questa funzione di debounce serve per evitare di fare troppe chiamate API quando l'utente digita nella barra di ricerca
    // il primo parametro: handleSearchRestaurant dice la funzione che chiama, 300 sono i millisecondi di attesa prima di eseguire la funzione
    const handleDebouncedSearchRestaurant = useCallback(debounce(handleSearchRestaurant, 300), [])

    async function handleSearchRestaurant(location) {
        try {
            const response = await getPlaces(location)
            setPlacesData(response.content)
        } catch (error) {
            console.error(error);
        }
    }

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

    useEffect(() => {
        if (region !== undefined) {
            (async () => {
                try {
                    const dataRegion = await getPlacesByRegion(region)
                    setRegionData(dataRegion)
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [region])

    useEffect(() => {

        const filtersArr = []
        let url = region ? `/search/${region}` : `/search`;

        // inizio popolazione array dei filtri
        if (searchLocation !== '') {
            filtersArr.push(`name=${searchLocation}`)
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


    }, [searchLocation, filter])

    useEffect(() => {
        if (searchLocation.trim() !== '') {
            handleDebouncedSearchRestaurant(searchLocation)
        }
    }, [searchLocation])

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const filteredData = await getPlacesFiltered(filter)
    //             setPlacesData(filteredData)
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     })();
    // }, [filter])

    useEffect(() => {
        (async () => {
            try {
                const tags = await getTags()
                setServicesData(tags)
                const categorys = await getCategory()
                setCategoryData(categorys)
            } catch (error) {
                console.error(error);
            }
        })();
    }, [])

    return (
        <>
            <BreadcrumbsCard region={region} />
            <div onClick={closeShowLanguageOptions} className={styles["search-page"]}>
                {/* Breadcrumbs */}

                {/* Hero Section / Header */}
                <div className={styles["hero-section"]}>
                    <h1>{t('searchTitle')}</h1>
                    <p>{t('searchDescription')}</p>

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
                            {categoryData.length > 0 && categoryData.map(c => {
                                if (c.isVisible === null || c.isVisible === false) return
                                return <option key={c.id} value={c.googleName}>{isEn ? c.enName : c.itName}</option>
                            })}
                        </select>
                        {/* <select aria-label={t('cuisineOption')} name='cuisine' onChange={handleInputChange} className={styles["filter-dropdown"]}>
                            <option className={styles.optionPlaceHolder}>{t('cuisineOption')}</option>
                            <option value='pizza'>pizza</option>
                        </select> */}
                        <select aria-label={t('priceRangeOptions')} name='price' onChange={handleInputChange} className={styles["filter-dropdown"]}>
                            <option className={styles.optionPlaceHolder}>{t('priceRangeOption')}</option>
                            {priceMap.map((price) =>
                                <option key={price} value={price}>{price}</option>
                            )}
                        </select>
                        <select aria-label={t('ratingOption')} name='rating' onChange={handleInputChange} className={styles["filter-dropdown"]}>
                            <option className={styles.optionPlaceHolder}>{t('ratingOption')}</option>
                            <option value="1">1 {t('star')}</option>
                            <option value="2">2 {t('star')}</option>
                            <option value="3">3 {t('star')}</option>
                            <option value="4">4 {t('star')}</option>
                            <option value="5">5 {t('star')}</option>
                        </select>
                        <select aria-label={t('services')} name='services' onChange={handleInputChange} className={styles["filter-dropdown"]}>
                            <option className={styles.optionPlaceHolder}>{t('services')}</option>
                            {servicesData.length > 0 && servicesData.map(c => {
                                if (c.isVisible === null || c.isVisible === false) return
                                return <option key={c.id} value={c.googleName}>{isEn ? c.enName : c.itName}</option>
                            })}
                        </select>
                    </div>
                    {/* <div className={styles["sort-by"]}>
                        <span>{t('sortByLabel')}</span>
                        
                        <select aria-label={t('mostPopularOption')} className={styles["sort-dropdown"]} onChange={handleSort}>
                        
                            <option data-value='popular' className={styles.optionPlaceHolder}>{t('mostPopularOption')}</option>
                            <option data-value='popular' >popular</option>
                        </select>
                    </div> */}
                </div>

                {/* Lista dei ristoranti */}
                <div className={styles["restaurant-list-container"]}>
                    {(placesData.length === 0 && regionData.length === 0) ? (
                        <div className='noResults'>
                            <div className='noResultsIcon'>
                                <FaSearch />
                            </div>
                            <h3 className='noResultsTitle'>
                                {t('noRestaurantsFound')}
                            </h3>
                            <p className='noResultsText'>
                                {t('noResultsText')}
                            </p>
                        </div>
                    ) : (placesData.length > 0) ?
                        placesData.map((restaurant, index) => (
                            <RestaurantCard key={index} restaurant={restaurant} />
                        )) :
                        regionData.map((restaurant, index) => (
                            <RestaurantCard key={index} restaurant={restaurant} />
                        ))
                    }
                </div>
            </div>
        </>
    );
};
