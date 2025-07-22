import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaClock, FaStar, FaSpinner } from 'react-icons/fa'; // Importa le icone da react-icons/fa
import styles from './SettingPlacesPage.module.css'; // Importa il modulo CSS
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';

export default function SettingPlacesPage() {

    const [formData, setFormData] = useState({
        query: '',
        latitude: '',
        longitude: '',
        radius: '',
        maxResults: '19'
    });

    const { t } = useTranslation();
    const { closeShowLanguageOptions, googleSearch, renderPrice, addPlace } = useGlobalContext()
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = async () => {
        if (!formData.query.trim()) {
            setError('Inserisci un termine di ricerca');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await googleSearch(formData);
            console.log(response.places);

            setSearchResults(response.places);
        } catch (err) {
            console.error(err)
            setError('Errore durante la ricerca: ' + err.message);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEnterUp = e => {
        if (e.key === 'Enter') {
            // effettuare la chiamata api qui
            handleSearch();
        }
    }

    const handleAddPlace = id => {
        try {
            addPlace(id)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div onClick={closeShowLanguageOptions} className={styles.pageContainer}>

            <div className={styles.mainContent}>

                {/* Hero Section */}
                <div className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>
                        {t('insertRestaurantDetails')}
                    </h1>
                </div>

                {/* Search Section - RestFinder Style */}
                <div className={styles.searchSection}>
                    <div className={styles.searchCard}>
                        <div className={styles.searchGrid}>

                            {/* Query Field */}
                            <div className={styles.queryField}>
                                <label className={styles.formLabel}>
                                    {t('searchRestaurant')}
                                </label>
                                <input
                                    type="text"
                                    name="query"
                                    value={formData.query}
                                    onChange={handleInputChange}
                                    onKeyUp={handleEnterUp}
                                    placeholder={t('exampleSearchPlaceholder')}
                                    className={styles.formInput}
                                />
                            </div>

                            {/* Location Fields */}
                            <div className={styles.locationField}>
                                <label className={styles.formLabel}>
                                    {t('latitude')}
                                </label>
                                <input
                                    type="number"
                                    name="latitude"
                                    value={formData.latitude}
                                    onChange={handleInputChange}
                                    placeholder="40.6319"
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.locationField}>
                                <label className={styles.formLabel}>
                                    {t('longitude')}
                                </label>
                                <input
                                    type="number"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleInputChange}
                                    placeholder="14.6026"
                                    className={styles.formInput}
                                />
                            </div>

                            {/* Search Button */}
                            <div className={styles.searchButtonContainer}>
                                <button
                                    onClick={handleSearch}
                                    disabled={loading}
                                    className={styles.searchButton}
                                >
                                    {loading ? (
                                        <>
                                            <FaSpinner className={styles.spinner} />
                                            {t('searching')}
                                        </>
                                    ) : (
                                        <>
                                            <FaSearch />
                                            {t('searchRestaurantsButton')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Advanced Options */}
                        <div className={styles.advancedOptions}>
                            <div>
                                <label className={styles.formLabel}>
                                    {t('maximumDistance')}
                                </label>
                                <select
                                    name="radius"
                                    value={formData.radius}
                                    onChange={handleInputChange}
                                    className={styles.formSelect}
                                >
                                    <option value="">{t('insertDistance')}</option>
                                    <option value="500">500 {t('meters')}</option>
                                    <option value="1000">1 {t('kilometer')}</option>
                                    <option value="2000">2 {t('kilometers')}</option>
                                    <option value="5000">5 {t('kilometers')}</option>
                                    <option value="10000">10 {t('kilometers')}</option>
                                </select>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className={styles.errorBox}>
                                <p className={styles.errorMessage}>{error}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Section */}

                <div className={styles.resultsSection}>
                    <div className={styles.resultsHeader}>
                        <h2 className={styles.resultsTitle}>
                            {t('restaurantsFound')}
                        </h2>
                        {searchResults.length > 0 && (
                            <span className={styles.resultsCount}>
                                {searchResults.length} {t('results')}
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className={styles.loadingMessage}>
                            <FaSpinner className={`${styles.loadingSpinner} ${styles.spinner}`} />
                            <span className={styles.loadingText}>{t('searchInProgress')}</span>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className={styles.searchResultsList}>
                            {searchResults.map((place) => (
                                <div
                                    key={place.place_id}
                                    className={styles.resultCard}
                                >
                                    <div className={styles.resultCardContent}>
                                        <div className={styles.resultDetails}>
                                            <div className={styles.resultHeader}>
                                                <h3 className={styles.placeName}>
                                                    {place.displayName.text}
                                                </h3>
                                                {place.rating && (
                                                    <div className={styles.ratingBadge}>
                                                        <FaStar className={styles.starIcon} />
                                                        <span className={styles.ratingText}>{place.rating}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className={styles.address}>
                                                <FaMapMarkerAlt className={styles.mapPinIcon} />
                                                <span>{place.formattedAddress}</span>
                                            </div>

                                            <div className={styles.infoRow}>
                                                {place.priceLevel && (
                                                    <div className={styles.priceInfo}>
                                                        <span className={styles.priceLabel}>{t('price')}</span>
                                                        <span className={styles.priceSymbols}>
                                                            {renderPrice(place.priceLevel)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {place.types && place.types.length > 0 && (
                                                <div className={styles.typesContainer}>
                                                    {place.types.slice(0, 3).map((type) => (
                                                        <span
                                                            key={type}
                                                            className={styles.typeTag}
                                                        >
                                                            {type.replace(/_/g, ' ')}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <button onClick={() => handleAddPlace(place.id)} className={styles.detailsLink}>
                                            {t('add')} &rarr;
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            <div className={styles.noResultsIcon}>
                                <FaSearch />
                            </div>
                            <h3 className={styles.noResultsTitle}>
                                {t('noRestaurantsFound')}
                            </h3>
                            <p className={styles.noResultsText}>
                                {t('noResultsText')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}