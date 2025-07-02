import { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css';
import { useGlobalContext } from '../context/GlobalContext';
import RegionCard from '../components/RegionCard';
import debounce from 'lodash/debounce';

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
            <h1 className={styles["hero-title"]}>Trova il Ristorante Perfetto</h1>
            <p className={styles["hero-description"]}>Scopri i migliori ristoranti d'Italia. Prenota il tuo tavolo e vivi un'esperienza culinaria indimenticabile.</p>

            {/* Box di ricerca */}
            <div className={styles["search-box"]}>
                <div className={styles["search-field"]}>
                    <label htmlFor="location">Dove</label>
                    <div className={styles["input-with-icon"]}>
                        <input name='location' onKeyUp={handleEnterUp} value={formData.location} onChange={handleFormData} type="text" id="location" placeholder="Città o regione..." />
                        <span className={styles["icon"]}>📍</span>
                    </div>
                </div>

                <div className={styles["search-field"]}>
                    <label htmlFor="date">Data</label>
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
                    <label htmlFor="people">Persone</label>
                    <div className={styles["custom-select"]}>
                        <select id="people" defaultValue="2" name='people' onChange={handleFormData}>
                            <option value="1">1 persona</option>
                            <option value="2">2 persone</option>
                            <option value="3">3 persone</option>
                            <option value="4">4 persone</option>
                            <option value="5">5 persone</option>
                            <option value="6">6 persone</option>
                            <option value="7">7 persone</option>
                            <option value="8">8 persone</option>
                            <option value="9">9 persone</option>
                            <option value="10">10+ persone</option>
                        </select>
                        <span className={styles["select-arrow"]}></span>
                    </div>
                </div>

                <button onClick={handleDebouncedSearchRestaurant} className={styles["search-restaurants-button"]}>Cerca Ristoranti</button>
            </div>

            <section className={styles["explore-by-region-section"]}>
                <div className={styles["container"]}>
                    <h2 className={styles["section-title"]}>Esplora per Regione</h2>
                    <p className={styles["section-description"]}>Scopri le specialità culinarie delle diverse regioni italiane</p>

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
