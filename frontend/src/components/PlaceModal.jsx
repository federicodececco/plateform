// src/components/PlaceModal.jsx
import React, { useEffect, useState } from 'react';
import styles from './PlaceModal.module.css';
import { useGlobalContext } from '../context/GlobalContext';

// Sposta la costante API_URL fuori dal componente se non cambia mai
const API_URL = import.meta.env.VITE_API_URL;

export default function PlaceModal({ isOpen, onClose, id }) {
  // TUTTI I HOOKS DEVONO ESSERE DICHIARATI QUI AL TOP LEVEL
  // PRIMA DI QUALSIASI RITORNO CONDIZIONALE.
  const { renderStars, googleSearchDetailAuth } = useGlobalContext();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // La funzione fetchPlaceDetail può rimanere qui o essere spostata dentro useEffect se preferisci
  const fetchPlaceDetail = async () => {
    setIsLoading(true); // Inizia il caricamento
    setError(null);    // Resetta eventuali errori precedenti
    try {
      const result = await googleSearchDetailAuth(id);
      setPlaceDetail(result);
    } catch (err) {
      console.error("Errore nel recupero dettagli del luogo:", err);
      setError("Impossibile caricare i dettagli del luogo. Riprova più tardi.");
    } finally {
      setIsLoading(false); // Termina il caricamento
    }
  };

  useEffect(() => {
    // Solo se la modale è aperta e l'ID è valido, esegui il fetching
    if (isOpen && id) {
      fetchPlaceDetail();
    } else {
      // Quando la modale è chiusa o l'id non è valido, resetta lo stato
      setPlaceDetail(null);
      setIsLoading(false);
      setError(null);
    }
  }, [isOpen, id, googleSearchDetailAuth]); // Aggiungi isOpen e googleSearchDetailAuth come dipendenze

  // Ora, dopo che tutti i Hooks sono stati chiamati, puoi avere i tuoi return condizionali

  if (!isOpen) return null; // Solo se la modale non deve essere visibile

  // Gestione degli stati di caricamento ed errore
  if (isLoading) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <p>Caricamento dettagli...</p>
          {/* Potresti aggiungere qui uno spinner */}
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

  // Se placeDetail è null qui, significa che non c'è errore, non è in caricamento,
  // ma forse l'ID era valido ma la ricerca non ha restituito nulla.
  // In questo caso, puoi decidere se mostrare un messaggio "non trovato" o semplicemente null.
  if (!placeDetail) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <p>Dettagli del luogo non trovati.</p>
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
            <h3>Indirizzo:</h3>
            <p>{placeDetail.formattedAddress}</p>
            {placeDetail.internationalPhoneNumber && (
              <>
                <h3>Numero: </h3>
                <p>{placeDetail.internationalPhoneNumber}</p>
              </>
            )}

            {placeDetail.types && placeDetail.types.length > 0 && (
              <>
                <h3>Tags:</h3>
                <div className={styles.tagsContainer}>
                  {placeDetail.types.map((tag, index) => (
                    <span key={tag + index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </>
            )}

            {placeDetail.websiteUri && (
              <>
                <h3>Sito Web:</h3>
                <p>
                  <a href={placeDetail.websiteUri} target="_blank" rel="noopener noreferrer">
                    Link al sito
                  </a>
                </p>
              </>
            )}
            {placeDetail.googleMapsUri && (
              <>
                <h3>Mappa: </h3>
                <p>
                  <a href={placeDetail.googleMapsUri} target="_blank" rel="noopener noreferrer">
                    Visita su Google Maps
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}