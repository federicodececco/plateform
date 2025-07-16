import { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css';
import { useGlobalContext } from '../context/GlobalContext';
import RegionCard from '../components/RegionCard';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';
import {axios} from "../../api/axios"

const regionsData = [
    {
        id: 'campania', // Un ID unico è utile in React per le chiavi nelle liste
        regionName: 'Campania',
        description: 'Pizza napoletana, cucina mediterranea',
        restaurantCount: '1,247',
    },
    {
        id: 'toscana',
        regionName: 'Toscana',
        description: 'Cucina tradizionale, vini pregiati',
        restaurantCount: '892',
    },
    {
        id: 'sicilia',
        regionName: 'Sicilia',
        description: 'Pesce fresco, arancini, cannoli',
        restaurantCount: '654',
    },
    {
        id: 'liguria',
        regionName: 'Liguria',
        description: 'Pesto, focaccia, cucina marinara',
        restaurantCount: '423',
    },
];

export default function HomePage() {
    const { t } = useTranslation();
    const { navSearchBar, setNavSearchBar } = useGlobalContext()
    const [formData, setFormData] = useState({ location: '', date: '', people: '' })

    const handleFormData = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDebouncedSearchRestaurant = useCallback(debounce(chiamataApi, 300), [])

    function chiamataApi() {
        console.log("Funzione di stampa chiamata");
    }

    const handleEnterUp = e => {
        if (e.key === 'Enter') {
            // effettuare la chiamata api qui
            handleDebouncedSearchRestaurant();
        }
    }

    return (
        <div className={styles["hero-search-section-container"]}>
            {/* Intestazione */}
            <h1 className={styles["hero-title"]}>{t('heroTitle')}</h1>
            <p className={styles["hero-description"]}>{t('heroDescription')}</p>

            {/* Box di ricerca */}
            <div className={styles["search-box"]}>
                <div className={styles["search-field"]}>
                    <label htmlFor="location">{t('locationLabel')}</label>
                    <div className={styles["input-with-icon"]}>
                        <input name='location' onKeyUp={handleEnterUp} value={formData.location} onChange={handleFormData} type="text" id="location" placeholder={t('locationPlaceholder')} />
                        <span className={styles["icon"]}>📍</span>
                    </div>
                </div>

                <div className={styles["search-field"]}>
                    <label htmlFor="date">{t('date')}</label>
                    <div className={styles["input-with-icon"]}>
                        <input
                            onKeyUp={handleEnterUp}
                            name='date'
                            type="date"
                            id="date"
                            value={formData.date}
                            onChange={handleFormData}
                        />
                        <span className={styles["icon"]}>🗓️</span> {/* Icona a fianco */}
                    </div>
                </div>

                <div className={styles["search-field"]}>
                    <label htmlFor="people">{t('people')}</label>
                    <div className={styles["custom-select"]}>
                        <select id="people" defaultValue="2" name='people' onChange={handleFormData}>
                            <option value="1">{t('onePerson')}</option>
                            <option value="2">{t('twoPeople')}</option>
                            <option value="3">{t('threePeople')}</option>
                            <option value="4">{t('fourPeople')}</option>
                            <option value="5">{t('fivePeople')}</option>
                            <option value="6">{t('sixPeople')}</option>
                            <option value="7">{t('sevenPeople')}</option>
                            <option value="8">{t('eightPeople')}</option>
                            <option value="9">{t('ninePeople')}</option>
                            <option value="10">{t('tenPlusPeople')}</option>
                        </select>
                        <span className={styles["select-arrow"]}></span>
                    </div>
                </div>

                <button onClick={handleDebouncedSearchRestaurant} className={styles["search-restaurants-button"]}>{t('searchRestaurants')}</button>
            </div>

            <section className={styles["explore-by-region-section"]}>
                <div className={styles["container"]}>
                    <h2 className={styles["section-title"]}>{t('exploreByRegionTitle')}</h2>
                    <p className={styles["section-description"]}>{t('exploreByRegionDescription')}</p>

                    <div className={styles["region-cards-grid"]}>
                        {regionsData.map((region) => (
                            <RegionCard
                                key={region.id} // Importante per le liste in React
                                regionName={region.regionName}
                                description={region.description}
                                restaurantCount={region.restaurantCount}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
