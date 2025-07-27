// src/components/PlaceModal.jsx
import React, { useEffect, useState } from 'react';
import styles from './PlaceModal.module.css';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';

export default function PlaceModal({ isOpen, onClose, id, addFunction, addText, resultMessage }) {

  const { t } = useTranslation();
  const { renderStars, googleSearchDetailAuth } = useGlobalContext();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchPlaceDetail = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await googleSearchDetailAuth(id);
      setPlaceDetail(result);
    } catch (err) {
      console.error("Errore nel recupero dettagli del luogo:", err);
      setError("Impossibile caricare i dettagli del luogo. Riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    if (isOpen && id) {
      fetchPlaceDetail();
    } else {

      setPlaceDetail(null);
      setIsLoading(false);
      setError(null);
    }
  }, [isOpen, id, googleSearchDetailAuth]);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <p className={styles.errorMessage}>{error}</p>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    );
  }

  if (!placeDetail) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <p>{t('noRestaurantsFound')}</p>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.modalHeader}>
          <h1>{placeDetail.displayName?.text}</h1>
          <h2>{placeDetail.formattedAddress}</h2>
          <div className={styles.rating}>
            {renderStars(placeDetail.rating)}
            <span className={styles.ratingNumber}>({placeDetail.rating})</span>
          </div>
        </div>

        <div className={styles.modalBody}>
          {/* <div className={styles.imageGallery}>
            {placeDetail.photos && placeDetail.photos.length > 0 ?
              placeDetail.photos.slice(0, 5).map((img, index) =>
                <img
                  key={img.name || index}
                  className={`${styles.thumbnailPhoto} ${index === 0 ? styles.mainPhoto : ''}`}
                  src={`${API_URL}/photo/filename/${img.name}`}
                  alt={`Foto del luogo ${placeDetail.displayName?.text || ''} ${index + 1}`}
                />)
              :
              <div className={styles.noPhotos}>Nessuna foto disponibile.</div>
            }
          </div> */}

          <div className={styles.detailsSection}>
            <h3>{t('address')}:</h3>
            <p>{placeDetail.formattedAddress}</p>
            {placeDetail.internationalPhoneNumber && (
              <>
                <h3>{t('phoneNumber')}: </h3>
                <p>{placeDetail.internationalPhoneNumber}</p>
              </>
            )}

            {placeDetail.types && placeDetail.types.length > 0 && (
              <>
                <h3>{t('tags')}:</h3>
                <div className={styles.tagsContainer}>
                  {placeDetail.types.map((tag, index) => (
                    <span key={tag + index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </>
            )}

            {placeDetail.websiteUri && (
              <>
                <h3>{t('webSite')}:</h3>
                <p>
                  <a href={placeDetail.websiteUri} target="_blank" rel="noopener noreferrer">
                    {t('linkWebSite')}
                  </a>
                </p>
              </>
            )}
            {placeDetail.googleMapsUri && (
              <>
                <h3>{t('mapHeading')}: </h3>
                <p>
                  <a href={placeDetail.googleMapsUri} target="_blank" rel="noopener noreferrer">
                    {t('vistGMaps')}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
        {resultMessage && (
          <div className={`message ${resultMessage.type === 'success' ? 'success' : 'error'}`}>
            {resultMessage.text}
          </div>
        )}
        <button onClick={() => addFunction(placeDetail.id)} className={styles.detailsLink}>
          {addText} &rarr;
        </button>
      </div>
    </div>
  );
}