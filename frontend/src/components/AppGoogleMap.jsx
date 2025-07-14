import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import styles from './AppGoogleMap.module.css';

// Stile del contenitore della mappa - può essere anche in CSS module se preferisci
const mapContainerStyle = {
    width: '100%',
    height: '400px', // O la dimensione che preferisci
};

export default function AppGoogleMap() {
    const { t } = useTranslation();

    // Modificare le coordinate del ristorande con quelle prese dal db
    const restaurantLat = 43.7696; // Latitudine
    const restaurantLng = 11.2558; // Longitudine
    const restaurantName = "Nome del Tuo Ristorante"; // Nome per il marker e le indicazioni

    const center = useMemo(() => ({
        lat: restaurantLat,
        lng: restaurantLng
    }), [restaurantLat, restaurantLng]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_CHIAVE_API_GOOGLE,
        // libraries: ["places"],
    });

    if (loadError) {
        return (
            <div className={styles.mapSection}>
                <h2 className={styles.sectionHeading}>{t('mapHeading')}</h2>
                <div className={styles.mapContainer}>
                    <p>{t('mapLoadingError')}</p> {/* Messaggio di errore per l'utente */}
                </div>
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${restaurantLat},${restaurantLng}&destination_place_id=${encodeURIComponent(restaurantName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.getDirectionsButton}
                >
                    {t('getDirections')}
                </a>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className={styles.mapSection}>
                <h2 className={styles.sectionHeading}>{t('mapHeading')}</h2>
                <div className={styles.mapContainer}>
                    <p>{t('mapLoading')}</p> {/* Messaggio di caricamento per l'utente */}
                </div>
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${restaurantLat},${restaurantLng}&destination_place_id=${encodeURIComponent(restaurantName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.getDirectionsButton}
                >
                    {t('getDirections')}
                </a>
            </div>
        );
    }

    return (
        <div className={styles.mapSection}>
            {/* <h2 className={styles.sectionHeading}>{t('mapHeading')}</h2> */}
            <div className={styles.mapContainer}>
                <GoogleMap
                    // Passa la classe CSS dal tuo modulo
                    mapContainerClassName={styles.mapFrame}
                    center={center}
                    zoom={15}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                    }}
                >
                    <Marker position={center} title={restaurantName} />
                </GoogleMap>
            </div>
            <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${restaurantLat},${restaurantLng}&destination_place_id=${encodeURIComponent(restaurantName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.getDirectionsButton}
            >
                {t('getDirections')}
            </a>
        </div>
    );
}