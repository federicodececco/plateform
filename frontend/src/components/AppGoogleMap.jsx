import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import styles from './AppGoogleMap.module.css';

export default function AppGoogleMap({ restaurantLat, restaurantLng, restaurantName, restaurantPlaceId }) {
    const { t } = useTranslation();

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
                    <p>{t('mapLoadingError')}</p>
                </div>
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination_place_id=${restaurantPlaceId}&destination=${encodeURIComponent(restaurantName)}`}
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
                    <p>{t('mapLoading')}</p>
                </div>
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination_place_id=${restaurantPlaceId}&destination=${encodeURIComponent(restaurantName)}`}
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
            <h2 className={styles.sectionHeading}>{t('mapHeading')}</h2>
            <div className={styles.mapContainer}>
                <GoogleMap
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
                href={`https://www.google.com/maps/dir/?api=1&destination_place_id=${restaurantPlaceId}&destination=${encodeURIComponent(restaurantName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.getDirectionsButton}
            >
                {t('getDirections')}
            </a>
        </div>
    );
}