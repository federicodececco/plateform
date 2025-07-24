// src/components/PlaceModal.jsx
import React from 'react';
import styles from './PlaceModal.module.css'; // Importa i tuoi stili CSS Modules
import { useGlobalContext } from '../context/GlobalContext';

export default function PlaceModal ({ isOpen, onClose, place }) {
  if (!isOpen || !place) return null;

  const {
    name,
    rating,
    images,
    tags,
    categories,
    // placeData: { address, addressNumber, cap, city, province },
    websiteURL,
  } = place;

  const { renderStars } = useGlobalContext();
  console.log(place);
  

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.modalHeader}>
          <h2>{name}</h2>
          <div className={styles.rating}>
            {/* Passa le classi CSS Modules relative alle stelle */}
            {renderStars(rating)}
            <span className={styles.ratingNumber}>({rating})</span>
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.imageGallery}>
            {/* {images.slice(0, 5).map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt={`${name} image ${index + 1}`} />
            ))} */}
          </div>

          <div className={styles.detailsSection}>
            <h3>Indirizzo:</h3>
            {/* <p>{`${address}, ${addressNumber} - ${cap} ${city} (${province})`}</p> */}

            {tags && tags.length > 0 && (
              <>
                <h3>Tags:</h3>
                <div className={styles.tagsContainer}>
                  {tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </>
            )}

            {categories && categories.length > 0 && (
              <>
                <h3>Categorie:</h3>
                <div className={styles.categoriesContainer}>
                  {categories.map((category, index) => (
                    <span key={index} className={styles.category}>{category}</span>
                  ))}
                </div>
              </>
            )}

            {websiteURL && (
              <>
                <h3>Sito Web:</h3>
                <p>
                  <a href={websiteURL} target="_blank" rel="noopener noreferrer">
                    {websiteURL}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};