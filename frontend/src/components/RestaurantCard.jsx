import React from 'react';
import styles from './RestaurantCard.module.css';

const RestaurantCard = ({ restaurant }) => {
    const {
        name,
        location,
        description,
        tags,
        price,
        rating,
        reviewCount, // Potrebbe essere utile se il rating fosse (4.8) basato su X recensioni
        actionText,
        actionType // e.g., 'book' or 'details' to determine button color/style
    } = restaurant;

    // Funzione per generare le stelle del rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className={styles["star filled"]}>★</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className={styles["star half-filled"]}>★</span>); // O un'icona specifica per mezza stella
        }
        while (stars.length < 5) {
            stars.push(<span key={`empty-${stars.length}`} className={styles["star empty"]}>★</span>);
        }
        return stars;
    };

    return (
        <div className={styles["restaurant-card"]}>
            <div className={styles["restaurant-image-placeholder"]}>
                <span className={styles["image-text"]}>Ristorante</span>
            </div>
            <div className={styles["restaurant-details"]}>
                <div className={styles["restaurant-header"]}>
                    <h3 className={styles["restaurant-name"]}>{name}</h3>
                    <div className={styles["restaurant-rating"]}>
                        {renderStars(rating)}
                        <span className={styles["rating-value"]}>({rating})</span>
                    </div>
                </div>
                <p className={styles["restaurant-location"]}>
                    <span className={styles["location-icon"]}>📍</span> {location}
                </p>
                <div className={styles["restaurant-tags"]}>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles[`tag tag-${tag.toLowerCase().replace(/\s/g, '-')}`]}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className={styles["restaurant-footer"]}>
                    <span className={styles["restaurant-price"]}>{price}</span>
                    <button className={styles[`action-button action-button-${actionType}`]}>
                        {actionText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;